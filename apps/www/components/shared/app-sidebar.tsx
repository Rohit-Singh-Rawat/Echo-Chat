import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@echo/ui/components/ui/sidebar.tsx'

import EchoLogo from '../icons/animated/EchoLogo'
import { History } from '../icons/animated/History'
import { HomeIcon } from '../icons/animated/Home'
import { NavUser } from '../Root-user'

import PremiumBox from './PremiumBox'
import SideBarItem from './SideBarItem'

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: <HomeIcon />,
  },
  {
    title: 'History',
    url: '/history',
    icon: <History />,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="inset" className="bg-neutral-100">
      <SidebarContent className="ju flex flex-col">
        <SidebarHeader className="flex flex-row items-center justify-between max-md:p-4">
          <EchoLogo />
          <div className='max-md:hidden'>
            <NavUser />
          </div>
        </SidebarHeader>
        <SidebarGroup className="mt-10 flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <SideBarItem
                      icon={item.icon}
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
