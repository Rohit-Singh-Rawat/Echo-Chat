import { Request, Response } from 'express'
import client from '@echo/db/src'

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await client.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile' })
  }
}

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await client.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        _count: {
          select: {
            messages: true,
            rooms: true,
          },
        },
      },
    })
    if (!stats) {
      res.status(404).json({ message: 'User stats not found' })
      return
    }
    res.json(stats)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user stats' })
  }
}

export const upgradeToPro = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const { paymentToken } = req.body;
    // Here you would typically integrate with a payment processor
    // For now, we'll just update the user's role to 'PRO'
    const updatedUser = await client.user.update({
      where: { id: req.user!.userId },
      data: { role: 'PRO' },
    })
    res.json({ message: 'Upgrade successful', user: updatedUser })
  } catch (error) {
    res.status(400).json({ message: 'Upgrade failed' })
  }
}
