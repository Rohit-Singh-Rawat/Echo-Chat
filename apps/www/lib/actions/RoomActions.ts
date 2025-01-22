'use server'

import { createRoomSchema } from '@echo/lib'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { Message, Rooms } from '@/types'

import { actionClient } from './safe-actions'
export async function getRooms({
  search = '',
}: {
  search?: string
} = {}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  if (!token) {
    throw new Error('Not authenticated')
  }

  try {
    const queryParams = new URLSearchParams()
    if (search) {
      queryParams.append('search', search)
    }

    const url = `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/rooms/getRooms${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['rooms'],
      },
    })

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
export const getRoomHistory = actionClient
  .schema(z.object({ roomId: z.string() }))
  .action(async ({ parsedInput: { roomId } }) => {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('token')
      if (!token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/rooms/history/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          next: {
            tags: ['room-history'],
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch room history')
      }

      const data: Message[] = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching room history:', error)
      throw error
    }
  })
export const deleteRoom = actionClient
  .schema(z.object({ roomId: z.string() }))
  .action(async ({ parsedInput: { roomId } }) => {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('token')
      if (!token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/rooms/remove/${roomId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete room')
      }

      revalidateTag('rooms-history')
      return { success: true }
    } catch (error) {
      console.error('Error deleting room:', error)
      throw error
    }
  })
