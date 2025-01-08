import client from '@echo/db/src'
import { Request, Response } from 'express'
import { sendMail } from '../utils/sendMail'

export const activateFreePlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const existingSubscription = await client.subscription.findUnique({
      where: { userId },
    })

    if (existingSubscription) {
      res
        .status(400)
        .json({ message: 'User already has an active subscription' })
      return
    }

    const user = await client.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true }
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const subscription = await client.subscription.create({
      data: {
        isMonthly: false,
        planId: 'free282003',
        userId: userId,
        autoRenew: false,
      },
    })

    await client.user.update({
      where: { id: userId },
      data: {
        subscriptionId: subscription.id,
      },
    })
    await sendMail({
      subject: 'Welcome to Echo Chat Free Trial',
      email: user.email,
      message: '',
      tag: 'free_trial_active',
      username: user.name,
      dashboardLink: `${process.env.FRONTEND_URL}/dashboard`
    })

    res.status(200).json({ message: 'Free plan activated successfully' })
  } catch (error) {
    console.error('Error activating free plan:', error)
    res.status(500).json({ message: 'Failed to activate free plan' })
  }
}
