import HeadingSmall from '@/components/heading-small';
import ServiceForm, { ServiceFormData } from '@/components/service-form';
import AppLayout from '@/layouts/app-layout';
import ServicesLayout from '@/layouts/services/layout';
import { Flash, type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/services',
    },
    {
        title: 'Nuevo',
        href: '/services/add',
    },
];

export default function AddService() {
    const { data, setData, processing, errors, post } = useForm<Required<ServiceFormData>>({
        name: '',
        description: '',
        protocol: '',
        host: '',
        port: '',
        route: '',
    });

    const submit = () => {
        post(route('services.store'), {
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
            <Head title="Agregar servicio" />

            <ServicesLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Agregar servicio" description=" Completa los campos para agregar un nuevo servicio en tu Api Gateway." />
                </div>

                <ServiceForm onSubmit={submit} data={data} processing={processing} setData={setData} errors={errors} />
            </ServicesLayout>
        </AppLayout>
    );
}
