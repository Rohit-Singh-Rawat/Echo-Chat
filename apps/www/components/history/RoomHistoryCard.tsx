'use client'

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@echo/ui/components/ui/avatar.tsx'
import { Badge } from '@echo/ui/components/ui/badge.tsx'
import { Button } from '@echo/ui/components/ui/button.tsx'
import { Card, CardContent, CardFooter } from '@echo/ui/components/ui/card.tsx'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@echo/ui/components/ui/hover-card.tsx'
import { Separator } from '@echo/ui/components/ui/separator.tsx'
import {
  CalendarIcon,
  Hash,
  TimerIcon,
  MessageCircle,
  Trash2,
} from 'lucide-react'

import { ClockIcon } from '@/components/icons/animated/clock'
import { UsersIcon } from '@/components/icons/animated/users'
import { Message2Icon } from '@/components/icons/message-2'

import { DeleteRoomDialog } from './DeleteRoomDialog'
import { ViewHistoryDialog } from './ViewHistoryDialog'

interface RoomHistoryCardProps {
  id: string
  title: string
  knownParticipants: { name: string; avatar: string }[]
  totalParticipants: number
  messageCount: number
  createdAt: Date
  closedAt: Date
  onView?: () => void
  onDelete?: (roomId: string) => void
  isTemporary?: boolean
}

export const ParticipantAvatar = ({
  participant,
}: {
  participant: { name: string; avatar: string }
}) => (
  <Avatar className="size-6">
    <AvatarImage
      src={participant.avatar}
      alt={`${participant.name}'s avatar`}
    />
    <AvatarFallback className="bg-neutral-100 text-neutral-600">
      {participant.name
        .split(' ')
        .map((name) => name[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()}
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
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <UsersIcon className="size-4" />
        <span>No participants</span>
      </div>
    )
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex -space-x-2">
          {displayParticipants.map((participant, index) => (
            <ParticipantAvatar key={index} participant={participant} />
          ))}
          {remainingParticipants > 0 && (
            <div className="flex size-6 items-center justify-center rounded-full bg-neutral-100 text-[10px] text-neutral-600">
              +{remainingParticipants}
            </div>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-wrap gap-2">
          {knownParticipants.map((participant, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2"
            >
              <ParticipantAvatar participant={participant} />
              <span className="text-sm">{participant.name}</span>
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export const RoomStats = ({
  userCount,
  messageCount,
  createdAt,
  closedAt,
}: {
  userCount: number
  messageCount: number
  createdAt: Date
  closedAt: Date
}) => {
  const formattedCreatedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(createdAt))
  const duration = Math.ceil(
    (new Date(closedAt).getTime() - new Date(createdAt).getTime()) / (1000 * 60)
  )

  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  const durationText =
    hours > 0
      ? minutes > 0
        ? `${hours}h ${minutes}m`
        : `${hours}h`
      : `${minutes}m`

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2 flex items-center gap-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 shadow-sm ring-1 ring-neutral-200/50">
          <UsersIcon className="size-3.5" />
          {userCount}
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 shadow-sm ring-1 ring-neutral-200/50">
          <Message2Icon className="size-3.5" />
          {messageCount}
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-neutral-600">
        <CalendarIcon className="size-4" />
        <span>{formattedCreatedDate}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-neutral-600">
        <TimerIcon className="size-4" />
        <span>{durationText}</span>
      </div>
    </div>
  )
}

export default function RoomHistoryCard({
  id,
  title,
  knownParticipants,
  totalParticipants,
  messageCount,
  createdAt,
  closedAt,
  onDelete = () => {},
  isTemporary,
}: RoomHistoryCardProps) {
  const displayParticipants = knownParticipants.slice(0, 3)
  const remainingParticipants =
    knownParticipants.length - displayParticipants.length

  return (
    <Card className="w-full max-w-96 border-dashed">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-medium">{title}</h3>
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <Hash className="size-3" />
              <span className="font-mono">{id}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isTemporary ? (
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 text-blue-700 transition-colors hover:bg-blue-100"
              >
                Temporary
              </Badge>
            ) : (
              <ViewHistoryDialog roomId={id} name={title} />
            )}
            <DeleteRoomDialog
              roomId={id}
              roomTitle={title}
              onDelete={onDelete}
            />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <ParticipantsList
            displayParticipants={displayParticipants}
            remainingParticipants={remainingParticipants}
            knownParticipants={knownParticipants}
          />
          <RoomStats
            userCount={totalParticipants}
            messageCount={messageCount}
            createdAt={createdAt}
            closedAt={closedAt}
          />
        </div>
      </CardContent>
    </Card>
  )
}
