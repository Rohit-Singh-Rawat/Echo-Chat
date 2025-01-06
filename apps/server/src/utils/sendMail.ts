import nodemailer from 'nodemailer'
import { getTemplate } from './getMailTemplate'

export type Options = {
  tag:
    | 'verify-email'
    | 'password_reset'
    | 'subscription_active'
    | 'free_trial_active'
  message?: string
  email?: string
  username?: string
  razorpayId?: string
  subject:string
  dateOfActivation?: string
  planId?: string
  planName?: string
  duration?: number
  price?: number
  dashboardLink?: string
}
export const sendMail = async (options: Options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: options.email,
      subject: options.subject,
      html: getTemplate(options),
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }
}
