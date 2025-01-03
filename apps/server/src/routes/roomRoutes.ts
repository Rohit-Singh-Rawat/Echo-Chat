import { Router } from 'express'
import {
  getUserRooms,
  createRoom,
  getRoomsHistory,
  getRoomHistory,
  removeRoom,
  // joinRoom,
} from '../controllers/roomController'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

router.post('/create', authenticateToken, createRoom)
// router.post('/join', joinRoom)
// router.post('/leave', leaveRoom)
// router.post('/message', sendMessage)
router.get('/getRooms', authenticateToken, getUserRooms)
router.get('/history', authenticateToken, getRoomsHistory)
router.get('/history/:roomId', authenticateToken, getRoomHistory)
router.delete('/remove/:roomId', authenticateToken, removeRoom)

export default router
