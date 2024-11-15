// Dependencies: pnpm install lucide-react

'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@echo/ui/components/ui/tooltip.tsx'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { AttachFileIcon } from '../icons/animated/attach-file'

export default function FileInput() {
  const previewRef = useRef<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setFileName(file.name)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        previewRef.current = url
        console.log('File selected:', file)
      }
    },
    []
  )

  const handleRemove = useCallback(() => {
    previewUrl && URL.revokeObjectURL(previewUrl)
    setFileName(null)
    setPreviewUrl(null)
    previewRef.current = null
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  useEffect(() => {
    return () => {
      previewRef.current && URL.revokeObjectURL(previewRef.current)
    }
  }, [])

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
                  <Image
                    className="size-7 object-cover"
                    src={previewUrl}
                    alt="Preview of uploaded image"
                    layout="fill"
                  />
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
          variant="destructive"
          className="border-background absolute -right-1 -top-1 size-4 rounded-full border-2"
          aria-label="Remove image"
        >
          <X size={8} />
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
