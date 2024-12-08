'use client'

import { useEffect, useState, useCallback } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { useIdentityStore } from '@/app/store/useIdentityStore'
import ChatBox from '@/components/ChatRoom/ChatBox'
import GetAnonomousity from '@/components/ChatRoom/GetAnonomousity'
import { ParticipantsSidebar } from '@/components/ChatRoom/ParticipantsSidebar'
import { RoomHeader } from '@/components/ChatRoom/RoomHeader'
import { RoomSettings } from '@/components/ChatRoom/RoomSettings'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingState } from '@/components/ui/LoadingState'
import { useTempUser } from '@/hooks/useTempUser'
import { Message, PageClientProps, UserIdentity } from '@/types'

const PageClient = ({ roomId, token }: PageClientProps) => {
  const { setAnonymous, anonymous, setUserId } = useIdentityStore()
  const tempUser = useTempUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<UserIdentity[]>([])
  const [timeLeft, setTimeLeft] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/'
  )

  useEffect(() => {
    if (!token && !anonymous) {
      setAnonymous(true)
    }
  }, [token, anonymous, setAnonymous])

  useEffect(() => {
    if (readyState === ReadyState.CLOSED) {
      setError('Server connection closed. Please try again later.')
    }
  }, [readyState])

  const effectiveTempUser = token && !anonymous ? null : tempUser

  const handleJoinRoom = useCallback(() => {
    if (anonymous === null || readyState !== ReadyState.OPEN) return

    sendMessage(
      JSON.stringify({
        type: 'join',
        payload: {
          roomId,
          ...(effectiveTempUser
            ? {
                tempId: effectiveTempUser.tempUserId,
                tempName: effectiveTempUser.tempUserName,
                tempAvatar: effectiveTempUser.tempUserAvatar,
              }
            : {
                token,
              }),
        },
      })
    )
  }, [readyState, roomId, sendMessage, effectiveTempUser, token, anonymous])

  useEffect(() => {
    handleJoinRoom()
  }, [handleJoinRoom])

  useEffect(() => {
    if (anonymous === null || !lastMessage) return

    const data = JSON.parse(lastMessage.data)

    const handlers: Record<string, () => void> = {
      error: () => setError(data.payload.message),
      room_joined: () => {
        setUserId(data.payload.userId)
        setIsLoading(false)
        setUsers(data.payload.users)
        setMessages(data.payload.last20Messages)
        setTimeLeft(new Date(data.payload.closeTime))
      },
      user_joined: () => {
        setUsers((prevUsers) => {
          const userExists = prevUsers.some(
            (user) => user.userId === data.payload.userId
          )
          if (userExists) return prevUsers

          return [
            ...prevUsers,
            {
              userId: data.payload.userId,
              username: data.payload.username,
              avatar: data.payload.avatar,
            },
          ]
        })
      },
      user_left: () => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== data.payload.userId)
        )
      },
      'receive-message': () => {
        setMessages((prevMessages) => [...prevMessages, data.payload])
      },
      message_sent: () => {
        setMessages((prevMessages) => [...prevMessages, data.payload])
      },
    }

    const handler = handlers[data.type]
    if (handler) handler()
  }, [lastMessage, anonymous, setUserId])

  const sendChatMessage = useCallback(
    (content: string) => {
      if (anonymous === null || readyState !== ReadyState.OPEN) return
      sendMessage(JSON.stringify({ type: 'message', payload: { content } }))
    },
    [readyState, sendMessage, anonymous]
  )

  if (token && anonymous === null) {
    return <GetAnonomousity />
  }

  if (!token && !tempUser) {
    return (
      <ErrorState
        title="Authentication Error"
        message="No authentication credentials provided. Please log in or continue as guest."
        fullScreen
      />
    )
  }

  if (error) {
    return (
      <ErrorState
        title="Connection Error"
        message="Unable to connect to the chat room. Please try again later."
        details={error}
        fullScreen
      />
    )
  }

  if (isLoading) {
    return <LoadingState fullScreen />
  }

  return (
    <div className="grid h-screen max-h-screen w-screen grid-cols-1 grid-rows-10 justify-center overflow-hidden bg-neutral-100 p-5 pt-0">
      <RoomHeader />
      <div className="row-span-9 flex w-full gap-5">
        <ParticipantsSidebar participants={users} />
        <ChatBox messages={messages} sendMessage={sendChatMessage} />
        <RoomSettings roomId={roomId} timeLeft={timeLeft} />
      </div>
    </div>
  )
}

export default PageClient
