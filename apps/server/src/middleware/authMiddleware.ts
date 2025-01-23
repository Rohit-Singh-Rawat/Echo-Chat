import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { JWTPayload } from '../types'
// Augment the Express Request type
declare module 'express' {
  interface Request {
    user?: JWTPayload
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Authentication required' })
    return
  }


  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JWTPayload
    req.user = user
    next()
  } catch (err) {
    console.log('error:', JSON.stringify(token))
    res.status(403).json({ message: 'Invalid or expired token' })
  }
}

export const requirePro = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user?.isPro) {
    res.status(403).json({ message: 'Pro subscription required' })
    return
  }
  next()
}
