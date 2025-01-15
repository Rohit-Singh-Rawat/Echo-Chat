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

router.use(authenticateToken)

router.post('/create', createRoom)
router.get('/getRooms', getUserRooms)
router.get('/history', getRoomsHistory)
router.get('/history/:roomId', getRoomHistory)
router.delete('/remove/:roomId', removeRoom)

export default router
