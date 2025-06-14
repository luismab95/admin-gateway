<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;


Route::get('/', function () {
    return redirect('/login');
});


Route::middleware(['auth', 'verified'])->group(function () {


    Route::get('dashboard', [HomeController::class, 'index'])->name('dashboard');
    Route::post('dashboard', [HomeController::class, 'store'])->name('dashboard.store');
});

Route::fallback(function () {
    return response()->view('errors.404', [], 404);
});

require __DIR__ . '/logs.php';
require __DIR__ . '/services.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
