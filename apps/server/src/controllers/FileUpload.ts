import { Request, Response } from 'express'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from '../utils/S3Client'
import { uploadFileSchema, deleteFileSchema } from '@echo/lib'

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = uploadFileSchema.safeParse(req.body)

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
    console.log(
      contentType,
      isTemporary,
      roomId,
      filename,
      process.env.AWS_S3_ACCESS_KEY,
      process.env.AWS_S3_SECRET_ACCESS_KEY
    )
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

export const deleteFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = deleteFileSchema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        message: 'Invalid request body',
        errors: result.error.errors,
      })
      return
    }

    const { key } = result.data

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME ?? '',
      Key: key,
    })

    await s3Client.send(command)

    res.status(200).json({
      message: 'File deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting file:', error)
    res.status(500).json({ message: 'Failed to delete file' })
  }
}
