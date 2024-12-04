import { Router } from 'express'
import {
  login,
  callback,
  logout,
  createAccount,
  sendVerificationOtp,
} from '../controllers/authController'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

router.post('/login', login)
router.get('/callback', callback)
router.post('/logout', authenticateToken, logout)
router.post('/signup', createAccount)
router.post('/verify-email', sendVerificationOtp)

export default router
