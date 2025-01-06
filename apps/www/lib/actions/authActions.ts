'use server'
import {
  emailVerifySchema,
  signupSchema,
  loginSchema,
  googleAuthSchema,
} from '@echo/lib'
import { cookies } from 'next/headers'

import { actionClient } from './safe-actions'
export const SendVerificationOtpAction = actionClient
  .schema(emailVerifySchema)
  .action(async ({ parsedInput: { email } }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/auth/verify-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      }
    )
    if (!res.ok) {
      const errorData = await res.json()

      throw new Error(errorData.message || 'Failed to send verification code')
    }

    const data = await res.json()
    if (data.success) {
      return { message: 'ok' }
    }

    throw new Error('Failed to send verification code')
  })

export const CreateUserAccountAction = actionClient
  .schema(signupSchema)
  .action(
    async ({ parsedInput: { email, code, firstName, lastName, password } }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code, firstName, lastName, password }),
          credentials: 'include',
        }
      )
      const data = await res.json()
      if (data.token) {
        const cookieStore = await cookies()
        cookieStore.set('token', data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        return { message: 'ok', token: data.token }
      }

      throw new Error('Failed to create account')
    }
  )

export const LoginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      }
    )
    const data = await res.json()
    if (data.token) {
      const cookieStore = await cookies()
      cookieStore.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      return { message: 'ok', token: data.token }
    }

    throw new Error('Invalid credentials')
  })

export const getSession = actionClient.action(async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  if (!token) {
    return { user: null }
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['user'],
        },
      }
    )

    if (response.ok) {
      const data = await response.json()

      return { user: data.user }
    } else {
      return { user: null }
    }
  } catch (error) {
    return { user: null }
  }
})

export const logout = actionClient.action(async () => {
  const cookieStore = await cookies()

  try {
    // Remove all cookies
    const allCookies = cookieStore.getAll()
    for (const cookie of allCookies) {
      cookieStore.delete(cookie.name)
    }

    return { success: true }
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
})
export const GoogleAuthAction = actionClient
  .schema(googleAuthSchema)
  .action(async ({ parsedInput: { access_token } }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/auth/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to authenticate with Google')
      }

      const cookieStore = await cookies()
      cookieStore.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

      return { success: true }
    } catch (error) {
      console.error('Google auth error:', error)
      throw {
        serverError:
          error instanceof Error
            ? error.message
            : 'Failed to authenticate with Google',
      }
    }
  })
