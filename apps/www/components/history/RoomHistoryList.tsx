'use client'

import { Badge } from '@echo/ui/components/ui/badge.tsx'
import { Button } from '@echo/ui/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@echo/ui/components/ui/dropdown-menu.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@echo/ui/components/ui/table.tsx'
import { Eye, MessageCircle, MoreVertical, Trash2 } from 'lucide-react'

import { UsersIcon } from '@/components/icons/animated/users'
import { RoomWithParticipants } from '@/types'

import { DeleteRoomDialog } from './DeleteRoomDialog'
import {
  CreatedAtInfo,
  DurationInfo,
  ParticipantsList,
  type Participant,
} from './shared/RoomHistoryComponents'
import { ViewHistoryDialog } from './ViewHistoryDialog'

interface RoomHistoryListProps {
  rooms: RoomWithParticipants[]
}

const RoomHistoryList = ({ rooms }: RoomHistoryListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room Name</TableHead>
          <TableHead>Participants</TableHead>
          <TableHead>Messages</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room) => {
          const knownParticipants: Participant[] = room.participants
            .filter((p) => p.user)
            .map((p) => ({
              name: p.user!.name,
              avatar: p.user?.image ?? 'https://avatar.iran.liara.run/public',
            }))
          const displayParticipants = knownParticipants.slice(0, 3)

          return (
            <TableRow key={room.id}>
              <TableCell className="font-medium">{room.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <ParticipantsList
                    displayParticipants={displayParticipants}
                    remainingParticipants={knownParticipants.length - 3}
                    knownParticipants={knownParticipants}
                  />
                  <div className="flex items-center gap-1 text-sm text-neutral-600">
                    <UsersIcon className="size-4" />
                    {room.participants.length}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-neutral-600">
                  <MessageCircle className="size-4" />
                  {room._count.messages}
                </div>
              </TableCell>
              <TableCell>
                <CreatedAtInfo createdAt={new Date(room.createdAt)} />
              </TableCell>
              <TableCell>
                <DurationInfo
                  createdAt={new Date(room.createdAt)}
                  closedAt={new Date(room.closedAt)}
                />
              </TableCell>
              <TableCell>
                {room.isTemporary ? (
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700"
                  >
                    Temporary
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 text-emerald-700"
                  >
                    Chats Saved
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" side="left">
                    {!room.isTemporary && (
                      <ViewHistoryDialog
                        roomId={room.id}
                        name={room.name}
                        trigger={
                          <div className="flex w-full cursor-pointer items-center gap-3 rounded p-1 px-2 text-sm text-neutral-600 hover:bg-neutral-100">
                            <Eye className="mr-2 size-4" />
                            View Chats
                          </div>
                        }
                      />
                    )}
                    <DropdownMenuItem asChild>
                      <DeleteRoomDialog
                        roomId={room.id}
                        roomTitle={room.name}
                        onDelete={() => {}}
                        trigger={
                          <div className="flex w-full cursor-pointer items-center gap-3 rounded p-1 px-2 text-sm text-red-600 hover:bg-red-200/40">
                            <Trash2 className="size-4" />
                            Delete Room
                          </div>
                        }
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default RoomHistoryList
