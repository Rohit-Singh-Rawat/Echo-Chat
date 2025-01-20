import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { adjectives, nouns } from '@/constants'

const generateRandomId = () => uuidv4().slice(0, 16)
const generateRandomName = () => {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${randomAdjective}${randomNoun}`
}
const generateRandomAvatar = () =>
  `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}`

interface TempUserState {
  tempUserId: string
  tempUserName: string
  tempUserAvatar: string
}

export function useTempUser(): TempUserState {
  const [tempUser, setTempUser] = useState<TempUserState>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('temp-user-storage')
      if (stored) return JSON.parse(stored)
    }

    const newUser = {
      tempUserId: generateRandomId(),
      tempUserName: generateRandomName(),
      tempUserAvatar: generateRandomAvatar(),
    }

    return newUser
  })

  useEffect(() => {
    localStorage.setItem('temp-user-storage', JSON.stringify(tempUser))
  }, [tempUser])

  return tempUser
}
