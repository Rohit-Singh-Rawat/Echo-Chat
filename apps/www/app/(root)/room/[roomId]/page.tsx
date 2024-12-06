import ChatBox from '@/components/ChatRoom/ChatBox'
import { ParticipantsSidebar } from '@/components/ChatRoom/ParticipantsSidebar'
import { RoomHeader } from '@/components/ChatRoom/RoomHeader'
import { RoomSettings } from '@/components/ChatRoom/RoomSettings'

export const metadata = {
  title: 'Chat Room',
  description: 'Real-time chat room powered by Echo',
}

const Page = ({ params }: { params: { roomId: string } }) => {
  const { roomId } = params

  return (
    <div className="grid h-screen max-h-screen w-screen grid-cols-1 grid-rows-10 justify-center overflow-hidden bg-neutral-100 p-5 pt-0">
      <RoomHeader />
      <div className="row-span-9 flex w-full gap-5">
        <ParticipantsSidebar />
        <ChatBox />
        <RoomSettings roomId={roomId} />
      </div>
    </div>
  )
}

export default Page
