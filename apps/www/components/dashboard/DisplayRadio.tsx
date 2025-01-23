'use client'

import { Switch } from '@echo/ui/components/ui/switch.tsx'
import { LayoutGrid, Rows3 } from 'lucide-react'

import { useDisplayStore } from '@/lib/store/DisplayStore'

export default function DisplaySwitch() {
  const { displayLists, ChangeDisplay: setDisplayLists } = useDisplayStore()

  return (
    <div>
      <div
        className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium"
        role="group"
        aria-label="Display mode toggle"
      >
        <Switch
          id="display-mode-switch"
          checked={displayLists}
          onCheckedChange={setDisplayLists}
          className="data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 peer absolute inset-0 h-[inherit] w-auto rounded-lg [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-md [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
          aria-label={`Switch to ${displayLists ? 'grid' : 'list'} view`}
        />
        <span
          className="peer-data-[state=checked]:text-muted-foreground/70 pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center rounded-lg text-center"
          aria-hidden="true"
        >
          <LayoutGrid size={16} strokeWidth={2} />
        </span>
        <span
          className="peer-data-[state=unchecked]:text-muted-foreground/70 pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center"
          aria-hidden="true"
        >
          <Rows3 size={16} strokeWidth={2} />
        </span>
      </div>
    </div>
  )
}
