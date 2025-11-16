const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

// Function to find all handler files recursively
function findHandlers(dir, basePath = "") {
  const entries = {};

  fs.readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
    if (
      dirent.isFile() &&
      dirent.name.endsWith(".ts") &&
      !dirent.name.endsWith(".d.ts")
    ) {
      const name = basePath
        ? `${basePath}/${path.parse(dirent.name).name}`
        : path.parse(dirent.name).name;
      entries[name] = path.join(dir, dirent.name);
    } else if (dirent.isDirectory()) {
      const subPath = basePath ? `${basePath}/${dirent.name}` : dirent.name;
      const subEntries = findHandlers(path.join(dir, dirent.name), subPath);
      Object.assign(entries, subEntries);
    }
  });

  return entries;
}

// Find all handler files in auth, config, and root src
const srcDir = path.resolve(__dirname, "src");
const handlers = {};

// Scan auth folder
if (fs.existsSync(path.join(srcDir, "auth"))) {
  Object.assign(handlers, findHandlers(path.join(srcDir, "auth"), "auth"));
}

// Scan config folder
if (fs.existsSync(path.join(srcDir, "config"))) {
  Object.assign(handlers, findHandlers(path.join(srcDir, "config"), "config"));
}

// Scan root files
fs.readdirSync(srcDir, { withFileTypes: true }).forEach((dirent) => {
  if (
    dirent.isFile() &&
    dirent.name.endsWith(".ts") &&
    !dirent.name.endsWith(".d.ts")
  ) {
    const name = path.parse(dirent.name).name;
    handlers[name] = path.join(srcDir, dirent.name);
  }
});

console.log("Handler entries:", Object.keys(handlers));

module.exports = {
  mode: "production",
  target: "node",

  entry: handlers,

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].mjs",
    library: {
      type: "module",
    },
    clean: true,
    chunkFormat: false,
  },

  externals: {
    // Don't bundle AWS SDK - provided by Lambda runtime
    "aws-sdk": "aws-sdk",
    "@aws-sdk/client-cognito-identity-provider":
      "commonjs @aws-sdk/client-cognito-identity-provider",
  },

  resolve: {
    extensions: [".ts", ".js", ".json"],
    extensionAlias: {
      ".js": [".ts", ".js"],
    },
  },

  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: "esnext",
                target: "es2020",
                moduleResolution: "node",
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                resolveJsonModule: true,
                sourceMap: false,
                declaration: false,
                declarationMap: false,
                removeComments: true,
                isolatedModules: true,
                skipLibCheck: true,
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: `import {createRequire} from 'module';const require=createRequire(import.meta.url);`,
      raw: true,
    }),
  ],

  optimization: {
    minimize: false,
    splitChunks: false,
    runtimeChunk: false,
    concatenateModules: false,
    sideEffects: false,
    usedExports: false,
  },

  performance: {
    hints: false,
  },

  stats: {
    warnings: false,
  },

  devtool: false,
};
