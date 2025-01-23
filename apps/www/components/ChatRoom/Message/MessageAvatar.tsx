import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@echo/ui/components/ui/avatar.tsx'
import { LoadingSpinner } from '@echo/ui/icons/spinner.tsx'

type MessageAvatarProps = {
  avatar: string
  userName: string
  showAvatar: boolean
}

export const MessageAvatar = ({
  avatar,
  userName,
  showAvatar,
}: MessageAvatarProps) => {
  if (!showAvatar) {
    return <div className="size-8 md:size-10" />
  }

  return (
    <Avatar className="size-8">
      <AvatarImage src={avatar} alt={`${userName}'s avatar`} />
      <AvatarFallback>
        <LoadingSpinner className="size-4 md:size-5" />
      </AvatarFallback>
    </Avatar>
  )
}
