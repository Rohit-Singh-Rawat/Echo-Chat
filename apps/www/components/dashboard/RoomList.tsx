'use client'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@echo/ui/components/ui/table.tsx'

import RoomListRow from './RoomListRow'

interface Props {
  rooms?: {
    id: string
    title: string
    knownParticipants: { name: string; avatar: string }[]
    totalParticipants: number
    messageCount: number
    userCount: number
    timeLeft: {
      hours: number
      minutes: number
      seconds: number
    }
  }[]
}

const RoomList = ({ rooms = [] }: Props) => {
  return (
    <Table>
      <TableHeader className="">
        <TableRow className="">
          <TableCell className="py-3 pl-10">Room</TableCell>
          <TableCell className="py-3">Participants</TableCell>
          <TableCell className="py-3 pl-12">Stats</TableCell>
          <TableCell className="py-3 pr-10 text-right">Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room) => (
          <RoomListRow
            key={room.id}
            onJoin={() => console.log('Join room', room.id)}
            id={''}
            title={''}
            knownParticipants={[]}
            totalParticipants={0}
            messageCount={0}
            timeLeft={{
              hours: 0,
              minutes: 0,
              seconds: 0,
            }}
          />
        ))}
      </TableBody>
    </Table>
  )
}

export default RoomList
