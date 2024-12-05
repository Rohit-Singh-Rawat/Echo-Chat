import React from 'react'

interface BadgeProps {
  children: React.ReactNode
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-sm font-medium text-gray-900">
      {children}
    </span>
  )
}
