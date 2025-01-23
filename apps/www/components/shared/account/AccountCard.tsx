import { Button } from '@echo/ui/components/ui/button.tsx'
import { ReactNode } from 'react'

interface AccountCardProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
  className?: string
  isDestructive?: boolean
}

export function AccountCard({
  title,
  description,
  children,
  footer,
  className = '',
  isDestructive = false,
}: AccountCardProps) {
  const borderColor = isDestructive ? 'border-red-200' : 'border-neutral-200'

  return (
    <div
      className={`overflow-hidden rounded-lg border ${borderColor} bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <div className="relative flex flex-col space-y-3 p-3 md:space-y-4 md:p-4">
        <div className="flex flex-col space-y-1 md:space-y-2">
          <h2
            className={`text-sm font-medium md:text-base ${isDestructive ? 'text-red-600' : ''}`}
          >
            {title}
          </h2>
          <p className="text-xs text-neutral-500 md:text-sm">{description}</p>
        </div>
        {children}
      </div>
      {footer && (
        <>
          <div className={`border-t bg-neutral-100 ${borderColor}`}>
            <div className="p-1.5 md:p-2">{footer}</div>
          </div>
        </>
      )}
    </div>
  )
}

export function CardFooterButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="submit"
      variant="ghost"
      className="h-7 text-xs md:h-8 md:text-sm"
      {...props}
    >
      {children}
    </Button>
  )
}
