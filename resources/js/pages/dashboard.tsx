import AppLayout from '@/layouts/app-layout';
import { Traffic, type BreadcrumbItem, type Flash } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle, Layers, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel',
        href: '/dashboard',
    },
];

interface PageProps {
    activeCount: number;
    inactiveCount: number;
    traffics: Traffic[];
    flash: Flash;
    [key: string]: unknown;
}

export default function Dashboard() {
    const toastId = 'success-api-gateway';

    const { flash, activeCount, inactiveCount, traffics } = usePage<PageProps>().props;
    
    if (flash.success !== undefined) toast.success(flash.success);

    useEffect(() => {
        if (flash.success !== undefined && flash.success !== '') {
            if (!toast.isActive(toastId)) {
                toast.success(flash.success, {
                    toastId,
                    onClose: () => {
                        window.location.reload();
                    },
                });
            }
        }
    }, [flash.success]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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
            <Head title="Panel de control" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl px-6 py-4">
                <div className="flex w-full flex-col items-center justify-between px-4 pt-4 md:flex-row">
                    <div className="w-full text-left">
                        <h1 className="text-xl font-medium">Estadísticas de Servicios</h1>
                    </div>
                </div>
                <div className="-mt-3 flex flex-col justify-between gap-8 p-4 lg:flex-row">
                    <div className="flex h-36 flex-1 cursor-pointer items-center space-x-5 rounded-lg border border-blue-200 p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                        <div className="rounded-full bg-blue-600 p-4 text-white">
                            <Layers size={32} />
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-700">Total de Servicios</p>
                            <p className="text-3xl font-extrabold text-gray-900">{activeCount + inactiveCount}</p>
                        </div>
                    </div>
                    <div className="flex h-36 flex-1 cursor-pointer items-center space-x-5 rounded-lg border border-green-200 p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                        <div className="rounded-full bg-green-500 p-4 text-white">
                            <CheckCircle size={32} />
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-700">Servicios Activos</p>
                            <p className="text-3xl font-extrabold text-gray-900">{activeCount}</p>
                        </div>
                    </div>

                    <div className="flex h-36 flex-1 cursor-pointer items-center space-x-5 rounded-lg border border-red-200 p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                        <div className="rounded-full bg-red-500 p-4 text-white">
                            <XCircle size={32} />
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-700">Servicios Inactivos</p>
                            <p className="text-3xl font-extrabold text-gray-900">{inactiveCount}</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col items-center justify-between px-4 pt-4 md:flex-row">
                    <div className="w-full text-left">
                        <h1 className="text-xl font-medium">Tráfico de Peticiones por Segundo</h1>
                    </div>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative mx-4 min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={traffics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" label={{ value: 'Tiempo', position: 'insideBottomRight', offset: 0 }} />
                            <YAxis label={{ value: 'Peticiones / seg', angle: -90, position: 'insideLeft' }} />
                            <Tooltip
                                formatter={(value, name) => {
                                    if (name === 'requests') return [`${value}`, 'Peticiones'];
                                    if (name === 'time') return [value, 'Tiempo'];
                                    return [value, name];
                                }}
                                labelFormatter={(label) => `Tiempo: ${label}`}
                            />
                            <Legend
                                formatter={(value) => {
                                    if (value === 'requests') return 'Peticiones';
                                    return value;
                                }}
                            />
                            <Line type="monotone" dataKey="requests" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AppLayout>
    );
}
