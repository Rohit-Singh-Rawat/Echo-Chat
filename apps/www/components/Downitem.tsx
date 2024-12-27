'use client'

import { DropdownMenuItem } from '@echo/ui/components/ui/dropdown-menu.tsx'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {
  icon: React.ReactNode
  title: string
  href?: string
  onClick?: () => void
}

const Downitem = ({ icon, title, href, onClick }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <DropdownMenuItem
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="flex items-center justify-start gap-2.5"
    >
      {React.cloneElement(icon as React.ReactElement, {
        animate: isHovered,
        className: 'size-4',
      })}
      <span className="font-normal">{title}</span>
    </DropdownMenuItem>
  )
}

export default Downitem
