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
      <div className="flex flex-col space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
          <div>
            <h4 className="text-sm md:text-base font-medium">
              {isPro ? 'Pro Plan' : 'Free Plan'}
            </h4>
            <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-neutral-500">
              {isPro ? 'All features included' : 'Basic features included'}
            </p>
          </div>
          {!isPro && (
            <Button asChild className="h-8 md:h-9 bg-black px-3 md:px-4 text-xs md:text-sm text-white hover:bg-neutral-800 w-full md:w-auto">
              <Link href="/plans">
                <Sparkles className="mr-2 size-3 md:size-4" />
                Upgrade
              </Link>
            </Button>
          )}
        </div>

        <div className="space-y-3 md:space-y-4">
          {isPro ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="rounded-lg border border-neutral-200 p-2.5 md:p-3">
                  <p className="text-xs md:text-sm font-medium">Storage</p>
                  <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-neutral-500">Unlimited</p>
                </div>
                <div className="rounded-lg border border-neutral-200 p-2.5 md:p-3">
                  <p className="text-xs md:text-sm font-medium">Support</p>
                  <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-neutral-500">Priority</p>
                </div>
                <div className="rounded-lg border border-neutral-200 p-2.5 md:p-3">
                  <p className="text-xs md:text-sm font-medium">Billing</p>
                  <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-neutral-500">
                    {isMonthly ? 'Monthly' : 'Annual'}
                  </p>
                </div>
                <div className="rounded-lg border border-neutral-200 p-2.5 md:p-3">
                  <p className="text-xs md:text-sm font-medium">Auto-renew</p>
                  <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-neutral-500">
                    {autoRenew ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              {(startDate || endDate) && (
                <div className="rounded-lg border border-neutral-200 p-2.5 md:p-3">
                  {startDate && (
                    <div className="mb-1.5 md:mb-2">
                      <p className="text-xs md:text-sm font-medium">Started</p>
                      <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-neutral-500">{formatDate(startDate)}</p>
                    </div>
                  )}
                  {endDate && (
                    <div>
                      <p className="text-xs md:text-sm font-medium">Renews</p>
                      <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-neutral-500">{formatDate(endDate)}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="rounded-lg border border-neutral-200 p-2.5 md:p-3">
                <p className="text-xs md:text-sm font-medium">Storage</p>
                <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-neutral-500">Limited</p>
              </div>
              <div className="rounded-lg border border-neutral-200 p-2.5 md:p-3">
                <p className="text-xs md:text-sm font-medium">Support</p>
                <p className="mt-0.5 md:mt-1 text-xs md:text-sm text-neutral-500">Basic</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AccountCard>
  )
}
