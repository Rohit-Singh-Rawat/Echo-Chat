'use client'
import { useQueryClient } from '@tanstack/react-query'
import { CircleUserRound, Upload } from 'lucide-react'
import Image from 'next/image'
import { useAction } from 'next-safe-action/hooks'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { uploadImage } from '@/lib/actions/ImageUpload'
import { updateProfile } from '@/lib/actions/UserActions'
import getPublicUrl from '@/utils'

import { Button } from '../Button'

import { AccountCard } from './AccountCard'

interface ProfileSectionProps {
  image?: string
}

export function ProfileSection({ image }: ProfileSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string | undefined>(image)
  const [isHovered, setIsHovered] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const queryClient = useQueryClient()

  const { execute: executeUpload } = useAction(uploadImage, {
    onSuccess: async (result) => {
      const file = fileInputRef.current?.files?.[0]
      if (!file) return
      const { url, key } = result.data ?? {}
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      if (!uploadResponse.ok) {
        toast.error('Failed to upload image')
        return
      }

      const cdnUrl = getPublicUrl(key)

      // Update profile with new image URL
      await executeProfileUpdate({ image: cdnUrl })

      // Update state with new image URL
      setImageUrl(cdnUrl)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      toast.success('Profile photo updated successfully')

      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      toast.error('Failed to upload image. Please try again.')
      console.error('Error uploading image:', error)
    },
    onSettled: () => {
      setIsUploading(false)
    },
  })
  const { execute: executeProfileUpdate, status } = useAction(updateProfile)

  const handleThumbnailClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB in bytes
        toast.error('Image must be less than 2MB')
        event.target.value = '' // Reset input
        return
      }
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const handleSaveChanges = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) return

    setIsUploading(true)

    await executeUpload({
      filename: file.name,
      contentType: file.type,
      isTemporary: false,
      roomId: 'Profile',
    })
  }

  const hasChanges = imageUrl !== image

  return (
    <AccountCard
      title="Profile Photo"
      description="Your profile picture will be shown publicly."
      footer={
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-x-4 md:space-y-0">
          <div className="flex flex-col">
            <p className="text-xs text-neutral-500">
              Supported formats: JPG, PNG, GIF
            </p>
          </div>
          <div className="w-full md:w-32">
            <Button
              disabled={!hasChanges || isUploading || status == 'hasSucceeded'}
              className={`${!hasChanges || isUploading ? 'opacity-50' : ''} w-full min-w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2`}
              isLoading={isUploading}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex items-center gap-3">
        <div className="relative inline-flex">
          <Button
            className="relative size-12 overflow-hidden rounded-full bg-none hover:bg-neutral-100 md:size-16"
            onClick={handleThumbnailClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={imageUrl ? 'Change image' : 'Upload image'}
          >
            <Upload
              className="absolute size-5 text-neutral-500 transition-opacity duration-200 md:size-6"
              style={{
                opacity: isHovered ? 1 : 0,
                zIndex: 1,
              }}
            />
            {imageUrl ? (
              <Image
                className="absolute inset-0 size-full transition-opacity duration-200"
                src={imageUrl}
                alt="Preview of uploaded image"
                width={64}
                height={64}
                style={{
                  objectFit: 'cover',
                  opacity: isHovered ? 0.3 : 1,
                }}
              />
            ) : (
              <div aria-hidden="true">
                <CircleUserRound
                  className="size-6 opacity-60 md:size-8"
                  strokeWidth={2}
                />
              </div>
            )}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            aria-label="Upload image file"
            onChange={handleFileChange}
          />
        </div>
        <div className="sr-only" aria-live="polite" role="status">
          {imageUrl
            ? 'Image uploaded and preview available'
            : 'No image uploaded'}
        </div>
      </div>
    </AccountCard>
  )
}
