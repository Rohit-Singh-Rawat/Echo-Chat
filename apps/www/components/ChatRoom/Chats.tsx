import { AnimatePresence, motion } from 'framer-motion'

import MessageBox from './MessageBox'

import useChatScroll from '@/hooks/useChatScroll'
import { Message } from '@/types'

type Props = {
  messages: Message[]
  sendReaction: (messageId: string, emoji: string) => void
}

const Chats = ({ messages, sendReaction }: Props) => {
  const ref = useChatScroll(messages)

  return (
    <div
      className="chat-scroll z-40 flex h-full flex-col overflow-y-auto scroll-smooth p-4"
      ref={ref}
    >
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            layout
          >
            <MessageBox
              reactions={message.reactions}
              sendReaction={sendReaction}
              prevMessageSender={
                index > 0 ? messages[index - 1]?.userId : undefined
              }
              userName={message.username}
              messageId={message.id}
              userId={message.userId}
              avatar={message.avatar}
              timestamp={message.sentAt}
              message={message.content}
              image={message.image}
              userEmoji={message.userEmoji}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Chats
