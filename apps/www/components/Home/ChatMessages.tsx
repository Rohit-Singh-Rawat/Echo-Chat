'use client'

import { cn } from '@echo/utils/src'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import React, { useRef } from 'react'

type MessageProps = {
  content: string
  isSent: boolean
  delay: number
  avatar?: string
  reactions?: string[]
}

const Message = ({
  content,
  isSent,
  delay,
  avatar,
  reactions,
}: MessageProps) => {
  // Correct usage of useRef and useInView
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div className="mb-4 flex items-end gap-2" ref={ref}>
      {isInView && (
        <>
          {!isSent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay }}
              className="size-8 shrink-0 overflow-hidden rounded-full"
            >
              <Image
                src="/images/RohitSinghRawat.jpg"
                alt="Avatar"
                width={50}
                height={50}
              />
            </motion.div>
          )}
          <div className="relative w-full">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: -5, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay }}
              className={cn(
                'w-fit max-w-[80%] rounded-2xl px-4 py-2',
                isSent
                  ? 'ml-auto rounded-br-none bg-gray-100'
                  : 'rounded-bl-none border-[1.5px] border-neutral-200 bg-slate-50/50 text-gray-900'
              )}
            >
              {content}
            </motion.div>
            {reactions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(2px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.3,
                  delay: delay + 1.5,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                className="flex-center absolute left-2 top-[40%] mt-2 size-6 rounded-2xl border border-neutral-200 bg-white"
              >
                {reactions.map((reaction, index) => (
                  <span key={index} className="size-4 text-xs">
                    {reaction}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
          {isSent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay }}
              className="size-8 shrink-0 overflow-hidden rounded-full"
            >
              <Image
                src="/images/eren.jpg"
                alt="Avatar"
                width={50}
                height={50}
              />
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}

const messages = [
  {
    content: 'Are you a fan of Attack on Titan?',
    isSent: false,
  },
  {
    content: 'Yes! Have you checked out Echo?',
    isSent: true,
  },
  {
    content: 'No, what is Echo?',
    isSent: false,
  },
  {
    content: 'Echo is a chat application. We can talk about AOT there.',
    isSent: true,
  },
  {
    content: 'That sounds cool!',
    isSent: false,
    reactions: ['👍'],
  },
  {
    content: 'Yes, it is!',
    isSent: true,
  },
]

const ChatMessages = () => {
  return (
    <div className="relative z-10">
      {messages.map((message, index) => (
        <Message
          key={index}
          content={message.content}
          isSent={message.isSent}
          delay={index * 1 + 0.5}
          reactions={message.reactions}
        />
      ))}
    </div>
  )
}

export default ChatMessages
