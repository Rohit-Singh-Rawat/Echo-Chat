import Link from 'next/link'
import { ComponentProps, ReactNode } from 'react'

interface LinkButtonProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  href: string
  variant?: 'primary' | 'default'
  children: ReactNode
}

const LinkButton = ({
  href,
  variant = 'default',
  children,
  ...props
}: LinkButtonProps) => {
  const baseStyles =
    'inline-flex z-10 items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2'
  const variantStyles =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/20'
      : 'border-2 border-black/10 bg-white text-black shadow-md hover:bg-gray-100 focus:ring-white/20'

  return (
    <Link href={href} {...props} className={`${baseStyles} ${variantStyles}`}>
      {children}
    </Link>
  )
}

export default LinkButton
