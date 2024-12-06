import { LoadingSpinner } from '@echo/ui/icons/spinner.tsx'

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}
