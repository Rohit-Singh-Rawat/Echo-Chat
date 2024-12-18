export type User = {
  email: string
  id: string
  name: string
  avatar: string
  subscriptionId: string | null
  subscription: {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    planId: string
    isPro: boolean
    startDate: Date
    endDate: Date | null
    isMonthly: boolean
    autoRenew: boolean
  } | null
} | null
export type Rooms = {
  [k: string]: RoomWithParticipants
}

export type RoomParticipant = {
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
export type UserStats = {
  totalRooms: number
  savedRooms: number
  temporaryRooms: number
  limits: {
    maxRooms: number
    maxSavedRooms: number
  }
}
export interface Message {
  userId: string
  id: string
  username: string
  avatar: string
  content: string
  sentAt: Date
  reactions: Record<string, { id: string; name: string; avatar: string }[]>
  image?: string
}

export interface UserIdentity {
  userId: string
  username: string
  avatar: string
}

export interface PageClientProps {
  roomId: string
  token?: string
}
