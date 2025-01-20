'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { JoinRoomForm } from '@/components/Join-Room/JoinRoomForm'
import { ResponsiveModal } from '@/components/ui/responsive-modal'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roomId = searchParams.get('roomId') ?? ''
  const anonymous = searchParams.get('anonymous') ?? ''

  return (
    <ResponsiveModal
      title="Join Room"
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <JoinRoomForm anonymous={anonymous === 'true'} roomId={roomId} />
    </ResponsiveModal>
  )
}

export default Page
