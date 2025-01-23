import { create } from 'zustand'

type UserIdentityStore = {
  userId: string | null
  participantId: string | null
  anonymous: boolean | null
  setUserId: (id: string) => void
  setParticipantId: (id: string) => void
  setAnonymous: (isAnonymous: boolean) => void
  reset: () => void
}

export const useIdentityStore = create<UserIdentityStore>((set) => ({
  userId: null,
  participantId: null,
  anonymous: null,
  setUserId: (id: string) => {
    set((state) => ({ ...state, userId: id }))
  },
  setParticipantId: (id: string) => {
    set((state) => ({ ...state, participantId: id }))
  },
  setAnonymous: (isAnonymous: boolean) => {
    set((state) => ({ ...state, anonymous: isAnonymous }))
  },
  reset: () => {
    set(() => ({
      userId: null,
      participantId: null,
      anonymous: null,
    }))
  },
}))
