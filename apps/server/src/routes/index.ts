import { Router } from 'express'
import authRoutes from './authRoutes'
// import roomRoutes from './roomRoutes'
// import userRoutes from './userRoutes'

const router: Router = Router()

router.use('/auth', authRoutes)
// router.use('/users', userRoutes)
// router.use('/rooms', roomRoutes)

export default router
