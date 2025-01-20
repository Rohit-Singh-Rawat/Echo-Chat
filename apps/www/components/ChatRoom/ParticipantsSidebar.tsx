import NumberFlow from '@number-flow/react'
import Image from 'next/image'

import { useIdentityStore } from '@/app/store/useIdentityStore'
import { UserIdentity } from '@/types'

import { UsersIcon } from '../icons/animated/users'

interface ParticipantsSidebarProps {
  participants: UserIdentity[]
}

export const ParticipantsSidebar = ({
  participants,
}: ParticipantsSidebarProps) => {
  const { userId } = useIdentityStore()

  return (
    <div className="chat-scroll size-full max-w-[256px] overflow-y-auto rounded-xl border border-neutral-200 bg-white max-md:hidden sm:w-64">
      <div className="flex flex-col p-2 lg:p-4">
        <div className="mb-2 flex items-center justify-between sm:mb-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <UsersIcon className="size-3 sm:size-4 lg:size-5" />
            <h2 className="text-2xs font-medium sm:text-xs lg:text-sm">Participants</h2>
          </div>
          <div className="flex items-center">
            <span className="text-2xs text-gray-500 sm:text-xs lg:text-sm">
              <NumberFlow value={participants.length} />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:gap-2">
          {participants
            .sort((a, b) =>
              a.userId === userId ? -1 : b.userId === userId ? 1 : 0
            )
            .map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-lg ${
                  user.userId === userId
                    ? 'bg-blue-100 hover:bg-blue-200/70'
                    : 'bg-neutral-100 hover:bg-neutral-200/70'
                } p-1 transition-colors duration-300 ease-in-out sm:p-1.5 lg:p-2`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    className="size-6 rounded-full object-cover sm:size-7 lg:size-10"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <span className="truncate text-2xs font-medium sm:text-xs lg:text-sm">
                      {user.userId === userId
                        ? `${user.username} (You)`
                        : user.username}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
