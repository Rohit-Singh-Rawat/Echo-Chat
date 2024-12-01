interface AuthContainerProps {
  children: React.ReactNode
}

export function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className="bg-grid-slate-100 flex min-h-screen items-center justify-center bg-[#f8f9fc]">
      <div className="flex aspect-square w-full max-w-[450px] flex-col justify-between rounded-2xl bg-white p-8 shadow-lg">
        {children}
      </div>
    </div>
  )
}
