import { LucideIcon } from 'lucide-react'

export interface PricingFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface PricingPlan {
  name: string
  icon: LucideIcon
  description: string
  price: string
  badge: string | null
  features: PricingFeature[]
}
