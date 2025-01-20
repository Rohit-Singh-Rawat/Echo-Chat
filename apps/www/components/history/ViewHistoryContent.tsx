'use client'

import { ScrollArea } from '@echo/ui/components/ui/scroll-area.tsx'
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useState } from 'react'

import { getRoomHistory } from '@/lib/actions/RoomActions'
import { Message } from '@/types'

import { Message2Icon } from '../icons/message-2'

import { HistoryMessage } from './HistoryMessage'
import { HistoryMessageSkeleton } from './HistoryMessageSkeleton'

interface ViewHistoryContentProps {
  roomId: string
}

export function ViewHistoryContent({ roomId }: ViewHistoryContentProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const { execute, status } = useAction(getRoomHistory, {
    onSuccess: (result) => {
      setMessages(result.data || [])
    },
  })

  useEffect(() => {
    execute({ roomId })
  }, [roomId, execute])

  if (status === 'executing') {
    return (
      <ScrollArea className="h-[600px] md:p-4">
        <div className="">
          {Array.from({ length: 8 }).map((_, index) => (
            <HistoryMessageSkeleton
              key={index}
              isPrevMessageSameSender={index > 0 && index % 2 === 0}
            />
          ))}
        </div>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className="rounded-md md:p-4 h-[600px]">
      <div className="space-y-2">
        {messages.map((message, index) => (
          <HistoryMessage
            key={message.id}
            message={{
              id: message.id,
              username: message.username,
              image: message.image,
              avatar: message.avatar || '/avatars/default.png',
              content: message.content,
              sentAt: new Date(message.sentAt),
              userId: message.userId,
              reactions: Object.entries(message.reactions || {}).map(
                ([emoji, users]) => ({
                  emoji,
                  total: users.length,
                  users: users,
                })
              ),
              totalReactions: Object.values(message.reactions || {}).reduce(
                (acc, users) => acc + users.length,
                0
              ),
            }}
            isPrevMessageSameSender={
              index > 0 && messages[index - 1]?.userId === message.userId
            }
            isOwnMessage={false}
          />
        ))}
        {messages.length === 0 && (
          <div className="flex h-[300px] flex-col items-center justify-center gap-4 md:h-[500px]">
            <div className="flex size-16 items-center justify-center rounded-full bg-neutral-100 md:size-20">
              <Message2Icon className="size-8 text-neutral-400 md:size-10" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-base font-semibold text-neutral-700 md:text-lg">
                No messages yet
              </h3>
              <p className="text-xs text-neutral-500 md:text-sm">
                This chat history is empty
              </p>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
