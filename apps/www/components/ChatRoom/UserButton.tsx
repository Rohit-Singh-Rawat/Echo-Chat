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
import { Sparkles } from 'lucide-react'

import Downitem from '../Downitem'
import { LogoutIcon } from '../icons/animated/logout'
import { UserIcon } from '../icons/animated/user'
import EchoRoom from '../icons/EchoRoom'
import { UserIcon as User } from '../icons/UserIcon'

export function UserButton({
  user,
}: {
  user?: {
    name: string
    email: string
    avatar: string
    isPro: boolean
  }
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="group relative size-6 rounded-full bg-neutral-200 p-0 outline-none ring-offset-1 ring-offset-neutral-100 transition-all duration-200 ease-in-out hover:ring-2 hover:ring-black/10 focus-visible:ring-2 focus-visible:ring-black/50 active:ring-black/15 data-[state='open']:ring-black/15 sm:inline-flex">
          {user?.avatar ? (
            <AvatarImage src={user.avatar} alt={'Unknown'} />
          ) : (
            <AvatarFallback className="size-6 rounded-lg bg-neutral-200 font-bold">
              <User className="size-4" />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-5 w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="right"
        align="start"
        sideOffset={4}
      >
        {user && (
          <>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="size-6 rounded-lg bg-neutral-200 font-bold">
                      {user.name
                        .split(' ')
                        .map((name) => name.charAt(0).toUpperCase())
                        .join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          {user && !user.isPro && (
            <Downitem
              icon={<Sparkles />}
              title="Upgrade to Pro"
              href="/plans"
            />
          )}
          <Downitem
            icon={<EchoRoom className="stroke-2" />}
            title="Join a room"
            href="/join-room"
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user ? (
            <>
              <Downitem icon={<UserIcon />} title="Account" href="/account" />
              <Downitem
                icon={<LogoutIcon />}
                title="Logout"
                onClick={() => console.log('Logout clicked')}
              />
            </>
          ) : (
            <Downitem icon={<UserIcon />} title="Login" href="/login" />
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
