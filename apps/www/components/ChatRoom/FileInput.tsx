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
import React, { useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'

import useFileStore from '@/app/store/SelectedImageStore'
import { useUser } from '@/hooks/useSession'
import { uploadImage } from '@/lib/actions/ImageUpload'

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
  maxSize: 3 * 1024 * 1024,
  allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'],
}

export default function FileInput({
  onImageUpload,
  SendImage,
}: FileInputProps) {
  const { data } = useUser()
  const previewRef = useRef<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { selectedFile, setSelectedFile } = useFileStore()

  const { executeAsync: uploadFile, isExecuting } = useAction(uploadImage, {
    onSuccess: async (result) => {
      if (result.data?.url) {
        try {
          const response = await fetch(result.data.url, {
            method: 'PUT',
            body: selectedFile,
            headers: {
              'Content-Type': selectedFile?.type || 'image/jpeg',
            },
          })

          if (!response.ok) {
            throw new Error('Failed to upload to URL')
          }

          // Get the public URL by removing query parameters
          const publicUrl = `${process.env.NEXT_PUBLIC_CDN_URL}/${result.data.key}`
          onImageUpload(publicUrl)
        } catch (error) {
          console.error('Failed to upload to URL:', error)
          toast.error('Failed to upload image')
          handleRemove()
        }
      }
    },
    onError: (error) => {
      console.error('Failed to upload image:', error)
      toast.error('Failed to upload image')
      handleRemove()
    },
  })

  const handleThumbnailClick = useCallback(() => {
    if (!data) {
      toast.info('need to login to send Images')
      return
    }
    fileInputRef.current?.click()
  }, [data])

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (file) {
        if (!fileValidation.allowedTypes.includes(file.type)) {
          toast.error('Invalid file type. Please upload a PNG or JPEG image.')
          return
        }
        if (file.size > fileValidation.maxSize) {
          toast.error(`File size exceeds the limit of 3MB.`)
          return
        }
        const url = URL.createObjectURL(file)
        setSelectedFile(file)
        previewRef.current = url
        uploadFile({
          filename: file.name,
          contentType: file.type,
          isTemporary: true,
        })
      }
    },
    [uploadFile, setSelectedFile]
  )

  const handleRemove = useCallback(() => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current)
    }
    setSelectedFile(null)
    previewRef.current = null
    onImageUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [onImageUpload, setSelectedFile])

  useEffect(() => {
    return () => {
      previewRef.current && URL.revokeObjectURL(previewRef.current)
    }
  }, [])

  useEffect(() => {
    if (SendImage === null) {
      handleRemove()
    }
  }, [SendImage, handleRemove])

  const previewUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : SendImage

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
          <div aria-hidden="true" className="">
            <AttachFileIcon className="size-7 rotate-45 opacity-60" />
          </div>
        )}
      </Button>
      {previewUrl && (
        <Button
          onClick={handleRemove}
          size="icon"
          className="absolute -right-1 -top-px size-[14px] rounded-full border bg-white p-1 text-black hover:bg-gray-300"
          aria-label="Remove image"
        >
          <X size={1} className="scale-75" />
        </Button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        aria-label="Upload image file"
      />
    </div>
  )
}
