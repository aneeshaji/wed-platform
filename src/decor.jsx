/* Animated decorative elements inspired by Hindu wedding motifs. */

export function Mandala({ size = 320, className }) {
  const outerPetals = Array.from({ length: 16 }, (_, i) => (
    <g key={i} transform={`rotate(${i * 22.5} 100 100)`}>
      <path d="M100 44 C 94 62, 94 76, 100 88 C 106 76, 106 62, 100 44 Z" />
    </g>
  ))

  const innerPetals = Array.from({ length: 16 }, (_, i) => (
    <g key={`i${i}`} transform={`rotate(${i * 22.5 + 11.25} 100 100)`}>
      <path d="M100 68 C 97 78, 97 86, 100 92 C 103 86, 103 78, 100 68 Z" opacity="0.6" />
    </g>
  ))

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="74" opacity="0.35" />
      <circle cx="100" cy="100" r="58" opacity="0.25" />
      {outerPetals}
      {innerPetals}
      <circle cx="100" cy="100" r="40" opacity="0.4" />
      <circle cx="100" cy="100" r="22" opacity="0.55" />
      <circle cx="100" cy="100" r="6" />
    </svg>
  )
}

export function Diya({ size = 56, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={`diya${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <path
        className="diya-flame"
        d="M24 3 C 27 8, 28.4 12, 27.2 15.6 C 26 19, 22 19, 20.8 15.6 C 19.6 12, 21 8, 24 3 Z"
        fill="#ffb347"
      />
      <path
        className="diya-flame-core"
        d="M24 9.5 C 25.5 12, 25.8 14.2, 24.8 15.8 C 23.4 15, 22.7 13, 24 9.5 Z"
        fill="#fff4c2"
      />
      <rect x="23" y="18" width="2" height="6" rx="1" fill="#8a5a2b" />
      <path
        d="M9 27 C 14 23.6, 34 23.6, 39 27 C 38.2 29.2, 35.5 30.4, 24 30.4 C 12.5 30.4, 9.8 29.2, 9 27 Z"
        fill="#f7a44c"
      />
      <path
        d="M9 27 C 14 23.6, 34 23.6, 39 27"
        fill="none"
        stroke="#ffd28f"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
