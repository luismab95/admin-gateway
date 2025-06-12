import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Restablecer contraseña" description="Introduzca su nueva contraseña a continuación">
            <Head title="Restablecer contraseña" />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            readOnly
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="relative grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="********"
                        />
                        <div className="absolute top-0 right-0 mt-8 mr-3 flex items-center justify-between">
                            <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                {showPassword ? <i className="fa-solid fa-eye-slash fa-sm"></i> : <i className="fa-solid fa-eye fa-sm"></i>}
                            </div>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2 relative">
                        <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                        <Input
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirmar contraseña"
                        />
                        <div className="absolute top-0 right-0 mt-8 mr-3 flex items-center justify-between">
                            <div className="cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex={-1}>
                                {showConfirmPassword ? <i className="fa-solid fa-eye-slash fa-sm"></i> : <i className="fa-solid fa-eye fa-sm"></i>}
                            </div>
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <Button type="submit" className="mt-4 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Restablecer contraseña
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
