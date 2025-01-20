import { Button } from '@echo/ui/components/ui/button.tsx'
import Link from 'next/link'

import CreateRoomButton from '@/components/dashboard/CreateRoomButton'
import DisplaySwitch from '@/components/dashboard/DisplayRadio'
import DisplayRooms from '@/components/dashboard/DisplayRooms'
import SearchBar from '@/components/dashboard/SearchBar'
import { getRooms } from '@/lib/actions/RoomActions'
import { getUserStats } from '@/lib/actions/UserActions'

export const metadata = {
  title: 'Dashboard',
  description: 'View and manage your chat rooms',
}

const page = async () => {
  const [rooms, stats] = await Promise.all([getRooms(), getUserStats()])


  return (
    <div className="items-center justify-center p-4 max-md:border-t max-md:border-neutral-200 md:p-6 lg:p-10">
      <h1 className="hidden text-2xl font-semibold text-black/70 md:block md:text-3xl">
        Dashboard
      </h1>
      <div className="my-4 flex flex-col items-start justify-between gap-4 lg:my-6 lg:flex-row lg:items-center lg:gap-0">
        <div className="flex w-full flex-row gap-3">
          <SearchBar />
          <DisplaySwitch />
        </div>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <Link href="/join-room" className="w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto">
              Join a Room
            </Button>
          </Link>
          <div className="w-full md:w-auto">
            <CreateRoomButton {...stats} />
          </div>
        </div>
      </div>
      <DisplayRooms rooms={rooms} stats={stats} />
    </div>
  )
}
export default page
