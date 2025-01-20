'use client'
import { Input } from '@echo/ui/components/ui/input.tsx'
import { Label } from '@echo/ui/components/ui/label.tsx'
import { Hash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useIdentityStore } from '@/app/store/useIdentityStore'
import EchoRoom from '@/components/icons/EchoRoom'
import IdentityToggler from '@/components/Join-Room/IdentityToggler'

import { Button } from '../shared/Button'

export const JoinRoomForm = ({
  roomId,
  anonymous,
}: {
  roomId?: string
  anonymous?: boolean
}) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    roomId: roomId,
  })

  const { setAnonymous } = useIdentityStore()
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`/room/${formData.roomId}`)
  }
  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col items-center max-md:my-3"
    >
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
            onChange={(e) =>
              setFormData((data) => ({ ...data, roomId: e.target.value }))
            }
            className="peer ps-9"
            value={formData.roomId ?? ''}
            placeholder="Enter room ID"
            type="text"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <Hash size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <IdentityToggler
          defaultChecked={anonymous ?? false}
          onChange={(anonymous) => setAnonymous(anonymous)}
        />
      </div>

      <Button className="w-full" type="submit">
        Join Room
      </Button>
    </form>
  )
}
