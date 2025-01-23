import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const code = params.code as string | undefined

  const getErrorMessage = (code: string | undefined) => {
    switch (code) {
      case 'no_user_found':
        return 'No user account was found. Please try logging in again.'
      case 'something_went_wrong':
        return 'Something went wrong. Please try again later.'
      case 'unauthorized':
        return 'You are not authorized to access this resource.'
      case 'session_expired':
        return 'Your session has expired. Please log in again.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6">
      <div className="mx-auto w-full max-w-lg rounded-lg border border-gray-100 bg-white p-6 shadow-md transition-all hover:shadow-lg sm:p-8">
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-red-50 p-3">
            <AlertCircle className="size-8 text-red-400 sm:size-10" />
          </div>
        </div>
        <div className="mt-6 text-center">
          <h1 className="mb-2 text-xl font-medium tracking-tight text-gray-800 sm:text-2xl">
            Oops! An Error Occurred
          </h1>
          <p className="text-base text-gray-600">{getErrorMessage(code)}</p>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 border-t border-gray-50 pt-6 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-red-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            Back to Login
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
