import { Router } from 'express'
import { getStats, updateProfile, deleteAccount } from '../controllers/userController'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

// router.get('/me', authenticateToken, getProfile)
router.get('/stats', authenticateToken, getStats)
router.patch('/profile', authenticateToken, updateProfile)
router.delete('/account', authenticateToken, deleteAccount)

export default router
