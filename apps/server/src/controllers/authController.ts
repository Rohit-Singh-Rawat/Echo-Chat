import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { config } from '../config'
import {
  signupSchema,
  emailVerifySchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '@echo/lib'
import client from '@echo/db/src'
import { generateOTP } from '../utils/generateOTP'
import { sendMail } from '../utils/sendMail'
import { comparePassword, hashPassword } from '../utils/hashPassword'

export const callback = async (req: Request, res: Response): Promise<void> => {
  // const { code, state } = req.query
  try {
    // Simplified: Assume handleOAuthCallback is implemented elsewhere
    const token = 'dummy_token' // Replace with actual token generation
    res.redirect(`${config.FRONTEND_URL}/auth/success?token=${token}`)
  } catch (error) {
    res.redirect(`${config.FRONTEND_URL}/auth/error`)
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  // Simplified: No token invalidation, just respond
  res.json({ message: 'Logged out successfully' })
}

export const sendVerificationOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = emailVerifySchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors })
      return
    }
    const { email } = result.data

    const existingUser = await client.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' })
      return
    }

    await client.emailVerificationToken.deleteMany({
      where: {
        identifier: email,
      },
    })

    const code = generateOTP()
    await client.emailVerificationToken.create({
      data: {
        identifier: email,
        token: code,
        expires: new Date(Date.now() + 2 * 60 * 1000),
      },
    })
    sendMail({
      subject: `Echo Chat: OTP to verify your account`,
      email,
      message: `Your verification code is: ${code}`,
      tag: 'verify-email',
    }),
      res.json({
        message: 'Verification OTP sent successfully',
        success: true,
      })
  } catch (error) {
    res.status(500).json({ message: 'Failed to send verification OTP' })
  }
}

export const createAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = signupSchema.safeParse(req.body)
    if (!result.success) {
      throw new Error('Invalid input')
    }
    console.log('object')
    const { email, password, firstName, lastName, code } = result.data
    const verificationToken = await client.emailVerificationToken.findUnique({
      where: {
        identifier: email,
        token: code,
        expires: {
          gte: new Date(),
        },
      },
    })
    console.log('object')
    if (!verificationToken) {
      throw new Error('Invalid verification code entered.')
    }

    console.log('object')
    await client.emailVerificationToken.delete({
      where: {
        identifier: email,
        token: code,
      },
    })
    console.log('object')

    const user = await client.user.findUnique({
      where: {
        email,
      },
    })
    console.log('object')

    if (!user) {
      const user = await client.user.create({
        data: {
          email,
          password: await hashPassword(password),
          name: `${firstName} ${lastName}`,
          planId: 'free_plan',
        },
      })
      console.log('object', user)
    }
    const response = await loginWithCredentials(email, password)
    console.log(response)
    if (!response.success) {
      throw new Error('Failed to login after account creation')
    }
    res.status(200).json({ token: response.token, user: response.user })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create account' })
  }
}

export const loginWithCredentials = async (
  email: string,
  password: string
): Promise<{
  success: boolean
  token?: string
  user?: { id: string; email: string }
}> => {
  const user = await client.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return { success: false }
  }

  const isValidPassword = await comparePassword(password, user.password)
  if (!isValidPassword) {
    return { success: false }
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET as Secret
  )

  return { success: true, token, user: { id: user.id, email: user.email } }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = loginSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors })
      return
    }

    const { email, password } = result.data

    const loginResult = await loginWithCredentials(email, password)

    if (!loginResult.success) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    res.json(loginResult)
  } catch (error) {
    res.status(500).json({ message: 'Failed to login' })
  }
}

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = forgotPasswordSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors })
      return
    }
    // const { email } = result.data
    // Simplified: Assume password reset process is handled elsewhere
    res.json({ message: 'Password reset instructions sent' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to process forgot password request' })
  }
}

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = resetPasswordSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors })
      return
    }
    // const { password } = result.data
    // Simplified: Assume password reset is handled elsewhere
    res.json({ message: 'Password reset successful' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password' })
  }
}
