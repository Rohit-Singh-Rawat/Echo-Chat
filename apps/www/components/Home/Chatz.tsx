'use client'

import GridPattern from '@echo/ui/components/ui/GridPattern.tsx'
import { cn } from '@echo/utils/src'
import { Ellipsis, ShieldIcon } from 'lucide-react'

import BlurFadeIn from '../ui/BlurFadeIn'

import ChatMessages from './ChatMessages'

const Chatz = () => {
  return (
    <BlurFadeIn delay={0.8} className="flex-center w-full" blur={true}>
      <div className="w-[70%] rounded-xl border-2 border-neutral-200/60 bg-white">
        <div className="border-b-2 border-neutral-200/60 p-2 px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShieldIcon size={16} className="mr-2" />
              <h2 className="text-sm font-medium">Attack On Titan</h2>
            </div>
            <Ellipsis size={16} />
          </div>
        </div>
        <div className="relative h-[50vh] p-10">
          <GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={'4 2'}
            className={cn(
              '[mask-image:linear-gradient(to_bottom_left,white,transparent_70%)]',
              '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
              'fill-neutral-400/30 stroke-neutral-400/10'
            )}
          />
          <ChatMessages />
        </div>
      </div>
    </BlurFadeIn>
  )
}

export default Chatz
