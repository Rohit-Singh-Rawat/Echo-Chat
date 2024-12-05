import { Router } from 'express'
import {
  getUserRooms,
  createRoom,
  // joinRoom,
} from '../controllers/roomController'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

router.post('/create', authenticateToken, createRoom)
// router.post('/join', joinRoom)
// router.post('/leave', leaveRoom)
// router.post('/message', sendMessage)
router.get('/getRooms', authenticateToken, getUserRooms)

export default router
