import { cookies } from 'next/headers'

import PageClient from './page-client'

import { getSession } from '@/lib/actions/authActions'

export const metadata = {
  title: 'Chat Room',
  description: 'Real-time chat room powered by Echo',
}

interface PageProps {
  params: {
    roomId: string
  }
}

const Page = async ({ params }: PageProps) => {
  const [session, cookieStore] = await Promise.all([getSession(), cookies()])

  const { roomId } = params
  const token = cookieStore.get('token')?.value

  return <PageClient roomId={roomId} token={token} />
}

export default Page
