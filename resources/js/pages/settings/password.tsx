import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuración de la contraseña',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuración del perfil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Actualizar contraseña"
                        description="Asegúrese de que su cuenta utiliza una contraseña larga y aleatoria para mantener la seguridad."
                    />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="relative grid gap-2">
                            <Label htmlFor="current_password">Contraseña actual</Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type={showCurrentPassword ? 'text' : 'password'}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Contraseña actual"
                            />
                            <div className="absolute top-0 right-0 mt-8 mr-3 flex items-center justify-between">
                                <div className="cursor-pointer" onClick={() => setShowCurrentPassword(!showCurrentPassword)} tabIndex={-1}>
                                    {showCurrentPassword ? (
                                        <i className="fa-solid fa-eye-slash fa-sm"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye fa-sm"></i>
                                    )}
                                </div>
                            </div>
                            <InputError message={errors.current_password} />
                        </div>

                        <div className="relative grid gap-2">
                            <Label htmlFor="password">Nueva contraseña</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Nueva contraseña"
                            />
                            <div className="absolute top-0 right-0 mt-8 mr-3 flex items-center justify-between">
                                <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                    {showPassword ? <i className="fa-solid fa-eye-slash fa-sm"></i> : <i className="fa-solid fa-eye fa-sm"></i>}
                                </div>
                            </div>
                            <InputError message={errors.password} />
                        </div>

                        <div className="relative grid gap-2">
                            <Label htmlFor="password_confirmation">Confirmar contraseña</Label>

                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirmar contraseña"
                            />
                            <div className="absolute top-0 right-0 mt-8 mr-3 flex items-center justify-between">
                                <div className="cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex={-1}>
                                    {showConfirmPassword ? (
                                        <i className="fa-solid fa-eye-slash fa-sm"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye fa-sm"></i>
                                    )}
                                </div>
                            </div>
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Guardar contraseña</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Guardado</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
