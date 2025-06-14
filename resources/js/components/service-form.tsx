import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from './input-error';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface ServiceFormProps {
    onSubmit: () => void;
    data: Required<ServiceFormData>;
    setData: (key: keyof ServiceFormData, value: string) => void;
    processing: boolean;
    errors: Partial<Record<keyof ServiceFormData, string>>;
}

export type ServiceFormData = {
    name: string;
    description: string;
    protocol: string;
    host: string;
    port: string;
    route: string;
};

export default function ServiceForm({ onSubmit, data, setData, processing, errors }: ServiceFormProps) {
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form className="space-y-6" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    autoFocus
                    tabIndex={1}
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Nombre del servicio"
                />
                <InputError message={errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                    id="description"
                    rows={6}
                    tabIndex={1}
                    required
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Descripción del servicio"
                />
                <InputError message={errors.description} />
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="grid gap-2">
                    <Label htmlFor="protocol">Protocolo</Label>
                    <Input
                        id="protocol"
                        type="text"
                        required
                        tabIndex={1}
                        value={data.protocol}
                        onChange={(e) => setData('protocol', e.target.value)}
                        placeholder="http, https."
                    />
                    <InputError message={errors.protocol} />
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="host">Host</Label>
                    <Input
                        id="host"
                        type="text"
                        required
                        tabIndex={2}
                        value={data.host}
                        onChange={(e) => setData('host', e.target.value)}
                        placeholder="Hostname o IP del servicio"
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
                        placeholder="Puerto"
                    />
                    <InputError message={errors.port} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="route">Ruta</Label>
                <Input
                    id="route"
                    type="text"
                    required
                    tabIndex={2}
                    value={data.route}
                    onChange={(e) => setData('route', e.target.value)}
                    placeholder="Ruta del servicio (ej. /api/v1, /service, etc.)"
                />
                <InputError message={errors.host} />
            </div>

            <div className="flex items-center justify-end gap-4">
                <Button onClick={() => window.history.back()} type="button" variant={'secondary'} tabIndex={4}>
                    Cancelar
                </Button>
                <Button type="submit" tabIndex={4} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Guardar
                </Button>
            </div>
        </form>
    );
}
