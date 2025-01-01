'use server'
import { uploadFileSchema } from '@echo/lib'
import { cookies } from 'next/headers'
import { createSafeActionClient } from 'next-safe-action'
const actionClient = createSafeActionClient()

const schema = uploadFileSchema

export const uploadImage = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { filename, contentType, isTemporary } }) => {
    try {
      const cookiesStore = await cookies()
      const token = cookiesStore.get('token')
      if (!token) {
        throw new Error('User not logged in')
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/getUploadUrl`,
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
          }),
        }
      )
      console.log(response)

      if (!response.ok) {
        throw new Error('Failed to get presigned URL')
      }
      const { url, key } = await response.json()

      return { url, key }
    } catch (error) {
      console.error('Error getting upload URL:', error)
      throw new Error('Error getting upload URL')
    }
  })
