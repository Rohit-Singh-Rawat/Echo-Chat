import { Button } from '@echo/ui/components/ui/button.tsx'
import { Input } from '@echo/ui/components/ui/input.tsx'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

import { AccountCard } from './AccountCard'

interface EmailSectionProps {
  email: string
}

export function EmailSection({ email }: EmailSectionProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    toast.success('Email copied to clipboard')
  }

  return (
    <AccountCard
      title="Email Address"
      description="Your account email address."
    >
      <div className="flex w-full max-w-md gap-2 md:gap-3">
        <Input
          className="bg-neutral-50 text-xs md:text-sm"
          type="email"
          value={email}
          disabled
        />
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 md:size-9"
          onClick={handleCopy}
        >
          <Copy className="size-3.5 md:size-4" />
        </Button>
      </div>
    </AccountCard>
  )
}
