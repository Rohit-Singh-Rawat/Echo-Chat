'use client'

import { Input } from '@echo/ui/components/ui/input.tsx'
import { useEffect, useState } from 'react'

import { useRoomStore } from '@/app/store/roomHistoryStore'
import DisplaySwitch from '@/components/dashboard/DisplayRadio'
import DisplayRoomsHistory from '@/components/history/DisplayRoomsHistory'
import { Rooms } from '@/types'

interface RoomHistoryContentProps {
  initialRooms: Rooms
}

export function RoomHistoryContent({ initialRooms }: RoomHistoryContentProps) {
  const { rooms, setRooms, filterRooms } = useRoomStore()
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    setRooms(initialRooms)
  }, [initialRooms, setRooms])
  const filteredRooms = searchQuery
    ? filterRooms(searchQuery)
    : (rooms ?? initialRooms)

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">
        Room History ({Object.keys(filteredRooms).length})
      </h1>
      <div className="flex items-center justify-between gap-4">
        <Input
          type="search"
          placeholder="Search rooms..."
          className="w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-10">
          <DisplaySwitch />
        </div>
      </div>
      <DisplayRoomsHistory rooms={filteredRooms} />
    </div>
  )
}
