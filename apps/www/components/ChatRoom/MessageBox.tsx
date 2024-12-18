import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@echo/ui/components/ui/avatar.tsx'
import { LoadingSpinner } from '@echo/ui/icons/spinner.tsx'
import { Dot } from 'lucide-react'
import Image from 'next/image'

import { EmojiPickerPopover } from './EmojiPickerPopover'

import { useIdentityStore } from '@/app/store/useIdentityStore'

type Props = {
  userName: string
  avatar: string
  messageId: string
  reactions: Record<string, { id: string; name: string; avatar: string }[]>
  timestamp: Date
  message?: string
  userId: string
  prevMessageSender?: string
  image?: string

  sendReaction: (messageId: string, emoji: string) => void
}

const MessageBox = ({
  userName,
  avatar,
  timestamp,
  message,
  image,
  reactions,
  userId,
  prevMessageSender,
  messageId,
  sendReaction,
}: Props) => {
  const { userId: participantId } = useIdentityStore()
  const reactionArray = Object.entries(reactions).map(([emoji, users]) => ({
    emoji,
    users,
  }))
  const handleReaction = (emoji: string) => {
    sendReaction(messageId, emoji)
  }
  console.log(reactions)
  return (
    <div
      className={`flex items-start gap-3 px-6 ${userId == prevMessageSender ? 'pt-1' : 'pt-6'} ${userId === participantId ? 'flex-row-reverse justify-end' : 'justify-start'} z-40`}
    >
      {prevMessageSender !== userId ? (
        <Avatar className="size-8">
          <AvatarImage src={avatar} alt={`${userName}'s avatar`} />
          <AvatarFallback>
            <LoadingSpinner className="size-4" />
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="size-8" />
      )}

      <div
        className={`flex w-full flex-col ${userId === participantId ? 'items-end' : 'items-start'} justify-center`}
      >
        {prevMessageSender !== userId ? (
          <div className="flex items-center justify-center">
            <span className="text-xs font-medium">
              {userId === participantId ? 'You' : userName}
            </span>
            <Dot className="w-4 scale-110" />
            <span className="text-xs text-gray-500">
              {new Date(timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ) : null}
        <div
          className={`flex w-full flex-col ${userId === participantId ? 'items-end' : 'items-start'}`}
        >
          {' '}
          <div
            className={`group flex w-full items-center gap-3 ${userId === participantId ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`flex ${image ? 'w-80' : 'max-w-[70%]'} min-w-20 flex-col items-center justify-start text-start ${userId == prevMessageSender ? 'rounded-[14px]' : `${userId === participantId ? 'rounded-[14px] rounded-tr-none' : 'rounded-[14px] rounded-tl-none'}`} p-2 px-4 ${userId === participantId ? 'border-[1.5px] border-transparent bg-neutral-100' : 'border-[1.5px] border-neutral-200 bg-white'}`}
            >
              {' '}
              {image && (
                <Image
                  src={image}
                  alt="Message attachment"
                  className="mt-2 w-80 rounded-lg bg-white object-contain"
                />
              )}
              {message && <p className="text-sm">{message}</p>}
            </div>
            <div className="relative">
              <EmojiPickerPopover
                onEmojiSelect={handleReaction}
                side={userId === participantId ? 'left' : 'right'}
              />
            </div>
          </div>
          {reactionArray.length > 0 ? (
            <div className="z-50 mx-2 w-fit -translate-y-2 rounded-full border border-neutral-200 bg-white p-1.5">
              <div className="flex items-center justify-center gap-0.5">
                {reactionArray.slice(0, 3).map((reaction, i) => (
                  <span key={i} className="text-xs">
                    {reaction.emoji}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default MessageBox
