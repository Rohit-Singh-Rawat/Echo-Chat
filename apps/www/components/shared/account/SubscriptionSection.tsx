import { Button } from '@echo/ui/components/ui/button.tsx'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

import { AccountCard } from './AccountCard'

interface SubscriptionSectionProps {
  subscription?: {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    planId: string
    isPro: boolean
    startDate: Date
    endDate: Date | null
    isMonthly: boolean
    autoRenew: boolean
  } | null
}

export function SubscriptionSection({
  subscription,
}: SubscriptionSectionProps) {
  const isPro = subscription?.isPro ?? false
  const isMonthly = subscription?.isMonthly ?? false
  const autoRenew = subscription?.autoRenew ?? false
  const startDate = subscription?.startDate
  const endDate = subscription?.endDate

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <AccountCard
      title="Subscription"
      description="Your current subscription plan."
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium">
              {isPro ? 'Pro Plan' : 'Free Plan'}
            </h4>
            <p className="mt-1 text-sm text-neutral-500">
              {isPro ? 'All features included' : 'Basic features included'}
            </p>
          </div>
          {!isPro && (
            <Button asChild className="h-9 bg-black px-4 text-sm text-white hover:bg-neutral-800">
              <Link href="/plans">
                <Sparkles className="mr-2 size-4" />
                Upgrade
              </Link>
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {isPro ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-neutral-200 p-3">
                  <p className="text-sm font-medium">Storage</p>
                  <p className="mt-1 text-sm text-neutral-500">Unlimited</p>
                </div>
                <div className="rounded-lg border border-neutral-200 p-3">
                  <p className="text-sm font-medium">Support</p>
                  <p className="mt-1 text-sm text-neutral-500">Priority</p>
                </div>
                <div className="rounded-lg border border-neutral-200 p-3">
                  <p className="text-sm font-medium">Billing</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {isMonthly ? 'Monthly' : 'Annual'}
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-200 p-3">
                  <p className="text-sm font-medium">Auto-renew</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {autoRenew ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              {(startDate || endDate) && (
                <div className="rounded-lg border border-neutral-200 p-3">
                  {startDate && (
                    <div className="mb-2">
                      <p className="text-sm font-medium">Started</p>
                      <p className="mt-1 text-sm text-neutral-500">{formatDate(startDate)}</p>
                    </div>
                  )}
                  {endDate && (
                    <div>
                      <p className="text-sm font-medium">Renews</p>
                      <p className="mt-1 text-sm text-neutral-500">{formatDate(endDate)}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-neutral-200 p-3">
                <p className="text-sm font-medium">Storage</p>
                <p className="mt-1 text-sm text-neutral-500">Limited</p>
              </div>
              <div className="rounded-lg border border-neutral-200 p-3">
                <p className="text-sm font-medium">Support</p>
                <p className="mt-1 text-sm text-neutral-500">Basic</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AccountCard>
  )
}
