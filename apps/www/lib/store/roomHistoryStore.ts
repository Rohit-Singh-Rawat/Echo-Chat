import { create } from 'zustand'

import { RoomWithParticipants as Room, Rooms } from '@/types'

interface RoomStore {
  rooms: Rooms | null
  setRooms: (rooms: Rooms) => void
  addRoom: (room: Room) => void
  removeRoom: (roomId: string) => void
  filterRooms: (query: string) => Rooms
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: null,

  setRooms: (rooms) => set({ rooms }),

  addRoom: (room) =>
    set((state) => ({
      rooms: state.rooms
        ? { ...state.rooms, [room.id]: room }
        : { [room.id]: room },
    })),

  removeRoom: (roomId) =>
    set((state) => {
      if (!state.rooms) return { rooms: null }
      const newRooms = { ...state.rooms }
      delete newRooms[roomId]
      return { rooms: newRooms }
    }),

  filterRooms: (query) => {
    const { rooms } = get()
    if (!rooms) return {}
    if (!query) return rooms

    const filtered: Rooms = {}
    Object.entries(rooms).forEach(([id, room]) => {
      if (
        room.name.toLowerCase().includes(query.toLowerCase()) ||
        id.toLowerCase().includes(query.toLowerCase())
      ) {
        filtered[id] = room
      }
    })
    return filtered
  },
}))
