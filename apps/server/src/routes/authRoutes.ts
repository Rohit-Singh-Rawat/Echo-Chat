import {  Router } from 'express'
import {
  login,
  callback,
  logout,
  createAccount,
  sendVerificationOtp,
  getSession,
} from '../controllers/authController'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

router.post('/login', login)
router.get('/callback', callback)
router.post('/logout', authenticateToken, logout)
router.post('/signup', createAccount)
router.post('/verify-email', sendVerificationOtp)
router.get('/me', authenticateToken, getSession)

export default router
