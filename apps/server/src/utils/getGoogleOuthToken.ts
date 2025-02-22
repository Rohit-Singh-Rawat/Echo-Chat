import axios from 'axios'
import dotenv from 'dotenv'

import querystring from 'querystring'
dotenv.config()

interface GoogleTokensResult {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  id_token: string
}

export async function getGoogleOAuthTokens(
  code: string
): Promise<GoogleTokensResult> {
  const url = 'https://oauth2.googleapis.com/token'

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: 'postmessage',
    grant_type: 'authorization_code',
  }
  console.log(values)
  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      querystring.stringify(values),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    return res.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    throw new Error(error.message)
  }
}
