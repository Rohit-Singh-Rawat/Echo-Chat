'use client'

import { Input as BaseInput } from '@echo/ui/components/ui/input.tsx'
import { cn } from '@echo/utils/src/index'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input = ({ className, type = 'text', ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  if (type === 'password') {
    return (
      <div className="relative">
        <BaseInput
          type={showPassword ? 'text' : 'password'}
          className={cn('w-full rounded-md px-4 py-2', className)}
          {...props}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 mx-1 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="transition-ease size-4 text-gray-500 hover:text-black" />
          ) : (
            <EyeIcon className="transition-ease size-4 text-gray-500 hover:text-black" />
          )}
        </button>
      </div>
    )
  }

  return (
    <BaseInput
      type={type}
      className={cn('w-full rounded-md px-4 py-2', className)}
      {...props}
    />
  )
}

export default Input
