import GridPattern from '@echo/ui/components/ui/GridPattern.tsx'
import { cn } from '@echo/utils/src'

import ChatBoxInput from './ChatBoxInput'
import Chats from './Chats'

const ChatBox = () => {
  return (
    <div className="relative size-full flex-1 rounded-xl border border-neutral-200 bg-white p-2">
      {' '}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={'4 2'}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_left,white,transparent_70%)]',
          '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
          'fill-neutral-400/30 stroke-neutral-400/20'
        )}
      />
      <div className="relative h-[calc(100%-10px)] flex-1 overflow-hidden pb-12">
        <Chats
          messages={[
            {
              userName: 'John Doe',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:00 PM',
              message: 'Hello everyone!',
            },
            {
              userName: 'You',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:01 PM',
              message:
                'Hi John! How are you doing today? I hope you are having a wonderful day! Looking forward to chatting with you!',
              image:
                'https://res.cloudinary.com/ytx/image/upload/v1727527540/SpaceToken_takhl4.png',
            },
            {
              userName: 'Alice',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:02 PM',
              message: 'Hey everyone! Great to be here!',
            },
            {
              userName: 'You',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:03 PM',
              message: 'Welcome Alice! Glad you could join us!',
            },
            {
              userName: 'Charlie',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:04 PM',
              message: 'How is everyone doing?',
            },
            {
              userName: 'You',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:05 PM',
              message: 'Doing great Charlie, thanks for asking!',
            },
            {
              userName: 'Eve',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:06 PM',
              message: 'Just joined the chat. What did I miss?',
            },
            {
              userName: 'You',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:07 PM',
              message: 'Not much Eve, we are just getting started!',
            },
            {
              userName: 'Grace',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:08 PM',
              message: 'Hello everyone! Looking forward to our discussion.',
            },
            {
              userName: 'You',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:09 PM',
              message: 'Welcome Grace! We are too!',
            },
            {
              userName: 'Ivy',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:10 PM',
              message: 'Indeed! This is going to be fun!',
            },
            {
              userName: 'You',
              avatar: 'https://avatar.iran.liara.run/public',
              timestamp: '12:11 PM',
              message: 'Absolutely Ivy! Let us make it memorable!',
            },
          ]}
        />
      </div>
      <ChatBoxInput />
    </div>
  )
}
export default ChatBox
