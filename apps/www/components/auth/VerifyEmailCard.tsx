'use client'
import { Button } from '@echo/ui/components/ui/button.tsx'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@echo/ui/components/ui/input-otp.tsx'

import { AuthHeader } from '@/components/auth/auth-header'

const VerifyEmailCard = () => {
  return (
    <div className="flex aspect-square w-full max-w-[400px] flex-col justify-between rounded-2xl border bg-white p-8 shadow-2xl shadow-cyan-500/20">
      <AuthHeader
        title="Verify your email"
        description="Please enter the verification code sent to your email."
      />

      <div className="mt-5 flex grow flex-col items-center justify-center space-y-8">
        <InputOTP maxLength={6} pattern={'^\\d+$'}>
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

        <Button className="transition-ease w-full bg-black text-white hover:bg-black/90 hover:ring hover:ring-slate-200">
          Verify Email
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Didn&apos;t receive the code?{' '}
          <button className="transition-ease font-medium underline underline-offset-2 hover:text-black">
            Resend
          </button>
        </p>
      </div>
    </div>
  )
}

export default VerifyEmailCard
