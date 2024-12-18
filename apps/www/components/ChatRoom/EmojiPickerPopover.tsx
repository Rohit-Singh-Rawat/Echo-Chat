'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@echo/ui/components/ui/popover.tsx'
import { LoadingSpinner } from '@echo/ui/icons/spinner.tsx'
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react'
import { Suspense, useState } from 'react'

import { ReactionButton } from './ReactionButton'

interface EmojiPickerPopoverProps {
  onEmojiSelect: (emoji: string) => void
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const EmojiPickerPopover = ({
  onEmojiSelect,
  side = 'right',
}: EmojiPickerPopoverProps) => {
  const [open, setOpen] = useState(false)

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    console.log(emojiData)
    onEmojiSelect(emojiData.emoji)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <ReactionButton open={open} />
      </PopoverTrigger>
      <PopoverContent
        side={side}
        className={`w-fit scale-75 border-none bg-transparent p-0 shadow-none ${side === 'left' ? 'translate-x-6' : side === 'right' ? '-translate-x-6' : ''}`}
      >
        <Suspense fallback={<LoadingSpinner className="m-4" />}>
          <EmojiPicker
            emojiStyle={EmojiStyle.GOOGLE}
            onEmojiClick={handleEmojiClick}
            reactions={['1f44d', '2764-fe0f', '1f602', '1f622', '1f64f']}
            reactionsDefaultOpen
            onReactionClick={handleEmojiClick}
            allowExpandReactions
            width={320}
            height={400}
          />
        </Suspense>
      </PopoverContent>
    </Popover>
  )
}
