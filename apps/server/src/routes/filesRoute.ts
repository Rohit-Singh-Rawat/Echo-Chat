import { Router } from 'express'
import { uploadFile, deleteFile } from '../controllers/FileUpload'
import { authenticateToken } from '../middleware/authMiddleware'
import { fileUploadLimiter } from '../utils/rate-limiting'

const router: Router = Router()

router.use(authenticateToken)

router.post('/getUploadUrl', fileUploadLimiter, uploadFile)
router.delete('/deleteFile', deleteFile)

export default router
