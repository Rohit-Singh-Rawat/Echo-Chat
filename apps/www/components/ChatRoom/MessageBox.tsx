import { Dot } from 'lucide-react'
import Image from 'next/image'

import { useIdentityStore } from '@/app/store/useIdentityStore'

type Props = {
  userName: string
  avatar: string
  timestamp: Date
  message?: string
  userId: string
  prevMessageSender?: string
  image?: string
}

const MessageBox = ({
  userName,
  avatar,
  timestamp,
  message,
  image,
  userId,
  prevMessageSender,
}: Props) => {
  const { userId: participantId } = useIdentityStore()
  console.log(prevMessageSender, participantId)

  return (
    <div
      className={`flex items-start gap-3 px-6 ${userId == prevMessageSender ? 'pt-1' : 'pt-6'} ${userId === participantId ? 'flex-row-reverse justify-end' : 'justify-start'} z-40`}
    >
      {prevMessageSender !== userId ? (
        <Image
          src={avatar}
          alt={`${userName}'s avatar`}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="size-8" />
      )}

      <div
        className={`flex w-full flex-col ${userId === participantId ? 'items-end' : 'items-start'} justify-center`}
      >
        {prevMessageSender !== userId ? (
          <div className="flex items-center justify-center gap-1">
            <span className="font-medium">
              {userId === participantId ? 'you' : userName}
            </span>
            <Dot />
            <span className="text-xs text-gray-500">
              {new Date(timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ) : null}
        <div
          className={`flex ${image ? 'w-80' : 'max-w-[70%]'} flex-col items-center justify-center ${userId == prevMessageSender ? 'rounded-2xl' : `${userId === participantId ? 'rounded-2xl rounded-tr-none' : 'rounded-2xl rounded-tl-none'}`} p-2 px-4 ${userId == prevMessageSender ? '' : 'pb-3.5'} ${userId === participantId ? 'border-[1.5px] bg-neutral-100' : 'border-[1.5px] border-neutral-200 bg-white'}`}
        >
          {' '}
          {image && (
            <Image
              src={image}
              alt="Message attachment"
              className="mt-2 w-80 rounded-lg bg-white object-contain"
            />
          )}
          {message && <p className="mt-1 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default MessageBox
