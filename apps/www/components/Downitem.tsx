'use client'

import { DropdownMenuItem } from '@echo/ui/components/ui/dropdown-menu.tsx'
import React, { useState } from 'react'

type Props = {
  icon: React.ReactNode
  title: string
}

const Downitem = ({ icon, title }: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <DropdownMenuItem
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
