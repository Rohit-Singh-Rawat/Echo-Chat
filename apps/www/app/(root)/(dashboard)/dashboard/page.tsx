import { Button } from '@echo/ui/components/ui/button.tsx'

import CreateRoomButton from '@/components/dashboard/CreateRoomButton'
import DisplaySwitch from '@/components/dashboard/DisplayRadio'
import DisplayRooms from '@/components/dashboard/DisplayRooms'
import SearchBar from '@/components/dashboard/SearchBar'

const page = () => {
  return (
    <div className="h-screen items-center justify-center p-10">
      <h1 className="text-3xl font-semibold text-black/70">Dashboard</h1>
      <div className="my-6 flex items-center justify-between">
        <div className="flex gap-3">
          <SearchBar />
          <DisplaySwitch />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Join a Room</Button>
          <CreateRoomButton />
        </div>
      </div>
      <DisplayRooms />
    </div>
  )
}
export default page
