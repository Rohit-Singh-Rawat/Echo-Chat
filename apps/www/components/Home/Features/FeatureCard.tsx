import { cn } from '@echo/utils/src'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col items-start overflow-hidden rounded-2xl border-2 border-gray-200 p-6 shadow-sm hover:border-gray-300',
        className
      )}
    >
      <div className="relative z-10">{icon}</div>
      <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <div className="absolute inset-0 mt-4 origin-bottom-right scale-0 overflow-hidden rounded-full bg-gray-100 transition-all duration-300 ease-in-out group-hover:scale-150">
        <div className="size-[70%] rounded-full bg-gray-800">
          <div className="size-[70%] rounded-full bg-gray-900"></div>
        </div>
      </div>
    </div>
  )
}
