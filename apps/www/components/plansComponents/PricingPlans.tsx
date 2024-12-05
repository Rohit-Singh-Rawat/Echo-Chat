import {
  Users,
  Clock,
  Layout,
  Save,
  Diamond,
  Infinity,
  Lock,
  Zap,
  Gem,
  Snowflake,
} from 'lucide-react'
import React from 'react'

import { PricingCard } from './PricingCard'

import {
  activateFreePlanAction,
  activateProPlanAction,
} from '@/lib/actions/plansActions'

const plans = [
  {
    name: 'Free',
    icon: Snowflake,
    description: 'Perfect for individuals and small teams getting started',
    price: '0',
    badge: null,
    features: [
      {
        icon: Users,
        title: '100 team members',
        description: 'Collaborate with up to 100 users',
      },
      {
        icon: Layout,
        title: '30 rooms',
        description: 'Create up to 30 active rooms',
      },
      {
        icon: Save,
        title: '10 saved rooms',
        description: 'Save up to 10 rooms for later',
      },
      {
        icon: Clock,
        title: '60 min time limit',
        description: 'Session duration up to 60 minutes',
      },
    ],
  },
  {
    name: 'Pro',
    icon: Gem,
    description: 'Perfect for growing teams and organizations',
    price: '10',
    badge: 'Most popular',
    features: [
      {
        icon: Users,
        title: '200 team members',
        description: 'Collaborate with up to 200 users',
      },
      {
        icon: Layout,
        title: '100 rooms',
        description: 'Create up to 100 active rooms',
      },
      {
        icon: Save,
        title: '50 saved rooms',
        description: 'Save up to 50 rooms for later',
      },
      {
        icon: Zap,
        title: '200 min time limit',
        description: 'Extended sessions up to 200 minutes',
      },
    ],
  },
]

export function PricingPlans() {
  return (
    <div className="flex flex-col items-stretch gap-6 md:flex-row">
      {plans.map((plan) => (
        <PricingCard key={plan.name} {...plan} />
      ))}
    </div>
  )
}
