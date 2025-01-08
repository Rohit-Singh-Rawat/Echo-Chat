'use client'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@echo/ui/components/ui/input-otp.tsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'

import { AuthHeader } from '@/components/auth/auth-header'
import Input from '@/components/shared/Input'
import {
  ForgotPasswordAction,
  ResetPasswordAction,
} from '@/lib/actions/authActions'

import { Button } from '../shared/Button'

const ForgetPassword = () => {
  const router = useRouter()
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const { execute: executeForgotPassword, isExecuting: isExecutingForgot } =
    useAction(ForgotPasswordAction, {
      onSuccess: () => {
        toast.success('OTP sent to your email')
        setStep('otp')
      },
      onError: ({ error }) => {
        toast.error(error.serverError ?? 'Something went wrong')
      },
    })

  const { execute: executeResetPassword, isExecuting: isExecutingReset } =
    useAction(ResetPasswordAction, {
      onSuccess: () => {
        toast.success('Password reset successful')
        router.push('/login')
      },
      onError: ({ error }) => {
        toast.error(error.serverError ?? 'Something went wrong')
      },
    })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    try {
      if (step === 'email') {
        await executeForgotPassword({ email })
      } else if (step === 'otp') {
        setStep('password')
      } else {
        if (newPassword !== confirmPassword) {
          toast.error('Passwords do not match')
          return
        }
        if (!passwordRegex.test(newPassword)) {
          toast.error(
            'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character, with a minimum length of 8 characters.'
          )
          return
        }

        await executeResetPassword({
          email,
          password: newPassword,
          code,
        })
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      )
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
      <form onSubmit={handleSubmit} className="mt-10 flex-1">
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
              <InputOTP
                maxLength={6}
                pattern={'^\\d+$'}
                value={code}
                onChange={setCode}
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
            </div>
          )}
          {step === 'password' && (
            <>
              <Input
                type="password"
                placeholder="Enter new password..."
                className="w-full rounded-md px-4 py-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm new password..."
                className="w-full rounded-md px-4 py-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          <Button
            className="transition-ease w-full bg-black text-white hover:bg-black/90 hover:ring hover:ring-slate-200"
            onClick={handleSubmit}
            isLoading={
              step === 'email'
                ? isExecutingForgot
                : step === 'password'
                  ? isExecutingReset
                  : false
            }
            disabled={
              step === 'email'
                ? isExecutingForgot
                : step === 'password'
                  ? isExecutingReset
                  : false
            }
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
      </form>
    </div>
  )
}

export default ForgetPassword
