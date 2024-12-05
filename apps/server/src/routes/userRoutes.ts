import { Router } from 'express'
import { getStats } from '../controllers/userController'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

// router.get('/me', authenticateToken, getProfile)
router.get('/stats', authenticateToken, getStats)

export default router
