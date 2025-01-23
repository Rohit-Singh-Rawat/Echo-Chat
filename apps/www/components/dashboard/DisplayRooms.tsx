'use client'

import ChatRoomCard from '@/components/dashboard/RoomCard'
import RoomList from '@/components/dashboard/RoomList'
import { useDisplayStore } from '@/lib/store/DisplayStore'
import { Rooms, UserStats } from '@/types'

import NoRooms from './NoRooms'

export default function DisplayRooms({
  rooms,
  stats,
}: {
  rooms: Rooms
  stats: UserStats
}) {
  const { displayLists } = useDisplayStore()
  const roomsList = Object.entries(rooms).map(([_id, room]) => ({
    ...room,
  }))
  if (!roomsList.length) {
    return (
      <div className="my-10">
        <NoRooms stats={stats} />
      </div>
    )
  }

  return (
    <>
      {displayLists ? (
        <div className="my-10 rounded-xl border">
          <RoomList rooms={roomsList} />
        </div>
      ) : (
        <div className="my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-10 xl:grid-cols-3">
          {roomsList.map((room) => (
            <ChatRoomCard
              key={room.id}
              id={room.id}
              title={room.name}
              knownParticipants={room.participants
                .filter((p) => p.user)
                .map((p) => ({
                  name: p.user!.name,
                  avatar: p.user!.image,
                }))}
              totalParticipants={room.participants.length}
              messageCount={room._count.messages}
              closedAt={new Date(room.closedAt)}
              onJoin={() => (window.location.href = `/room/${room.id}`)}
            />
          ))}
        </div>
      )}
    </>
  )
}
