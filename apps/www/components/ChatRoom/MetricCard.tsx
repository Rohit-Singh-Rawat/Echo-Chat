import { cn } from '@echo/utils/src'
import React from 'react'

interface MetricCardProps {
  title: string // Card title (e.g., "Top sales")
  value: string | number // Main value to display (e.g., "72")
  icon?: React.ReactNode // Optional icon component
  label?: string // Label next to value (e.g., "Mikasa")
  className?: string // Custom classes for the card wrapper
  iconClassName?: string // Custom classes for the icon container
}

const MetricCard = ({
  title,
  value,
  icon,
  label,
  className = '',
  iconClassName,
}: MetricCardProps) => {
  return (
    <div>
      <div className="relative">
        {/* Top gray bar */}
        <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 -translate-y-1 rounded-t-md bg-gray-200" />

        {/* Main card */}
        <div className={cn('w-40 rounded-xl bg-white p-4', className)}>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {icon ? (
                  <div
                    className={`flex size-6 items-center justify-center rounded-full text-xs text-white ${iconClassName}`}
                  >
                    {icon}
                  </div>
                ) : null}
                <span className="text-lg font-semibold">{value}</span>
                {label && <span className="font-medium">{label}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gray bar */}
        <div className="absolute bottom-0 left-1/2 h-1 w-32 -translate-x-1/2 translate-y-1 rounded-b-md bg-gray-200" />
      </div>
    </div>
  )
}

export default MetricCard
