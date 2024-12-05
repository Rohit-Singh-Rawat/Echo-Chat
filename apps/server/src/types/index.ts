export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isPro: boolean
  createdAt: Date
}

export interface Room {
  id: string
  name: string
  createdBy: string
  isPrivate: boolean
  createdAt: Date
  participants: string[]
}

export interface Message {
  id: string
  roomId: string
  userId: string
  content: string
  createdAt: Date
}

export interface UserStats {
  roomsCreated: number
  messagesCount: number
  totalParticipants: number
  activeRooms: number
}

// Auth types
export interface AuthToken {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface JWTPayload {
  userId: string
  email: string
  isPro: boolean
}

// export interface ApiResponse {
//   action: string;
//   message?: string;
//   room?: string;
//   data?: any;
// }

export interface RoomManager {
  [key: string]: Set<string>
}
type RoomParticipant = {
  id: string
  tempUsername: string | null
  tempUserId: string | null
  joinedAt: Date
  leftAt: Date | null
  user: {
    id: string
    name: string
    email: string
    image: string
  } | null
}

export type RoomWithParticipants = {
  id: string
  name: string
  isTemporary: boolean
  maxTimeLimit: number
  maxUsers: number
  createdById: string
  _count: {
    messages: number
  }
  participants: RoomParticipant[]
  updatedAt: Date
  closedAt: Date
  createdAt: Date
}

export type UserWithRooms = {
  id: string
  rooms: RoomWithParticipants[]
  RoomParticipant: {
    room: RoomWithParticipants
  }[]
}
