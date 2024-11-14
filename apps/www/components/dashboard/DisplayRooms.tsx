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
          <ChatRoomCard
            id={''}
            title={''}
            knownParticipants={[]}
            totalParticipants={0}
            messageCount={0}
            timeLeft={{
              hours: 0,
              minutes: 0,
              seconds: 0,
            }}
            onJoin={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
          <ChatRoomCard
            id={''}
            title={''}
            knownParticipants={[]}
            totalParticipants={0}
            messageCount={0}
            timeLeft={{
              hours: 0,
              minutes: 0,
              seconds: 0,
            }}
            onJoin={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
          <ChatRoomCard
            id={''}
            title={''}
            knownParticipants={[]}
            totalParticipants={0}
            messageCount={0}
            timeLeft={{
              hours: 0,
              minutes: 0,
              seconds: 0,
            }}
            onJoin={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
          <ChatRoomCard
            id={''}
            title={''}
            knownParticipants={[]}
            totalParticipants={0}
            messageCount={0}
            timeLeft={{
              hours: 0,
              minutes: 0,
              seconds: 0,
            }}
            onJoin={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
          <ChatRoomCard
            id={''}
            title={''}
            knownParticipants={[]}
            totalParticipants={0}
            messageCount={0}
            timeLeft={{
              hours: 0,
              minutes: 0,
              seconds: 0,
            }}
            onJoin={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
          <ChatRoomCard
            id={''}
            title={''}
            knownParticipants={[]}
            totalParticipants={0}
            messageCount={0}
            timeLeft={{
              hours: 0,
              minutes: 0,
              seconds: 0,
            }}
            onJoin={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
        </div>
      )}
    </>
  )
}
