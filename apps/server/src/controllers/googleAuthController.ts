import { Request, Response } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { Secret } from 'jsonwebtoken'
import client from '@echo/db/src'
import { googleAuthSchema } from '@echo/lib'
import oauth2Client from '../utils/googleAuth'
import axios from 'axios'

export const googleAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = googleAuthSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors })
      return
    }

    const { access_token } = result.data
    const googleRes = await oauth2Client.getToken(access_token)
    oauth2Client.setCredentials(googleRes.tokens)

    const userInfoResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    )

    const userDataSchema = z.object({
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url().optional(),
    })

    const parsedUserData = userDataSchema.safeParse(userInfoResponse.data)
    if (!parsedUserData.success) {
      res.status(400).json({ message: 'Invalid user data from Google' })
      return
    }

    const { email, name, picture } = parsedUserData.data

    const existingUser = await client.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET as Secret
      )
      
      res.status(200).json({ token, user: existingUser, isNewUser: false })
    } else {
      const newUser = await client.user.create({
        data: {
          email,
          name,
          image:
            picture ??
            `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}`,
          provider: 'GOOGLE',
        },
      })

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET as Secret
      )
      res.status(201).json({ token, user: newUser, isNewUser: true })
    }
  } catch (error) {
    console.error('Google auth error:', error)
    res.status(500).json({ message: 'Authentication failed' })
  }
}
