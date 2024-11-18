import ChatBox from '@/components/ChatRoom/ChatBox'
import MetricCard from '@/components/ChatRoom/MetricCard'
import { UserButton } from '@/components/ChatRoom/UserButton'
import {
  ParticipantAvatar,
  ParticipantsList,
} from '@/components/dashboard/RoomCard'
import { UserLabel } from '@/components/dashboard/UserLabel'
import { ClockIcon } from '@/components/icons/animated/clock'
import EchoLogo from '@/components/icons/animated/EchoLogo'
import { UserIcon } from '@/components/icons/animated/user'
export const metadata = {
  title: 'Chat Room',
  description: 'Real-time chat room powered by Echo',
}

const page = () => {
  return (
    <div className="relative flex h-screen w-screen justify-center">
      <div className="z-50 flex w-full justify-between border-2 border-neutral-200 bg-white">
        <div className="space-y-1 border-r-2 border-neutral-200">
          <div className="flex justify-between gap-10 p-5">
            <EchoLogo />
            <UserButton />
          </div>
          <div className="chat-scroll max-h-[90%] overflow-y-auto">
            <div className="flex flex-col gap-2 p-4">
              {[
                'Alice',
                'Bob',
                'Charlie',
                'David',
                'Eve',
                'Frank',
                'Grace',
                'Henry',
                'Ivy',
                'Jack',
                'Kelly',
                'Liam',
                'Mia',
                'Noah',
                'Olivia',
                'Peter',
                'Quinn',
                'Rachel',
                'Sam',
                'Tom',
              ].map((name, index) => (
                <UserLabel
                  key={index}
                  participant={{
                    name,
                    avatar: 'https://avatar.iran.liara.run/public',
                  }}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        <ChatBox />
        <div className="flex flex-col gap-10 space-y-10 border-l-2 border-neutral-200 p-5 py-20">
          <MetricCard
            title="Users"
            value={5}
            className="border border-gray-200"
            icon={<UserIcon className="size-4 stroke-black" />}
          />
          <MetricCard
            title="Time"
            value={12 * 60}
            className="border border-gray-50 bg-black text-white"
            icon={<ClockIcon className="size-4" />}
          />
        </div>
      </div>
    </div>
  )
}
export default page
