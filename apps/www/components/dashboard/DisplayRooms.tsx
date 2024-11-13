'use client'

import { useDisplayStore } from '@/app/store/DisplayStore'
import ChatRoomCard from '@/components/dashboard/RoomCard'
import RoomList from '@/components/dashboard/RoomList'

export default function DisplayRooms() {
  const { displayLists } = useDisplayStore()

  return (
    <>
      {displayLists ? (
        <div className="my-10 rounded-xl border">
          <RoomList />
        </div>
      ) : (
        <div className="my-10 grid grid-cols-2 gap-10 xl:grid-cols-3">
          <ChatRoomCard />
          <ChatRoomCard />
          <ChatRoomCard />
          <ChatRoomCard />
          <ChatRoomCard />
          <ChatRoomCard />
        </div>
      )}
    </>
  )
}
