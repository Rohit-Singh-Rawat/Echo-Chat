'use client'

import { useAction } from 'next-safe-action/hooks'

import { logout } from '@/lib/actions/authActions'

import Downitem from '../Downitem'
import { LogoutIcon } from '../icons/animated/logout'

export function LogoutButton() {
  const { execute: handleLogout } = useAction(logout, {
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    },
  })

  return (
    <Downitem icon={<LogoutIcon />} title="Logout" onClick={handleLogout} />
  )
}
