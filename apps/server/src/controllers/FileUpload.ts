import { Request, Response } from 'express'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from '../utils/S3Client'
import { uploadFileSchema } from '@echo/lib'

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = uploadFileSchema.safeParse(req.body)
    console.log('object')

    if (!result.success) {
      res.status(400).json({
        message: 'Invalid request body',
        errors: result.error.errors,
      })
      return
    }

    const { filename, contentType, roomId, isTemporary } = result.data

    const key = `uploads/${roomId ? `${roomId}/` : ''}${Date.now()}-${filename}`

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME ?? '',
      Key: key,
      ContentType: contentType,
      Tagging: !isTemporary
        ? 'temporary=false'
        : roomId
          ? 'temporary=false'
          : 'temporary=true',
    })

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    })

    res.status(200).json({
      url: presignedUrl,
      key: key,
    })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    res.status(500).json({ message: 'Failed to generate upload URL' })
  }
}
