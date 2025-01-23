'use client'

import { useDisplayStore } from '@/lib/store/DisplayStore'
import { Rooms } from '@/types'

import { NoRoomsFound } from './NoRoomsFound'
import RoomHistoryCard from './RoomHistoryCard'
import RoomHistoryList from './RoomHistoryList'

export default function DisplayRoomsHistory({ rooms }: { rooms: Rooms }) {
  const { displayLists } = useDisplayStore()
  const roomsList = Object.entries(rooms).map(([, room]) => ({
    ...room,
  }))

  if (!roomsList.length) {
    return (
      <div className="my-10">
        <NoRoomsFound />
      </div>
    )
  }

  return (
    <>
      {displayLists ? (
        <div className="my-10 rounded-xl border">
          <RoomHistoryList rooms={roomsList} />
        </div>
      ) : (
        <div className="my-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {roomsList.map((room) => (
            <RoomHistoryCard
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
              isTemporary={room.isTemporary}
              createdAt={room.createdAt}
              onView={() => (window.location.href = `/room/${room.id}/history`)}
            />
          ))}
        </div>
      )}
    </>
  )
}
