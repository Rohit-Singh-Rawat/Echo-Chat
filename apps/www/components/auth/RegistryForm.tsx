'use client'
import { RegisterProvider } from '@/app/context/RegistryContext'

import RegistryFlow from './RegistryFlow'

const RegistryForm = () => {
  return (
    <RegisterProvider>
      <RegistryFlow />
    </RegisterProvider>
  )
}

export default RegistryForm
