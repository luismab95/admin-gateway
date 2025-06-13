import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Perfil',
        href: '/settings/profile',
        icon: null,
    },
    {
        title: 'Contraseña',
        href: '/settings/password',
        icon: null,
    },
    // {
    //     title: 'Appearance',
    //     href: '/settings/appearance',
    //     icon: null,
    // },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <div className="flex h-screen flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <div className='flex w-full flex-col space-y-6 lg:space-x-6 lg:space-y-0 lg:border-r-1 border-gray-200 max-w-xl lg:w-80 px-3'>
                    <Heading title="Configuración" description="Gestione su perfil y la configuración de su cuenta" />

                    <aside className="w-full max-w-xl lg:w-72">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {sidebarNavItems.map((item, index) => (
                                <Button
                                    key={`${item.href}-${index}`}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted': currentPath === item.href,
                                    })}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>
                </div>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12 mt-0 md:mt-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
