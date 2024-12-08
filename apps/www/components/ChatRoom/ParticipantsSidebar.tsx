import NumberFlow from '@number-flow/react'
import Image from 'next/image'

import { UsersIcon } from '../icons/animated/users'

import { useIdentityStore } from '@/app/store/useIdentityStore'
import { UserIdentity } from '@/types'

interface ParticipantsSidebarProps {
  participants: UserIdentity[]
}

export const ParticipantsSidebar = ({
  participants,
}: ParticipantsSidebarProps) => {
  const { userId } = useIdentityStore()

  return (
    <div className="chat-scroll h-full w-64 overflow-y-auto rounded-xl border border-neutral-200 bg-white">
      <div className="flex flex-col p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UsersIcon className="size-5" />
            <h2 className="text-sm font-medium">Participants</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              <NumberFlow value={participants.length} />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
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
                } p-2 transition-colors duration-300 ease-in-out`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    className="size-10 rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
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
