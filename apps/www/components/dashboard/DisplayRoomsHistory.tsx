'use client'

import { useDisplayStore } from '@/app/store/DisplayStore'
import ChatRoomCard from '@/components/dashboard/RoomCard'
import RoomList from '@/components/dashboard/RoomList'
import { Rooms } from '@/types'

import NoRooms from './NoRooms'

export default function DisplayRoomsHistory({ rooms }: { rooms: Rooms }) {
  const { displayLists } = useDisplayStore()
  const roomsList = Object.entries(rooms).map(([id, room]) => ({
    ...room,
  }))
  if (!roomsList.length) {
    return (
      <div className="my-10">
        <NoRooms />
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
        <div className="my-10 grid grid-cols-2 gap-10 xl:grid-cols-3">
          {roomsList.map((room) => (
            <ChatRoomCard
              key={room.id}
              id={room.id}
              title={room.name}
              knownParticipants={room.participants
                .filter((p) => p.user)
                .map((p) => ({
                  name: p.user!.name,
                  avatar: 'https://avatar.iran.liara.run/public',
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
