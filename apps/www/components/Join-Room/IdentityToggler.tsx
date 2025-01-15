'use client'

import { Label } from '@echo/ui/components/ui/label.tsx'
import { Switch } from '@echo/ui/components/ui/switch.tsx'
import { User } from 'lucide-react'
import { useState } from 'react'

import Incognito from '../icons/incognito'

interface IdentityTogglerProps {
  defaultChecked?: boolean
  onChange?: (isAnonymous: boolean) => void
}

export default function IdentityToggler({
  defaultChecked = false,
  onChange,
}: IdentityTogglerProps) {
  const [isAnonymous, setIsAnonymous] = useState<boolean>(defaultChecked)

  const handleChange = (checked: boolean) => {
    setIsAnonymous(checked)
    onChange?.(checked)
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-4">
        <Label 
          htmlFor="identity-switch"
          className="text-xs font-medium tracking-wide sm:text-sm md:text-base lg:text-lg"
        >
          Identity
        </Label>

        <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center">
          <Switch
            id="identity-switch"
            checked={isAnonymous}
            onCheckedChange={handleChange}
            className="data-[state=unchecked]:bg-input/50 peer absolute inset-0 h-[inherit] w-auto [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
          />
          <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full">
            <User size={16} strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full rtl:peer-data-[state=checked]:translate-x-full">
            <Incognito className="size-4 fill-white" aria-hidden="true" />
          </span>
        </div>
      </div>

      <p className="text-muted-foreground w-full max-w-[350px] text-start text-xs sm:text-sm ">
        {isAnonymous
          ? 'Your identity will be unkown from other participants'
          : 'Other participants will be able to see your identity'}
      </p>
    </div>
  )
}
