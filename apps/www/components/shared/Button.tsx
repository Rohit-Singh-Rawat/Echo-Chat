import { Button as Button2 } from '@echo/ui/components/ui/button.tsx'
import { LoadingSpinner } from '@echo/ui/icons/spinner.tsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
}

export const Button = ({
  children,
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <Button2
      {...props}
      disabled={isLoading || disabled}
      className={`${className} disabled:cursor-not-allowed disabled:bg-gray-100 ${
        isLoading
          ? 'cursor-not-allowed border border-gray-300 text-gray-400 outline-none'
          : ''
      }`}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </Button2>
  )
}
