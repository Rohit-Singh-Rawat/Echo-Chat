'use client'

import { Input } from '@echo/ui/components/ui/input.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'

import { updateProfile } from '@/lib/actions/UserActions'

import { Button } from '../Button'

import { AccountCard } from './AccountCard'

interface NameSectionProps {
  defaultName: string
}

export function NameSection({ defaultName }: NameSectionProps) {
  const [name, setName] = useState(defaultName)
  const [isUpdating, setIsUpdating] = useState(false)
  const queryClient = useQueryClient()

  const { execute: executeProfileUpdate, status } = useAction(updateProfile, {
    onSuccess: () => {
      toast.success('Name updated successfully')
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      toast.error('Failed to update name. Please try again.')
      console.error('Error updating name:', error)
    },
    onSettled: () => {
      setIsUpdating(false)
    },
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSaveChanges = async () => {
    if (!name || name === defaultName) return
    setIsUpdating(true)
    await executeProfileUpdate({ name })
  }

  const hasChanges = name !== defaultName && name.length > 0

  return (
    <AccountCard
      title="Your Name"
      description="This will be your display name."
      footer={
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-x-4 md:space-y-0">
          <p className="text-xs text-neutral-500">Max 32 characters.</p>
          <div className="w-full md:w-32">
            <Button
              disabled={!hasChanges || isUpdating || status === 'hasSucceeded'}
              className={`${!hasChanges || isUpdating ? 'opacity-50' : ''} w-full min-w-full`}
              isLoading={isUpdating}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      }
    >
      <Input
        placeholder="Steve Jobs"
        maxLength={32}
        required
        className="w-full max-w-md text-sm"
        value={name}
        onChange={handleNameChange}
        name="name"
      />
    </AccountCard>
  )
}
