'use client'

import { Button } from '@echo/ui/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@echo/ui/components/ui/dialog.tsx'
import { ScrollArea } from '@echo/ui/components/ui/scroll-area.tsx'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@echo/ui/components/ui/sidebar.tsx'
import { LoadingSpinner } from '@echo/ui/icons/spinner.tsx'
import { User } from 'lucide-react'
import { useState } from 'react'

import { useUser } from '@/hooks/useSession'

import { UserIcon } from '../icons/animated/user'

import { DeleteAccountSection } from './account/DeleteAccountSection'
import { EmailSection } from './account/EmailSection'
import { NameSection } from './account/NameSection'
import { ProfileSection } from './account/ProfileSection'
import { SubscriptionSection } from './account/SubscriptionSection'
import { UserIdSection } from './account/UserIdSection'

interface AccountDialogProps {
  trigger?: React.ReactNode
}

export default function AccountDialog({ trigger }: AccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { data, isLoading } = useUser()
  const user = data?.user
  const subscription = data?.user?.subscription

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 rounded-full text-neutral-500 transition-colors hover:bg-neutral-200"
    >
      <User className="size-4" />
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent
        className="h-[600px] max-h-[600px] max-md:max-w-[96vw] gap-0 border-neutral-200 bg-neutral-100 p-2 text-neutral-900  md:max-w-[800px]"
        showCloseButton={false}
      >
        <SidebarProvider className="min-h-[400px]">
          <Sidebar collapsible="none" className="h-full max-md:hidden md:w-48">
            <SidebarContent>
              <DialogHeader className="p-6">
                <DialogTitle className="text-xl font-semibold text-neutral-900">
                  Account
                </DialogTitle>
                <p className="mt-2 text-sm text-neutral-600 max-md:hidden">
                  Manage your account
                </p>
              </DialogHeader>

              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={true}>
                        <button className="flex w-full items-center gap-2 rounded-lg bg-neutral-200/50 px-3 py-2 text-sm text-neutral-900">
                          <UserIcon className="size-4" />
                          <span className="max-md:hidden">Profile</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="relative max-h-full min-h-full overflow-hidden rounded-2xl  p-4 md:border md:border-neutral-200/80 bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 p-4 pt-0 md:hidden">
              <div>
                <h2 className="text-lg font-semibold">Account</h2>
                <p className="text-sm text-neutral-500">Manage your account</p>
              </div>
             
            </div>
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <LoadingSpinner className="size-8" />
              </div>
            ) : (
              <ScrollArea className="h-full pt-2">
                <div className="flex-1 p-4">
                  <div className="space-y-4">
                    <ProfileSection image={user?.image} />
                    <NameSection defaultName={user?.name || ''} />
                    <EmailSection email={user?.email || ''} />
                    <UserIdSection userId={user?.id || ''} />
                    <SubscriptionSection subscription={subscription} />
                    <DeleteAccountSection />
                  </div>
                </div>
              </ScrollArea>
            )}
          </SidebarInset>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
