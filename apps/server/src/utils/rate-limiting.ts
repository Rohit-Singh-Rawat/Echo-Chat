import rateLimit from 'express-rate-limit'

const generalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 500,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

const passwordResetLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message:
    'Too many password reset attempts, please try again after 10 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
})

const profileUploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Profile image upload limit reached, please try again in 1 hour.',
  standardHeaders: true,
  legacyHeaders: false,
})
const fileUploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: 'File upload limit reached, please try again after 1 minute.',
  standardHeaders: true,
  legacyHeaders: false,
})

export {
  generalLimiter,
  passwordResetLimiter,
  profileUploadLimiter,
  fileUploadLimiter,
}
