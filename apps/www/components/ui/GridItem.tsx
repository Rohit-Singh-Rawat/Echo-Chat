'use client'

import { cn } from '@echo/utils/src'
import { motion } from 'framer-motion'

interface GridItemProps {
  children: React.ReactNode
  className?: string
  colSpan?: number
  rowSpan?: number
  animate?: boolean
  delay?: number
}

const GridItem = ({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  animate = true,
  delay = 0,
}: GridItemProps) => {
  const baseClasses = cn(
    'relative overflow-hidden rounded-xl border border-neutral-50 bg-white px-8 py-5',
    'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]',
    colSpan && `col-span-${colSpan}`,
    rowSpan && `row-span-${rowSpan}`,
    className
  )

  if (!animate) {
    return <div className={baseClasses}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
      className={baseClasses}
    >
      {children}
    </motion.div>
  )
}

export { GridItem }
