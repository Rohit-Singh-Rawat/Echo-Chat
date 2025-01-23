'use client'
import { loginSchema, type LoginInput } from '@echo/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthHeader } from '@/components/auth/auth-header'
import Input from '@/components/shared/Input'
import { LoginAction } from '@/lib/actions/authActions'
import { useAuthStore } from '@/lib/store/auth-store'

import { Button } from '../shared/Button'

import AuthProviderButtons from './AuthProviderButtons'

interface LoginCardProps {
  error?: string
}

const LoginCard = ({ error }: LoginCardProps) => {
  const router = useRouter()

  const { isAuthenticating, setIsAuthenticating } = useAuthStore()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { executeAsync, isExecuting } = useAction(LoginAction, {
    onSuccess: () => {
      toast.success('Logged in successfully')
      router.push('/dashboard')
      setIsAuthenticating(false)
    },
    onError: ({ error }) => {
      toast.error(error.serverError || 'Invalid credentials')
      setIsAuthenticating(false)
    },
  })

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        toast.error(error)
      }, 500)
    }
  }, [error])

  const onSubmit = form.handleSubmit((data) => {
    setIsAuthenticating(true)
    executeAsync(data)
  })

  return (
    <div className="flex aspect-square w-full max-w-[400px] flex-col justify-between rounded-2xl border bg-white p-8 shadow-2xl shadow-cyan-500/20">
      <AuthHeader
        title="Welcome back"
        description="Please enter your details to sign in."
      />
      <div className="mt-5 flex grow flex-col justify-center space-y-4">
        <AuthProviderButtons />
        <div className="relative flex items-center">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink rounded-full border p-1 text-[9px] text-gray-400">
            OR
          </span>
          <div className="grow border-t border-gray-200"></div>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email..."
              className="w-full rounded-md px-4 py-2"
              {...form.register('email')}
              error={form.formState.errors.email?.message}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              className="w-full rounded-md px-4 py-2"
              {...form.register('password')}
              error={form.formState.errors.password?.message}
              required
            />
          </div>

          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="transition-ease text-sm text-black/60 underline-offset-2 hover:text-black hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="transition-ease w-full bg-black text-white hover:bg-black/90 hover:ring hover:ring-slate-200"
            disabled={isAuthenticating}
            isLoading={isExecuting}
          >
            Sign in
          </Button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account yet?{' '}
        <Link
          href="/register"
          className="transition-ease font-medium underline underline-offset-2 hover:text-black"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default LoginCard
