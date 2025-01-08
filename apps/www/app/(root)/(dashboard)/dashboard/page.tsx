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
    <div className="items-center justify-center p-10">
      <h1 className="text-3xl font-semibold text-black/70">Dashboard</h1>
      <div className="my-6 flex items-center justify-between">
        <div className="flex gap-3">
          <SearchBar />
          <DisplaySwitch />
        </div>
        <div className="flex items-center gap-3">
          <Link href="/join-room">
            <Button variant="outline">Join a Room</Button>
          </Link>
          <CreateRoomButton {...stats} />
        </div>
      </div>
      <DisplayRooms rooms={rooms} stats={stats} />
    </div>
  )
}
export default page
