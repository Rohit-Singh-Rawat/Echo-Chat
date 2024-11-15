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
            id="room-1"
            title="General Discussion"
            knownParticipants={[
              {
                name: 'John Doe',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Alice Smith',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Bob Wilson',
                avatar: 'https://avatar.iran.liara.run/public',
              },
            ]}
            totalParticipants={12}
            messageCount={156}
            timeLeft={{
              hours: 2,
              minutes: 30,
              seconds: 0,
            }}
            onJoin={() => (window.location.href = '/room/room-1')}
          />
          <ChatRoomCard
            id="room-2"
            title="Tech Talk"
            knownParticipants={[
              {
                name: 'Sarah Johnson',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Mike Brown',
                avatar: 'https://avatar.iran.liara.run/public',
              },
            ]}
            totalParticipants={8}
            messageCount={89}
            timeLeft={{
              hours: 1,
              minutes: 45,
              seconds: 0,
            }}
            onJoin={() => (window.location.href = '/room/room-2')}
          />
          <ChatRoomCard
            id="room-3"
            title="Coffee Chat"
            knownParticipants={[
              {
                name: 'Emma Davis',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'James Miller',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Sophie Clark',
                avatar: 'https://avatar.iran.liara.run/public',
              },
            ]}
            totalParticipants={15}
            messageCount={234}
            timeLeft={{
              hours: 3,
              minutes: 15,
              seconds: 0,
            }}
            onJoin={() => (window.location.href = '/room/room-3')}
          />
          <ChatRoomCard
            id="room-4"
            title="Book Club"
            knownParticipants={[
              {
                name: 'David Wilson',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Lucy Taylor',
                avatar: 'https://avatar.iran.liara.run/public',
              },
            ]}
            totalParticipants={6}
            messageCount={45}
            timeLeft={{
              hours: 4,
              minutes: 0,
              seconds: 0,
            }}
            onJoin={() => (window.location.href = '/room/room-4')}
          />
          <ChatRoomCard
            id="room-5"
            title="Gaming Squad"
            knownParticipants={[
              {
                name: 'Alex Thompson',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Ryan Moore',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Chris Evans',
                avatar: 'https://avatar.iran.liara.run/public',
              },
            ]}
            totalParticipants={20}
            messageCount={312}
            timeLeft={{
              hours: 1,
              minutes: 0,
              seconds: 0,
            }}
            onJoin={() => (window.location.href = '/room/room-5')}
          />
          <ChatRoomCard
            id="room-6"
            title="Movie Discussions"
            knownParticipants={[
              {
                name: 'Rachel Green',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Monica Geller',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Ross Geller',
                avatar: 'https://avatar.iran.liara.run/public',
              },
            ]}
            totalParticipants={10}
            messageCount={178}
            timeLeft={{
              hours: 5,
              minutes: 30,
              seconds: 0,
            }}
            onJoin={() => (window.location.href = '/room/room-6')}
          />
        </div>
      )}
    </>
  )
}
