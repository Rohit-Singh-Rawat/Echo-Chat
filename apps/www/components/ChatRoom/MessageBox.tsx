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
      className={`flex items-start gap-3 p-6 ${userName === 'You' ? 'flex-row-reverse' : ''}`}
    >
      <img
        src={avatar}
        alt={`${userName}'s avatar`}
        className="size-8 rounded-full object-cover"
      />
      <div
        className={`flex max-w-[70%] translate-y-5 flex-col rounded-3xl p-5 ${userName === 'You' ? 'rounded-tr-none bg-blue-100' : 'rounded-tl-none bg-neutral-200'}`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">{userName}</span>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        {message && <p className="mt-1 text-sm">{message}</p>}
        {image && (
          <img
            src={image}
            alt="Message attachment"
            className="mt-2 max-h-20 rounded-lg object-contain"
          />
        )}
      </div>
    </div>
  )
}

export default MessageBox
