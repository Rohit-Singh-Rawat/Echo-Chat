import GridPattern from '@echo/ui/components/ui/GridPattern.tsx'
import { cn } from '@echo/utils/src'
import { Metadata } from 'next'

import { PricingPlans } from '@/components/plansComponents/PricingPlans'

export const metadata: Metadata = {
  title: 'Pricing Plans',
  description: 'Explore our pricing plans to find the best fit for your needs.',
  keywords: ['pricing', 'plans', 'subscription', 'echo', 'chat'],
}

const page = () => {
  return (
    <div className="my-20 overflow-x-hidden">
      {' '}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        squares={Array.from(
          { length: Math.floor(Math.random() * 41) + 20 },
          (_) => [
            Math.floor(Math.random() * 41) + 0,
            Math.floor(Math.random() * 41) + 0,
          ]
        )}
        strokeDasharray={'4 2'}
        className={cn(
          '[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]'
        )}
      />
      <div className="z-50 flex w-full flex-col items-center gap-10 py-8">
        <div className="my-5">
          <h1 className="mb-2 text-4xl font-semibold text-black/80">
            Choose your plan
          </h1>
          <p className="text-center text-gray-600">
            Find a plan that fits your needs
          </p>
        </div>
        <div>
          <PricingPlans />
        </div>
      </div>
    </div>
  )
}
export default page
