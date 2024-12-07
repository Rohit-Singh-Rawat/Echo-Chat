import { User } from '../Models/User'

export interface ParsedData {
  type: string
  payload: {
    [key: string]: unknown
  }
}

export interface Room {
  users: User[]
  maxTimeLimit: number
  maxUsers: number
  isTemporary: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  last20Messages: any[]
}

export interface RoomInfo {
  maxTimeLimit: number
  maxUsers: number
  isTemporary: boolean
  id: string
}

export interface WebSocketMessage {
  type: string
  payload: unknown
}
