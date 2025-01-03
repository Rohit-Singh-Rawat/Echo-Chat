'use client'

import { format } from 'date-fns'

import { Reaction } from '@/types'

import { MessageAvatar } from '../ChatRoom/Message/MessageAvatar'

import { HistoryMessageContent } from './HistoryMessageContent'

interface HistoryMessageProps {
  message: {
    id: string
    username: string
    avatar: string
    content: string
    image?: string
    sentAt: Date
    userId: string
    reactions: Reaction[]
    totalReactions: number
  }
  isPrevMessageSameSender: boolean
  isOwnMessage: boolean
}

export function HistoryMessage({
  message,
  isPrevMessageSameSender,
  isOwnMessage,
}: HistoryMessageProps) {
  return (
    <div
      className={`group relative flex items-start gap-3 ${
        isOwnMessage ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <MessageAvatar
        avatar={message.avatar}
        userName={message.username}
        showAvatar={!isPrevMessageSameSender}
      />

      <div className={`flex-1 ${message.totalReactions > 0 ? 'mb-5' : ''}`}>
        {/* Header - only show if different sender */}
        {!isPrevMessageSameSender && (
          <div
            className={`mb-1 flex items-center gap-2 ${
              isOwnMessage ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <span className="text-sm font-medium">{message.username}</span>
            <span className="text-xs text-neutral-500">
              {format(message.sentAt, 'h:mm a')}
            </span>
          </div>
        )}

        <HistoryMessageContent
          message={message.content}
          image={message.image}
          isOwnMessage={isOwnMessage}
          isPrevMessageSameSender={isPrevMessageSameSender}
          reactions={message.reactions}
          totalReactions={message.totalReactions}
        />
      </div>
    </div>
  )
}
