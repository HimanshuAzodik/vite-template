'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from 'lucide-react';
import { NavMain } from '@/components/dashboard/nav-main';
import { NavUser } from '@/components/dashboard/nav-user';
import { TeamSwitcher } from '@/components/dashboard/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Products',
      url: '/dashboard/products',
      icon: SquareTerminal,
    },
    {
      title: 'Categories',
      url: '/dashboard/categories',
      icon: GalleryVerticalEnd,
    },
    {
      title: 'Orders',
      url: '/dashboard/orders',
      icon: Bot,
    },
    {
      title: 'Transactions',
      url: '/dashboard/transactions',
      icon: BookOpen,
    },

    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: ' Notifications',
          url: '#',
        },
        {
          title: 'Security',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },

        {
          title: 'Api Keys',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          <h1 className="font-bold">Azodik</h1>
          <ColorSchemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
