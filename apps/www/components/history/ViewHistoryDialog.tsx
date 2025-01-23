'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import { useState } from 'react'

import { ResponsiveModal } from '../ui/responsive-modal'

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

  const defaultTrigger = <div>View History</div>

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={
          trigger
            ? 'border-0 p-0 shadow-none'
            : 'h-7 border px-2 text-xs font-medium transition-colors hover:bg-neutral-100 md:h-8 md:px-3 md:text-sm'
        }
        onClick={() => setIsOpen(true)}
      >
        {trigger || defaultTrigger}
      </Button>
      <ResponsiveModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title={name}
        className="overflow-hidden p-5 sm:max-w-[900px]"
      >
        <div>
          {isOpen && (
            <div className="relative min-h-[400px] rounded-lg bg-white p-2 pt-5 md:min-h-[600px] md:p-6">
              {' '}
              <ViewHistoryContent roomId={roomId} />{' '}
            </div>
          )}
        </div>
      </ResponsiveModal>
    </>
  )
}
