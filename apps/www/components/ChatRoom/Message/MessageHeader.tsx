import { Dot } from 'lucide-react'

type MessageHeaderProps = {
  isOwnMessage: boolean
  userName: string
  timestamp: Date
}

export const MessageHeader = ({
  isOwnMessage,
  userName,
  timestamp,
}: MessageHeaderProps) => {
  return (
    <div className="flex items-center justify-center">
      <span className="text-xs font-medium">
        {isOwnMessage ? 'You' : userName}
      </span>
      <Dot className="w-4 scale-110" />
      <span className="text-xs text-gray-500">
        {new Date(timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </div>
  )
}
