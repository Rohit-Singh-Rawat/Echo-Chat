import { GridItem } from '@/components/ui/GridItem'
import { GridItemHeading } from '@/components/ui/GridItemHeading'

import AnonymousDemo from './AnonymousDemo'

const AnonymousMode = () => {
  return (
    <GridItem delay={0.4} className="col-span-2 row-span-2">
      {' '}
      <GridItemHeading
        title="Stay Anonymous"
        description="
        No personal data collected. Join rooms with temporary nicknames."
      />
      <div className="mt-6">
        <AnonymousDemo />
      </div>
    </GridItem>
  )
}

export default AnonymousMode
