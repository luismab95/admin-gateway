<?php

use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckConnection;

Route::middleware(['auth', CheckConnection::class])->group(function () {

    Route::get('services', [ServicesController::class, 'index'])->name('services.index');
    Route::post('services', [ServicesController::class, 'filters'])->name('services.filters');
    Route::patch('services', [ServicesController::class, 'toggleStatus'])->name('profile.toggleStatus');
    Route::delete('services', [ServicesController::class, 'destroy'])->name('services.destroy');

    // Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    // Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

});
