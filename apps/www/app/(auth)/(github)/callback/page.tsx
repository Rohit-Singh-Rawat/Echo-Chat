'use client'

import { Github } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { Suspense, useEffect } from 'react'
import { toast } from 'sonner'

import { GithubAuthAction } from '@/lib/actions/authActions'

function GitHubCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const code = searchParams.get('code')

  const { execute } = useAction(GithubAuthAction, {
    onSuccess: (result) => {
      if (result.data?.success) {
        toast.success('Successfully authenticated with GitHub', {
          id: 'github-auth',
        })
        router.push('/dashboard')
      } else {
        toast.error('Authentication failed', { id: 'github-auth' })
        router.push('/login')
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError || 'Authentication failed', {
        id: 'github-auth',
      })
      router.push('/login')
    },
  })

  useEffect(() => {
    if (error) {
      toast.error('GitHub authentication failed')
      router.push('/login')
      return
    }

    if (!code) {
      toast.error('No authorization code received from GitHub')
      router.push('/login')
      return
    }

    const toastId = 'github-auth'
    toast.loading('Authenticating with GitHub...', { id: toastId })

    execute({ code })
  }, [error, code, router, execute])

  return (
    <div className="gridGradient flex-center h-screen w-screen place-items-center">
      <div className="grid gap-4 text-center">
        <Github className="mx-auto size-12 animate-pulse text-gray-800" />
        <div className="text-lg font-medium">Authenticating with GitHub...</div>
        <div className="text-sm text-gray-500">
          Please wait while we complete the process
        </div>
        <div className="text-xs text-gray-400">
          You will be redirected to your dashboard once authenticated
        </div>
        <div className="mt-2 text-[10px] text-gray-400">
          This may take a few seconds
        </div>
      </div>
    </div>
  )
}

export default function GitHubCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="gridGradient flex-center h-screen w-screen place-items-center">
          <div className="grid gap-4 text-center">
            <Github className="mx-auto size-12 animate-pulse text-gray-800" />
            <div className="text-lg font-medium">Loading...</div>
          </div>
        </div>
      }
    >
      <GitHubCallbackContent />
    </Suspense>
  )
}
