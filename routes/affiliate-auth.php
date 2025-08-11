<?php

use App\Http\Controllers\Affiliate\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Affiliate\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:affiliate')->prefix('affiliate')->name('affiliate.')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth:affiliate')->prefix('affiliate')->name('affiliate.')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});