'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import Picker from '@emoji-mart/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface EmojiPickerContentProps {
  userEmoji?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEmojiSelect: (emoji: any) => void
  side?: 'top' | 'right' | 'bottom' | 'left'
}
const PRESET_REACTIONS = ['👍', '❤️', '😂', '😢', '🙏']

export const EmojiPickerContent = ({
  onEmojiSelect,
  userEmoji,
  side = 'right',
}: EmojiPickerContentProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`z-[99999] w-fit scale-75 ${
        side === 'left'
          ? 'translate-x-6'
          : side === 'right'
            ? '-translate-x-6'
            : ''
      }`}
    >
      <motion.div
        className={`flex items-center gap-1 border bg-white ${isExpanded ? 'w-full rounded-xl' : 'w-auto rounded-full p-1'} ease transition-all`}
        initial={{ opacity: 0, filter: 'blur(5px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(5px)' }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="popLayout">
          {isExpanded ? (
            <motion.div
              initial={{ scale: 0, filter: 'blur(8px)' }}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1 }}
            >
              <Picker
                onEmojiSelect={onEmojiSelect}
                previewPosition="none"
                skinTonePosition="none"
                defaultSkinTone={1}
                theme="light"
                set="google"
              />
            </motion.div>
          ) : (
            <motion.div className="flex h-12 items-center gap-1">
              {PRESET_REACTIONS.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  className={`hover:bg-muted size-8 rounded-full p-0 ${userEmoji === emoji ? 'bg-blue-100' : ''}`}
                  onClick={() => onEmojiSelect(emoji)}
                >
                  <span className="text-lg">{emoji}</span>
                </Button>
              ))}
              <div className="bg-border mx-1 h-5 w-px" />
              <Button
                variant="ghost"
                size="sm"
                className={`hover:bg-muted size-8 rounded-full p-0 ${userEmoji && !PRESET_REACTIONS.includes(userEmoji) ? 'bg-blue-100' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {userEmoji && !PRESET_REACTIONS.includes(userEmoji) ? (
                  <span className="text-lg">{userEmoji}</span>
                ) : (
                  <Plus className="size-4" />
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
