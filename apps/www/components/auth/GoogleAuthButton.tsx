'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

import { GoogleAuthAction } from '@/lib/actions/authActions'
import { useAuthStore } from '@/lib/store/auth-store'

export function GoogleAuthButton() {
  const { isAuthenticating, setIsAuthenticating } = useAuthStore()
  const router = useRouter()

  const { execute: executeGoogleAuth } = useAction(GoogleAuthAction, {
    onSuccess: () => {
      toast.success('Login successful', {
        id: 'google-auth',
      })
      router.push('/dashboard')
      setIsAuthenticating(false)
    },
    onError: (error) => {
      console.error('Google auth action failed:', error)
      toast.error('Login failed', {
        id: 'google-auth',
        description: 'Something went wrong',
      })
      setIsAuthenticating(false)
    },
  })

  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        await executeGoogleAuth({
          access_token: credentialResponse.code,
        })
      } catch (error) {
        console.error('Google login failed:', error)
        toast.error('Login failed', {
          description: 'Something went wrong',
        })
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error)
      toast.error('Login failed', {
        description: 'Google authentication failed',
      })
      setIsAuthenticating(false)
    },
    onNonOAuthError: () => {
      setIsAuthenticating(false)
    },
    flow: 'auth-code',
  })

  const handleGoogleLogin = () => {
    toast.loading('Authenticating with Google...', {
      id: 'google-auth',
    })
    setIsAuthenticating(true)
    googleLogin()
  }

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleGoogleLogin}
      disabled={isAuthenticating}
      aria-label="Sign in with Google"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="currentColor"
        aria-hidden="true"
        role="img"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    </Button>
  )
}
