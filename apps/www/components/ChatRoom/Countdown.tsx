import NumberFlow from '@number-flow/react'

import { useTimeLeft } from '@/hooks/useTimeLeft'

type Props = {
  endDate: Date
}

export default function Countdown({ endDate }: Props) {
  const timeLeft = useTimeLeft(endDate)

  return (
    <div>
      <div className="flex items-baseline font-semibold">
        <NumberFlow
          value={timeLeft.hours}
          format={{ minimumIntegerDigits: 2 }}
        />
        <span>:</span>
        <NumberFlow
          value={timeLeft.minutes}
          format={{ minimumIntegerDigits: 2 }}
        />
        <span>:</span>
        <NumberFlow
          value={timeLeft.seconds}
          format={{ minimumIntegerDigits: 2 }}
        />
      </div>
    </div>
  )
}
