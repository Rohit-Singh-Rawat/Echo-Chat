import { ArrowLeftToLine, CircleUser } from 'lucide-react'

import { useUserStore } from '@/app/store/UserStore'
import { UserButton } from '@/components/ChatRoom/UserButton'
import EchoLogo from '@/components/icons/animated/EchoLogo'
import { Button } from '@/components/shared/Button'

export const RoomHeader = ({ roomName }: { roomName: string }) => {
  const { user, isLoading } = useUserStore()
 
  return (
    <div className="row-span-1 flex w-full items-center justify-between px-7">
      <div className="flex justify-between gap-10">
        <EchoLogo />
        {isLoading ? (
          <CircleUser className="size-8 text-neutral-200" />
        ) : (
          <UserButton
            user={{
              avatar: user?.avatar ?? '',
              email: user?.email ?? '',
              name: user?.email ?? '',
            }}
          />
        )}
      </div>
      <h1 className="text-2xl font-semibold text-neutral-800">{roomName}</h1>
      <Button>
        <ArrowLeftToLine
          className="-ms-1 me-2 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        Exit
      </Button>
    </div>
  )
}
