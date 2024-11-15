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
  const roomz = [1, 2, 3, 4, 5]
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
        {roomz.map((room) => (
          <RoomListRow
            key={room}
            id="room-1"
            title="General Discussion"
            knownParticipants={[
              {
                name: 'John Doe',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Alice Smith',
                avatar: 'https://avatar.iran.liara.run/public',
              },
              {
                name: 'Bob Wilson',
                avatar: 'https://avatar.iran.liara.run/public',
              },
            ]}
            totalParticipants={12}
            messageCount={156}
            timeLeft={{
              hours: 2,
              minutes: 30,
              seconds: 0,
            }}
            onJoin={() => (window.location.href = '/room/room-1')}
          />
        ))}
      </TableBody>
    </Table>
  )
}

export default RoomList
