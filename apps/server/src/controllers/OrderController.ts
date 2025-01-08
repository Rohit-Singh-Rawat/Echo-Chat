import { Request, Response } from 'express'
import client from '@echo/db/src'
import razorpay from '../utils/Razorpay'
import { sendMail } from '../utils/sendMail'
import axios from 'axios'
import { createOrderSchema, verifyPaymentSchema } from '@echo/lib'
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = createOrderSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ errors: result.error.errors })
      return
    }

    const { planId, isMonthly, currency } = result.data
    const userId = req.user?.userId

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const plan = await client.plan.findUnique({
      where: { id: planId },
    })

    if (!plan) {
      res.status(404).json({ message: 'Plan not found' })
      return
    }

    // Get latest exchange rates from API
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/USD`
    )
    const rates = response.data.rates

    if (!rates[currency]) {
      res.status(400).json({ message: 'Invalid currency' })
      return
    }

    const baseAmount = isMonthly ? plan.price : plan.price * 12 * 0.8 // 20% discount for yearly
    const amount = baseAmount * rates[currency]

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: currency,
      receipt: `order_${Date.now()}`,
    })

    const purchase = await client.purchase.create({
      data: {
        razorpayOrderId: order.id,
        amount,
        currency,
        userId,
        planId,
      },
    })

    res.json({
      orderId: order.id,
      amount,
      currency,
      purchaseId: purchase.id,
    })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ message: 'Failed to create order' })
  }
}

export const verifyPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = verifyPaymentSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ errors: result.error.errors })
      return
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = result.data
    const userId = req.user?.userId

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const purchase = await client.purchase.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    })

    if (!purchase) {
      res.status(404).json({ message: 'Purchase not found' })
      return
    }

    // Update purchase with payment details
    await client.purchase.update({
      where: { id: purchase.id },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'completed',
      },
    })

    // Get latest exchange rates for conversion back to USD
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/USD`
    )
    const rates = response.data.rates

    const amountInUSD = purchase.amount / rates[purchase.currency]
    const isMonthly = amountInUSD <= 100 // Assuming monthly plans are <= 100 USD

    // Create or update subscription
    const subscription = await client.subscription.upsert({
      where: { userId },
      create: {
        userId,
        planId: purchase.planId,
        isPro: true,
        isMonthly,
        endDate: new Date(
          Date.now() + (isMonthly ? 30 : 365) * 24 * 60 * 60 * 1000
        ),
      },
      update: {
        planId: purchase.planId,
        isPro: true,
        isMonthly,
        endDate: new Date(
          Date.now() + (isMonthly ? 30 : 365) * 24 * 60 * 60 * 1000
        ),
      },
    })

    // Update user with subscription
    await client.user.update({
      where: { id: userId },
      data: {
        subscriptionId: subscription.id,
      },
    })

    // Send confirmation email
    await sendMail({
      subject: 'Payment Successful - Echo Chat Pro Activated',
      email: purchase.user.email,
      message: '',
      tag: 'subscription_active',
      username: purchase.user.name,
      dashboardLink: `${process.env.FRONTEND_URL}/dashboard`,
    })

    res.json({
      message: 'Payment verified successfully',
      subscription,
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    res.status(500).json({ message: 'Failed to verify payment' })
  }
}
