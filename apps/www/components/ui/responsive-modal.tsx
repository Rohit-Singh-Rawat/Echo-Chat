'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@echo/ui/components/ui/dialog.tsx'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
} from '@echo/ui/components/ui/drawer.tsx'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { useMediaQuery } from '@/hooks/use-media-query'

interface ResponsiveModalProps {
  children: React.ReactNode
  title?: string
  className?: string
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export const ResponsiveModal = ({
  children,
  title,
  className = '',
  onOpenChange,
  open = true,
}: ResponsiveModalProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={`animate-scale-in max-h-[95vh] max-w-[450px] overflow-y-auto p-10 ${className}`}
        >
          <VisuallyHidden.Root>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden.Root>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-3">
        {' '}
        <VisuallyHidden.Root>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden.Root>
        <div className="px-4">{children}</div>
      </DrawerContent>
    </Drawer>
  )
}
