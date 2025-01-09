import { Router } from 'express'
import {
  activateFreePlan,
} from '../controllers/planController'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

router.post('/activate-free', authenticateToken, activateFreePlan)

export default router
