'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@echo/ui/components/ui/dialog.tsx'
import { Input } from '@echo/ui/components/ui/input.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

import { deleteAccount } from '@/lib/actions/UserActions'

import { Button } from '../Button'

import { AccountCard } from './AccountCard'

export function DeleteAccountSection() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const router = useRouter()
  const queryClient = useQueryClient()

  const { execute: handleDelete, isExecuting: isLoading } = useAction(
    deleteAccount,
    {
      onSuccess: () => {
        setShowConfirmDialog(false)

        queryClient.invalidateQueries({ queryKey: ['user'] })
        router.push('/')
      },
      onError: (error) => {
        console.error('Failed to delete account:', error)
        setShowConfirmDialog(false)
      },
    }
  )

  return (
    <>
      <AccountCard
        title="Delete Account"
        description="Permanently delete your account, chat history, and all associated data. This action cannot be undone."
        isDestructive
        footer={
          <div className="flex items-center justify-end">
            <Button
              className="group flex h-8 items-center justify-center gap-2 bg-red-500 text-sm hover:bg-red-600"
              onClick={() => setShowConfirmDialog(true)}
              disabled={isLoading}
              isLoading={isLoading}
            >
              Delete Account
            </Button>
          </div>
        }
      >
        <></>
      </AccountCard>
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-red-600">
              Delete Account
            </DialogTitle>
            <p className="text-sm text-neutral-600">
              This will permanently delete your account and all associated data.
              This action cannot be undone.
            </p>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-sm font-medium text-red-900">
                You will lose access to:
              </p>
              <ul className="mt-2 list-inside list-disc text-sm text-red-700">
                <li>All your chat history and saved conversations</li>
                <li>Your account settings and preferences</li>
                <li>Any active subscriptions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-700">
                Please type &ldquo;delete my account&rdquo; to confirm:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type 'delete my account' to confirm"
                className="border-neutral-200 focus-visible:ring-red-500"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              onClick={() => setShowConfirmDialog(false)}
              disabled={isLoading}
              className="flex-1 hover:bg-neutral-100"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete()}
              disabled={confirmText !== 'delete my account' || isLoading}
              isLoading={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 focus-visible:ring-red-500"
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
