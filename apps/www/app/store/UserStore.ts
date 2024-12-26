'use client'
import { create } from 'zustand'

import { getSession } from '@/lib/actions/authActions'
import { User } from '@/types'

interface UserState {
  user: User | null
  isLoading: boolean
  fetchUser: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => {
  const fetchUser = async () => {
    set({ isLoading: true })
    try {
      const session = await getSession()
      if (session?.data?.user) {
        set({ user: session.data.user })
      } else {
        set({ user: null })
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      set({ user: null })
    } finally {
      set({ isLoading: false })
    }
    return
  }

  fetchUser()

  return {
    user: null,
    isLoading: false,
    fetchUser,
  }
})
