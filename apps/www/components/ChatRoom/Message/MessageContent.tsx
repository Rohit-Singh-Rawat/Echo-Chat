import Image from 'next/image'

import { EmojiPickerPopover } from '../EmojiPickerPopover'

type MessageContentProps = {
  message?: string
  userEmoji?: string
  image?: string
  isOwnMessage: boolean
  isPrevMessageSameSender: boolean
  onReaction: (emoji: string) => void
}

export const MessageContent = ({
  message,
  image,
  userEmoji,
  isOwnMessage,
  isPrevMessageSameSender,
  onReaction,
}: MessageContentProps) => {
  return (
    <div
      className={`group flex w-full items-center gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className={`flex ${image ? 'w-80' : 'max-w-[70%]'} min-w-20 flex-col items-center justify-start text-start ${
          isPrevMessageSameSender
            ? 'rounded-[14px]'
            : `${isOwnMessage ? 'rounded-[14px] rounded-tr-none' : 'rounded-[14px] rounded-tl-none'}`
        } p-2 px-4 ${
          isOwnMessage
            ? 'border-[1.5px] border-transparent bg-neutral-100'
            : 'border-[1.5px] border-neutral-200 bg-white'
        }`}
      >
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
          userEmoji={userEmoji}
          onEmojiSelect={onReaction}
          side={isOwnMessage ? 'left' : 'right'}
        />
      </div>
    </div>
  )
}
