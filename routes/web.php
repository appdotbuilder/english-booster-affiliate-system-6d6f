<?php

use App\Http\Controllers\AffiliateController;
use App\Http\Controllers\CommissionPaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ReferralController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public affiliate routes
Route::prefix('affiliate')->name('affiliate.')->group(function () {
    Route::get('/register', [AffiliateController::class, 'create'])->name('register');
    Route::post('/register', [AffiliateController::class, 'store'])->name('store');
    Route::get('/login', function () {
        return Inertia::render('affiliates/auth/login');
    })->name('login');
    Route::post('/login', function () {
        return Inertia::render('affiliates/auth/login');
    })->name('login.store');
});

// Simple affiliate routes (for demo purposes)
Route::prefix('affiliate')->name('affiliate.')->group(function () {
    Route::get('/dashboard/{affiliate}', [AffiliateController::class, 'show'])->name('dashboard');
    Route::get('/referrals', function () {
        return Inertia::render('affiliates/referrals/index');
    })->name('referrals.index');
    Route::get('/payments', function () {
        return Inertia::render('affiliates/payments/index');
    })->name('payments.index');
});

// Admin routes (requires admin authentication)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin affiliate management
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('affiliates', AffiliateController::class)->except(['create', 'store']);
        Route::resource('referrals', ReferralController::class);
        Route::resource('commission-payments', CommissionPaymentController::class);
        Route::resource('programs', ProgramController::class)->only(['index', 'show', 'edit', 'update']);
    });
    
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/affiliate-auth.php';
