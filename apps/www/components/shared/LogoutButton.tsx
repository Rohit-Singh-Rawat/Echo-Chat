'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

import { logout } from '@/lib/actions/authActions'

import Downitem from '../Downitem'
import { LogoutIcon } from '../icons/animated/logout'

export function LogoutButton() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { execute: handleLogout } = useAction(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      router.push('/')

      toast.success('Logged out successfully', {
        description: 'You have been logged out of your account',
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
  })

  return (
    <Downitem icon={<LogoutIcon />} title="Logout" onClick={handleLogout} />
  )
}
