import type { Metadata } from 'next'

import RegistryForm from '@/components/auth/RegistryForm'
import EchoLogo from '@/components/icons/animated/EchoLogo'

export const metadata: Metadata = {
  title: 'Register',
  description:
    'Create your Echo account to unlock personalized chat experiences and seamless communication.',
  keywords: ['register', 'signup', 'create account', 'chat', 'echo'],
}

export default function SignUpPage() {
  return (
    <div className="gridGradient container h-screen w-screen">
      <div className="py-10">
        <EchoLogo />
      </div>
      <div className="flex-center w-full py-10">
        <RegistryForm />
      </div>
    </div>
  )
}
