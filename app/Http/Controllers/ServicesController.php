<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Connection as ServerConnection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $perPage = 10;

        $query = Service::query();

        $services = $query->paginate($perPage)->withQueryString();

        return Inertia::render('services/list-services', [
            'services' => $services,
            'filters' => [],
        ]);
    }

    public function filters(Request $request)
    {

        $perPage = $request->input('perPage', 10);

        $query = Service::query();


        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->input('search') . '%');
        }

        if ($request->has('status')) {
            $status = $request->input('status');
            if (in_array($status, ['true', '1'], true)) {
                $query->where('status', true);
            } elseif (in_array($status, ['false', '0'], true)) {
                $query->where('status', false);
            }
        }


        $services = $query->paginate($perPage)->withQueryString();

        return Inertia::render('services/list-services', [
            'services' => $services,
            'filters' => $request->only(['search', 'status', 'perPage']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:' . Service::class,
            'description' => ['required', 'string', 'max:255'],
            'protocol' => ['required', 'string', 'max:255', 'in:http,https,ftp'],
            'host' => [
                'required',
                'string',
                'regex:/^((?:(?:[a-zA-Z0-9-]{1,63}\.)+(?:[a-zA-Z]{2,63}))|(?:(?:\d{1,3}\.){3}\d{1,3})|(?:\[[0-9a-fA-F:]+\]))$/'
            ],
            'port' => ['required', 'integer', 'min:1', 'max:65535'],
            'route' => ['required', 'string', 'max:255', 'regex:/^\/[a-z0-9]+(?:-[a-z0-9]+)*$/i'],
        ]);

        $Service = Service::create([
            'name' => $request->name,
            'description' => $request->description,
            'protocol' => $request->protocol,
            'host' => $request->host,
            'port' => (int) $request->port,
            'route' => $request->route,
            'status' => true,
        ]);

        $Service->save();

        $this->restartGateway();

        return redirect()->back()
            ->with('success', 'Servicio guardado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        try {
            $service = Service::findOrFail($id, ['name', 'description', 'protocol', 'host', 'port', 'route']);

            return Inertia::render('services/edit-service', [
                'service' => $service,
                'id' => $id
            ]);
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Servicio no encontrado.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $request->validate([
            'name' => 'required|string|max:255|unique:services,name,' . $id,
            'description' => ['required', 'string', 'max:255'],
            'protocol' => ['required', 'string', 'max:255', 'in:http,https,ftp'],
            'host' => [
                'required',
                'string',
                'regex:/^((?:(?:[a-zA-Z0-9-]{1,63}\.)+(?:[a-zA-Z]{2,63}))|(?:(?:\d{1,3}\.){3}\d{1,3})|(?:\[[0-9a-fA-F:]+\]))$/'
            ],
            'port' => ['required', 'integer', 'min:1', 'max:65535'],
            'route' => ['required', 'string', 'max:255', 'regex:/^\/[a-z0-9]+(?:-[a-z0-9]+)*$/i'],
        ]);

        try {

            $service = Service::findOrFail($id);

            $service->fill($request->only([
                'name',
                'description',
                'protocol',
                'host',
                'port',
                'route'
            ]));

            $service->save();

            $this->restartGateway();

            return redirect()->back()
                ->with('success', 'Servicio actualizado correctamente.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al actualizado el servicio.');
        }
    }

    /**
     * Update status of the specified resource in storage.
     */
    public function toggleStatus(Request $request)
    {
        try {
            $id = $request->input('id');

            $service = Service::findOrFail($id);
            $service->status = !$service->status;
            $service->save();

            $this->restartGateway();

            return redirect()->back()
                ->with('success', 'Servicio actualizado correctamente.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error al actualizado el servicio.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        try {
            $id = $request->input('id');

            $service = Service::findOrFail($id);
            $service->delete();

            $this->restartGateway();

            return redirect()->back()
                ->with('success', 'Servicio eliminado correctamente.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error al eliminar el servicio.');
        }
    }

    public function restartGateway()
    {

        try {
            $connection = ServerConnection::first();

            $url = $connection->protocol . "://" . $connection->host . ":" . $connection->port;

            $response = Http::post($url . '/restart-gateway/', []);
        } catch (\Exception $e) {
            Log::error('Error al reiniciar el gateway: ' . $e->getMessage(), [
                'exception' => $e,
            ]);
        }
    }
}
