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
      className={`flex items-end justify-start gap-2.5 rounded-lg p-2 text-sm leading-none text-neutral-600 outline-none transition-all duration-500 ease-in-out focus-visible:ring-2 focus-visible:ring-black/50 ${
        isActive
          ? 'text-sidebar-accent-foreground border border-neutral-200 shadow md:bg-white'
          : 'border border-transparent hover:bg-blue-100/50 active:bg-blue-200/80 md:hover:bg-neutral-200/50 md:active:bg-neutral-200/80'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {React.cloneElement(icon as React.ReactElement, {
        animate: isHovered,
        className: `size-4 ${isActive ? 'stroke-blue-600 ' : 'stroke-[#525252]'}`,
      })}
      <span
        className={` ${isActive ? 'font-medium text-blue-600' : 'font-medium'}`}
      >
        {title}
      </span>
    </Link>
  )
}

export default SideBarItem
