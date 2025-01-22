import { Request, Response } from 'express'
import client from '@echo/db/src'
import { createRoomSchema } from '@echo/lib'
import { RoomWithParticipants, UserWithRooms } from '../types'
import { s3Client } from '../utils/S3Client'
import getKeyFromUrl from '../utils/getKeyFromUrl'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'

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

export const getRoomsHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const rooms = await client.room.findMany({
      where: {
        createdBy: {
          id: req.user!.userId,
        },
        closedAt: { lt: new Date() },
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
        closedAt: 'desc',
      },
    })

    res.json(rooms)
  } catch (error) {
    console.error('Error fetching rooms history:', error)
    res.status(400).json({ message: 'Failed to fetch rooms history' })
  }
}
export const getRoomHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { roomId } = req.params

    const room = await client.room.findFirst({
      where: {
        id: roomId,
        createdBy: {
          id: req.user!.userId,
        },
      },
    })

    if (!room) {
      res.status(404).json({ message: 'Room not found' })
      return
    }

    const messages = await client.message.findMany({
      where: { roomId },
      select: {
        id: true,
        content: true,
        image: true,
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
        reaction: {
          select: {
            emoji: true,
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
          },
        },
        sentAt: true,
      },
      orderBy: { sentAt: 'asc' },
    })
    res.json(
      messages.map((msg) => {
        const sender = msg.sender
        return {
          content: msg.content,
          id: msg.id,
          ...(msg.image && { image: msg.image }),
          userId: sender.user?.id || sender.tempUserId || '',
          username: sender.user?.name || sender.tempUsername || '',
          avatar: sender.user?.image || sender.tempUserImage || '',
          sentAt: msg.sentAt,
          reactions: msg.reaction.reduce(
            (
              reactions: Record<
                string,
                { id: string; name: string; avatar: string }[]
              >,
              reaction
            ) => {
              const reactionSender = reaction.sender
              const reactionUser = {
                id: reactionSender.user?.id || reactionSender.tempUserId || '',
                name:
                  reactionSender.user?.name ||
                  reactionSender.tempUsername ||
                  '',
                avatar:
                  reactionSender.user?.image ||
                  reactionSender.tempUserImage ||
                  '',
              }

              if (!reactions[reaction.emoji]) {
                reactions[reaction.emoji] = []
              }
              reactions[reaction.emoji]!.push(reactionUser)
              return reactions
            },
            {}
          ),
        }
      })
    )
  } catch (error) {
    console.error('Error fetching room history:', error)
    res.status(400).json({ message: 'Failed to fetch room history' })
  }
}

export const getUserRooms = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const search = req.query.search as string | undefined

    const user = (await client.user.findUnique({
      where: {
        id: req.user!.userId,
      },
      include: {
        rooms: {
          where: {
            closedAt: { gte: new Date() },
            ...(search && {
              OR: [{ name: { contains: search, mode: 'insensitive' } }],
            }),
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
                  id: 'public',
                },
              ],
              ...(search && {
                OR: [{ name: { contains: search, mode: 'insensitive' } }],
              }),
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
export const removeRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const room = await client.room.findFirst({
      where: {
        id: roomId,
        createdBy: { id: userId },
      },
      include: { messages: { select: { image: true } } },
    })

    if (!room) {
      return res
        .status(404)
        .json({ message: 'Room not found or unauthorized to delete' })
    }
    if (!room.isTemporary) {
      for (const message of room.messages) {
        if (message.image) {
          try {
            await s3Client.send(
              new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME ?? '',
                Key: getKeyFromUrl(message.image),
              })
            )
          } catch (err) {
            console.error('Error deleting image from S3:', err)
          }
        }
      }
    }
    await client.room.delete({
      where: {
        id: roomId,
      },
    })

    return res.status(200).json({ message: 'Room deleted successfully' })
  } catch (error) {
    console.error('Error removing room:', error)
    return res.status(500).json({ message: 'Failed to remove room' })
  }
}
