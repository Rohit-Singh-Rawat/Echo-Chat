'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@echo/ui/components/ui/tooltip.tsx'
import { LoadingSpinner } from '@echo/ui/icons/spinner.tsx'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useAction } from 'next-safe-action/hooks'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useUser } from '@/hooks/useSession'
import { uploadImage, deleteImage } from '@/lib/actions/ImageUpload'
import useRoomStore from '@/lib/store/RoomStore'
import getPublicUrl from '@/utils'

import { AttachFileIcon } from '../icons/animated/attach-file'

interface FileInputProps {
  onImageUpload: (url: string | null) => void
  SendImage: string | null
}

interface FileValidation {
  maxSize: number
  allowedTypes: string[]
}

const fileValidation: FileValidation = {
  maxSize: 3 * 1024 * 1024, // 3MB
  allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'],
}

export default function FileInput({
  onImageUpload,
  SendImage,
}: FileInputProps) {
  const { data: user, isFetching } = useUser()
  const [fileKey, setFileKey] = useState<string | null>(null)

  const previewRef = useRef<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { id: roomId, isTemporary } = useRoomStore()

  const { executeAsync: uploadFile, isExecuting: isUploading } = useAction(
    uploadImage,
    {
      onSuccess: async ({ data }) => {
        if (!data?.url || !fileInputRef.current?.files?.[0]) return

        try {
          const file = fileInputRef.current.files[0]

          const response = await fetch(data.url, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type
                ? encodeURI(file.type)
                : 'multipart/form-data',
            },
          })

          if (!response.ok) throw new Error('Failed to upload to URL')

          const publicUrl = getPublicUrl(data.key)
          setFileKey(data.key)
          onImageUpload(publicUrl)
        } catch (error) {
          console.error('Failed to upload to URL:', error)
          toast.error('Failed to upload image')
          handleRemove()
        }
      },
      onError: ({ error }) => {
        console.error('Failed to upload image:', error)
        toast.error(error.serverError ?? 'Failed to upload image')
        handleRemove()
      },
    }
  )

  const { executeAsync: deleteFile, isExecuting: isDeleting } = useAction(
    deleteImage,
    {
      onSuccess: () => {
        handleRemove()
      },
      onError: (error) => {
        console.error('Failed to delete image:', error)
        toast.error('Failed to delete image')
      },
    }
  )

  const handleThumbnailClick = useCallback(() => {
    if (!user) {
      toast.info('Please login to send images')
      return
    }
    fileInputRef.current?.click()
  }, [user])

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      if (!fileValidation.allowedTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload a PNG or JPEG image.')
        return
      }

      if (file.size > fileValidation.maxSize) {
        toast.error('File size exceeds the limit of 3MB.')
        return
      }

      const url = URL.createObjectURL(file)
      previewRef.current = url

      await uploadFile({
        filename: file.name,
        contentType: file.type,
        isTemporary,
        roomId: roomId ?? '',
      })
    },
    [uploadFile, roomId, isTemporary]
  )

  const handleRemove = useCallback(async () => {
    if (fileKey) {
      await deleteFile({ key: fileKey })
      setFileKey(null)
    }
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current)
    }
    previewRef.current = null
    onImageUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onImageUpload, fileKey, deleteFile])

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current)
    }
  }, [])
  useEffect(() => {
    if (SendImage === null) {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current)
      }
      previewRef.current = null

      setFileKey(null)
      onImageUpload(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [SendImage, onImageUpload])

  const previewUrl = previewRef.current || SendImage
  const isExecuting = isUploading || isDeleting

  return (
    <div className="relative items-center">
      <Button
        variant="outline"
        className="flex-center relative h-auto gap-0 overflow-hidden rounded-full p-1"
        onClick={handleThumbnailClick}
        aria-label={previewUrl ? 'Change image' : 'Upload image'}
      >
        {previewUrl ? (
          <div aria-hidden="true" className="size-7">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {isExecuting ? (
                    <div className="flex-center absolute inset-0 z-10 bg-white/5">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <Image
                      className="size-7 object-cover"
                      src={previewUrl}
                      alt="Preview of uploaded image"
                      layout="fill"
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="rounded-xl border border-gray-300 bg-white p-0"
                >
                  <Image
                    src={previewUrl}
                    alt="Preview of uploaded image"
                    width={200}
                    height={200}
                    className="rounded-md object-contain"
                  />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div aria-hidden="true">
            <AttachFileIcon className="size-7 rotate-45 opacity-60" />
          </div>
        )}
      </Button>
      {previewUrl && (
        <Button
          onClick={handleRemove}
          size="icon"
          type="button"
          className="absolute -right-1 -top-px size-[14px] rounded-full border bg-white p-1 text-black hover:bg-gray-300"
          aria-label="Remove image"
          disabled={isExecuting}
        >
          <X size={1} className="scale-75" />
        </Button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        disabled={isExecuting || isFetching}
        accept="image/*"
        aria-label="Upload image file"
      />
    </div>
  )
}
