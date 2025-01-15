'use client'

import { Info } from 'lucide-react'
import { useState } from 'react'

import { useIdentityStore } from '@/app/store/useIdentityStore'
import IdentityToggler from '@/components/Join-Room/IdentityToggler'
import { Button } from '@/components/shared/Button'

import EchoLogo from '../icons/animated/EchoLogo'

export default function GetAnonomousity() {
  const { setAnonymous } = useIdentityStore()
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleAnonymousChoice = () => {
    setAnonymous(isAnonymous)
  }

  return (
    <div className="flex-center mx-auto h-screen w-screen flex-col bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] p-10 [background-size:16px_16px]">
      {' '}
      <div className="">
        <EchoLogo />
      </div>
      <div className="transition-ease m-auto w-full max-w-[90%] space-y-4 rounded-2xl border-2 border-neutral-300 bg-white p-6 shadow-xl hover:shadow-2xl sm:max-w-[450px] sm:space-y-6 sm:p-8 md:p-10">
        <div>
          <h1 className="mb-3 text-2xl font-semibold sm:mb-4 sm:text-3xl">
            Choose Your Identity
          </h1>
          <p className="mb-4 text-sm text-gray-600 sm:mb-6 sm:text-base">
            Select how you want to appear in this chat room. You can choose to
            participate anonymously or use your account identity.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <Info className="mt-0.5 size-4 text-blue-500 sm:size-5" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 sm:text-base">
                Anonymous Mode
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm">
                When anonymous, your real identity will be hidden and
                you&apos;ll be assigned a temporary username. Other participants
                won&apos;t be able to see your account details.
              </p>
            </div>
          </div>
        </div>

        <IdentityToggler
          onChange={(anonymous) => setIsAnonymous(anonymous)}
          defaultChecked={false}
        />

        <div className="flex justify-end">
          <Button
            onClick={handleAnonymousChoice}
            className="w-full min-w-[100px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
