import SignupCard from '@/components/auth/SignupCard'
import VerifyEmailCard from '@/components/auth/VerifyEmailCard'
import EchoLogo from '@/components/icons/animated/EchoLogo'

export default function SignUpPage() {
  return (
    <div className="gridGradient container h-screen w-screen">
      <div className="py-10">
        <EchoLogo />
      </div>
      <div className="flex-center w-full py-10">
        <SignupCard />
        <VerifyEmailCard />
      </div>
    </div>
  )
}
