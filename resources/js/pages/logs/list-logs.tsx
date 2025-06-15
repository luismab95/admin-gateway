import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Flash, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logs',
        href: '/logs',
    },
];

interface ServiceFilters {
    search?: string;
    type?: string;
}

interface PageProps {
    filters: ServiceFilters;
    log: any;
    flash: Flash;
    [key: string]: unknown;
}

export default function ListLogs() {
    const { filters, log } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || 'error');

    const applyFilters = () => {
        router.post('/logs', { search, type }, { preserveState: true });
    };

    useEffect(() => {
        const delay = setTimeout(() => applyFilters(), 400);
        return () => clearTimeout(delay);
    }, [search, type]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Head title="Logs" />
            <div className="flex h-screen w-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full flex-col items-center justify-between px-4 pt-4 md:flex-row">
                    <div className="w-full space-y-2 text-left">
                        <div className="flex flex-row items-center justify-start">
                            <h1 className="mr-1 text-xl font-medium">Logs del Gateway</h1>
                            <RefreshCcw onClick={() => applyFilters()} className="text-primary cursor-pointer p-1 duration-200 hover:scale-110" />
                        </div>
                        <p className="text-muted-foreground text-left text-sm">Aquí puedes ver y gestionar todos los logs disponibles.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between px-2">
                    {/* FILTROS */}
                    <div className="mb-2 flex w-full flex-col items-center gap-4 md:flex-row">
                        <Input
                            id="search"
                            type="search"
                            autoFocus
                            tabIndex={1}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar..."
                            className="w-full"
                        />

                        <Select value={status} onValueChange={(value) => setType(value)}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tipos</SelectLabel>
                                    <SelectItem value="error">Error</SelectItem>
                                    <SelectItem value="info">Info</SelectItem>
                                    <SelectItem value="warn">Warn</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* LOGS */}
                    <div className="bg-foreground border-muted text-background mt-1 h-[600px] overflow-auto rounded-md border p-4 opacity-95 md:w-md lg:w-full w-full">
                        <pre className='max-w-6xl' >{log}</pre>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
