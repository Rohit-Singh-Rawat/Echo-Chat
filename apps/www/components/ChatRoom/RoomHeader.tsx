import { LoadingSpinner } from '@echo/ui/icons/spinner.tsx'
import { ArrowLeftToLine } from 'lucide-react'

import { UserButton } from '@/components/ChatRoom/UserButton'
import EchoLogo from '@/components/icons/animated/EchoLogo'
import { Button } from '@/components/shared/Button'
import { useUser } from '@/hooks/useSession'

export const RoomHeader = ({ roomName }: { roomName: string }) => {
  const { data, isLoading } = useUser()
  return (
    <div className="row-span-1 flex w-full items-center justify-between px-7">
      <div className="flex justify-between gap-10">
        <EchoLogo />
        {isLoading ? (
          <div className="flex items-center justify-center rounded-full border border-neutral-200 bg-neutral-300 p-1">
            <LoadingSpinner className="size-4 -translate-x-px text-neutral-200" />
          </div>
        ) : (
          <UserButton
            user={
              data?.user
                ? {
                    avatar: data.user.image,
                    email: data.user.email,
                    name: data.user.email,
                    isPro: data.user.subscription?.isPro ?? false,
                  }
                : undefined
            }
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
