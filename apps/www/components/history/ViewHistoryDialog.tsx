'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from '@echo/ui/components/ui/dialog.tsx'
import { useState } from 'react'

import { ViewHistoryContent } from './ViewHistoryContent'

interface ViewHistoryDialogProps {
  roomId: string
  name: string
  trigger?: React.ReactNode
}

export function ViewHistoryDialog({
  roomId,
  name,
  trigger,
}: ViewHistoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const defaultTrigger = (
    <Button
      variant="outline"
      size="sm"
      className="h-8 px-3 text-sm font-medium transition-colors hover:bg-neutral-100"
    >
      View History
    </Button>
  )

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader className="">
          <DialogTitle className="text-center text-2xl font-bold tracking-tight">
            {name}
          </DialogTitle>
        </DialogHeader>

        <div className="relative min-h-[600px] rounded-lg bg-white">
          {isOpen && <ViewHistoryContent roomId={roomId} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
