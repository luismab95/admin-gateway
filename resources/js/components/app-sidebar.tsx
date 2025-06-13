import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Logs, Server, FileCog } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Panel',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Servicios',
        href: '/services',
        icon: Server,
    },
    {
        title: 'Logs',
        href: '/logs',
        icon: Logs,
    },
    // {
    //     title: 'Parámetros',
    //     href: '/parameters',
    //     icon: FileCog,
    // },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-primary">
            <SidebarHeader className="bg-primary">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="hover:bg-transparent focus:bg-transparent" size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-primary text-white">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="bg-primary">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
