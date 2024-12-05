'use client'
import { Button } from '@echo/ui/components/ui/button.tsx'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@echo/ui/components/ui/input-otp.tsx'
import Link from 'next/link'
import { useState } from 'react'

import { AuthHeader } from '@/components/auth/auth-header'
import Input from '@/components/shared/Input'

const ForgetPassword = () => {
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = () => {
    if (step === 'email') {
      // TODO: Send OTP to email
      setStep('otp')
    } else if (step === 'otp') {
      // TODO: Verify OTP
      setStep('password')
    } else {
      // TODO: Reset password
      // Redirect to login page
    }
  }

  return (
    <div className="flex aspect-square w-full max-w-[400px] flex-col justify-between rounded-2xl border bg-white p-8 shadow-2xl shadow-cyan-500/20">
      <AuthHeader
        title={
          step === 'email'
            ? 'Forgot Password?'
            : step === 'otp'
              ? 'Enter OTP'
              : 'Reset Password'
        }
        description={
          step === 'email'
            ? "Enter your email and we'll send you a reset link."
            : step === 'otp'
              ? 'Enter the OTP sent to your email.'
              : 'Enter your new password.'
        }
      />
      <div className="mt-5 flex grow flex-col justify-center space-y-4">
        {step === 'email' && (
          <Input
            type="email"
            placeholder="Enter your email..."
            className="w-full rounded-md px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {step === 'otp' && (
          <div className="flex justify-center">
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
          </div>
        )}
        {step === 'password' && (
          <Input
            type="password"
            placeholder="Enter new password..."
            className="w-full rounded-md px-4 py-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        )}

        <Button
          className="transition-ease w-full bg-black text-white hover:bg-black/90 hover:ring hover:ring-slate-200"
          onClick={handleSubmit}
        >
          {step === 'email'
            ? 'Send OTP'
            : step === 'otp'
              ? 'Verify OTP'
              : 'Reset Password'}
        </Button>

        <div className="flex items-center justify-center">
          <Link
            href="/login"
            className="transition-ease text-sm text-black/60 underline-offset-2 hover:text-black hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
