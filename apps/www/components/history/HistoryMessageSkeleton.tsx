'use client'

interface HistoryMessageSkeletonProps {
  isPrevMessageSameSender?: boolean
}

export function HistoryMessageSkeleton({
  isPrevMessageSameSender = false,
}: HistoryMessageSkeletonProps) {
  return (
    <div
      className={`group flex w-full items-start gap-3 ${isPrevMessageSameSender ? 'mt-2' : 'mt-6'}`}
    >
      <div className="w-8 shrink-0">
        {!isPrevMessageSameSender && (
          <div className="size-8 animate-pulse rounded-full bg-neutral-200" />
        )}
      </div>

      <div className="flex w-full translate-y-2 flex-col">
        {!isPrevMessageSameSender && (
          <div className="mb-1 flex items-center gap-2">
            <div className="h-4 w-24 animate-pulse rounded-md bg-neutral-200" />
            <div className="h-4 w-10 animate-pulse rounded-md bg-neutral-200" />
          </div>
        )}

        <div className="group flex w-full items-center gap-3">
          <div className="relative max-w-[70%]">
            <div
              className={`flex min-w-20 animate-pulse ${
                isPrevMessageSameSender
                  ? 'rounded-[14px]'
                  : 'rounded-[14px] rounded-tl-none'
              } border-[1.5px] border-neutral-200 bg-neutral-200 p-2 px-4`}
              style={{
                width: '250px',
                height: '40px',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
