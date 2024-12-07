'use client'

import { useEffect, useState, useCallback } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import ChatBox from '@/components/ChatRoom/ChatBox'
import { ParticipantsSidebar } from '@/components/ChatRoom/ParticipantsSidebar'
import { RoomHeader } from '@/components/ChatRoom/RoomHeader'
import { RoomSettings } from '@/components/ChatRoom/RoomSettings'

interface Message {
  userId: string
  username: string
  avatar: string
  content: string
  sentAt: Date
}

interface User {
  id: string
  username: string
  avatar: string
}

interface PageClientProps {
  roomId: string
}

const PageClient = ({ roomId }: PageClientProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [timeLeft, setTimeLeft] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'ws://localhost:4000/'
  )

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(
        JSON.stringify({
          type: 'join',
          payload: {
            roomId,
            tempId: 'echoshit22',
            tempName: 'echoshit22',
            tempAvatar: 'https://avatar.iran.liara.run/public',
          },
        })
      )
    }
  }, [readyState, roomId, sendMessage])

  useEffect(() => {
    if (!lastMessage) return

    const data = JSON.parse(lastMessage.data)

    const handlers = {
      error: () => setError(data.payload.message),
      room_joined: () => {
        setIsLoading(false)
        setUsers(data.payload.users)
        setMessages(data.payload.last20Messages)
        setTimeLeft(new Date(data.payload.closeTime))
      },
      user_joined: () => {
        setUsers((prevUsers) => [
          ...prevUsers,
          {
            id: data.payload.userId,
            username: data.payload.username,
            avatar: data.payload.avatar,
          },
        ])
      },
      user_left: () => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== data.payload.userId)
        )
      },
      'receive-message': () => {
        setMessages((prevMessages) => [...prevMessages, data.payload])
      },
      message_sent: () => {
        setMessages((prevMessages) => [...prevMessages, data.payload])
      },
    }

    handlers[data.type as keyof typeof handlers]?.()
  }, [lastMessage])

  const sendMessagez = useCallback(
    (content: string) => {
      if (readyState === ReadyState.OPEN) {
        sendMessage(JSON.stringify({ type: 'message', payload: { content } }))
      }
    },
    [readyState, sendMessage]
  )

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-red-600">
            Connection Error
          </h2>
          <p className="text-gray-600">
            Unable to connect to the chat room. Please try again later.
          </p>
        </div>
        {error}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-4 border-neutral-300 border-t-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="grid h-screen max-h-screen w-screen grid-cols-1 grid-rows-10 justify-center overflow-hidden bg-neutral-100 p-5 pt-0">
      <RoomHeader />
      <div className="row-span-9 flex w-full gap-5">
        <ParticipantsSidebar participants={users} />
        <ChatBox messages={messages} sendMessage={sendMessagez} />
        <RoomSettings roomId={roomId} timeLeft={timeLeft} />
      </div>
    </div>
  )
}

export default PageClient
