'use client'

import Image from 'next/image'

import { Reaction } from '@/types'

import { MessageReactions } from '../ChatRoom/Message/MessageReactions'

type HistoryMessageContentProps = {
  message?: string
  image?: string
  isOwnMessage: boolean
  isPrevMessageSameSender: boolean
  reactions: Reaction[]
  totalReactions: number
}

export function HistoryMessageContent({
  message,
  image,
  isOwnMessage,
  isPrevMessageSameSender,
  reactions,
  totalReactions,
}: HistoryMessageContentProps) {
  return (
    <div
      className={`group flex w-full items-center gap-2 md:gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`${image ? 'w-60 md:w-80' : 'max-w-[70%]'} relative`}>
        <div
          className={`flex w-full min-w-16 flex-col items-center justify-start overflow-hidden text-ellipsis text-wrap text-start md:min-w-20 ${
            isPrevMessageSameSender
              ? 'rounded-[14px]'
              : `${isOwnMessage ? 'rounded-[14px] rounded-tr-none' : 'rounded-[14px] rounded-tl-none'}`
          } p-1.5 px-3 md:p-2 md:px-4 ${
            isOwnMessage
              ? 'border-[1.5px] border-transparent bg-neutral-100'
              : 'border-[1.5px] border-neutral-200 bg-white'
          }`}
        >
          {image && (
            <Image
              src={image}
              alt="Message attachment"
              className="mt-1 w-60 rounded-lg bg-white object-contain md:mt-2 md:w-80"
              width={640}
              height={640}
            />
          )}
          {message && (
            <p className="max-w-[48ch] break-words text-xs md:text-sm">
              {message}
            </p>
          )}
        </div>
        <MessageReactions
          reactions={reactions}
          totalReactions={totalReactions}
          side={isOwnMessage ? 'left' : 'right'}
        />
      </div>
    </div>
  )
}
