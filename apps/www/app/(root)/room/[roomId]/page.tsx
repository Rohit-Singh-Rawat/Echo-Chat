import ChatBox from '@/components/ChatRoom/ChatBox'
import MetricCard from '@/components/ChatRoom/MetricCard'
import { UserButton } from '@/components/ChatRoom/UserButton'
import { ParticipantsList } from '@/components/dashboard/RoomCard'
import { ClockIcon } from '@/components/icons/animated/clock'
import EchoLogo from '@/components/icons/animated/EchoLogo'
import { UserIcon } from '@/components/icons/animated/user'

const page = () => {
  return (
    <div className="items-centder relative flex h-screen w-screen justify-center bg-neutral-50">
      <div className="grainy absolute inset-0 z-10"></div>
      <div className="z-50 flex w-full justify-between gap-5 p-8">
        <div className="space-y-10">
          <div className="flex justify-between gap-10">
            <EchoLogo />
            <UserButton />
          </div>
          <div>
            <ParticipantsList
              displayParticipants={[
                {
                  name: 'Alice',
                  avatar: 'https://avatar.iran.liara.run/public',
                },
                { name: 'Bob', avatar: 'https://avatar.iran.liara.run/public' },
                {
                  name: 'Charlie',
                  avatar: 'https://avatar.iran.liara.run/public',
                },
              ]}
              remainingParticipants={2}
              knownParticipants={[
                {
                  name: 'Alice',
                  avatar: 'https://avatar.iran.liara.run/public',
                },
                { name: 'Bob', avatar: 'https://avatar.iran.liara.run/public' },
                {
                  name: 'Charlie',
                  avatar: 'https://avatar.iran.liara.run/public',
                },
                {
                  name: 'David',
                  avatar: 'https://avatar.iran.liara.run/public',
                },
                { name: 'Eve', avatar: 'https://avatar.iran.liara.run/public' },
              ]}
            />
          </div>
        </div>

        <ChatBox />
        <div className="space-y-10">
          <MetricCard
            title="Users"
            value={5}
            className="border border-gray-200"
            icon={<UserIcon className="size-4 stroke-black" />}
          />
          <MetricCard
            title="Time"
            value="12:00"
            className="border border-gray-50 bg-black text-white"
            icon={<ClockIcon className="size-4" />}
          />
        </div>
      </div>
    </div>
  )
}
export default page
