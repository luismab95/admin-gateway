<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Connection as ServerConnection;

class CheckConnection
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $connections = ServerConnection::all();

        if ($connections->isEmpty()) {
            return redirect('/dashboard');
        }

        return $next($request);
    }
}
