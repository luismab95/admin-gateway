import HeadingSmall from '@/components/heading-small';
import ServiceForm, { ServiceFormData } from '@/components/service-form';
import AppLayout from '@/layouts/app-layout';
import ServicesLayout from '@/layouts/services/layout';
import { Flash, type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/services',
    },
    {
        title: 'Editar',
        href: '/services/edit',
    },
];

type AddServiceForm = {
    name: string;
    description: string;
    protocol: string;
    host: string;
    port: string;
    route: string;
    middleware: any[];
};

type SharedData = {
    id: string;
    service: AddServiceForm;
};

export default function EditService() {
    const { service, id } = usePage<SharedData>().props;

    const { data, setData, processing, errors, put } = useForm<Required<ServiceFormData>>({
        name: service.name || '',
        description: service.description || '',
        protocol: service.protocol || '',
        host: service.host || '',
        port: service.port || '',
        route: service.route || '',
    });

    const submit = () => {
        put(route('services.update', { id }), {
            preserveScroll: true,
            onSuccess: (data) => {
                const notify = data.props.flash as Flash;
                if (notify.success !== null) {
                    toast.success(notify.success, {
                        onClose: () => {
                            router.get('/services');
                        },
                    });
                }

                if (notify.error !== null) {
                    toast.error(notify.error);
                }
            },
        });
    };

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
            <Head title="Editar servicio" />

            <ServicesLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Editar servicio" description=" Completa los campos para editar el servicio en tu Api Gateway." />
                </div>

                <ServiceForm onSubmit={submit} data={data} processing={processing} setData={setData} errors={errors} />
            </ServicesLayout>
        </AppLayout>
    );
}
