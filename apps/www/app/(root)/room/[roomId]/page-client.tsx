'use client'

import { useEffect, useState, useCallback } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import useRoomStore from '@/app/store/RoomStore'
import { useIdentityStore } from '@/app/store/useIdentityStore'
import ChatBox from '@/components/ChatRoom/ChatBox'
import GetAnonomousity from '@/components/ChatRoom/GetAnonomousity'
import { ParticipantsSidebar } from '@/components/ChatRoom/ParticipantsSidebar'
import { RoomHeader } from '@/components/ChatRoom/RoomHeader'
import { RoomSettings } from '@/components/ChatRoom/RoomSettings'
import { TimeLeftDisplay } from '@/components/ChatRoom/TimeLeftDisplay'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingState } from '@/components/ui/LoadingState'
import { useTempUser } from '@/hooks/useTempUser'
import { Message, PageClientProps, UserIdentity } from '@/types'

const PageClient = ({ roomId, token }: PageClientProps) => {
  const { setAnonymous, anonymous, setUserId, userId } = useIdentityStore()
  const tempUser = useTempUser()
  const [roomName, SetRoomName] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<UserIdentity[]>([])
  const [timeLeft, setTimeLeft] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [shouldConnect, setShouldConnect] = useState(true)

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/',
    {},
    shouldConnect
  )

  useEffect(() => {
    if (!token && !anonymous) {
      setAnonymous(true)
    }
  }, [token, anonymous, setAnonymous])

  useEffect(() => {
    if (readyState === ReadyState.CLOSED) {
      if (!error) setError('Server connection closed. Please try again later.')
    }
  }, [readyState, error])

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
        SetRoomName(data.payload.roomName)
        setUsers(data.payload.users)
        setMessages(data.payload.lastMessages)

        setTimeLeft(new Date(data.payload.closeTime))

        useRoomStore.getState().setRoom({
          id: roomId,
          name: data.payload.roomName,
          closeTime: new Date(data.payload.closeTime),
          isTemporary: data.payload.isTemporary,
        })
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
      'reaction-added': () => {
        setMessages((prevMessages) => {
          const messageIndex = prevMessages.findIndex(
            (msg) => msg.id === data.payload.messageId
          )
          if (messageIndex === -1) return prevMessages
          const newMessages = structuredClone(prevMessages)
          if (newMessages[messageIndex])
            if (!(data.payload.emoji in newMessages[messageIndex].reactions)) {
              newMessages[messageIndex].reactions[data.payload.emoji] = []
            }
          newMessages[messageIndex]!.reactions[data.payload.emoji]!.push({
            id: data.payload.userId,
            name: data.payload.name,
            avatar: data.payload.avatar,
          })

          return newMessages
        })
      },
      'reaction-received': () => {
        setMessages((prevMessages) => {
          const messageIndex = prevMessages.findIndex(
            (msg) => msg.id === data.payload.messageId
          )
          if (messageIndex === -1) return prevMessages
          const newMessages = structuredClone(prevMessages)

          if (newMessages[messageIndex]) {
            if (!(data.payload.emoji in newMessages[messageIndex].reactions)) {
              newMessages[messageIndex].reactions[data.payload.emoji] = []
            }
            newMessages[messageIndex].reactions[data.payload.emoji]!.push({
              id: data.payload.userId,
              name: data.payload.name,
              avatar: data.payload.avatar,
            })
            newMessages[messageIndex]!.userEmoji = data.payload.emoji
          }

          return newMessages
        })
      },
      'reaction-removed': () => {
        setMessages((prevMessages) => {
          const messageIndex = prevMessages.findIndex(
            (msg) => msg.id === data.payload.messageId
          )
          if (messageIndex === -1) return prevMessages
          const newMessages = structuredClone(prevMessages)

          if (newMessages[messageIndex]) {
            const reactions =
              newMessages[messageIndex].reactions[data.payload.emoji]
            if (reactions) {
              newMessages[messageIndex].reactions[data.payload.emoji] =
                reactions.filter((user) => user.id !== data.payload.userId)
              if (
                newMessages[messageIndex].reactions[data.payload.emoji]
                  ?.length === 0
              ) {
                delete newMessages[messageIndex].reactions[data.payload.emoji]
              }
              if (
                data.payload.userId === userId &&
                newMessages[messageIndex].userEmoji === data.payload.emoji
              ) {
                newMessages[messageIndex].userEmoji = ''
              }
            }
          }

          return newMessages
        })
      },
      'reaction-updated': () => {
        setMessages((prevMessages) => {
          const messageIndex = prevMessages.findIndex(
            (msg) => msg.id === data.payload.messageId
          )
          if (messageIndex === -1) return prevMessages
          const newMessages = structuredClone(prevMessages)

          if (newMessages[messageIndex]) {
            // Remove old reaction
            const oldReactions =
              newMessages[messageIndex].reactions[data.payload.oldEmoji]
            if (oldReactions) {
              newMessages[messageIndex].reactions[data.payload.oldEmoji] =
                oldReactions.filter((user) => user.id !== data.payload.userId)
              if (
                newMessages[messageIndex].reactions[data.payload.oldEmoji]
                  ?.length === 0
              ) {
                delete newMessages[messageIndex].reactions[
                  data.payload.oldEmoji
                ]
              }
            }

            if (
              !(data.payload.newEmoji in newMessages[messageIndex].reactions)
            ) {
              newMessages[messageIndex].reactions[data.payload.newEmoji] = []
            }
            newMessages[messageIndex].reactions[data.payload.newEmoji]!.push({
              id: data.payload.userId,
              name: data.payload.name,
              avatar: data.payload.avatar,
            })
            if (data.payload.userId === userId) {
              newMessages[messageIndex].userEmoji = data.payload.newEmoji
            }
          }

          return newMessages
        })
      },
    }

    const handler = handlers[data.type]
    if (handler) handler()
  }, [lastMessage, anonymous, setUserId, userId])
  const sendChatMessage = useCallback(
    (content: string, image?: string) => {
      if (anonymous === null || readyState !== ReadyState.OPEN) return
      sendMessage(
        JSON.stringify({ type: 'message', payload: { content, image } })
      )
    },
    [readyState, sendMessage, anonymous]
  )

  const sendReaction = useCallback(
    (messageId: string, emoji: string, currentEmoji?: string) => {
      if (anonymous === null || readyState !== ReadyState.OPEN) return
      sendMessage(
        JSON.stringify({
          type: 'reaction',
          payload: { messageId, emoji, currentEmoji },
        })
      )
    },
    [readyState, sendMessage, anonymous]
  )
  const handleExit = useCallback(() => {
    if (readyState === ReadyState.OPEN) {
      // Close the WebSocket connection
      setShouldConnect(false)
    }
    // Redirect to dashboard
    window.location.href = '/dashboard'
  }, [readyState])
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
        details="Connection Error"
        message="Unable to connect to the chat room. Please try again later."
        title={error}
        fullScreen
      />
    )
  }

  if (isLoading) {
    return <LoadingState fullScreen />
  }

  return (
    <TimeLeftDisplay closeTime={timeLeft}>
      <div className="grid h-screen max-h-screen w-screen grid-cols-1 grid-rows-10 justify-center overflow-hidden bg-neutral-100 p-5 pt-0">
        <RoomHeader roomName={roomName} handleExit={handleExit} />
        <div className="row-span-9 flex w-full gap-5">
          <ParticipantsSidebar participants={users} />
          <ChatBox
            messages={messages}
            sendMessage={sendChatMessage}
            sendReaction={sendReaction}
          />
          <RoomSettings roomId={roomId} timeLeft={timeLeft} />
        </div>
      </div>
    </TimeLeftDisplay>
  )
}

export default PageClient
