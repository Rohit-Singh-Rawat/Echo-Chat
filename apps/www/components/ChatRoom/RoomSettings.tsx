'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import NumberFlow from '@number-flow/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Link } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'

import Countdown from './Countdown'

import { ClockIcon } from '@/components/icons/animated/clock'

type RoomSettingsProps = {
  roomId: string
}

export const RoomSettings = ({ roomId }: RoomSettingsProps) => {
  const [copied, setCopied] = useState(false)
  const [fullUrl, setFullUrl] = useState('')
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const pathname = usePathname()

  const animationProps = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
    transition: { duration: 0.1 },
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(window.location.origin + pathname)
    }
  }, [pathname])

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setCopied(true)

        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        const id = setTimeout(() => {
          setCopied(false)
        }, 2000)

        setTimeoutId(id)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }

  return (
    <div className="chat-scroll flex h-full w-64 flex-col overflow-y-auto rounded-xl border border-neutral-200 bg-white">
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex items-center gap-2 rounded-lg border p-4">
          <ClockIcon className="size-4" />
          <div>
            <Countdown endDate={new Date(Date.now() + 7200 * 1000)} />
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-gray-200 p-4">
          <p className="mb-2 text-sm font-medium text-gray-500">Share Room</p>
          <div className="flex flex-col gap-2">
            <Button
              className="w-full rounded-lg border border-gray-200 py-5"
              onClick={copyToClipboard}
              disabled={copied}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    className="flex w-full items-center justify-between"
                    {...animationProps}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">Copied!</span>
                    </div>
                    <Check className="size-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    className="flex w-full items-center justify-between"
                    {...animationProps}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">Copy Link</span>
                    </div>
                    <Link className="size-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>{' '}
            <span className="text-xs text-gray-500">
              Share this link with others to invite them
            </span>
            <div className="flex flex-col items-center gap-2 p-2">
              <div className="size-32 rounded-lg border border-gray-200 p-2">
                <QRCodeSVG value={fullUrl} className="size-full" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-center text-xs text-gray-500">
                  Scan QR Code to join
                </p>
                <p className="text-center text-xs text-gray-400">
                  Or share the room code:
                </p>
                <p className="font-mono text-sm font-medium">{roomId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
