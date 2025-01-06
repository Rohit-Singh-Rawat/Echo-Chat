import * as z from 'zod'

export const signupSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z
    .string()
    .min(8, 'Min 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Include uppercase, lowercase, number, special char'
    ),
  code: z.string().min(6, 'OTP must be 6 characters long.'),
})

export const loginSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(1, 'Required'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Min 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Include uppercase, lowercase, number, special char'
      ),
    confirmPassword: z.string().min(1, 'Confirm password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const emailVerifySchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
})

export const googleAuthSchema = z.object({
  access_token: z.string(),
})

export const githubAuthSchema = z.object({
  code: z.string(),
})

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type EmailVerifyInput = z.infer<typeof emailVerifySchema>
export type GoogleAuthInput = z.infer<typeof googleAuthSchema>
export type GithubAuthInput = z.infer<typeof githubAuthSchema>
