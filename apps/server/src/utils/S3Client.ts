import { S3Client } from '@aws-sdk/client-s3'
import * as dotenv from 'dotenv'

dotenv.config()

export const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? '',
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? '',
  },
})
