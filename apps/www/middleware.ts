import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getSession } from '@/lib/actions/authActions'
import { User } from '@/types'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')

  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/history', '/profile']
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token) {
    const session = (await getSession()) as { data: { user: User } } | null
    console.log(session)

    if (!session?.data?.user && isProtectedPath) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (
      session?.data?.user &&
      !session?.data?.user.subscription &&
      request.nextUrl.pathname !== '/plans'
    ) {
      return NextResponse.redirect(new URL('/plans', request.url))
    }

    const authPaths = ['/login', '/register']
    if (authPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/profile/:path*',
    '/history/:path*',
    '/login',
    '/register',
    '/plans',
  ],
}
