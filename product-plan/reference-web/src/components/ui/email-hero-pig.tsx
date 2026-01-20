import * as React from "react"

import { cn } from "@/lib/utils"

export interface EmailHeroPigProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Decorative hero illustration (no meaningful alt text).
   * If you need accessible text, wrap this with a visually-hidden label.
   */
  title?: string
}

export function EmailHeroPig({ className, title = "Pig with tablet", ...props }: EmailHeroPigProps) {
  return (
    <svg
      viewBox="0 0 600 450"
      width="100%"
      height="100%"
      role="img"
      aria-label={title}
      className={cn("block h-full w-full", className)}
      {...props}
    >
      <defs>
        <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1b1e24" />
          <stop offset="1" stopColor="#0f1114" />
        </linearGradient>
        <linearGradient id="wood" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#3a2c22" />
          <stop offset="0.5" stopColor="#2f241c" />
          <stop offset="1" stopColor="#3b2d23" />
        </linearGradient>
        <radialGradient id="spot" cx="55%" cy="40%" r="70%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fadeBottom" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#111114" stopOpacity="0" />
          <stop offset="1" stopColor="#111114" stopOpacity="0.98" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="600" height="450" fill="url(#bg)" />
      <rect x="0" y="0" width="600" height="260" fill="url(#wood)" opacity="0.95" />
      <rect width="600" height="450" fill="url(#spot)" />

      {/* Subtle vertical wood slats */}
      {Array.from({ length: 10 }).map((_, i) => {
        const x = 30 + i * 55
        return (
          <rect
            key={i}
            x={x}
            y={0}
            width={28}
            height={260}
            fill="#000"
            opacity={i % 2 === 0 ? 0.12 : 0.06}
          />
        )
      })}

      {/* Ground */}
      <path
        d="M0 280C80 260 120 305 190 318C262 332 330 290 400 300C470 310 520 350 600 332V450H0Z"
        fill="#0c0d10"
      />

      {/* Tablet */}
      <g transform="translate(215 270)">
        <rect x="0" y="0" rx="16" ry="16" width="210" height="135" fill="#14161b" />
        <rect x="10" y="12" rx="12" ry="12" width="190" height="111" fill="#0b0c10" />
        <path
          d="M20 95C55 70 85 88 110 74C132 62 156 66 190 45"
          stroke="#2c394b"
          strokeWidth="4"
          fill="none"
          opacity="0.85"
        />
        <circle cx="190" cy="20" r="4" fill="#2a2f3a" />
        <rect x="68" y="122" width="74" height="6" rx="3" fill="#0b0c10" opacity="0.7" />
      </g>

      {/* Pig (stylized) */}
      <g transform="translate(90 145)">
        {/* Body */}
        <path
          d="M70 170C80 115 120 70 195 55C280 38 350 78 382 130C410 176 390 232 330 254C260 280 135 270 92 235C58 208 60 196 70 170Z"
          fill="#e7d6c6"
        />
        {/* Shadow under pig */}
        <ellipse cx="230" cy="270" rx="200" ry="40" fill="#000" opacity="0.22" />

        {/* Head */}
        <path
          d="M158 132C170 92 212 66 260 66C314 66 350 96 360 140C372 192 332 232 270 238C205 246 144 202 158 132Z"
          fill="#f0dfd0"
        />

        {/* Ear left */}
        <path
          d="M185 92C160 62 150 28 178 20C206 12 234 40 240 74C222 78 203 84 185 92Z"
          fill="#e7c9b9"
        />
        {/* Ear right */}
        <path
          d="M322 92C342 62 370 40 398 52C426 64 414 98 382 122C366 112 346 102 322 92Z"
          fill="#e7c9b9"
        />

        {/* Snout */}
        <path
          d="M235 190C252 176 290 176 310 190C330 204 330 228 308 244C284 262 254 260 236 244C218 228 216 204 235 190Z"
          fill="#e6bfb2"
        />
        <ellipse cx="260" cy="220" rx="12" ry="16" fill="#c48f83" opacity="0.9" />
        <ellipse cx="292" cy="220" rx="12" ry="16" fill="#c48f83" opacity="0.9" />

        {/* Eyes */}
        <ellipse cx="225" cy="150" rx="10" ry="12" fill="#3a2b26" opacity="0.9" />
        <ellipse cx="320" cy="152" rx="10" ry="12" fill="#3a2b26" opacity="0.9" />
        <circle cx="221" cy="145" r="3" fill="#fff" opacity="0.8" />
        <circle cx="316" cy="147" r="3" fill="#fff" opacity="0.8" />

        {/* Foreleg hint */}
        <path
          d="M120 210C110 238 118 258 144 268C166 276 190 260 198 236C168 236 142 228 120 210Z"
          fill="#e2cdbd"
        />
      </g>

      {/* Bottom fade so the hero blends into the email surface */}
      <rect x="0" y="250" width="600" height="200" fill="url(#fadeBottom)" />
    </svg>
  )
}

