'use server'
import { cookies } from 'next/headers'

import { actionClient } from './safe-actions'

export const activateFreePlanAction = actionClient.action(async () => {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')
  if (!token) {
    throw new Error('User not logged in')
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/plans/activate-free`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    }
  )
  if (res.ok) {
    return { success: true }
  } else {
    return { success: false }
  }
})

export const activateProPlanAction = actionClient.action(async () => {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('token')
  if (!token) {
    throw new Error('User not logged in')
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/plans/activate-pro`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    }
  )
  if (res.ok) {
    return { success: true }
  } else {
    return { success: false }
  }
})
