import EchoWave from '../icons/animated/EchoWave'

interface AuthHeaderProps {
  title: string
  description: string
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="py-3">
        <EchoWave />
      </div>
      <h1 className="text-2xl font-medium">{title}</h1>
      <p className="text-center text-sm font-normal text-gray-500">
        {description}
      </p>
    </div>
  )
}
