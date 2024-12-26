import Footer from '@/components/Home/Footer'
import { NavBar } from '@/components/Home/NavBar'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  )
}
