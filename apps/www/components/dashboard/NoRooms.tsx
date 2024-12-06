'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import { CardStack } from '@echo/ui/components/ui/CardStack.tsx'
import Link from 'next/link'

import CreateRoomButton from './CreateRoomButton'
import DummyCard from './DummyCard'

const dummyRooms = [
  {
    id: 1,
    content: <DummyCard />,
  },
  {
    id: 2,
    content: <DummyCard />,
  },
  {
    id: 3,
    content: <DummyCard />,
  },
]

export default function NoRooms() {
  return (
    <div className="relative flex min-h-[400px] flex-col items-center justify-center gap-8">
      {' '}
      <div className="relative flex h-60 w-96 translate-y-20 items-center justify-center">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            left: 0,
            zIndex: 10,
            background:
              'linear-gradient(to bottom, transparent, transparent 60%, white 76%, white)',
          }}
        ></div>
        <CardStack items={dummyRooms} />
      </div>
      <div className="z-50 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          No active rooms found
        </h2>
        <p className="mt-2 text-gray-500">
          Start by creating a new room or join an existing one
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/join-room">
          <Button variant="outline" className="min-w-[120px]">
            Join a Room
          </Button>
        </Link>
        <CreateRoomButton />
      </div>
      {/* <p className="text-sm text-gray-500">
        Need help? Check out our <Link href="/help" className="text-blue-600 hover:underline">getting started guide</Link>
      </p> */}
    </div>
  )
}
