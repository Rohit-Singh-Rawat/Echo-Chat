'use client'
import { RegisterProvider } from '@/context/RegistryContext'

import RegistryFlow from './RegistryFlow'

const RegistryForm = () => {
  return (
    <RegisterProvider>
      <RegistryFlow />
    </RegisterProvider>
  )
}

export default RegistryForm
