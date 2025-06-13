<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;


Route::get('/', function () {
    return redirect('/login');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [HomeController::class, 'index'])->name('dashboard.index');
    Route::post('dashboard', [HomeController::class, 'store'])->name('dashboard.store');
});

require __DIR__ . '/logs.php';
require __DIR__ . '/services.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
