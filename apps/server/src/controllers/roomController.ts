import { Request, Response } from 'express'
import client from '@echo/db/src'

export const createRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, isPrivate } = req.body
    const room = await client.room.create({
      data: {
        name,
        isPrivate,
        createdBy: req.user!.userId,
      },
    })
    res.json(room)
  } catch (error) {
    res.status(400).json({ message: 'Failed to create room' })
  }
}

export const joinRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params
    await client.userRoom.create({
      data: {
        userId: req.user!.userId,
        roomId,
      },
    })
    res.json({ message: 'Joined room successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to join room' })
  }
}

export const getRoomHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { roomId } = req.params
    const { page = 1, limit = 50 } = req.query
    const messages = await client.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      include: { user: true },
    })
    res.json(messages)
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch room history' })
  }
}
