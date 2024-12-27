import { Request, Response } from 'express'
import client from '@echo/db/src'

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await client.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        subscription: {
          select: {
            plan: {
              select: {
                maxRooms: true,
                maxSavedRooms: true,
                maxTimeLimit: true,
                maxUsers: true,
              },
            },
          },
        },
        savedRoomsCount: true,
        roomsCount: true,
      },
    })

    if (!stats) {
      res.status(404).json({ message: 'User stats not found' })
      return
    }

    res.json({
      totalRooms: stats.roomsCount,
      savedRooms: stats.savedRoomsCount,
      temporaryRooms: stats.roomsCount - stats.savedRoomsCount,
      limits: {
        maxRooms: stats.subscription?.plan?.maxRooms ?? 0,
        maxSavedRooms: stats.subscription?.plan?.maxSavedRooms ?? 0,
        maxTimeLimit: stats.subscription?.plan?.maxTimeLimit ?? 0,
        maxUsers: stats.subscription?.plan?.maxUsers ?? 0,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user stats' })
  }
}
