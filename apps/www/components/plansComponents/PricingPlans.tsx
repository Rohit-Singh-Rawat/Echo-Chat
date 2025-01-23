import React from 'react'

import { plans } from '@/constants'

import { PricingCard } from './PricingCard'

export function PricingPlans() {
  return (
    <div className="mx-auto grid w-full max-w-[90rem] grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8 lg:px-8">
      {plans.map((plan) => (
        <PricingCard key={plan.name} {...plan} />
      ))}
    </div>
  )
}
