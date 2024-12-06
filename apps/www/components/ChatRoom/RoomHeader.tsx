import { ArrowLeftToLine } from 'lucide-react'

import { UserButton } from '@/components/ChatRoom/UserButton'
import EchoLogo from '@/components/icons/animated/EchoLogo'
import { Button } from '@/components/shared/Button'

export const RoomHeader = () => {
  return (
    <div className="row-span-1 flex w-full items-center justify-between px-7">
      <div className="flex justify-between gap-10">
        <EchoLogo />
        <UserButton />
      </div>
      <h1 className="text-2xl font-semibold text-neutral-800">
        This is Room Title
      </h1>
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
