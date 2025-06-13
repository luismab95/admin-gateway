<?php

use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckConnection;

Route::middleware(['auth', CheckConnection::class])->group(function () {

    Route::get('services', [ServicesController::class, 'index'])->name('services.index');
    // Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    // Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

});
