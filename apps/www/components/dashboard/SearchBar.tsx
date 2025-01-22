'use client'

import { Input } from '@echo/ui/components/ui/input.tsx'
import { LoaderCircle, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

export default function SearchBar({ search }: { search: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(search)
  const debouncedValue = useDebounce(value, 500)
  const isLoading = value !== debouncedValue

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedValue) {
      params.set('search', debouncedValue)
    } else {
      params.delete('search')
    }
    router.push(`/dashboard?${params.toString()}`)
  }, [debouncedValue, router, searchParams])

  return (
    <div className="relative w-full lg:w-96">
      <Input
        className="peer w-full pe-9 ps-9"
        placeholder="Search..."
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
