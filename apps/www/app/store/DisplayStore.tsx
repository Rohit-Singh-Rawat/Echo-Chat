import { create } from 'zustand'

type DisplayStore = {
  displayLists: boolean
  ChangeDisplay: () => void
}
export const useDisplayStore = create<DisplayStore>((set) => ({
  displayLists: localStorage.getItem('displayLists') === 'true' || false,
  ChangeDisplay: () => {
    set((state) => {
      localStorage.setItem('displayLists', JSON.stringify(!state.displayLists))
      return { displayLists: !state.displayLists }
    })
  },
}))
