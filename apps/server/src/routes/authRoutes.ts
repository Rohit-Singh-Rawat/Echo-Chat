import { Router } from 'express'
import {
  login,
  callback,
  logout,
  createAccount,
  sendVerificationOtp,
  getSession,
  forgotPassword,
  resetPassword,
} from '../controllers/authController'
import { googleAuth } from '../controllers/googleAuthController'
import { githubAuth } from '../controllers/githubAuthController'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

router.post('/login', login)
router.get('/callback', callback)
router.post('/logout', authenticateToken, logout)
router.post('/signup', createAccount)
router.post('/verify-email', sendVerificationOtp)
router.get('/me', authenticateToken, getSession)
router.post('/google', googleAuth)
router.post('/github', githubAuth)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router
