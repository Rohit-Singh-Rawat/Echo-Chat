import { AnimatePresence, motion } from 'framer-motion'

import { MessageAvatar } from './Message/MessageAvatar'
import { MessageContent } from './Message/MessageContent'
import { MessageHeader } from './Message/MessageHeader'
import { MessageReactions } from './Message/MessageReactions'

import { useIdentityStore } from '@/app/store/useIdentityStore'

type Props = {
  userName: string
  avatar: string
  messageId: string
  reactions: Record<string, { id: string; name: string; avatar: string }[]>
  timestamp: Date
  message?: string
  userId: string
  prevMessageSender?: string
  userEmoji?: string
  image?: string
  sendReaction: (messageId: string, emoji: string) => void
}

const MessageBox = ({
  userName,
  avatar,
  userEmoji,
  timestamp,
  message,
  image,
  reactions,
  userId,
  prevMessageSender,
  messageId,
  sendReaction,
}: Props) => {
  const { userId: participantId } = useIdentityStore()
  const isOwnMessage = userId === participantId
  const showAvatar = prevMessageSender !== userId

  const reactionsList = Object.entries(reactions).map(([emoji, users]) => ({
    emoji,
    total: users.length,
    users: users,
  }))
  const totalReactions = reactionsList.reduce(
    (acc, curr) => acc + curr.total,
    0
  )

  const handleReaction = (emoji: string) => {
    sendReaction(messageId, emoji)
  }

  return (
    <div
      className={`flex items-start gap-3 px-6 ${
        userId == prevMessageSender ? 'pt-1' : 'pt-6'
      } ${isOwnMessage ? 'flex-row-reverse justify-end' : 'justify-start'} z-40`}
    >
      <MessageAvatar
        avatar={avatar}
        userName={userName}
        showAvatar={showAvatar}
      />

      <div
        className={`flex w-full flex-col ${
          isOwnMessage ? 'items-end' : 'items-start'
        } justify-center`}
      >
        {showAvatar && (
          <MessageHeader
            isOwnMessage={isOwnMessage}
            userName={userName}
            timestamp={timestamp}
          />
        )}

        <motion.div
          layout
          className={`flex min-h-[30px] w-full flex-col ${
            isOwnMessage ? 'items-end' : 'items-start'
          }`}
        >
          <AnimatePresence mode="popLayout">
            <MessageContent
              userEmoji={userEmoji}
              message={message}
              image={image}
              isOwnMessage={isOwnMessage}
              isPrevMessageSameSender={userId === prevMessageSender}
              onReaction={handleReaction}
            />

            <MessageReactions
              reactions={reactionsList}
              totalReactions={totalReactions}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default MessageBox
