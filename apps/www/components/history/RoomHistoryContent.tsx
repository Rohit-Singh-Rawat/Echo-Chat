'use client'

import { Input } from '@echo/ui/components/ui/input.tsx'
import { useEffect, useState } from 'react'

import DisplaySwitch from '@/components/dashboard/DisplayRadio'
import DisplayRoomsHistory from '@/components/history/DisplayRoomsHistory'
import { useRoomStore } from '@/lib/store/roomHistoryStore'
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
    <div className="space-y-6 md:space-y-10">
      <h1 className="text-xl font-bold md:text-2xl">
        Room History ({Object.keys(filteredRooms).length})
      </h1>
      <div className="flex flex-row items-center justify-between gap-4">
        <Input
          type="search"
          placeholder="Search rooms..."
          className="w-full md:w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-4 md:gap-10">
          <DisplaySwitch />
        </div>
      </div>
      <DisplayRoomsHistory rooms={filteredRooms} />
    </div>
  )
}
