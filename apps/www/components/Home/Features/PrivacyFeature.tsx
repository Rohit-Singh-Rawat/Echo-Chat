import { Lock, Shield } from 'lucide-react'
import { useRef, useState } from 'react'

import { GradientShield } from '@/components/icons/GradientShield'
import { GridItem } from '@/components/ui/GridItem'
import HackyText from '@/components/ui/HackyText'

const PrivacyFeature = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <GridItem delay={0.2} colSpan={2} rowSpan={1}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <HackyText
          isHovered={isHovered}
          text="Built for Privacy"
          className="text-lg font-medium text-gray-900"
        />
        <p className="text-sm text-gray-600">
          End-to-end encryption ensures your conversations remain private.
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 size-full bg-gradient-to-t from-white via-transparent to-transparent" />
        <div className="flex-center translate-y-12">
          <GradientShield className="fill-black/5 stroke-none" />
          <Lock className="absolute stroke-black/50" />
          <GradientShield className="absolute size-52 fill-black/10 stroke-black/5 stroke-[0.5]" />
          <Shield className="absolute size-32 fill-black/10 stroke-black/5 stroke-[0.5]" />
        </div>
      </div>{' '}
    </GridItem>
  )
}

export default PrivacyFeature
