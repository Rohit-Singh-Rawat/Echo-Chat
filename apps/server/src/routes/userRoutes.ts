import { Router } from 'express'
import {
  getStats,
  updateProfile,
  deleteAccount,
} from '../controllers/userController'
import { authenticateToken } from '../middleware/authMiddleware'
import { profileUploadLimiter } from '../utils/rate-limiting'

const router: Router = Router()

router.use(authenticateToken) // Apply auth middleware to all routes

router
  .get('/stats', getStats)
  .patch('/profile', profileUploadLimiter, updateProfile)
  .delete('/account', deleteAccount)

export default router
