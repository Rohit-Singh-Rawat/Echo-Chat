import {
  SidebarInset,
  SidebarProvider,
} from '@echo/ui/components/ui/sidebar.tsx'

import { AppSidebar } from '@/components/shared/app-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-neutral-100">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative min-h-full rounded-none rounded-tl-2xl bg-neutral-100 pt-px md:border md:border-b-0 md:border-r-0 md:border-neutral-200/80 md:bg-white">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
