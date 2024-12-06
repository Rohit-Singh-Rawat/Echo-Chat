import NumberFlow from '@number-flow/react'

import { UsersIcon } from '../icons/animated/users'
export const ParticipantsSidebar = () => {
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
              <NumberFlow value={2} />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {Array.from({ length: 101 }, (_, i) => ({
            name: `User ${i}`,
            image: `https://avatar.iran.liara.run/public/${i}`,
          })).map((person) => (
            <div
              key={person.name}
              className="flex items-center justify-between rounded-lg bg-neutral-100 p-2 transition-colors duration-300 ease-in-out hover:bg-neutral-200/70"
            >
              <div className="flex items-center gap-3">
                <img
                  src={person.image}
                  alt={person.name}
                  className="size-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{person.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
