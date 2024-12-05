import GridPattern from '@echo/ui/components/ui/GridPattern.tsx'
import { cn } from '@echo/utils/src'

import EchoLogo from '@/components/icons/animated/EchoLogo'
import { PricingPlans } from '@/components/plansComponents/PricingPlans'

const page = () => {
  return (
    <div className="h-screen w-screen overflow-x-hidden">
      {' '}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        squares={Array.from(
          { length: Math.floor(Math.random() * 41) + 20 },
          (_, i) => [
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
        <div className="scale-125">
          <EchoLogo />
        </div>
        <div className="my-5">
          <h1 className="mb-2 text-4xl font-semibold text-black/80">
            Choose your plan
          </h1>
          <h4 className="text-center text-gray-600">
            Find a plan that fits your needs
          </h4>
        </div>
        <div>
          <PricingPlans />
        </div>
      </div>
    </div>
  )
}
export default page
