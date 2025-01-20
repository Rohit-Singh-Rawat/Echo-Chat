'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@echo/ui/components/ui/popover.tsx'
import { useState } from 'react'

import { EmojiPickerContent } from './EmojiPickerContent'
import { ReactionButton } from './ReactionButton'

interface EmojiPickerPopoverProps {
  userEmoji?: string
  onEmojiSelect: (emoji: string, currentEmoji?: string) => void
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const EmojiPickerPopover = ({
  onEmojiSelect,
  side = 'right',
  userEmoji,
}: EmojiPickerPopoverProps) => {
  const [open, setOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiSelect = (emoji: any) => {
    onEmojiSelect(emoji.native, userEmoji)
    setOpen(false)
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] cursor-default"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === ' ') {
              setOpen(false)
            }
          }}
          role="button"
          tabIndex={0}
        />
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <ReactionButton open={open} />
        </PopoverTrigger>
        <PopoverContent
          side={side}
          className="z-[101] border-none bg-transparent p-0 md:p-1 shadow-none"
        >
          <EmojiPickerContent
            userEmoji={userEmoji}
            onEmojiSelect={handleEmojiSelect}
            side={side}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
