'use client'
import { signupSchema, type SignupInput } from '@echo/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '../shared/Button'

import { useRegisterContext } from '@/app/context/RegistryContext'
import { AuthHeader } from '@/components/auth/auth-header'
import { SocialAuthButtons } from '@/components/auth/social-auth-buttons'
import { Input } from '@/components/shared/Input'
import { SendVerificationOtpAction } from '@/lib/actions/authActions'

const SignupCard = () => {
  const { setStep, setEmail, setPassword, setFirstName, setLastName } =
    useRegisterContext()
  const form = useForm<Omit<SignupInput, 'code'>>({
    resolver: zodResolver(signupSchema.omit({ code: true })),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const { executeAsync, isExecuting } = useAction(SendVerificationOtpAction, {
    onSuccess: () => {
      setEmail(form.getValues('email'))
      setPassword(form.getValues('password'))
      setFirstName(form.getValues('firstName'))
      setLastName(form.getValues('lastName'))
      setStep('verify')
      toast.success('Verification email sent successfully')
    },
    onError: ({ error }) => {
      toast.error(error.serverError || 'An error occurred')
    },
  })
  const onSubmit = form.handleSubmit((data) => {
    executeAsync({ email: data.email })
  })

  return (
    <div className="flex aspect-square w-full max-w-[400px] flex-col justify-between rounded-2xl border bg-white p-8 shadow-2xl shadow-cyan-500/20">
      <AuthHeader
        title="Create an account"
        description="Please enter your details to sign up."
      />
      <form
        onSubmit={onSubmit}
        className="mt-5 flex grow flex-col justify-center space-y-4"
      >
        <SocialAuthButtons isAuthenticating={isExecuting} />

        <div className="relative flex items-center">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink rounded-full border p-1 text-[9px] text-gray-400">
            OR
          </span>
          <div className="grow border-t border-gray-200"></div>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="First name"
              className="w-1/2 rounded-md px-4 py-2"
              {...form.register('firstName')}
              error={form.formState.errors.firstName?.message}
              required
            />
            <Input
              type="text"
              placeholder="Last name"
              className="w-1/2 rounded-md px-4 py-2"
              {...form.register('lastName')}
              error={form.formState.errors.lastName?.message}
              required
            />
          </div>
          <Input
            type="email"
            placeholder="Email address"
            className="w-full rounded-md px-4 py-2"
            {...form.register('email')}
            error={form.formState.errors.email?.message}
            required
          />
          <Input
            type="password"
            placeholder="Create password"
            className="w-full rounded-md px-4 py-2"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isExecuting}
          isLoading={isExecuting}
        >
          Create account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          href="/login"
          className="transition-ease font-medium underline underline-offset-2 hover:text-black"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignupCard
