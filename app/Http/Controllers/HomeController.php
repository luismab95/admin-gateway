<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;
use App\Models\Connection as ServerConnection;
use App\Models\Traffic;
use App\Models\Service;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $connections = ServerConnection::all();

        if ($connections->isEmpty()) {
            return Inertia::render('initial-config');
        }

        $services = Service::all();
        $activeCount = $services->where('status', true)->count();
        $inactiveCount = $services->where('status', false)->count();


        $traffics = Traffic::limit(60)->get();

        return Inertia::render('dashboard', [
            'activeCount' => $activeCount,
            'inactiveCount' => $inactiveCount,
            'traffics' => $traffics,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'protocol' => ['required', 'string', 'max:255', 'in:http,https,ftp'],
            'host' => [
                'required',
                'string',
                'regex:/^((?:(?:[a-zA-Z0-9-]{1,63}\.)+(?:[a-zA-Z]{2,63}))|(?:(?:\d{1,3}\.){3}\d{1,3})|(?:\[[0-9a-fA-F:]+\]))$/'
            ],
            'port' => ['required', 'integer', 'min:1', 'max:65535'],
        ]);


        try {
            $connectionAlive = $this->checkGatewayConnection(
                $request->protocol,
                $request->host,
                (int) $request->port
            );

            if (!$connectionAlive) {
                return Inertia::render('initial-config', [
                    'error' => 'No se pudo establecer conexión con el Api Gateway especificado.',
                    'old' => $request->all(),
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('initial-config', [
                'error' => 'No se pudo establecer conexión con el Api Gateway especificado.',
                'old' => $request->all(),
            ]);
        }



        $connection = ServerConnection::create([
            'protocol' => $request->protocol,
            'host' => $request->host,
            'port' => (int) $request->port,
        ]);

        $connection->save();

        return redirect()->back()
            ->with('success', 'Conexión establecida correctamente.');
    }


    public function checkGatewayConnection(string $protocol, string $host, int $port)
    {

        $url = "{$protocol}://{$host}:{$port}";

        try {
            $response = Http::timeout(3)->get($url);

            if ($response->successful()) {
                return true;
            }

            return false;
        } catch (RequestException $e) {
            return false;
        }
    }
}
