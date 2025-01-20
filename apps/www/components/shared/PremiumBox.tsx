import { Button } from '@echo/ui/components/ui/button.tsx'
import Link from 'next/link'

const PremiumBox = () => {
  return (
    <div className="space-y-2.5 rounded-lg border border-neutral-200 bg-white p-4 transition-all duration-200 ease-in-out hover:border-neutral-300 shadow">
      <div className="flex items-center gap-2">
        <div className="flex-center size-6 rounded-md bg-neutral-100 text-sm">✨</div>
        <h3 className="text-sm font-medium">Upgrade to Pro</h3>
      </div>
      <div className="text-xs text-neutral-500">
        Unlock premium features and enhanced capabilities
      </div>
      <Link href="/plans" className="block">
        <Button className="mt-1 w-full bg-neutral-900 text-xs font-medium transition-all duration-200 ease-in-out hover:bg-neutral-800 active:scale-[0.98]">
          Get Echo Pro
        </Button>
      </Link>
    </div>
  )
}

export default PremiumBox
