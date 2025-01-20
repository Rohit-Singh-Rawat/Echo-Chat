import { RoomHistoryContent } from '@/components/history/RoomHistoryContent'
import { ErrorState } from '@/components/ui/ErrorState'
import { getRoomsHistory } from '@/lib/actions/RoomActions'
import { Rooms } from '@/types'

export const metadata = {
  title: 'Room History',
  description: 'View your past chat rooms',
}

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
    <div className="items-center justify-center p-4 max-md:border-t max-md:border-neutral-200 md:p-6 lg:p-10">
      <div className="mt-4 md:mt-6">
        <RoomHistoryContent initialRooms={rooms} />
      </div>
    </div>
  )
}
