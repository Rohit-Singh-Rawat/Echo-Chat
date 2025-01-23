import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return NextResponse.json({ user: null })
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
          revalidate: 60,
        },
        cache: 'force-cache',
      }
    )

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({ user: data.user })
    } else {
      return NextResponse.json({ user: null })
    }
  } catch (error) {
    return NextResponse.json({ user: null })
  }
}
