import * as z from 'zod'

export const createOrderSchema = z.object({
  planId: z.string().min(1),
  isMonthly: z.boolean(),
  currency: z.string().length(3).optional().default('INR'),
})

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
})
