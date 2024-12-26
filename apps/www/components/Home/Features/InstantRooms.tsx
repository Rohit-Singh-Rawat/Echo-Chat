import { RealTimeDemo } from './RealTimeDemo'

import { GridItem } from '@/components/ui/GridItem'
import { GridItemHeading } from '@/components/ui/GridItemHeading'

const InstantRooms = () => {
  return (
    <GridItem
      colSpan={2}
      rowSpan={2}
      delay={0.1}
      className="flex flex-col justify-between pb-10"
    >
      <div className="flex-center relative w-full">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 size-full bg-gradient-to-t from-white via-transparent to-white" />
        <RealTimeDemo />
      </div>
      <GridItemHeading
        title="Real-time Communication"
        description="Connect and collaborate seamlessly with instant room access and live messaging."
      />
    </GridItem>
  )
}

export default InstantRooms
