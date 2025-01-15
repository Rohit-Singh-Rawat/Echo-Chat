'use client'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@echo/ui/components/ui/table.tsx'

import { RoomWithParticipants } from '@/types'

import RoomListRow from './RoomListRow'

const RoomList = ({ rooms }: { rooms: RoomWithParticipants[] }) => {
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
            id={room.id}
            title={room.name}
            knownParticipants={room.participants
              .filter((p) => p.user)
              .map((p) => ({
                name: p.user!.name,
                avatar: p.user!.image,
              }))}
            totalParticipants={room.participants.length}
            messageCount={room._count.messages}
            closedAt={new Date(room.closedAt)}
            onJoin={() => (window.location.href = '/room/room-1')}
          />
        ))}
      </TableBody>
    </Table>
  )
}

export default RoomList
