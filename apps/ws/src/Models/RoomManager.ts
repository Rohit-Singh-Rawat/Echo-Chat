import { Room, RoomInfo, WebSocketMessage } from './../types/index.d'
import client from '@echo/db/src'
import { User } from './User'

export class RoomManager {
  rooms: Map<string, Room> = new Map()
  static instance: RoomManager
  private constructor() {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new RoomManager()
    }
    return this.instance
  }
  public async addUser(user: User, roomInfo: RoomInfo) {
    if (!this.rooms.has(roomInfo.id)) {
      this.rooms.set(roomInfo.id, {
        users: [],
        isTemporary: roomInfo.isTemporary,
        last20Messages: [],
        maxTimeLimit: roomInfo.maxTimeLimit,
        maxUsers: roomInfo.maxUsers,
      })
    }
    const room = this.rooms.get(roomInfo.id)!
    if (room.users.length >= room.maxUsers) {
      return false
    }
    console.log('d')
    if (!(roomInfo.id === 'public'))
      await client.roomParticipant.upsert({
        where: {
          id: `${roomInfo.id}-${user.id}`,
        },
        update: {
          leftAt: null,
          roomId: roomInfo.id,
          joinedAt: new Date(),
          ...(user.temporary
            ? {
                tempUserId: user.id,
                tempUsername: user.name,
                tempUserImage: user.avatar,
              }
            : {
                userId: user.id,
              }),
        },
        create: {
          id: `${roomInfo.id}-${user.id}`,
          roomId: roomInfo.id,
          ...(user.temporary
            ? {
                tempUserId: user.id,
                tempUsername: user.name,
                tempUserImage: user.avatar,
              }
            : {
                userId: user.id,
              }),
        },
      })
    console.log(room)
    room.users.push(user)
    console.log(room)
    return true
  }
  public broadcast(data: WebSocketMessage, user: User, roomId: string) {
    const room = this.rooms.get(roomId)
    if (!room) {
      return
    }

    room.users.forEach((u) => {
      if (u.id !== user.id) {
        u.send(data)
      }
    })
  }
  public async removeUser(roomId: string, user: User) {
    const room = this.rooms.get(roomId)
    if (room) {
      room.users = room.users.filter((u) => u.id !== user.id)

      await client.roomParticipant.update({
        where: {
          id: `${roomId}-${user.id}`,
          ...(user.temporary
            ? {
                tempUserId: user.id,
              }
            : {
                userId: user.id,
              }),
        },
        data: {
          leftAt: new Date(),
        },
      })

      if (room.users.length === 0) {
        this.rooms.delete(roomId)
      }
    }
  }
}
