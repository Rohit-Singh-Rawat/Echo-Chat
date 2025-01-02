import { Router } from 'express'
import authRoutes from './authRoutes'
import roomRoutes from './roomRoutes'
import planRoutes from './planRoutes'
import userRoutes from './userRoutes'
import filesRoutes from './filesRoute'

const router: Router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/rooms', roomRoutes)
router.use('/plans', planRoutes)
router.use('/files', filesRoutes)

export default router
