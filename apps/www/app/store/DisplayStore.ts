import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type DisplayStore = {
  displayLists: boolean
  ChangeDisplay: () => void
}

export const useDisplayStore = create<DisplayStore>()(
  persist(
    (set) => ({
      displayLists: false,
      ChangeDisplay: () => {
        set((state) => ({
          displayLists: !state.displayLists,
        }))
      },
    }),
    {
      name: 'display-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
