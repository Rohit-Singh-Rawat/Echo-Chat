import { ArrowLeftToLine } from 'lucide-react'

import { Button } from '../shared/Button'

import ChatBoxInput from './ChatBoxInput'
import Chats from './Chats'

const ChatBox = () => {
  return (
    <div className="relative w-full flex-1">
      <div className="flex w-full items-center justify-between border-b-2 border-neutral-200 p-4">
        <h1 className="text-xl font-semibold text-neutral-900">
          This is Room Title
        </h1>
        <Button className="">
          <ArrowLeftToLine
            className="-ms-1 me-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Exit
        </Button>
      </div>
      <div className="relative h-[calc(100%-69.6px)] flex-1 overflow-hidden bg-[#f8f8f8] pb-12">
        {' '}
        <div className="grainy inset-0s -z-10s absolute"></div>
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
