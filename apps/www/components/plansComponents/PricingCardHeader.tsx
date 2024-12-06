import { LucideIcon } from 'lucide-react'

import { Badge } from './Badge'
import { IconWrapper } from './IconWrapper'

interface PricingCardHeaderProps {
  icon: LucideIcon
  badge: string | null
}

export function PricingCardHeader({ icon, badge }: PricingCardHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <IconWrapper icon={icon} size="md" />
      {badge && <Badge>{badge}</Badge>}
    </div>
  )
}
