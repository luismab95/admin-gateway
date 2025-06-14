<?php

namespace App\Http\Controllers;


use App\Models\Connection as ServerConnection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class LogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $type = "error";

        $connection = ServerConnection::first();

        $url = $connection->protocol . "://" . $connection->host . ":" . $connection->port;

        $response = Http::get($url . '/logs-gateway/' . $type . '.log', []);


        if ($response->ok()) {
            $log = $response->body();

            return Inertia::render('logs/list-logs', [
                'filters' => [],
                'log' => $log
            ]);
        } else {
            return Inertia::render('logs/list-logs', [
                'filters' => [],
                'log' => 'No se pudo obtener el archivo.'
            ]);
        }
    }


    public function filters(Request $request)
    {

        $type = $request->input('type', 'error');
        $search = $request->input('search');


        $connection = ServerConnection::first();

        $url = $connection->protocol . "://" . $connection->host . ":" . $connection->port;

        $response = Http::get($url . '/logs-gateway/' . $type . '.log', []);


        if ($response->ok()) {
            $log = $response->body();

            if ($search) {
                $lines = explode(PHP_EOL, $log);

                $filteredLines = array_filter($lines, function ($line) use ($search) {
                    return stripos($line, $search) !== false;
                });

                $log = implode(PHP_EOL, $filteredLines);
            }

            return Inertia::render('logs/list-logs', [
                'filters' => $request->only(['search', 'type']),
                'log' => $log
            ]);
        } else {
            return Inertia::render('logs/list-logs', [
                'filters' => $request->only(['search', 'type']),
                'log' => 'No se pudo obtener el archivo.'
            ]);
        }
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
