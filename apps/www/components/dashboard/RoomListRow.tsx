'use client'

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@echo/ui/components/ui/avatar.tsx'
import { Button } from '@echo/ui/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@echo/ui/components/ui/dropdown-menu.tsx'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@echo/ui/components/ui/hover-card.tsx'
import { TableRow, TableCell } from '@echo/ui/components/ui/table.tsx'
import { Hash, MoreHorizontal } from 'lucide-react'

import { ClockIcon } from '../icons/animated/clock'
import { MessageCircleMoreIcon } from '../icons/animated/message-circle-more'
import { UsersIcon } from '../icons/animated/users'

interface RoomListRowProps {
  id: string
  title: string
  knownParticipants: { name: string; avatar: string }[]
  totalParticipants: number
  messageCount: number
  timeLeft: {
    hours: number
    minutes: number
    seconds: number
  }
  onJoin: () => void
}

const ParticipantAvatar = ({
  participant,
}: {
  participant: { name: string; avatar: string }
}) => (
  <Avatar className="border-background size-6 border-2">
    <AvatarImage
      src={participant.avatar}
      alt={`${participant.name}'s avatar`}
    />
    <AvatarFallback className="bg-gradient-to-br from-neutral-50 to-neutral-200 font-medium text-white">
      {participant.name
        .split(' ')
        .map((name) => name[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()}
    </AvatarFallback>
  </Avatar>
)

const ParticipantsList = ({
  displayParticipants,
  remainingParticipants,
  knownParticipants,
}: {
  displayParticipants: { name: string; avatar: string }[]
  remainingParticipants: number
  knownParticipants: { name: string; avatar: string }[]
}) => (
  <HoverCard>
    <HoverCardTrigger>
      <div className="flex -space-x-2">
        {displayParticipants.map((participant, index) => (
          <ParticipantAvatar key={index} participant={participant} />
        ))}
        {remainingParticipants > 0 && (
          <button className="border-background bg-muted text-muted-foreground z-20 flex size-6 items-center justify-center rounded-full border-2 text-[10px] font-medium">
            +{remainingParticipants}
          </button>
        )}
      </div>
    </HoverCardTrigger>
    <HoverCardContent>
      <div className="flex flex-wrap gap-2 overflow-y-auto">
        {knownParticipants.map((participant, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-2xl bg-black p-1 pr-2"
          >
            <ParticipantAvatar participant={participant} />
            <span className="whitespace-nowrap text-sm font-semibold text-white">
              @{participant.name}
            </span>
          </div>
        ))}
      </div>
    </HoverCardContent>
  </HoverCard>
)

export default function RoomListRow({
  id = '1',
  title = 'Project Discussion',
  knownParticipants = [
    { name: 'Alice', avatar: 'https://avatar.iran.liara.run/public' },
    { name: 'Bob', avatar: 'https://avatar.iran.liara.run/public' },
    { name: 'Charlie', avatar: 'https://avatar.iran.liara.run/public' },
    { name: 'David', avatar: 'https://avatar.iran.liara.run/public' },
    { name: 'Eve', avatar: 'https://avatar.iran.liara.run/public' },
  ],
  totalParticipants = 16,
  messageCount = 8,
  timeLeft = { hours: 0, minutes: 45, seconds: 0 },
  onJoin = () => console.log('Joined the room'),
}: RoomListRowProps) {
  const displayParticipants = knownParticipants.slice(0, 3)
  const remainingParticipants =
    knownParticipants.length - displayParticipants.length

  const formatTime = (time: typeof timeLeft) => {
    const parts = []
    if (time.hours > 0) parts.push(`${time.hours}h`)
    if (time.minutes > 0) parts.push(`${time.minutes}m`)
    if (time.seconds > 0) parts.push(`${time.seconds}s`)
    return parts.join(' ')
  }

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span>{title}</span>
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <Hash className="size-3" />
              <span>{id}</span>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <ParticipantsList
          displayParticipants={displayParticipants}
          remainingParticipants={remainingParticipants}
          knownParticipants={knownParticipants}
        />
      </TableCell>
      <TableCell>
        <div className="text-muted-foreground flex items-center gap-3">
          <div className="flex items-center gap-1">
            <MessageCircleMoreIcon className="size-4" />
            <span>{messageCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <UsersIcon className="size-4" />
            <span>{totalParticipants}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="size-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button onClick={onJoin} size="sm">
            Join Room
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onJoin}>Join Room</DropdownMenuItem>
              <DropdownMenuItem>Join Anonymous</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Room
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  )
}