<?php

use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckConnection;
use Inertia\Inertia;

Route::middleware(['auth', CheckConnection::class])->group(function () {

    Route::get('services', [ServicesController::class, 'index'])->name('services.index');
    Route::post('services', [ServicesController::class, 'filters'])->name('services.filters');
    Route::patch('services', [ServicesController::class, 'toggleStatus'])->name('services.toggleStatus');
    Route::delete('services', [ServicesController::class, 'destroy'])->name('services.destroy');

    Route::get('services/add', function () {
        return Inertia::render('services/add-service');
    })->name('services.add');
    Route::post('services/add', [ServicesController::class, 'store'])->name('services.store');

    Route::get('services/{id}', [ServicesController::class, 'show'])->name('services.show');
    Route::put('services/{id}', [ServicesController::class, 'update'])->name('services.update');
});
