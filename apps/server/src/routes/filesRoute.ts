import { Router } from 'express'
import { uploadFile, deleteFile } from '../controllers/FileUpload'
import { authenticateToken } from '../middleware/authMiddleware'

const router: Router = Router()

router.post('/getUploadUrl', authenticateToken, uploadFile)
router.delete('/deleteFile', authenticateToken, deleteFile)

export default router
