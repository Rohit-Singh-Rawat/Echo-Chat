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
    <div className="flex h-[300px] flex-col items-center justify-center gap-4 p-4 md:h-[500px] md:gap-8 md:p-8">
      <div className="flex size-40 items-center justify-center rounded-full transition-transform hover:scale-105 md:size-80">
        <Image
          src="/images/NoRoom.svg"
          alt="No chat rooms found"
          width={100}
          height={100}
          className="size-full"
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center md:gap-3">
        <h3 className="text-xl font-bold text-gray-800 md:text-2xl">{title}</h3>
        <p className="max-w-xs text-sm leading-relaxed text-gray-600 md:max-w-md md:text-base">
          {description}
        </p>
      </div>
    </div>
  )
}
