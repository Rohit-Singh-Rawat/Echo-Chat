'use client'
import { Button } from '@echo/ui/components/ui/button.tsx'
import Link from 'next/link'

import { AuthHeader } from '@/components/auth/auth-header'
import { SocialAuthButtons } from '@/components/auth/social-auth-buttons'
import Input from '@/components/shared/Input'

const SignupCard = () => {
  return (
    <div className="flex aspect-square w-full max-w-[400px] flex-col justify-between rounded-2xl border bg-white p-8 shadow-2xl shadow-cyan-500/20">
      <AuthHeader
        title="Create an account"
        description="Please enter your details to sign up."
      />
      <div className="mt-5 flex grow flex-col justify-center space-y-4">
        <SocialAuthButtons />

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
            />
            <Input
              type="text"
              placeholder="Last name"
              className="w-1/2 rounded-md px-4 py-2"
            />
          </div>
          <Input
            type="email"
            placeholder="Email address"
            className="w-full rounded-md px-4 py-2"
          />
          <Input
            type="password"
            placeholder="Create password"
            className="w-full rounded-md px-4 py-2"
          />
        </div>

        <Button className="transition-ease w-full bg-black text-white hover:bg-black/90 hover:ring hover:ring-slate-200">
          Create account
        </Button>
      </div>
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
