'use client'

import { ErrorState } from '@/components/ui/ErrorState'
import { useTimeLeft } from '@/hooks/useTimeLeft'

interface TimeLeftDisplayProps {
  closeTime: Date | null
  children: React.ReactNode
  isPublic?: boolean
}

export const TimeLeftDisplay = ({
  closeTime,
  children,
  isPublic = false,
}: TimeLeftDisplayProps) => {
  const timeLeft = useTimeLeft(closeTime ?? new Date())

  if (isPublic) {
    return <>{children}</>
  }

  if (closeTime && timeLeft) {
    const isClosed =
      timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

    if (isClosed) {
      return (
        <ErrorState
          title="Room Closed"
          message="This room has expired and is no longer accessible."
          details="Please return to the dashboard to join or create another room."
          fullScreen
        />
      )
    }
  }

  return <>{children}</>
}
