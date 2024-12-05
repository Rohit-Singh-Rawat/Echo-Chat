'use server'
import { cookies } from 'next/headers'

import { UserStats } from '@/types'

export async function getUserStats() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  if (!token) {
    throw new Error('Not authenticated')
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/user/stats`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['user-stats'],
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch user stats')
    }

    const data: UserStats = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching user stats:', error)
    throw error
  }
}
