'use client'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

import { useUser } from '@/hooks/useSession'
import {
  activateProPlanAction,
  activateFreePlanAction,
} from '@/lib/actions/plansActions'

import { Button } from '../shared/Button'

interface PricingCardButtonProps {
  name: string
}

export function PricingCardButton({ name }: PricingCardButtonProps) {
  const { data, isLoading } = useUser()
  const router = useRouter()
  const action =
    name.toLowerCase() === 'pro'
      ? activateProPlanAction
      : activateFreePlanAction
  const { executeAsync, isExecuting } = useAction(action, {
    onSuccess: () => {
      toast.success(`Successfully activated ${name} plan`)
      router.push('/dashboard')
    },
    onError: () => {
      toast.error('Failed to activate plan')
    },
  })
  const isPro = !!data?.user?.subscription?.isPro
  const isSubscription = !!data?.user?.subscription

  const handleClick = () => {
    if (!data?.user) {
      toast.info('Please login first')
    } else {
      executeAsync()
    }
  }

  return (
    <Button
      className={`mt-3 w-full rounded-lg ${
        name.toLowerCase() === 'pro'
          ? 'bg-black hover:bg-black/90'
          : name.toLowerCase() === 'free'
            ? 'bg-gray-100 text-black hover:bg-gray-200'
            : 'bg-gray-100 text-black hover:bg-gray-200'
      }`}
      onClick={handleClick}
      disabled={
        isExecuting ||
        (name.toLowerCase() === 'pro' && isPro) ||
        (name.toLowerCase() === 'free' && isSubscription) ||
        isLoading
      }
      isLoading={isExecuting}
    >
      Get started
    </Button>
  )
}
