import { Request, Response } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { Secret } from 'jsonwebtoken'
import client from '@echo/db/src'
import axios from 'axios'
import { githubAuthSchema } from '@echo/lib'

export const githubAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = githubAuthSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors })
      return
    }

    if (
      !process.env.GITHUB_CLIENT_ID ||
      !process.env.GITHUB_CLIENT_SECRET ||
      !process.env.JWT_SECRET
    ) {
      console.error('Missing required environment variables for GitHub auth')
      res.status(500).json({ message: 'Server configuration error' })
      return
    }

    const { code } = result.data

    let tokenResponse
    try {
      tokenResponse = await axios.post(
        `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
        null,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
    } catch (error) {
      console.error('Failed to exchange GitHub code for token:', error)
      res.status(400).json({ message: 'Failed to authenticate with GitHub' })
      return
    }

    const { access_token } = tokenResponse.data
    if (!access_token) {
      res
        .status(400)
        .json({ message: 'GitHub did not provide an access token' })
      return
    }

    let userInfoResponse
    try {
      userInfoResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    } catch (error) {
      console.error('Failed to fetch GitHub user data:', error)
      res.status(400).json({ message: 'Failed to fetch user data from GitHub' })
      return
    }

    const userDataSchema = z.object({ 
      name: z.string().nullable(),
      avatar_url: z.string().url(),
      login: z.string(),
    })

    const parsedUserData = userDataSchema.safeParse(userInfoResponse.data)
    if (!parsedUserData.success) {
      console.error('Invalid user data from GitHub:', userInfoResponse.data)
      res.status(400).json({ message: 'Invalid user data from GitHub' })
      return
    }

    const { name, avatar_url, login } = parsedUserData.data
    
    let emails
    try {
      const emailResponse = await axios.get(
        'https://api.github.com/user/emails',
        {
          headers: {
            Authorization: `token ${access_token}`,
          },
        }
      )
      emails = emailResponse.data
    } catch (error) {
      console.error('Failed to fetch user emails from GitHub:', error)
      res
        .status(400)
        .json({ message: 'Failed to fetch user emails from GitHub' })
      return
    }

    if (!emails || emails.length === 0) {
      return
    }
    const sortedEmails = emails.sort((a:any, b:any) => b.primary - a.primary)
   const email = sortedEmails[0].email

    try {
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
            name: name ?? login,
            image:
              avatar_url ??
              `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}`,
            provider: 'GITHUB',
          },
        })

        const token = jwt.sign(
          { userId: newUser.id, email: newUser.email },
          process.env.JWT_SECRET as Secret
        )
        res.status(201).json({ token, user: newUser, isNewUser: true })
      }
    } catch (error) {
      console.error('Database operation failed:', error)
      res.status(500).json({ message: 'Failed to process user data' })
      return
    }
  } catch (error) {
    console.error('GitHub auth error:', error)
    res.status(500).json({ message: 'Authentication failed' })
  }
}
