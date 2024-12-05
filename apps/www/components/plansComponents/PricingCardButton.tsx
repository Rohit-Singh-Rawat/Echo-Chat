'use client'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

import { Button } from '../shared/Button'

import {
  activateProPlanAction,
  activateFreePlanAction,
} from '@/lib/actions/plansActions'

interface PricingCardButtonProps {
  name: string
}

export function PricingCardButton({ name }: PricingCardButtonProps) {
  const action =
    name.toLowerCase() === 'pro'
      ? activateProPlanAction
      : activateFreePlanAction
  const { executeAsync, isExecuting, status } = useAction(action, {
    onSuccess: () => {
      toast.success(`Successfully activated ${name} plan`)
    },
    onError: () => {
      toast.error('Failed to activate plan')
    },
  })

  return (
    <Button
      className={`mt-3 w-full rounded-lg ${
        name.toLowerCase() === 'pro'
          ? 'bg-black hover:bg-black/90'
          : 'bg-gray-100 text-black hover:bg-gray-200'
      }`}
      onClick={() => executeAsync()}
      disabled={isExecuting}
      isLoading={isExecuting}
    >
      Get started
    </Button>
  )
}
