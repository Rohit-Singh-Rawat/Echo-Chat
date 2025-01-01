import DisplayRoomsHistory from '@/components/dashboard/DisplayRoomsHistory'
import { ErrorState } from '@/components/ui/ErrorState'
import { getRoomsHistory } from '@/lib/actions/RoomActions'
import { Rooms } from '@/types'

export default async function HistoryPage() {
  let rooms: Rooms
  try {
    rooms = await getRoomsHistory()
  } catch (err) {
    return (
      <ErrorState
        title="Error Loading History"
        message="Failed to load room history"
        fullScreen
      />
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Room History</h1>
        <span className="muted-foreground text-sm">Showing closed rooms</span>
      </div>
      <DisplayRoomsHistory rooms={rooms} />
    </div>
  )
}
