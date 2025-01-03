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
import { LogoutIcon } from './icons/animated/logout'
import { UserIcon } from './icons/animated/user'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { data, isLoading } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton asChild>
          <Avatar className="group relative size-6 rounded-full bg-neutral-200 p-0 outline-none ring-offset-1 ring-offset-neutral-100 transition-all duration-200 ease-in-out hover:ring-2 hover:ring-black/10 focus-visible:ring-2 focus-visible:ring-black/50 active:ring-black/15 data-[state='open']:ring-black/15 sm:inline-flex">
            {isLoading ? (
              <div className="size-6 animate-pulse rounded-full bg-neutral-200" />
            ) : (
              <>
                <AvatarImage
                  src={data?.user?.image ?? ''}
                  alt={data?.user?.name}
                />
                <AvatarFallback className="size-6 rounded-lg bg-neutral-200 text-xs font-medium">
                  {data?.user?.name
                    .split(' ')
                    .map((name: string) => name.charAt(0).toUpperCase())
                    .join('')}
                </AvatarFallback>
              </>
            )}
          </Avatar>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-5 w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              {isLoading ? (
                <div className="size-8 animate-pulse rounded-full bg-neutral-200" />
              ) : (
                <>
                  <AvatarImage
                    src={data?.user?.image ?? ''}
                    alt={data?.user?.name}
                  />
                  <AvatarFallback className="size-6 rounded-lg bg-neutral-200 text-xs font-medium">
                    {data?.user?.name
                      .split(' ')
                      .map((name: string) => name.charAt(0).toUpperCase())
                      .join('')}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{data?.user?.name}</span>
              <span className="truncate text-xs">{data?.user?.email}</span>
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
          <Downitem icon={<UserIcon />} title="Account" href="/account" />
          <Downitem
            icon={<LogoutIcon />}
            title="Logout"
            onClick={() => console.log('Logout clicked')}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
