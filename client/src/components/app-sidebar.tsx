import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { useAuth, useLogout } from '@/hooks';

const data = {
    navMain: [
        {
            title: 'Navigation',
            items: [
                {
                    title: 'Accueil',
                    url: '/',
                },
                {
                    title: 'Spots',
                    url: '/spots',
                },
            ],
        },
    ],
    navUserNotConnected: [
        {
            title: 'Se connecter',
            url: '/login',
        },
    ],
    navUserConnected: [
        {
            title: 'Mon compte',
            url: '/account',
        },
        {
            title: 'Se déconnecter',
            url: '#logout',
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isAuthenticated, user } = useAuth();
    const logoutMutation = useLogout();
    const navigate = useNavigate();

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e.currentTarget.getAttribute('href') === '#logout') {
            e.preventDefault();
            logoutMutation.mutate();
            navigate('/');
        }
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className='p-4 flex items-center gap-3'>
                    {isAuthenticated && (
                        <Avatar>
                            <AvatarImage
                                src='/avatar-placeholder.png'
                                alt='User'
                            />
                            <AvatarFallback>
                                {user?.id.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    )}
                    <h2 className='text-lg font-semibold text-sidebar-foreground'>
                        TP REST API Express
                    </h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map(group => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map(item => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link to={item.url}>
                                                {item.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
                <SidebarGroup>
                    <SidebarGroupLabel>Utilisateur</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {(isAuthenticated
                                ? data.navUserConnected
                                : data.navUserNotConnected
                            ).map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={item.url}
                                            onClick={handleLogout}
                                        >
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
