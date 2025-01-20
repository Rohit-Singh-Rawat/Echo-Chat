import { LoadingSpinner } from '@echo/ui/icons/spinner.tsx'

import { UserButton } from '@/components/ChatRoom/UserButton'
import EchoLogo from '@/components/icons/animated/EchoLogo'
import { LogoutIcon } from '@/components/icons/LogoutIcon'
import { Button } from '@/components/shared/Button'
import { useUser } from '@/hooks/useSession'

import Countdown from './Countdown'
import Echo from '../icons/Echo'
import { EchoLoading } from '../ui/EchoLoading'
import { AudioLines } from 'lucide-react'

export const RoomHeader = ({
  roomName,
  timeLeft,
  handleExit,
}: {
  roomName: string
  handleExit: () => void
  timeLeft: Date
}) => {
  const { data, isLoading } = useUser()

  // Desktop view
  const DesktopHeader = () => (
    <div className="row-span-1 hidden w-full items-center justify-between px-7 md:flex">
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
      <Button className="group" onClick={handleExit}>
        Leave{' '}
        <LogoutIcon
          size={16}
          className="transition-ease -me-1 opacity-60 group-hover:scale-105 group-hover:opacity-100"
          aria-hidden="true"
        />
      </Button>
    </div>
  )

  const MobileHeader = () => (
    <div className="row-span-1 flex w-full items-center justify-between px-4 md:hidden">
      <div className="flex items-center gap-4">
        <Button className="size-8 rounded-full">
          <AudioLines className="size-10 invert-0" />
        </Button>
      </div>
      <h1 className="max-w-[150px] truncate text-xl px-2 font-semibold text-neutral-800">
        ffni enifkdnnnnndkne{roomName}
      </h1>
      <div className="flex-center gap-5">
        <div className="flex-center h-8 w-24 rounded-2xl border-2 border-black">
          <Countdown endDate={timeLeft} />
        </div>
        <Button
          className="flex-center group size-8 rounded-full p-2"
          onClick={handleExit}
        >
          <LogoutIcon
            size={14}
            className="transition-ease -translate-x-px opacity-60 group-hover:scale-105 group-hover:opacity-100 max-md:size-4"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  )
}
