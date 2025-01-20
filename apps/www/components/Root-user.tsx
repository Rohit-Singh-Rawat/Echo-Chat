'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@echo/ui/components/ui/avatar.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@echo/ui/components/ui/dropdown-menu.tsx'
import {
  SidebarMenuButton,
  useSidebar,
} from '@echo/ui/components/ui/sidebar.tsx'
import { Sparkles } from 'lucide-react'

import { useUser } from '@/hooks/useSession'

import Downitem from './Downitem'
import { UserIcon } from './icons/animated/user'
import FilledUser from './icons/FilledUser'
import AccountDialog from './shared/AccountDialog'
import { LogoutButton } from './shared/LogoutButton'

export function NavUser() {
  const { data, isLoading } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton asChild>
          <Avatar className="group relative size-5 rounded-full bg-neutral-200 p-0 outline-none ring-offset-1 ring-offset-neutral-100 transition-all duration-200 ease-in-out hover:ring-2 hover:ring-black/10 focus-visible:ring-2 focus-visible:ring-black/50 active:ring-black/15 data-[state='open']:ring-black/15 sm:inline-flex sm:size-6">
            {isLoading ? (
              <div className="size-5 animate-pulse rounded-full bg-neutral-200 sm:size-6" />
            ) : (
              <>
                <AvatarImage
                  src={data?.user?.image ?? ''}
                  alt={data?.user?.name}
                />
                <AvatarFallback className="size-5 rounded-lg bg-neutral-200 text-xs font-medium sm:size-6">
                  <FilledUser className="size-4 fill-black/70 stroke-black/80 sm:size-5" />
                </AvatarFallback>
              </>
            )}
          </Avatar>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2 w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-6 rounded-lg sm:size-8">
              {isLoading ? (
                <div className="size-6 animate-pulse rounded-full bg-neutral-200 sm:size-8" />
              ) : (
                <>
                  <AvatarImage
                    src={data?.user?.image ?? ''}
                    alt={data?.user?.name}
                  />
                  <AvatarFallback className="size-6 rounded-lg bg-neutral-200 text-xs font-medium sm:size-8">
                    <FilledUser className="size-4 fill-black/70 stroke-black/80 sm:size-5" />
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{data?.user?.name}</span>
              <span className="truncate text-xs text-gray-500">
                {data?.user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!data?.user?.subscription?.isPro && (
            <Downitem
              icon={<Sparkles />}
              title="Upgrade to Pro"
              href="/plans"
            />
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div>
            <AccountDialog
              trigger={
                <button className="flex w-full items-center gap-3 rounded px-2 py-1.5 text-left text-sm hover:bg-neutral-100">
                  <UserIcon className="size-4 text-gray-600" />
                  <span className="text-gray-600">Account</span>
                </button>
              }
            />
          </div>

          <LogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
