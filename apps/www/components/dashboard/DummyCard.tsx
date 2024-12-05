'use client'

export default function DummyCard() {
  return (
    <div className="w-full">
      <div className="py-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="h-4 w-32 rounded-lg bg-blue-100/50 shadow-sm" />
            <div className="h-3 w-16 rounded-lg bg-gray-200/50" />
          </div>
          <div className="mt-2 flex gap-1">
            <div className="size-1.5 rounded-full bg-blue-200/50"></div>
            <div className="size-1.5 rounded-full bg-blue-200/50"></div>
            <div className="size-1.5 rounded-full bg-blue-100/50"></div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border-background size-6 rounded-full border-2 bg-gray-200/50"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-8 rounded-lg bg-gray-200/50" />
            <div className="h-4 w-8 rounded-lg bg-blue-200/50" />
            <div className="h-4 w-12 rounded-lg bg-gray-200/50" />
          </div>
        </div>
      </div>
      <div className="pt-2">
        <div className="h-6 w-full rounded-lg bg-gray-200/50" />
      </div>
    </div>
  )
}
