import client from '@echo/db/src'
import { Request, Response } from 'express'

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

    res.status(200).json({ message: 'Free plan activated successfully' })
  } catch (error) {
    console.error('Error activating free plan:', error)
    res.status(500).json({ message: 'Failed to activate free plan' })
  }
}

export const activateProPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    // Check if user already has a subscription
    const existingSubscription = await client.subscription.findUnique({
      where: { userId },
    })

    if (existingSubscription) {
      res
        .status(400)
        .json({ message: 'User already has an active subscription' })
      return
    }

    const subscription = await client.subscription.create({
      data: {
        isMonthly: true,
        planId: 'pro999',
        userId: userId,
        autoRenew: true,
        isPro: true,
      },
    })

    await client.user.update({
      where: { id: userId },
      data: {
        subscriptionId: subscription.id,
      },
    })

    res.status(200).json({ message: 'Pro plan activated successfully' })
  } catch (error) {
    console.error('Error activating pro plan:', error)
    res.status(500).json({ message: 'Failed to activate pro plan' })
  }
}
