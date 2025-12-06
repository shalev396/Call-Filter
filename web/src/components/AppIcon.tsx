interface AppIconProps {
  className?: string;
  size?: number;
}

export function AppIcon({ className = "", size = 32 }: AppIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 108 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="bgGradient"
          x1="0"
          y1="0"
          x2="108"
          y2="108"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="50%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#134E4A" />
        </linearGradient>
        <linearGradient
          id="blockGradient"
          x1="58"
          y1="54"
          x2="86"
          y2="82"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <clipPath id="circleClip">
          <circle cx="54" cy="54" r="54" />
        </clipPath>
      </defs>

      <g clipPath="url(#circleClip)">
        {/* Background */}
        <rect width="108" height="108" fill="url(#bgGradient)" />

        {/* Decorative circles */}
        <circle cx="80" cy="20" r="35" fill="#FFFFFF" opacity="0.1" />
        <circle cx="25" cy="85" r="25" fill="#FFFFFF" opacity="0.05" />

        {/* Phone Group (rotated -30 degrees) */}
        <g transform="rotate(-30 54 54)">
          {/* Phone shadow */}
          <path
            d="M38,42 C38,38 41,35 45,35 L63,35 C67,35 70,38 70,42 L70,66 C70,70 67,73 63,73 L45,73 C41,73 38,70 38,66 L38,42z"
            fill="#000000"
            opacity="0.08"
          />

          {/* Phone body */}
          <path
            d="M36,40 C36,36 39,33 43,33 L61,33 C65,33 68,36 68,40 L68,68 C68,72 65,75 61,75 L43,75 C39,75 36,72 36,68 L36,40z"
            fill="#FFFFFF"
          />

          {/* Phone screen */}
          <path
            d="M40,42 C40,40 41.5,38 44,38 L60,38 C62.5,38 64,40 64,42 L64,62 C64,64 62.5,66 60,66 L44,66 C41.5,66 40,64 40,62 L40,42z"
            fill="#1E293B"
          />

          {/* Screen glare */}
          <path
            d="M42,40 L44,40 L44,52 L42,52z"
            fill="#FFFFFF"
            opacity="0.18"
          />

          {/* Phone speaker */}
          <line
            x1="48"
            y1="35.5"
            x2="56"
            y2="35.5"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Phone home button */}
          <circle cx="52" cy="70" r="2" fill="#94A3B8" />
        </g>

        {/* Block/Filter Circle - Bottom Right */}
        <circle cx="72" cy="68" r="14" fill="url(#blockGradient)" />

        {/* Block symbol - diagonal line */}
        <line
          x1="63"
          y1="59"
          x2="81"
          y2="77"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Clock/schedule indicator - Top right */}
        <circle cx="70" cy="32" r="8" fill="#22D3EE" />

        {/* Clock hands */}
        <line
          x1="70"
          y1="32"
          x2="70"
          y2="28"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="32"
          x2="73"
          y2="32"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Clock center dot */}
        <circle cx="70" cy="32" r="1" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
