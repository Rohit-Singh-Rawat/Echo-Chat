const UserIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="32"
      viewBox="0 0 24 32"
      className={className}
    >
      <path
        fill="currentColor"
        d="M12 16C5.375 16 0 21.375 0 28c0 2.211 1.789 4 4 4h16c2.211 0 4-1.789 4-4 0-6.625-5.375-12-12-12z"
      />
      <circle cx="12" cy="6" r="6" fill="currentColor" />
    </svg>
  )
}

export { UserIcon }
