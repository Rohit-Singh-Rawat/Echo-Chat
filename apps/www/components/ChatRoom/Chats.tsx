import MessageBox from './MessageBox'

type Props = {
  messages: {
    userName: string
    avatar: string
    timestamp: string
    message?: string
    image?: string
  }[]
}

const Chats = ({ messages }: Props) => {
  return (
    <div className="chat-scroll z-40 flex h-full flex-col gap-2 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <MessageBox
          key={index}
          userName={message.userName}
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
