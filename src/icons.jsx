/* Lightweight inline icon set (24×24, stroke-based, currentColor). */

const base = (size, className) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className,
  'aria-hidden': 'true',
})

export function HeartIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

export function RingsIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <circle cx="9" cy="14.5" r="5.5" />
      <circle cx="15" cy="9.5" r="5.5" />
    </svg>
  )
}

export function MapPinIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function ClockIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export function CalendarIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

export function SparklesIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </svg>
  )
}

export function EnvelopeIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export function UsersIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export function MessageIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export function GlassIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M8 22h8" />
      <path d="M12 11v11" />
      <path d="m19 3-7 8-7-8Z" />
    </svg>
  )
}

export function MusicIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

export function MusicMutedIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
}

export function ShareIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}

export function CopyIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

export function CheckIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function ArrowUpIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}

export function MenuIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

export function CloseIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function CameraIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}

export function HelpIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}

export function PlaneIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}

export function TrainIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <rect width="16" height="12" x="4" y="3" rx="2" />
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <circle cx="8.5" cy="13.5" r="0.5" fill="currentColor" />
      <circle cx="15.5" cy="13.5" r="0.5" fill="currentColor" />
      <path d="m9 21-2 2" />
      <path d="m15 21 2 2" />
    </svg>
  )
}

export function BedIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M2 9V4h20v5" />
      <path d="M2 9v10" />
      <path d="M22 9v10" />
      <path d="M2 14h20" />
      <path d="M6 14v-3h12v3" />
    </svg>
  )
}

export function PhoneIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function GlobeIcon({ size = 18, className }) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}
