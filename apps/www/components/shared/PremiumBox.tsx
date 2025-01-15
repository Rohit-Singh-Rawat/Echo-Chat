import { Button } from '@echo/ui/components/ui/button.tsx'
import Link from 'next/link'

const PremiumBox = () => {
  return (
    <div className="space-y-2 rounded-xl border border-neutral-200 bg-white p-4 transition-shadow duration-300 ease-in-out hover:shadow-md hover:shadow-[#87CEEB]">
      <div className="flex items-center gap-2">
        <div className="flex-center size-7 rounded-full bg-neutral-100">🚀</div>
        <h3 className="font-bold">Become Pro</h3>
      </div>
      <div className="text-black/60">Upgrade for premium</div>
      <Link href="/plans">
        <Button className="w-full bg-black transition-all duration-300 ease-in-out hover:bg-black/90 active:scale-95 active:bg-black/80 mt-4">
          Get Echo Pro
        </Button>
      </Link>
    </div>
  )
}
export default PremiumBox
