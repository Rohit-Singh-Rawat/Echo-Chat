import { cookies } from 'next/headers'

import PageClient from './page-client'

import { getSession } from '@/lib/actions/authActions'

export const metadata = {
  title: 'Chat Room',
  description: 'Real-time chat room powered by Echo',
}

interface PageProps {
  params: Promise<{
    roomId: string
  }>
}

const Page = async ({ params }: PageProps) => {
  const cookieStore = await cookies()
  const resolvedParams = await params

  const { roomId } = resolvedParams
  const token = cookieStore.get('token')?.value

  return <PageClient roomId={roomId} token={token} />
}

export default Page
