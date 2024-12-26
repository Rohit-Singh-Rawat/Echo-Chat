const GradientShield = ({
  className,
  gradientColors = ['#ffffff', '#e5e5e5', '#d4d4d4'],
}: {
  className?: string
  gradientColors?: [string, string, string]
}) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={gradientColors[0]} />
          <stop offset="50%" stopColor={gradientColors[1]} />
          <stop offset="100%" stopColor={gradientColors[2]} />
        </linearGradient>
      </defs>
      <path
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        stroke="url(#gradient)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { GradientShield }
