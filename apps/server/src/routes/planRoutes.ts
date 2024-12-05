import { Router } from 'express'
import {
  activateFreePlan,
  activateProPlan,
} from '../controllers/planController'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

router.post('/activate-free', authenticateToken, activateFreePlan)
router.post('/activate-pro', authenticateToken, activateProPlan)

export default router
