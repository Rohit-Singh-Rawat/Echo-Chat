'use server'
import { updateProfileSchema } from '@echo/lib'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { UserStats } from '@/types'

import { actionClient } from './safe-actions'

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

export const updateProfile = actionClient
  .schema(updateProfileSchema)
  .action(async (input) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if (!token) {
      throw new Error('Not authenticated')
    }
    console.log(input)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/user/profile`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...input.parsedInput,
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update profile')
      }
      revalidateTag('user')
      return response.json()
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  })
export const deleteAccount = actionClient.action(async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  if (!token) {
    throw new Error('Not authenticated')
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/user/account`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete account')
    }

    // Remove all cookies
    const allCookies = cookieStore.getAll()
    for (const cookie of allCookies) {
      cookieStore.delete(cookie.name)
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting account:', error)
    throw error
  }
})
