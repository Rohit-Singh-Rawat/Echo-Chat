'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@echo/ui/components/ui/dialog.tsx'
import { AlertCircle, Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'

import { deleteRoom } from '@/lib/actions/RoomActions'

interface DeleteRoomDialogProps {
  roomId: string
  roomTitle: string
  onDelete: (roomId: string) => void
  trigger?: React.ReactNode
}

export function DeleteRoomDialog({
  roomId,
  roomTitle,
  onDelete,
  trigger,
}: DeleteRoomDialogProps) {
  const [open, setOpen] = useState(false)
  const { execute, isExecuting } = useAction(deleteRoom, {
    onExecute: () => {
      toast.loading('Deleting room history...', { id: 'delete-room' })
    },
    onSuccess: () => {
      toast.success('Room history deleted successfully', { id: 'delete-room' })
      onDelete(roomId)
      setOpen(false)
      revalidatePath('/history')
    },
    onError: (error) => {
      console.error('Failed to delete room:', error)
      toast.error('Failed to delete room history', { id: 'delete-room' })
    },
  })

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 rounded-full text-neutral-500 hover:bg-red-50 hover:text-red-600 md:size-8"
    >
      <Trash2 className="size-4" />
    </Button>
  )

  const handleDelete = () => {
    execute({ roomId })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold md:text-lg">
            Delete Room History
          </DialogTitle>
          <DialogDescription className="space-y-4 text-xs md:space-y-6 md:text-sm">
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col items-center space-y-2 md:space-y-3">
                <p className="text-neutral-600">
                  Are you sure you want to delete this room history?
                </p>
                <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-center shadow-sm md:p-4">
                  <p className="text-sm font-medium text-neutral-900 md:text-base">{roomTitle}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 md:gap-3 md:p-4">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600 md:size-5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-900 md:text-base">Warning</p>
                  <p className="text-xs text-red-700 md:text-sm">
                    This action cannot be undone. All messages, reactions and
                    room data will be permanently deleted.
                  </p>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            className="flex-1 text-xs hover:bg-neutral-50 md:text-sm"
            onClick={() => setOpen(false)}
            disabled={isExecuting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-xs hover:bg-red-700 md:text-sm"
            disabled={isExecuting}
          >
            {isExecuting ? 'Deleting...' : 'Delete Room'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
