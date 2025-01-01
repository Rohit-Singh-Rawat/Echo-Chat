'use client'

import { Room } from '@/types'
import { CalendarDays, MessageSquare, Users } from 'lucide-react'

interface RoomHistoryCardProps {
  room: Room
}

export default function RoomHistoryCard({ room }: RoomHistoryCardProps) {
  return (
    <div className="bg-card flex flex-col rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{room.name}</h3>
        <span className="muted-foreground text-sm">ID: {room.id}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{room.participants.length} participants</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>{room._count.messages} messages</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>{new Date(room.closedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="mb-2 font-medium">Participants:</h4>
        <div className="flex flex-wrap gap-2">
          {room.participants
            .filter((p) => p.user)
            .map((p) => (
              <span
                key={p.user!.id}
                className="bg-primary/10 rounded-full px-3 py-1 text-sm"
              >
                {p.user!.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  )
} 