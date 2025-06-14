<?php

use App\Http\Controllers\LogsController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckConnection;

Route::middleware(['auth', CheckConnection::class])->group(function () {

    Route::get('logs', [LogsController::class, 'index'])->name('logs.index');
    Route::post('logs', [LogsController::class, 'filters'])->name('logs.filters');
});
