import { Router } from 'express'
import authRoutes from './authRoutes'
import roomRoutes from './roomRoutes'
import planRoutes from './planRoutes'
import userRoutes from './userRoutes'
import { uploadFile } from '../controllers/FileUpload'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/rooms', roomRoutes)
router.use('/plans', planRoutes)
router.post('/getUploadUrl', authenticateToken, uploadFile)

export default router
