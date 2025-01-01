'use client'

import { Room } from '@/types'
import RoomHistoryCard from './RoomHistoryCard'

interface RoomHistoryListProps {
  rooms: Room[]
}

export default function RoomHistoryList({ rooms }: RoomHistoryListProps) {
  return (
    <div className="space-y-4">
      {rooms.map((room) => (
        <RoomHistoryCard key={room.id} room={room} />
      ))}
    </div>
  )
} 