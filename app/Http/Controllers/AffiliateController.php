<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAffiliateRequest;
use App\Http\Requests\UpdateAffiliateStatusRequest;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AffiliateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Affiliate::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('referral_code', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $affiliates = $query->withCount('referrals')
            ->withSum('referrals as total_commission_sum', 'commission_amount')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/affiliates/index', [
            'affiliates' => $affiliates,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('affiliates/register');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAffiliateRequest $request)
    {
        $validated = $request->validated();
        
        $affiliate = Affiliate::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'bank_name' => $validated['bank_name'] ?? null,
            'bank_account_number' => $validated['bank_account_number'] ?? null,
            'bank_account_name' => $validated['bank_account_name'] ?? null,
            'referral_code' => Affiliate::generateReferralCode(),
            'status' => 'pending',
        ]);

        return redirect()->route('affiliates.show', $affiliate)
            ->with('success', 'Pendaftaran afiliasi berhasil! Menunggu persetujuan admin.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Affiliate $affiliate)
    {
        $affiliate->load([
            'referrals' => function ($query) {
                $query->with('program')->latest()->limit(10);
            },
            'commissionPayments' => function ($query) {
                $query->with('paidBy')->latest()->limit(10);
            }
        ]);

        $stats = [
            'total_referrals' => $affiliate->referrals()->count(),
            'confirmed_referrals' => $affiliate->referrals()->where('status', 'confirmed')->count(),
            'total_commission' => $affiliate->referrals()->where('status', 'confirmed')->sum('commission_amount'),
            'paid_commission' => $affiliate->commissionPayments()->where('status', 'paid')->sum('amount'),
            'pending_commission' => $affiliate->referrals()->where('status', 'confirmed')->sum('commission_amount') - 
                                  $affiliate->commissionPayments()->where('status', 'paid')->sum('amount'),
        ];

        return Inertia::render('affiliates/show', [
            'affiliate' => $affiliate,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Affiliate $affiliate)
    {
        return Inertia::render('admin/affiliates/edit', [
            'affiliate' => $affiliate,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAffiliateStatusRequest $request, Affiliate $affiliate)
    {
        $affiliate->update($request->validated());

        return redirect()->route('admin.affiliates.show', $affiliate)
            ->with('success', 'Status afiliasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Affiliate $affiliate)
    {
        $affiliate->delete();

        return redirect()->route('admin.affiliates.index')
            ->with('success', 'Afiliasi berhasil dihapus.');
    }
}