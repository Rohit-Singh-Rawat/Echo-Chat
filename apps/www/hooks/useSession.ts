'use client'
import { create } from 'zustand'

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
} | null

interface SessionState {
  user: User
  isAuthenticated: boolean
  fetchSession: () => Promise<void>
}

export const useSession = create<SessionState>((set) => ({
  user: null,
  isAuthenticated: false,
  fetchSession: async () => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      set({ user: null, isAuthenticated: false })
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASE_URL}/api/v1/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        set({ user: data.user, isAuthenticated: true })
      } else {
        set({ user: null, isAuthenticated: false })
      }
    } catch (error) {
      console.error('Failed to fetch session:', error)
      set({ user: null, isAuthenticated: false })
    }
  },
}))
