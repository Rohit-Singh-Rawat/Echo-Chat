import { create } from 'zustand'

type RoomState = {
  id: string | null
  name: string | null
  closeTime: Date | null
  isTemporary: boolean
}

type RoomActions = {
  setRoom: (room: Partial<RoomState>) => void
  clearRoom: () => void
}

const useRoomStore = create<RoomState & RoomActions>((set) => ({
  id: null,
  name: null,
  closeTime: null,
  isTemporary: false,
  setRoom: (room) => set((state) => ({ ...state, ...room })),
  clearRoom: () =>
    set({ id: null, name: null, closeTime: null, isTemporary: false }),
}))

export default useRoomStore
