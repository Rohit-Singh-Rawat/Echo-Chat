'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@echo/ui/components/ui/avatar.tsx'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@echo/ui/components/ui/hover-card.tsx'
import { CalendarIcon, TimerIcon } from 'lucide-react'

import { UsersIcon } from '@/components/icons/animated/users'
import FilledUser from '@/components/icons/FilledUser'

export interface Participant {
  name: string
  avatar: string
}

export const ParticipantAvatar = ({
  participant,
}: {
  participant: Participant
}) => (
  <Avatar className="size-5 border-2 border-white md:size-6">
    <AvatarImage
      src={participant.avatar}
      alt={`${participant.name}'s avatar`}
    />
    <AvatarFallback className="bg-neutral-100 text-xs text-neutral-600">
      <FilledUser className="size-4 fill-black/70 stroke-black/80 md:size-5" />
    </AvatarFallback>
  </Avatar>
)

export const ParticipantsList = ({
  displayParticipants,
  remainingParticipants,
  knownParticipants,
}: {
  displayParticipants: Participant[]
  remainingParticipants: number
  knownParticipants: Participant[]
}) => {
  if (knownParticipants.length === 0) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-neutral-500 md:gap-2 md:text-sm">
        <UsersIcon className="size-3.5 md:size-4" />
        <span>No participants</span>
      </div>
    )
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex -space-x-1.5 md:-space-x-2">
          {displayParticipants.map((participant, index) => (
            <ParticipantAvatar key={index} participant={participant} />
          ))}
          {remainingParticipants > 0 && (
            <div className="flex size-5 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-[8px] text-neutral-600 md:size-6 md:text-[10px]">
              +{remainingParticipants}
            </div>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 md:w-80">
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {knownParticipants.map((participant, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 rounded-lg border bg-neutral-50 p-1.5 md:gap-2 md:p-2"
            >
              <ParticipantAvatar participant={participant} />
              <span className="text-xs md:text-sm">{participant.name}</span>
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(date))
}

export const calculateDuration = (createdAt: Date, closedAt: Date) => {
  const duration = Math.ceil(
    (new Date(closedAt).getTime() - new Date(createdAt).getTime()) / (1000 * 60)
  )
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return hours > 0
    ? minutes > 0
      ? `${hours}h ${minutes}m`
      : `${hours}h`
    : `${minutes}m`
}

export const CreatedAtInfo = ({ createdAt }: { createdAt: Date }) => (
  <div className="flex items-center gap-1.5 text-xs text-neutral-600 md:gap-2 md:text-sm">
    <CalendarIcon className="size-3.5 md:size-4" />
    <span>{formatDate(createdAt)}</span>
  </div>
)

export const DurationInfo = ({
  createdAt,
  closedAt,
}: {
  createdAt: Date
  closedAt: Date
}) => (
  <div className="flex items-center gap-1.5 text-xs text-neutral-600 md:gap-2 md:text-sm">
    <TimerIcon className="size-3.5 md:size-4" />
    <span>{calculateDuration(createdAt, closedAt)}</span>
  </div>
)
