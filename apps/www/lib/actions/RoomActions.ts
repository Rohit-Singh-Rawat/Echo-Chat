'use server'

import { createRoomSchema } from '@echo/lib'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { Rooms } from '@/types'

import { actionClient } from './safe-actions'

export async function getRooms() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  if (!token) {
    throw new Error('Not authenticated')
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/rooms/getRooms`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['rooms'],
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch rooms')
    }

    const data: Rooms = await response.json()

    return data
  } catch (error) {
    console.error('Error fetching rooms:', error)
    throw error
  }
}

export const createRooms = actionClient
  .schema(createRoomSchema)
  .action(
    async ({ parsedInput: { isTemporary, maxTimeLimit, maxUsers, name } }) => {
      const cookieStore = await cookies()
      const token = cookieStore.get('token')
      if (!token) {
        throw new Error('Not authenticated')
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/rooms/create`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token.value}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              isTemporary,
              maxTimeLimit,
              maxUsers,
              name,
            }),
          }
        )

        if (!response.ok) {
          throw new Error('Failed to create room')
        }

        revalidateTag('rooms')
        revalidateTag('user-stats')
        const room = await response.json()
        return { room: room }
      } catch (error) {
        console.error('Error creating room:', error)
        throw error
      }
    }
  )
export const getRoomsHistory = async (): Promise<Rooms> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if (!token) {
      throw new Error('Not authenticated')
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/rooms/history`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        next: {
          tags: ['rooms-history'],
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch rooms history')
    }

    const data: Rooms = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching rooms history:', error)
    throw error
  }
}
