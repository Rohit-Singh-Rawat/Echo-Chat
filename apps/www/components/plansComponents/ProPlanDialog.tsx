import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@echo/ui/components/ui/dialog.tsx'
import { Mail, Twitter } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../shared/Button'

interface ProPlanDialogProps {
  isPro: boolean
  isLoading: boolean
}

export function ProPlanDialog({ isPro, isLoading }: ProPlanDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="mt-3 w-full rounded-lg bg-black hover:bg-black/90"
          disabled={isPro || isLoading}
        >
          Get Pro Access
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Pro Plan For Free!</DialogTitle>
          <DialogDescription className="space-y-4 pt-4">
            <p>
              Great news! I&apos;m giving away my Pro plan completely FREE to my
              first 50 members! Here&apos;s how to get it:
            </p>
            <ol className="space-y-2 pl-4">
              <li>🔄 First, activate the free trial</li>
              <li>📨 Then reach out to me through X or email</li>
              <li>🎉 I&apos;ll upgrade your account to Pro for free!</li>
            </ol>
            <div className="flex gap-4 pt-4">
              <Link
                href="https://x.com/intent/follow?screen_name=Spacing_Whale"
                target="_blank"
                className="flex-1"
              >
                <Button className="w-full">
                  <Twitter className="mr-2 size-4" />
                  Connect on X
                </Button>
              </Link>
              <Link href="mailto:rohitzrawat2003@gmail.com" className="flex-1">
                <Button className="w-full">
                  <Mail className="mr-2 size-4" />
                  Contact Me
                </Button>
              </Link>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
