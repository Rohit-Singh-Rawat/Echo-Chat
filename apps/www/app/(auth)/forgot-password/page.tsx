import type { Metadata } from 'next'

import ForgetPassword from '@/components/auth/ForgetPassword'
import EchoLogo from '@/components/icons/animated/EchoLogo'

export const metadata: Metadata = {
  title: 'Forgot Password',
  description:
    'Reset your Echo account password to regain access to your account.',
  keywords: ['forgot password', 'reset password', 'account recovery', 'echo'],
}

export default function ForgetPasswordPage() {
  return (
    <div className="gridGradient container h-screen w-screen">
      <div className="py-10">
        <EchoLogo />
      </div>
      <div className="flex-center w-full py-10">
        <ForgetPassword />
      </div>
    </div>
  )
}
