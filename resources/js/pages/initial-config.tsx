import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel',
        href: '/dashboard',
    },
];

type InitialConfigForm = {
    protocol: string;
    host: string;
    port: string;
};

type SharedData = {
    error: string;
    old: InitialConfigForm;
};

export default function InitialConfig() {
    const toastId = 'error-api-gateway';

    const { error, old } = usePage<SharedData>().props;

    const { data, setData, post, processing, errors, reset } = useForm<Required<InitialConfigForm>>({
        protocol: old?.protocol || '',
        host: old?.host || '',
        port: old?.port || '',
    });

    useEffect(() => {
        if (error !== undefined && error !== '') {
            if (!toast.isActive(toastId)) {
                toast.error(error, { toastId });
            }
        }
    }, [error]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('dashboard.store'), {
            preserveScroll: true,
        });
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
            <Head title="Panel de control" />
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 rounded-xl p-4">
                <div className="border-muted bg-background flex w-full flex-col items-center gap-4 rounded-xl border p-4 shadow-xs md:w-[500px] md:p-12">
                    <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-md">
                        <AppLogoIcon className="size-14 fill-current text-[var(--foreground)] dark:text-white" />
                    </div>
                    <span className="sr-only">Configura tu Api Gateway</span>

                    <div className="space-y-2 text-center">
                        <h1 className="text-xl font-medium">Configura tu Api Gateway</h1>
                        <p className="text-muted-foreground text-center text-sm">
                            Ingresa el protocolo, host y puerto para establecer comunicación con tu Api Gateway.
                        </p>
                    </div>

                    <form className="mt-4 flex h-full w-full flex-row items-start justify-center gap-6" onSubmit={submit}>
                        <div className="grid w-md gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="protocol">Protocolo</Label>
                                <Input
                                    id="protocol"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.protocol}
                                    onChange={(e) => setData('protocol', e.target.value)}
                                    placeholder="http, https, etc."
                                />
                                <InputError message={errors.protocol} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="host">Host</Label>
                                <Input
                                    id="host"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    value={data.host}
                                    onChange={(e) => setData('host', e.target.value)}
                                    placeholder="Hostname o IP del servidor"
                                />
                                <InputError message={errors.host} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="port">Puerto</Label>
                                <Input
                                    id="port"
                                    type="number"
                                    required
                                    tabIndex={2}
                                    value={data.port}
                                    onChange={(e) => setData('port', e.target.value)}
                                    placeholder="Puerto del servidor (ej. 80, 443, etc.)"
                                />
                                <InputError message={errors.port} />
                            </div>

                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Conectar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
