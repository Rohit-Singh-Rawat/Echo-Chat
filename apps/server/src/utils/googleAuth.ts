import { google } from 'googleapis'
import * as dotenv from 'dotenv'
import { OAuth2Client } from 'google-auth-library'

dotenv.config()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const oauth2Client:OAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'postmessage'
)
export default oauth2Client
