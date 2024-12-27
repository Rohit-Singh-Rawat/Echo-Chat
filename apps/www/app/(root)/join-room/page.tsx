import EchoLogo from '@/components/icons/animated/EchoLogo'
import { JoinRoomForm } from '@/components/Join-Room/JoinRoomForm'

export const metadata = {
  title: 'Join Room',
  description: 'Join an existing chat room',
}

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ roomId: string; anonymous: string }>
}) => {
  const { roomId, anonymous } = await searchParams
  return (
    <div className="flex h-screen flex-col items-center gap-6 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="my-14">
        <EchoLogo />
      </div>
      <div className="flex flex-col items-center rounded-2xl border-2 border-gray-200 bg-white p-10">
        <JoinRoomForm anonymous={anonymous == 'true'} roomId={roomId} />
      </div>
    </div>
  )
}

export default Page
