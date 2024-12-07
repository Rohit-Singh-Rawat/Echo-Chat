import PageClient from './page-client'

export const metadata = {
  title: 'Chat Room',
  description: 'Real-time chat room powered by Echo',
}

const Page = async ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = await params

  return <PageClient roomId={roomId} />
}

export default Page
