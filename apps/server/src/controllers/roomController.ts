import { Request, Response } from 'express'
import client from '@echo/db/src'
import { createRoomSchema } from '@echo/lib'
import { RoomWithParticipants, UserWithRooms } from '../types'

const validateSubscriptionLimits = (
  user: {
    subscription?: {
      plan: {
        maxTimeLimit: number
        maxUsers: number
        maxRooms: number
        maxSavedRooms: number
      }
    } | null
    roomsCount: number
    savedRoomsCount: number
  },
  maxTimeLimit: number,
  maxUsers: number,
  isTemporary: boolean
) => {
  if (!user) {
    return { error: 'User not found', status: 404 }
  }

  if (!user.subscription || !user.subscription.plan) {
    return { error: 'No active subscription', status: 403 }
  }

  if (maxTimeLimit > user.subscription.plan.maxTimeLimit) {
    return { error: 'Time limit exceeds plan maximum', status: 403 }
  }

  if (maxUsers > user.subscription.plan.maxUsers) {
    return { error: 'User limit exceeds plan maximum', status: 403 }
  }

  if (isTemporary) {
    if (user.roomsCount >= user.subscription.plan.maxRooms) {
      return { error: 'Room limit reached for your plan', status: 403 }
    }
  } else {
    if (user.savedRoomsCount >= user.subscription.plan.maxSavedRooms) {
      return { error: 'Saved room limit reached for your plan', status: 403 }
    }
  }

  return null
}

export const createRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = createRoomSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ message: 'Invalid request body' })
      return
    }

    const { name, isTemporary, maxTimeLimit, maxUsers } = req.body

    const user = await client.user.findUnique({
      where: {
        id: req.user?.userId,
      },
      include: {
        subscription: {
          include: {
            plan: true,
          },
        },
      },
    })

    if (!user) {
      res.status(404).json({ message: 'user not found' })

      return
    }
    const validationError = validateSubscriptionLimits(
      user,
      maxTimeLimit,
      maxUsers,
      isTemporary
    )

    console.log('objecwwwt', validationError)
    if (validationError) {
      res
        .status(validationError.status)
        .json({ message: validationError.error })
      return
    }
    const room = await client.room.create({
      data: {
        name,
        isTemporary,
        maxTimeLimit,
        closedAt: new Date(Date.now() + maxTimeLimit * 60 * 1000),
        maxUsers,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    console.log('objecwwwt')
    await client.user.update({
      where: { id: user.id },
      data: isTemporary
        ? { roomsCount: user.roomsCount + 1 }
        : {
            roomsCount: user.roomsCount + 1,
            savedRoomsCount: user.savedRoomsCount + 1,
          },
    })

    res.status(201).json(room)
  } catch (error) {
    console.error('Error creating room:', error)
    res.status(400).json({ message: 'Failed to create room' })
  }
}

// export const joinRoom = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { roomId } = req.params
//     await client.roomParticipant.create({
//       data: {
//         userId: req.user!.userId,
//         roomId,
//       },
//     })
//     res.json({ message: 'Joined room successfully' })
//   } catch (error) {
//     res.status(400).json({ message: 'Failed to join room' })
//   }
// }

export const getRoomHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { roomId } = req.params
    const { page = 1, limit = 50 } = req.query
    const messages = await client.message.findMany({
      where: { roomId },
      orderBy: { sentAt: 'desc' },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    })
    res.json(messages)
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch room history' })
  }
}

export const getUserRooms = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = (await client.user.findUnique({
      where: {
        id: req.user!.userId,
      },
      include: {
        rooms: {
          where: {
            closedAt: { gte: new Date() },
          },
          include: {
            _count: {
              select: {
                messages: true,
              },
            },
            participants: {
              select: {
                id: true,
                tempUsername: true,
                tempUserId: true,
                joinedAt: true,
                leftAt: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
          },
          orderBy: {
            updatedAt: 'desc',
          },
        },
        RoomParticipant: {
          where: {
            room: {
              OR: [
                {
                  closedAt: { gte: new Date() },
                },
                {
                  id: 'public'
                }
              ]
            },
          },
          include: {
            room: {
              include: {
                _count: {
                  select: {
                    messages: true,
                  },
                },
                participants: {
                  select: {
                    id: true,
                    tempUsername: true,
                    tempUserId: true,
                    joinedAt: true,
                    leftAt: true,
                    user: {
                      select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                      },
                    },
                  },
                },
              },
            },
          },
          orderBy: {
            room: {
              updatedAt: 'desc',
            },
          },
        },
      },
    })) as UserWithRooms | null

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const roomMap = new Map<string, RoomWithParticipants>()

    user.rooms.forEach((room) => {
      roomMap.set(room.id, room)
    })

    user.RoomParticipant.forEach((p) => {
      roomMap.set(p.room.id, p.room)
    })

    const rooms = Object.fromEntries(roomMap)
    console.log(rooms, user)
    return res.json(rooms)
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch user rooms' })
  }
}
