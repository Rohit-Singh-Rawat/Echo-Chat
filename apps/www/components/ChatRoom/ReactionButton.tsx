'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@echo/ui/components/ui/tooltip.tsx'

import Emoji from '../icons/animated/Emoji'

interface ReactionButtonProps {
  onReact: (emoji: string) => void
}

const EMOJI_LIST = ['👍', '❤️', '😂', '😮', '😢', '😡']

export const ReactionButton = ({ onReact }: ReactionButtonProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="transition-ease rounded-full p-0.5 opacity-0 hover:bg-gray-100 group-hover:opacity-100"
            aria-label="Add reaction"
          >
            <Emoji className="size-5 fill-gray-500" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          className="flex gap-1 rounded-full border border-neutral-50 bg-white p-2"
          showArrow={true}
        >
          {EMOJI_LIST.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onReact(emoji)}
              className="transition-transform hover:scale-125 focus:scale-125 focus:outline-none"
            >
              <span className="text-lg">{emoji}</span>
            </button>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
