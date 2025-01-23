'use server'
import { deleteFileSchema, uploadFileSchema } from '@echo/lib'
import { cookies } from 'next/headers'

import { actionClient } from './safe-actions'

export const uploadImage = actionClient
  .schema(uploadFileSchema)
  .action(
    async ({ parsedInput: { filename, contentType, isTemporary, roomId } }) => {
      const cookiesStore = await cookies()
      const token = cookiesStore.get('token')
      if (!token) {
        throw new Error('User not logged in')
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/files/getUploadUrl`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
          },
          body: JSON.stringify({
            filename,
            contentType,
            isTemporary,
            roomId,
          }),
        }
      )
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            'Upload rate limit reached. Please try again in 1 minute.'
          )
        }
        throw new Error('Failed to get presigned URL')
      }
      const { url, key } = await response.json()

      return { url, key }
    }
  )

export const deleteImage = actionClient
  .schema(deleteFileSchema)
  .action(async ({ parsedInput: { key } }) => {
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')
    if (!token) {
      throw new Error('User not logged in')
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/files/deleteFile`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({ key }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete file')
    }

    return { success: true }
  })
