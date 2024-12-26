'use client'

interface GridItemContentProps {
  title: string
  description: string
  children?: React.ReactNode
}

const GridItemContent = ({
  title,
  description,
  children,
}: GridItemContentProps) => {
  return (
    <>
      {children && (
        <div className="flex-center relative w-full">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 size-full bg-gradient-to-t from-white via-transparent to-white" />
          {children}
        </div>
      )}
      <div className="relative z-10 mt-5">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </>
  )
}

export { GridItemContent }
