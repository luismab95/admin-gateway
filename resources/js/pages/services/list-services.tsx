import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { Flash, PaginatedResponse, Service, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit2, SquarePlus, ToggleLeft, ToggleRight, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/services',
    },
];

interface ServiceFilters {
    search?: string;
    status?: string;
    perPage?: string;
}

interface PageProps {
    services: PaginatedResponse<Service>;
    filters: ServiceFilters;
    flash: Flash;
    [key: string]: unknown;
}

export default function ListServices() {
    const { services, filters } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [perPage, setPerPage] = useState(filters.perPage || '10');

    const applyFilters = () => {
        router.post('/services', { search, status, perPage }, { preserveState: true });
    };

    useEffect(() => {
        const delay = setTimeout(() => applyFilters(), 400);
        return () => clearTimeout(delay);
    }, [search, status, perPage]);

    const handleEdit = (service: Service) => {};

    const handleDelete = (service: Service) => {
        router.delete('/services', {
            onSuccess: (data) => {
                const notify = data.props.flash as Flash;
                if (notify.success !== null) {
                    toast.success(notify.success);
                    applyFilters();
                }

                if (notify.error !== null) {
                    toast.error(notify.error);
                }
            },
            data: { id: service.id },
            preserveScroll: true,
        });
    };

    const handleStatus = (service: Service) => {
        router.patch(
            '/services',
            { id: service.id },
            {
                onSuccess: (data) => {
                    const notify = data.props.flash as Flash;
                    if (notify.success !== null) {
                        toast.success(notify.success);
                        applyFilters();
                    }

                    if (notify.error !== null) {
                        toast.error(notify.error);
                    }
                },
                preserveScroll: true,
            },
        );
    };

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
            <Head title="Servicios" />
            <div className="flex h-screen w-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full flex-col items-center justify-between px-4 pt-4 md:flex-row">
                    <div className="w-full space-y-2 text-left">
                        <h1 className="text-xl font-medium">Lista de Servicios</h1>
                        <p className="text-muted-foreground text-left text-sm">Aquí puedes ver y gestionar todos los servicios disponibles.</p>
                    </div>
                    <div className="flex w-full items-center justify-end">
                        <Button type="button" className="mt-4 w-auto" tabIndex={4}>
                            <SquarePlus className="h-5 w-5 text-white" />
                            Nuevo
                        </Button>
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
                            placeholder="Buscar servicio..."
                            className="w-full"
                        />

                        <Select value={status} onValueChange={(value) => setStatus(value)}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Estado..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Estados</SelectLabel>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="1">Activos</SelectItem>
                                    <SelectItem value="0">Inactivos</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* TABLA */}
                    <div className="w-full overflow-x-auto md:w-md lg:w-full">
                        <table className="border-muted min-w-full overflow-hidden rounded-sm border shadow-xs">
                            <thead className="bg-primary text-white">
                                <tr className="w-full">
                                    <th className="px-6 py-3 text-center text-sm font-semibold tracking-wide uppercase">Acciones</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold tracking-wide uppercase">Nombre</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold tracking-wide uppercase">Descripción</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold tracking-wide uppercase">Host</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold tracking-wide uppercase">Ruta</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold tracking-wide uppercase">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {services.data.map((service, i) => (
                                    <tr key={i} className="cursor-pointer transition-colors duration-200">
                                        <td className="flex items-center justify-center space-x-2 px-1 py-2 text-center whitespace-nowrap">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Edit2
                                                        onClick={() => handleEdit(service)}
                                                        className="text-primary p-1 duration-200 hover:scale-110"
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent className="border-muted border bg-gray-100 text-gray-800">
                                                    <p>Editar</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button variant="ghost" className="cursor-pointer">
                                                                    {!service.status ? (
                                                                        <ToggleLeft
                                                                            onClick={() => handleStatus(service)}
                                                                            className="text-red-500 duration-200 hover:scale-110"
                                                                        />
                                                                    ) : (
                                                                        <ToggleRight
                                                                            onClick={() => handleStatus(service)}
                                                                            className="text-green-600 duration-200 hover:scale-110"
                                                                        />
                                                                    )}
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogTitle>
                                                                    ¿Seguro/a que quieres {service.status ? 'deshabilitar' : 'habilitar'} el servicio
                                                                    "{service.name}"?
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    Al cambiar el estado del servicio, este podrá ser utilizado o dejado fuera de
                                                                    funcionamiento según corresponda. Puedes revertir esta acción en cualquier
                                                                    momento.
                                                                </DialogDescription>

                                                                <DialogFooter className="gap-2">
                                                                    <DialogClose asChild>
                                                                        <Button variant="secondary" className="cursor-pointer">
                                                                            Cancelar
                                                                        </Button>
                                                                    </DialogClose>
                                                                    <DialogClose asChild>
                                                                        <Button variant="destructive" asChild>
                                                                            <button
                                                                                type="button"
                                                                                className="cursor-pointer"
                                                                                onClick={() => handleStatus(service)}
                                                                            >
                                                                                {service.status ? 'Deshabilitar' : 'Habilitar'} servicio
                                                                            </button>
                                                                        </Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent className="border-muted border bg-gray-100 text-gray-800">
                                                    <p>{service.status ? 'Deshabilitar' : 'Habilitar'}</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button variant="ghost" className="cursor-pointer">
                                                                    <Trash className="text-destructive duration-200 hover:scale-110" />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogTitle>
                                                                    ¿Seguro/a que quieres eliminar el servicio "{service.name}"?
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    Una vez eliminado el servicio, todos sus datos se borrarán permanentemente.
                                                                </DialogDescription>

                                                                <DialogFooter className="gap-2">
                                                                    <DialogClose asChild>
                                                                        <Button variant="secondary" className="cursor-pointer">
                                                                            Cancelar
                                                                        </Button>
                                                                    </DialogClose>
                                                                    <DialogClose asChild>
                                                                        <Button variant="destructive" asChild>
                                                                            <button
                                                                                type="button"
                                                                                className="cursor-pointer"
                                                                                onClick={() => handleDelete(service)}
                                                                            >
                                                                                Eliminar servicio
                                                                            </button>
                                                                        </Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent className="border-muted border bg-gray-100 text-gray-800">
                                                    <p>Eliminar</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </td>
                                        <td className="px-6 py-4 font-medium whitespace-nowrap text-gray-900">{service.name}</td>
                                        <td className="px-6 py-4 text-ellipsis whitespace-nowrap text-gray-700">{service.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {service.protocol}://{service.host}:{service.port}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{service.route}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {service.status ? (
                                                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                                    Activo
                                                </span>
                                            ) : (
                                                <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                                                    Inactivo
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                                {services.data.length === 0 && (
                                    <tr className="transition-colors duration-200">
                                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                            No se encontraron servicios.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINACIÓN */}
                    <div className="flex w-full flex-col items-center justify-between py-2 md:flex-row">
                        <Select value={perPage} onValueChange={(value) => setPerPage(value)}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Estado..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Items por página</SelectLabel>
                                    {['5', '10', '25', '50'].map((n) => (
                                        <SelectItem key={n} value={n}>
                                            {n} items por página
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {services.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url ?? ''}
                                    method="post"
                                    preserveScroll
                                    data={{ perPage, search, status }}
                                    preserveState
                                    aria-current={link.active ? 'page' : undefined}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`cursor-pointer rounded px-3 py-1 text-sm transition ${
                                        link.active ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                    } ${!link.url && 'pointer-events-none opacity-50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
