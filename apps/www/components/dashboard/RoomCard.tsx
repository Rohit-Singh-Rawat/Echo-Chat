'use client'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@echo/ui/components/ui/avatar.tsx'
import { Button } from '@echo/ui/components/ui/button.tsx'
import { Card, CardContent, CardFooter } from '@echo/ui/components/ui/card.tsx'
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
import { Hash, MoreHorizontal } from 'lucide-react'

import { useIdentityStore } from '@/app/store/useIdentityStore'
import { useTimeLeft } from '@/hooks/useTimeLeft'

import { ClockIcon } from '../icons/animated/clock'
import { MessageCircleMoreIcon } from '../icons/animated/message-circle-more'
import { UsersIcon } from '../icons/animated/users'
import FilledUser from '../icons/FilledUser'

import { UserLabel } from './UserLabel'

interface ChatRoomCardProps {
  id: string
  title: string
  knownParticipants: { name: string; avatar: string }[]
  totalParticipants: number
  messageCount: number
  closedAt: Date
  onJoin: () => void
}

const RoomHeader = ({
  title,
  id,
  onJoin,
}: {
  title: string
  id: string
  onJoin: () => void
}) => {
  const { setAnonymous } = useIdentityStore()

  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold md:text-base">{title}</h3>
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          <Hash className="size-3" />
          <span>{id}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-6 p-0 md:size-8">
            <MoreHorizontal className="size-3 md:size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={onJoin}>Join Room</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setAnonymous(true)
              onJoin()
            }}
          >
            Join Anonymous
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const ParticipantAvatar = ({
  participant,
}: {
  participant: { name: string; avatar: string }
}) => (
  <Avatar className="border-background size-6 border-2 md:size-8">
    <AvatarImage
      src={participant.avatar}
      alt={`${participant.name}'s avatar`}
    />
    <AvatarFallback className="bg-gradient-to-br from-neutral-50 to-neutral-200 font-medium text-white">
      <FilledUser className="size-5 fill-black/70 stroke-black/80" />
    </AvatarFallback>
  </Avatar>
)
export const ParticipantsList = ({
  displayParticipants,
  remainingParticipants,
  knownParticipants,
}: {
  displayParticipants: { name: string; avatar: string }[]
  remainingParticipants: number
  knownParticipants: { name: string; avatar: string }[]
}) => {
  if (knownParticipants.length === 0) {
    return (
      <div className="text-muted-foreground/80 flex items-center gap-2 text-sm md:text-base">
        <UsersIcon className="size-4 md:size-5" />
        <span className="text-xs">No participants yet</span>
      </div>
    )
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex -space-x-2 md:-space-x-3">
          {displayParticipants.map((participant, index) => (
            <ParticipantAvatar key={index} participant={participant} />
          ))}
          {remainingParticipants > 0 && (
            <button className="border-background bg-muted text-muted-foreground z-20 flex size-6 items-center justify-center rounded-full border-2 text-[10px] font-medium md:size-8 md:text-xs">
              +{remainingParticipants}
            </button>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-wrap gap-2 overflow-y-auto">
          {knownParticipants.map((participant, index) => (
            <UserLabel key={index} participant={participant} index={index} />
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export const RoomStats = ({
  messageCount,
  userCount,
  timeLeft,
  isList = false,
}: {
  messageCount: number
  userCount: number
  timeLeft: { hours: number; minutes: number; seconds: number }
  isList?: boolean
}) => {
  const formatTime = (time: typeof timeLeft) => {
    const parts = []
    if (time.hours > 0) parts.push(`${time.hours}h`)
    if (time.minutes > 0) parts.push(`${time.minutes}m`)
    if (time.seconds > 0) parts.push(`${time.seconds}s`)
    if (time.hours <= 0 && time.minutes <= 0 && time.seconds <= 0)
      return 'Ended'
    return parts.join(' ')
  }

  return (
    <div
      className={`text-muted-foreground flex ${isList ? 'flex-row' : 'flex-col md:flex-row'} items-start gap-1 text-xs md:items-center md:gap-3 md:text-sm`}
    >
      <div className="flex items-center gap-1">
        <MessageCircleMoreIcon className="size-3 md:size-4" />
        <span>{messageCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <UsersIcon className="size-3 md:size-4" />
        <span>{userCount}</span>
      </div>
      <div className="md:mx-w-28 flex items-center gap-1 md:w-28">
        <ClockIcon className="size-3 md:size-4" />
        <span>{formatTime(timeLeft)}</span>
      </div>
    </div>
  )
}

export default function ChatRoomCard({
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
  closedAt = new Date(Date.now() + 45 * 60 * 1000),
  onJoin = () => console.log('Joined the room'),
}: ChatRoomCardProps) {
  const timeLeft = useTimeLeft(closedAt)
  const displayParticipants = knownParticipants.slice(0, 3)
  const remainingParticipants =
    knownParticipants.length - displayParticipants.length

  return (
    <Card className="w-full max-w-96 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
      <CardContent className="p-3 md:p-4">
        <RoomHeader title={title} id={id} onJoin={onJoin} />
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <ParticipantsList
            displayParticipants={displayParticipants}
            remainingParticipants={remainingParticipants}
            knownParticipants={knownParticipants}
          />
          <RoomStats
            messageCount={messageCount}
            userCount={totalParticipants}
            timeLeft={timeLeft}
          />
        </div>
      </CardContent>
      <CardFooter className="p-2 md:p-3">
        <Button
          className="h-auto w-full py-2 text-sm md:py-2.5 md:text-base"
          onClick={onJoin}
        >
          Join Room
        </Button>
      </CardFooter>
    </Card>
  )
}
