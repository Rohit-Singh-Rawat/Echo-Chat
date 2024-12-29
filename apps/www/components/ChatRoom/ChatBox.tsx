import GridPattern from '@echo/ui/components/ui/GridPattern.tsx'
import { cn } from '@echo/utils/src'

import { Message } from '@/types'

import ChatBoxInput from './ChatBoxInput'
import Chats from './Chats'

interface ChatBoxProps {
  messages: Message[]
  sendMessage: (content: string) => void
  sendReaction: (
    messageId: string,
    emoji: string,
    currentEmoji?: string
  ) => void
}

const ChatBox = ({ messages, sendMessage, sendReaction }: ChatBoxProps) => {
  return (
    <div className="relative size-full flex-1 rounded-xl border border-neutral-200 bg-white p-2">
      {' '}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={'4 2'}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_left,white,transparent_70%)]',
          '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
          'fill-neutral-400/30 stroke-neutral-400/20'
        )}
      />
      <div className="relative h-[calc(100%-10px)] flex-1 overflow-hidden pb-12">
        <Chats
          sendReaction={sendReaction}
          messages={messages.map((message) => ({
            id: message.id,
            image: message?.image,
            reactions: message.reactions,
            username: message.username,
            avatar: message.avatar,
            sentAt: message.sentAt,
            content: message.content,
            userEmoji: message.userEmoji,
            userId: message.userId,
          }))}
        />
      </div>
      <ChatBoxInput sendMessage={sendMessage} />
    </div>
  )
}

export default ChatBox
