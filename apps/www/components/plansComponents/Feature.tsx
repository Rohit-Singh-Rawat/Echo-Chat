import React from 'react'

import { IconWrapper } from './IconWrapper'
import { PricingFeature } from './PricingCard'

export function Feature({ icon, title, description }: PricingFeature) {
  return (
    <div className="flex items-center justify-start space-x-4">
      <IconWrapper icon={icon} size="sm" />
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
