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
      <motion.div>
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 0.8, translateX: -50 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
              }}
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
            <motion.div
              key="collapsed"
              className="flex h-fit items-center gap-1 border bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                borderRadius: isExpanded ? '0.75rem' : '9999px',
                padding: isExpanded ? '0' : '0.25rem',
                width: isExpanded ? '100%' : 'auto',
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <motion.div
                className="flex h-12 items-center gap-1 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.2,
                  ease: 'easeInOut',
                }}
              >
                {PRESET_REACTIONS.map((emoji, index) => (
                  <motion.div
                    key={emoji}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.15,
                      delay: index * 0.03,
                      ease: 'easeInOut',
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`hover:bg-muted size-8 rounded-full p-0 transition-colors duration-200 ${userEmoji === emoji ? 'bg-blue-100' : ''}`}
                      onClick={() => onEmojiSelect({ native: emoji })}
                    >
                      <span className="text-lg">{emoji}</span>
                    </Button>
                  </motion.div>
                ))}
                <motion.div
                  className="bg-border mx-1 h-5 w-px"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.15,
                    delay: 0.18,
                    ease: 'easeInOut',
                  }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`hover:bg-muted size-8 rounded-full p-0 transition-colors duration-200 ${userEmoji && !PRESET_REACTIONS.includes(userEmoji) ? 'bg-blue-100' : ''}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {userEmoji && !PRESET_REACTIONS.includes(userEmoji) ? (
                      <span className="text-lg">{userEmoji}</span>
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
