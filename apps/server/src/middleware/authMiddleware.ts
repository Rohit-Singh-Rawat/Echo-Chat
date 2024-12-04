// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { JWTPayload } from '../types';
// import { config } from '../config';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: JWTPayload;
//     }
//   }
// }

// export const authenticateToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     res.status(401).json({ message: 'Authentication required' });
//     return;
//   }

//   try {
//     const user = jwt.verify(token, config.JWT_SECRET) as JWTPayload;
//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };

// export const requirePro = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   if (!req.user?.isPro) {
//     res.status(403).json({ message: 'Pro subscription required' });
//     return;
//   }
//   next();
// };
