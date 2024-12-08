import { AnimatePresence, motion } from 'framer-motion'

import MessageBox from './MessageBox'

import useChatScroll from '@/hooks/useChatScroll'

type Props = {
  messages: {
    userName: string
    avatar: string
    timestamp: Date
    message: string
    image?: string
    userId: string
  }[]
}

const Chats = ({ messages }: Props) => {
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
              prevMessageSender={
                index > 0 ? messages[index - 1]?.userId : undefined
              }
              userName={message.userName}
              userId={message.userId}
              avatar={message.avatar}
              timestamp={message.timestamp}
              message={message.message}
              image={message.image}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Chats
