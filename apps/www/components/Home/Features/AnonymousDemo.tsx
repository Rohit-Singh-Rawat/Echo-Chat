import Image from 'next/image'

import AnonymousIcon from '@/components/icons/AnonymousIcon'
import { UserIcon } from '@/components/icons/UserIcon'

const AnonymousDemo = () => {
  const items = [
    { type: 'user', image: '/images/eren.jpg' },
    { type: 'empty' },
    { type: 'user' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'user', image: '/images/RohitSinghRawat.jpg' },
    { type: 'user' },
    { type: 'empty' },
    { type: 'user' },
  ]

  return (
    <div className="group relative">
      <div className="relative flex min-h-40 flex-1 select-none items-center justify-center">
        <div className="grid grid-cols-3 gap-2 p-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg p-1 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-md"
            >
              <div className="relative overflow-hidden rounded bg-gradient-to-br from-gray-100/30 to-gray-100/20">
                {item.type === 'user' ? (
                  <div className="flex h-20 w-16 items-center justify-center">
                    {item.image ? (
                      <div className="size-full">
                        <Image
                          src={item.image}
                          alt="User"
                          width={120}
                          height={120}
                          className="grayscale-100 size-full rounded-lg object-cover group-hover:grayscale-0"
                        />
                      </div>
                    ) : (
                      <div className="flex size-10 items-center justify-center">
                        <UserIcon className="size-7 text-gray-400" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-20 w-16 animate-pulse bg-gray-200" />
                )}
                <div className="absolute inset-0 rounded ring-1 ring-inset ring-black/5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-center pointer-events-none absolute inset-x-0 bottom-0 z-40 size-full bg-gradient-to-t from-white via-transparent to-white">
        {' '}
        <div className=" scale-[0.85] rounded-lg bg-white p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-2xl group-hover:scale-90 w-24 h-32 lg:w-[100px]">
          <div className="relative h-full overflow-hidden rounded bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
            <div className="flex size-full items-center justify-center">
              <AnonymousIcon className="size-10 text-black/80 sm:size-12 lg:size-14" />
            </div>

            <div className="absolute inset-0 rounded bg-black/5 ring-1 ring-inset ring-black/5" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnonymousDemo
