'use client'

import SignupCard from './SignupCard'
import VerifyEmailCard from './VerifyEmailCard'

import { useRegisterContext } from '@/app/context/RegistryContext'

const RegistryFlow = () => {
  const { step } = useRegisterContext()

  return (
    <div className="flex-center w-full">
      {step === 'signup' && <SignupCard />}
      {step === 'verify' && <VerifyEmailCard />}
    </div>
  )
}

export default RegistryFlow
