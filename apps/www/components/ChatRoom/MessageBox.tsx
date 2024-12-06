import { Dot } from 'lucide-react'

type Props = {
  userName: string
  avatar: string
  timestamp: string
  message?: string
  image?: string
}

const MessageBox = ({ userName, avatar, timestamp, message, image }: Props) => {
  return (
    <div
      className={`flex items-start gap-3 p-6 ${userName === 'You' ? 'flex-row-reverse justify-end' : 'justify-start'} z-40`}
    >
      <img
        src={avatar}
        alt={`${userName}'s avatar`}
        className="size-8 rounded-full object-cover"
      />{' '}
      <div
        className={`flex w-full flex-col ${userName === 'You' ? 'items-end' : 'items-start'} justify-center`}
      >
        <div className="flex items-center justify-center gap-1">
          <span className="font-medium">{userName}</span>
          <Dot />
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <div
          className={`flex ${image ? 'w-80' : 'max-w-[70%]'} flex-col items-center justify-center rounded-2xl p-2 px-4 ${userName === 'You' ? 'rounded-tr-none border bg-neutral-100' : 'rounded-tl-none border border-neutral-200 bg-white'}`}
        >
          {' '}
          {image && (
            <img
              src={image}
              alt="Message attachment"
              className="mt-2 w-80 rounded-lg object-contain"
            />
          )}
          {message && <p className="mt-1 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default MessageBox
