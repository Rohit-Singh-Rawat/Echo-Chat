import { Button } from '@echo/ui/components/ui/button.tsx'
import { Input } from '@echo/ui/components/ui/input.tsx'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

import { AccountCard } from './AccountCard'

interface UserIdSectionProps {
  userId: string
}

export function UserIdSection({ userId }: UserIdSectionProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(userId)
    toast.success('User ID copied to clipboard')
  }

  return (
    <AccountCard title="User ID" description="Your unique account identifier.">
      <div className="flex w-full gap-2 md:max-w-md">
        <Input
          className="bg-neutral-50 font-mono text-sm"
          type="text"
          value={userId}
          disabled
        />
        <Button
          variant="ghost"
          size="icon"
          className="size-9 shrink-0"
          onClick={handleCopy}
        >
          <Copy className="size-4" />
        </Button>
      </div>
    </AccountCard>
  )
}
