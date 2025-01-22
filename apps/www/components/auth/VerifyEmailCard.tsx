'use client'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@echo/ui/components/ui/input-otp.tsx'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'

import { useRegisterContext } from '@/app/context/RegistryContext'
import { AuthHeader } from '@/components/auth/auth-header'
import {
  CreateUserAccountAction,
  SendVerificationOtpAction,
} from '@/lib/actions/authActions'

import { Button } from '../shared/Button'

const VerifyEmailCard = () => {
  const { email, password, firstName, lastName } = useRegisterContext()
  const [isInvalidCode, setIsInvalidCode] = useState(false)
  const [code, setCode] = useState('')
  const router = useRouter()

  const { executeAsync, isExecuting } = useAction(CreateUserAccountAction, {
    async onSuccess() {
      toast.success('Account created! Redirecting to dashboard...')
      router.push('/dashboard')
    },
    onError({ error }) {
      toast.error(error.serverError)
      setCode('')
      setIsInvalidCode(true)
    },
  })

  const { executeAsync: resendCode, isExecuting: isResending } = useAction(
    SendVerificationOtpAction,
    {
      async onSuccess() {
        toast.success('Verification code resent!')
      },
      onError({ error }) {
        toast.error(error.serverError)
      },
    }
  )

  if (!email || !password) {
    router.push('/register')
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length === 6) {
      executeAsync({ email, password, firstName, lastName, code })
    } else {
      setIsInvalidCode(true)
      toast.error('Please enter a valid 6-digit code')
    }
  }

  return (
    <div className="flex aspect-square w-full max-w-[400px] flex-col justify-between rounded-2xl border bg-white p-8 shadow-2xl shadow-cyan-500/20">
      <AuthHeader
        title="Verify your email"
        description="Please enter the verification code sent to your email."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-5 flex grow flex-col items-center justify-center space-y-8"
      >
        <InputOTP
          maxLength={6}
          pattern={'^\\d+$'}
          value={code}
          onChange={(value) => {
            setCode(value)
            setIsInvalidCode(false)
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {isInvalidCode && (
          <p className="text-sm text-red-500">
            Please enter a valid 6-digit code
          </p>
        )}

        <Button
          type="submit"
          className="transition-ease w-full bg-black text-white hover:bg-black/90 hover:ring hover:ring-slate-200"
          isLoading={isExecuting}
          disabled={isExecuting}
        >
          Verify Email
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Didn&apos;t receive the code?{' '}
          <button
            type="button"
            className="transition-ease font-medium underline underline-offset-2 hover:text-black"
            onClick={() => resendCode({ email })}
            disabled={isExecuting || isResending}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  )
}

export default VerifyEmailCard
