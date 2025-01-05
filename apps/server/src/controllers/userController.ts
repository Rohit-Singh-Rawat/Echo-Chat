import { Request, Response } from 'express'
import client from '@echo/db/src'
import { updateProfileSchema } from '@echo/lib'

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
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = updateProfileSchema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({
        message: 'Invalid input',
        errors: result.error.errors,
      })
      return
    }

    const { name, image } = result.data

    const updateData: { name?: string; image?: string } = {}
    if (name) updateData.name = name
    if (image) updateData.image = image

    const updatedUser = await client.user.update({
      where: { id: req.user!.userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        image: true,
      },
    })
    console.log('object')
    res.json(updatedUser)
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ message: 'Failed to update profile' })
  }
}
export const deleteAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.userId

    await client.user.delete({
      where: { id: userId },
    })
    res.status(200).json({ message: 'Account deleted successfully' })
  } catch (error) {
    console.error('Error deleting account:', error)
    res.status(500).json({ message: 'Failed to delete account' })
  }
}
