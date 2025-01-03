'use client'

import Image from 'next/image'

interface NoRoomsFoundProps {
  title?: string
  description?: string
}

export function NoRoomsFound({
  title = 'No Rooms Found',
  description = 'No chat rooms were found matching your search criteria. Try adjusting your filters or search terms.',
}: NoRoomsFoundProps) {
  return (
    <div className="flex h-[500px] flex-col items-center justify-center gap-8  p-8">
      <div className="flex size-80 items-center justify-center rounded-full  transition-transform hover:scale-105">
        <Image
          src="/images/NoRoom.svg"
          alt="No chat rooms found"
          width={100}
          height={100}
          className="size-full "
        />
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="max-w-md text-base leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  )
}