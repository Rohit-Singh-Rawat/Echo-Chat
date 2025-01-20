'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import { CardStack } from '@echo/ui/components/ui/CardStack.tsx'
import Link from 'next/link'

import { UserStats } from '@/types'

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

export default function NoRooms({ stats }: { stats: UserStats }) {
  return (
    <div className="relative flex min-h-[300px] flex-col items-center justify-center gap-6 md:min-h-[400px] md:gap-8">
      {' '}
      <div className="relative flex h-40 w-72 translate-y-16 items-center justify-center md:h-60 md:w-96 md:translate-y-20">
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
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
          No active rooms found
        </h2>
        <p className="mt-2 text-sm text-gray-500 md:text-base">
          Start by creating a new room or join an existing one
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 px-4 md:w-auto md:flex-row md:gap-4 md:px-0">
        <Link href="/join-room" className="w-full md:w-auto">
          <Button variant="outline" className="w-full md:w-[120px]">
            Join a Room
          </Button>
        </Link>
        <div className="w-full md:w-auto">
          <CreateRoomButton {...stats} showStats={false} />
        </div>
      </div>
    </div>
  )
}
