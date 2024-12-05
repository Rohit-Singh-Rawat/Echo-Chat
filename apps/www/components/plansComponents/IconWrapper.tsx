import { LucideIcon } from 'lucide-react'
import React from 'react'

interface IconWrapperProps {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function IconWrapper({
  icon: Icon,
  size = 'md',
  className = '',
}: IconWrapperProps) {
  const sizeStyles = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  }

  return (
    <div
      className={`rounded-full border-2 border-gray-300 bg-white/80 p-2 ${className}`}
    >
      <Icon className={`${sizeStyles[size]} text-gray-700`} />
    </div>
  )
}
