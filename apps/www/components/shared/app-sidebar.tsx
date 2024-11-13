import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@echo/ui/components/ui/sidebar.tsx'

import EchoLogo from '../icons/animated/EchoLogo'
import { History } from '../icons/animated/History'
import { HomeIcon } from '../icons/animated/Home'
import { Logo } from '../icons/animated/Logo'
import { SettingsGearIcon } from '../icons/animated/Settiing'
import Echo from '../icons/Echo'
import { NavUser } from '../Root-user'

import PremiumBox from './PremiumBox'
import SideBarItem from './SideBarItem'

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: HomeIcon,
  },
  {
    title: 'History',
    url: '/history',
    icon: History,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: SettingsGearIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="inset" className="bg-neutral-100">
      <SidebarContent className="ju flex flex-col">
        <SidebarHeader className="flex flex-row items-center justify-between">
          <EchoLogo />
          <NavUser
            user={{
              name: 'rohit',
              avatar: 'https://avatar.iran.liara.run/public',
              email: 'rohitsrawat2003@gmail.com',
            }}
          />
        </SidebarHeader>
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <SideBarItem
                      icon={<item.icon />}
                      title={item.title}
                      url={item.url}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <PremiumBox />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
