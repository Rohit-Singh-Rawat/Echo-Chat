import { AnimatePresence, motion } from 'framer-motion'

import { useIdentityStore } from '@/app/store/useIdentityStore'

import { MessageAvatar } from './Message/MessageAvatar'
import { MessageContent } from './Message/MessageContent'
import { MessageHeader } from './Message/MessageHeader'

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
  sendReaction: (
    messageId: string,
    emoji: string,
    currentEmoji?: string
  ) => void
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

  const handleReaction = (emoji: string, currentEmoji?: string) => {
    sendReaction(messageId, emoji, currentEmoji)
  }

  return (
    <div
      className={`flex items-start gap-1.5 px-2 md:gap-3 md:px-6 ${
        userId == prevMessageSender ? 'pt-0.5 md:pt-1' : 'pt-3 md:pt-6'
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
          className={`relative min-h-[24px] md:min-h-[30px] ${totalReactions > 0 ? 'mb-3 md:mb-5' : ''} w-full ${
            isOwnMessage ? 'items-end' : 'items-start'
          }`}
        >
          <MessageContent
            userEmoji={userEmoji}
            message={message}
            image={image}
            isOwnMessage={isOwnMessage}
            isPrevMessageSameSender={userId === prevMessageSender}
            onReaction={handleReaction}
            reactions={reactionsList}
            totalReactions={totalReactions}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default MessageBox
