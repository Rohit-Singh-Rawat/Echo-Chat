import jwt from 'jsonwebtoken'
import { WebSocket } from 'ws'
import client from '@echo/db/src'
import { RoomManager } from './RoomManager'
import { WebSocketMessage } from '../types/index.d'

export class User {
  public id: string
  public name: string
  public avatar: string
  public temporary: boolean
  public roomId: string
  constructor(private ws: WebSocket) {
    this.avatar = ''
    this.name = ''
    this.id = ''
    this.temporary = true
    this.roomId = ''
    this.initHandlers()
  }
  private initHandlers() {
    this.ws.on('message', async (data) => {
      const parsedData = JSON.parse(data.toString())
      console.log(parsedData, data.toString)
      switch (parsedData.type) {
        case 'join': {
          const { roomId, token, tempId, tempName, tempAvatar } =
            parsedData.payload

          const room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            include: {
              messages: {
                select: {
                  content: true,
                  sender: {
                    select: {
                      user: {
                        select: {
                          id: true,
                          name: true,
                          image: true,
                        },
                      },
                      tempUserId: true,
                      tempUsername: true,
                      tempUserImage: true,
                    },
                  },
                  sentAt: true,
                },
              },
            },
          })
          if (!room) {
            this.ws.close()
            return
          }
          if (room.closedAt && room.closedAt < new Date()) {
            this.ws.send(
              JSON.stringify({
                type: 'error',
                payload: {
                  message: 'Room is closed',
                },
              })
            )
            this.ws.close()
            return
          }
          if (token) {
            try {
              const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'your_jwt_secret_key'
              )
              if (typeof decoded === 'string' || !decoded.userId) {
                this.ws.close()
                return
              }
              const user = await client.user.findUnique({
                where: {
                  id: decoded.userId,
                },
              })
              if (!user) {
                this.ws.close()
                return
              }
              this.id = user.id
              this.avatar = user.image ?? ''
              this.name = user.name
              this.temporary = false
            } catch (err) {
              this.ws.close()
              return
            }
          } else if (tempId && tempAvatar && tempName) {
            this.avatar = tempAvatar
            this.id = tempId
            this.name = tempName
            this.temporary = true
          } else {
            return
          }

          // Check if user with same ID already exists in the room
          const existingUser = RoomManager.getInstance()
            .rooms.get(roomId)
            ?.users.find((u) => u.id === this.id)
          if (existingUser) {
            this.send({
              type: 'error',
              payload: {
                message: 'User already exists in room',
              },
            })
            this.ws.close()
            return
          }

          if (
            !(await RoomManager.getInstance().addUser(this, {
              id: room.id,
              isTemporary: room.isTemporary,
              maxTimeLimit: room.maxTimeLimit,
              maxUsers: room.maxUsers,
            }))
          ) {
            this.send({
              type: 'error',
              payload: {
                message: 'Room is full',
              },
            })

            this.ws.close()
            return
          }
          this.roomId = room.id
          RoomManager.getInstance().broadcast(
            {
              type: 'user_joined',
              payload: {
                userId: this.id,
                username: this.name,
                avatar: this.avatar,
                temporary: this.temporary,
              },
            },
            this,
            roomId
          )
          this.send({
            type: 'room_joined',
            payload: {
              userId: this.id,
              participantId: `${room.id}-${this.id}`,
              users: RoomManager.getInstance()
                .rooms.get(roomId)
                ?.users.map((u) => ({
                  userId: u.id,
                  username: u.name,
                  avatar: u.avatar,
                  temporary: u.temporary,
                })),
              maxUsers: room.maxUsers,
              maxTimeLimit: room.maxTimeLimit,
              closeTime: room.closedAt,
              isTemporary: room.isTemporary,
              last20Messages: room.isTemporary
                ? RoomManager.getInstance().rooms.get(roomId)?.last20Messages ||
                  []
                : room.messages.map((msg) => ({
                    content: msg.content,
                    userId: msg.sender.user?.id || msg.sender.tempUserId || '',
                    username:
                      msg.sender.user?.name || msg.sender.tempUsername || '',
                    avatar:
                      msg.sender.user?.image || msg.sender.tempUserImage || '',
                    sentAt: msg.sentAt,
                  })),
            },
          })
          console.log('Rooms:', [...RoomManager.getInstance().rooms.entries()])
          break
        }
        case 'message': {
          if (!this.id || !this.roomId) {
            this.send({
              type: 'error',
              payload: {
                message: 'Please join a room first',
              },
            })
            return
          }
          const { content } = parsedData.payload
          if (!content || typeof content !== 'string') {
            return
          }
          const room = RoomManager.getInstance().rooms.get(this.roomId)
          if (!room) {
            return
          }

          const messageContent = {
            type: 'receive-message',
            payload: {
              content: content,
              userId: this.id,
              avatar: this.avatar,
              username: this.name,
              sentAt: new Date(),
            },
          }
          if (room.last20Messages.length >= 20) {
            room.last20Messages.shift()
          }
          room.last20Messages.push(messageContent.payload)
          RoomManager.getInstance().broadcast(messageContent, this, this.roomId)
          this.send({
            type: 'message_sent',
            payload: messageContent.payload,
          })

          if (!RoomManager.getInstance().rooms.get(this.roomId)?.isTemporary)
            await client.message.create({
              data: {
                content,
                roomId: this.roomId,
                senderId: `${this.roomId}-${this.id}`,
              },
            })
        }
      }
    })
    this.ws.on('close', () => {
      this.destroy()
    })
  }

  public send(data: WebSocketMessage) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }
  public destroy() {
    if (this.roomId) {
      RoomManager.getInstance().removeUser(this.roomId, this)
      RoomManager.getInstance().broadcast(
        {
          type: 'user-leave',
          payload: {
            userId: this.id,
          },
        },
        this,
        this.roomId
      )
      this.send({
        type: 'self-leave',
        payload: {
          userId: this.id,
        },
      })
    }
    this.ws.close()
  }
}
