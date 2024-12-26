'use client'

import { useRegisterContext } from '@/app/context/RegistryContext'

import SignupCard from './SignupCard'
import VerifyEmailCard from './VerifyEmailCard'

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
