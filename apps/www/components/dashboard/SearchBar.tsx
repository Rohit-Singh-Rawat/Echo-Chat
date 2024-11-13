'use client'

import { Input } from '@echo/ui/components/ui/input.tsx'
import { LoaderCircle, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [inputValue])

  return (
    <div className="relative">
      <Input
        id="input-27"
        className="peer pe-9 ps-9"
        placeholder="Search..."
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        {isLoading ? (
          <LoaderCircle
            className="animate-spin"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            role="presentation"
          />
        ) : (
          <Search size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </div>
    </div>
  )
}
