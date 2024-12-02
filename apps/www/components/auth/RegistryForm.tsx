'use client'
import RegistryFlow from './RegistryFlow'

import { RegisterProvider } from '@/app/context/RegistryContext'

const RegistryForm = () => {
  return (
    <RegisterProvider>
      <RegistryFlow />
    </RegisterProvider>
  )
}

export default RegistryForm
