import { Input } from '@echo/ui/components/ui/input.tsx'
import { Label } from '@echo/ui/components/ui/label.tsx'
import { Hash } from 'lucide-react'

import EchoLogo from '@/components/icons/animated/EchoLogo'
import EchoRoom from '@/components/icons/EchoRoom'
import IdentityToggler from '@/components/Join-Room/IdentityToggler'
import { Button } from '@/components/shared/Button'

const page = async ({
  searchParams,
}: {
  searchParams: { roomId: string; anonymous: string }
}) => {
  const { roomId, anonymous } = await searchParams
  return (
    <div className="flex h-screen flex-col items-center gap-6 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="my-14">
        <EchoLogo />
      </div>
      <div className="flex flex-col items-center rounded-2xl border-2 border-gray-200 bg-white p-10">
        <JoinRoomForm anonymous={anonymous} roomId={roomId} />
      </div>
    </div>
  )
}

export const JoinRoomForm = ({
  roomId,
  anonymous,
}: {
  roomId?: string
  anonymous?: string
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full border border-gray-200 bg-white p-2 shadow-sm">
        <EchoRoom className="size-5" />
      </div>
      <div className="mb-8 mt-4">
        <h1 className="text-2xl font-semibold">Join a room</h1>
      </div>

      <div className="mb-6 w-full max-w-sm space-y-2">
        <Label htmlFor="room-id">Room ID</Label>
        <div className="relative">
          <Input
            id="room-id"
            readOnly
            className="peer ps-9"
            value={roomId ?? ''}
            placeholder="Enter room ID"
            type="text"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <Hash size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <IdentityToggler defaultChecked={anonymous == 'true' ?? false} />
      </div>

      <Button className="w-full">Join Room</Button>
    </div>
  )
}

export default page
