# Client (Next.js Frontend)

## Setup

```bash
cd Client
npm install
npm run dev  # Runs on http://localhost:3000
```

## Features

- **Authentication**: AWS Cognito login (no signup)
- **Protected Routes**: JWT validation with auto-refresh
- **Whitelist**: Add/remove phone numbers
- **Schedule**: Configure business hours by day/time
- **UI**: shadcn/ui + Tailwind CSS

## Stack

Next.js 15 + React 18 + TypeScript + Redux Toolkit + TanStack Query + shadcn/ui

## API Connection

Client auto-detects backend:

- Local: `http://localhost:4000/api`
- Prod: `https://yourdomain.com/api` (proxied via Vercel)

No env vars needed!

## Deploy to Vercel

1. Create `vercel.json` in project root:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/:path*"
    }
  ]
}
```

2. Deploy:

```bash
vercel --prod
```

Replace `YOUR-API-ID` with your API Gateway ID from AWS deployment output.

## Components

`src/app/` - Pages (landing, login, dashboard)
`src/components/ui/` - shadcn/ui components
`src/store/` - Redux slices (user auth)
`src/services/` - API calls + React Query hooks
`src/lib/api.ts` - Axios client with interceptors
