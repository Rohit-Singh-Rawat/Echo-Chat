import { RoomManager } from '../types'

class RoomManagerService {
  private rooms: RoomManager = {}

  joinRoom(room: string, clientIp: string): void {
    if (!this.rooms[room]) {
      this.rooms[room] = new Set<string>()
    }
    this.rooms[room].add(clientIp)
  }

  leaveRoom(room: string, clientIp: string): boolean {
    if (!this.rooms[room]) return false
    return this.rooms[room].delete(clientIp)
  }

  roomExists(room: string): boolean {
    return !!this.rooms[room]
  }

  getRoom(room: string): Set<string> | undefined {
    return this.rooms[room]
  }
}

export const roomManager = new RoomManagerService()
