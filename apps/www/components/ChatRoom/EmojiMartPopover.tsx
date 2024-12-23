'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@echo/ui/components/ui/popover.tsx'
import { LoadingSpinner } from '@echo/ui/icons/spinner.tsx'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Suspense, useState } from 'react'

import { ReactionButton } from './ReactionButton'

interface EmojiMartPopoverProps {
  onEmojiSelect: (emoji: string) => void
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const EmojiMartPopover = ({
  onEmojiSelect,
  side = 'right',
}: EmojiMartPopoverProps) => {
  const [open, setOpen] = useState(false)

  const handleEmojiSelect = (emoji: { native: string }) => {
    onEmojiSelect(emoji.native)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <ReactionButton open={open} />
      </PopoverTrigger>
      <PopoverContent
        side={side}
        className={`w-fit scale-75 border-none bg-transparent p-0 shadow-none ${
          side === 'left'
            ? 'translate-x-6'
            : side === 'right'
              ? '-translate-x-6'
              : ''
        }`}
      >
        <Suspense fallback={<LoadingSpinner className="m-4" />}>
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            previewPosition="none"
            skinTonePosition="none"
            defaultSkinTone={1}
            theme="light"
            set="google"
            categories={['frequent', 'people', 'nature', 'foods', 'activity']}
          />
        </Suspense>
      </PopoverContent>
    </Popover>
  )
}
