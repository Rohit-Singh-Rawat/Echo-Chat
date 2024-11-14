export default function DashboardLayout({
  children,
  joinRoom,
}: {
  children: React.ReactNode
  joinRoom: React.ReactNode
}) {
  return (
    <>
      {joinRoom}
      {children}
    </>
  )
}
