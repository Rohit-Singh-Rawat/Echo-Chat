import { RoomHistoryContent } from '@/components/history/RoomHistoryContent'
import { ErrorState } from '@/components/ui/ErrorState'
import { getRoomsHistory } from '@/lib/actions/RoomActions'
import { Rooms } from '@/types'

export default async function HistoryPage() {
  let rooms: Rooms
  try {
    rooms = await getRoomsHistory()
    console.log(rooms)
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
    <div className="container mx-auto px-6 py-10">
      <RoomHistoryContent initialRooms={rooms} />
    </div>
  )
}
