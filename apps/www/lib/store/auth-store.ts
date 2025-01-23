import { create } from 'zustand'

interface AuthStore {
  isAuthenticating: boolean
  setIsAuthenticating: (isAuthenticating: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticating: false,
  setIsAuthenticating: (isAuthenticating) => set({ isAuthenticating }),
}))
