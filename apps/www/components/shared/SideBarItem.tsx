'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

type Props = {
  icon: React.ReactNode
  title: string
  url: string
}

const SideBarItem = ({ icon, title, url }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === url
  return (
    <Link
      href={url}
      className={`flex items-center justify-start gap-2.5 rounded-lg p-2 text-sm leading-none text-neutral-600 outline-none transition-all duration-500 ease-in-out focus-visible:ring-2 focus-visible:ring-black/50 ${
        isActive
          ? 'text-sidebar-accent-foreground bg-white shadow-sm'
          : 'hover:bg-neutral-200/50 active:bg-neutral-200/80'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {React.cloneElement(icon as React.ReactElement, {
        animate: isHovered,
        className: `size-4 ${isActive ? 'stroke-blue-500 ' : ''}`,
      })}
      <span
        className={` ${isActive ? 'font-semibold text-blue-500' : 'font-normal'}`}
      >
        {title}
      </span>
    </Link>
  )
}

export default SideBarItem
