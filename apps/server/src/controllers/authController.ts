import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
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
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`)
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/auth/error`)
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

    if (!verificationToken) {
      throw new Error('Invalid verification code entered.')
    }

    await client.emailVerificationToken.delete({
      where: {
        identifier: email,
        token: code,
      },
    })

    const user = await client.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      await client.user.create({
        data: {
          email,
          password: await hashPassword(password),
          name: `${firstName} ${lastName}`,
          image: `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}`,
        },
      })
    }
    const response = await loginWithCredentials(email, password)
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
  message?: string
}> => {
  const user = await client.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return { success: false, message: 'User not found' }
  }
  if (!user.password) {
    return { success: false, message: 'Invalid login method' }
  }
  const isValidPassword = await comparePassword(password, user.password)
  if (!isValidPassword) {
    return { success: false, message: 'Invalid password' }
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET as Secret
  )

  return {
    success: true,
    token,
    user: { id: user.id, email: user.email },
    message: 'Login successful',
  }
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
      res
        .status(401)
        .json({ message: loginResult.message || 'Invalid email or password' })
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
    const { email } = result.data

    const user = await client.user.findUnique({
      where: { email },
    })

    if (!user) {
      res.status(400).json({ message: 'No user found with this email' })
      return
    }

    await client.passwordResetToken.deleteMany({
      where: {
        identifier: email,
      },
    })

    const code = generateOTP()
    await client.passwordResetToken.create({
      data: {
        identifier: email,
        token: code,
        expires: new Date(Date.now() + 2 * 60 * 1000),
      },
    })

    sendMail({
      subject: `Echo Chat: Reset your password`,
      email,
      message: `${code}`,
      tag: 'password_reset',
    })

    res.json({
      message: 'Password reset code sent successfully',
      success: true,
    })
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
    const { email, password, code } = result.data

    const resetToken = await client.passwordResetToken.findUnique({
      where: {
        identifier: email,
        token: code,
        expires: {
          gte: new Date(),
        },
      },
    })

    if (!resetToken) {
      res.status(400).json({ message: 'Invalid or expired reset code' })
      return
    }

    await client.passwordResetToken.delete({
      where: {
        identifier: email,
        token: code,
      },
    })

    await client.user.update({
      where: { email },
      data: {
        password: await hashPassword(password),
      },
    })

    res.json({
      message: 'Password reset successful',
      success: true,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password' })
  }
}

export const getSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' })
      return
    }

    const user = await client.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        subscription: true,
        image: true,
        subscriptionId: true,
      },
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    res.json({
      user,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to get session' })
  }
}
