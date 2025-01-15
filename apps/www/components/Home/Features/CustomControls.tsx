import { Clock, SlidersHorizontal, UserCog, Wrench } from 'lucide-react'

import { EchoLoading } from '@/components/ui/EchoLoading'
import { GridItem } from '@/components/ui/GridItem'
import { GridItemHeading } from '@/components/ui/GridItemHeading'
import { OrbitingCircles } from '@/components/ui/OrbitingCircles'

import { Circle } from './RealTimeDemo'

const CustomControls = () => {
  const icons = [
    { Icon: UserCog },
    { Icon: Clock },
    { Icon: SlidersHorizontal },
    { Icon: Wrench },
  ]

  return (
    <GridItem delay={0.2} className="xl:col-span-2 xl:row-span-1">
      <GridItemHeading
        title="Custom Controls"
        description="Set user limits and room duration to match your needs."
      />
      <div className="flex-center relative">
        <div className="flex-center pointer-events-none absolute inset-x-0 bottom-0 z-40 size-full bg-gradient-to-t from-white via-transparent to-white">
          <Circle className="size-9 text-black/80">
            <EchoLoading className="size-5" duration={5} />
          </Circle>
        </div>
        <div className="flex-center relative size-[120px]">
          {icons.map(({ Icon }, index) => (
            <OrbitingCircles
              key={index}
              className="z-50 border-none bg-transparent"
              duration={20}
              delay={5 * (index + 1)}
              radius={50}
            >
              <div className="z-[999] rounded-full bg-white p-1">
                <Circle className="size-6 p-1">
                  <Icon className="size-4 text-gray-600" />
                </Circle>
              </div>
            </OrbitingCircles>
          ))}
        </div>
      </div>
    </GridItem>
  )
}

export default CustomControls
