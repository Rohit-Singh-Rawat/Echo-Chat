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
      {messages.map((message, index) => (
        <MessageBox
          key={index}
          prevMessageSender={
            index > 0 ? messages[index - 1]?.userName : undefined
          }
          userName={message.userName}
          userId={message.userId}
          avatar={message.avatar}
          timestamp={message.timestamp}
          message={message.message}
          image={message.image}
        />
      ))}
    </div>
  )
}

export default Chats
