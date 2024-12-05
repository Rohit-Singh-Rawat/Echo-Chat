'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@echo/ui/components/ui/dialog.tsx'
import { useRouter, useSearchParams } from 'next/navigation'

import { JoinRoomForm } from '@/components/Join-Room/JoinRoomForm'

const Page = () => {
  const searchParams = useSearchParams()
  const roomId = searchParams.get('roomId') ?? ''
  const anonymous = searchParams.get('anonymous') ?? ''
  const router = useRouter()

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent className="animate-scale-in max-h-[95vh] max-w-[450px] overflow-y-auto p-10">
        <DialogTitle></DialogTitle>
        <JoinRoomForm anonymous={anonymous} roomId={roomId} />
      </DialogContent>
    </Dialog>
  )
}

export default Page
