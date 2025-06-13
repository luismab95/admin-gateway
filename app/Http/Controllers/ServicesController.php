<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Services;
use Inertia\Inertia;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $perPage = 10;

        $query = Services::query();

        $services = $query->paginate($perPage)->withQueryString();

        return Inertia::render('services/list-services', [
            'services' => $services,
            'filters' => [],
        ]);
    }

    public function filters(Request $request)
    {

        $perPage = $request->input('perPage', 10);

        $query = Services::query();


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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Update status of the specified resource in storage.
     */
    public function toggleStatus(Request $request)
    {
        try {
            $id = $request->input('id');

            $service = Services::findOrFail($id);
            $service->status = !$service->status;
            $service->save();

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

            $service = Services::findOrFail($id);
            $service->delete();

            return redirect()->back()
                ->with('success', 'Servicio eliminado correctamente.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error al eliminar el servicio.');
        }
    }
}
