'use client'

import React, { createContext, useContext, useState } from 'react'

interface RegisterContextType {
  email: string
  password: string
  firstName: string
  lastName: string
  step: 'signup' | 'verify'
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setStep: (step: 'signup' | 'verify') => void
}

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
)

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [step, setStep] = useState<'signup' | 'verify'>('signup')

  return (
    <RegisterContext.Provider
      value={{
        email,
        password,
        firstName,
        lastName,
        step,
        setEmail,
        setPassword,
        setFirstName,
        setLastName,
        setStep,
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}

export const useRegisterContext = () => {
  const context = useContext(RegisterContext)

  if (context === undefined) {
    throw new Error('useRegisterContext must be used within a RegisterProvider')
  }

  return context
}
