<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReferralRequest;
use App\Models\Affiliate;
use App\Models\Program;
use App\Models\Referral;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReferralController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Referral::with(['affiliate', 'program']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('student_name', 'like', "%{$search}%")
                  ->orWhere('student_email', 'like', "%{$search}%")
                  ->orWhereHas('affiliate', function ($sq) use ($search) {
                      $sq->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('affiliate_id')) {
            $query->where('affiliate_id', $request->affiliate_id);
        }

        $referrals = $query->latest()->paginate(15)->withQueryString();

        $affiliates = Affiliate::approved()->select('id', 'name')->get();

        return Inertia::render('admin/referrals/index', [
            'referrals' => $referrals,
            'affiliates' => $affiliates,
            'filters' => $request->only(['search', 'status', 'affiliate_id']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $affiliates = Affiliate::approved()->select('id', 'name')->get();
        $programs = Program::active()->select('id', 'name', 'price', 'commission_percentage')->get();

        return Inertia::render('admin/referrals/create', [
            'affiliates' => $affiliates,
            'programs' => $programs,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReferralRequest $request)
    {
        $validated = $request->validated();
        
        $program = Program::findOrFail($validated['program_id']);
        $commissionAmount = $program->calculateCommission($validated['program_price']);

        $referral = Referral::create([
            'affiliate_id' => $validated['affiliate_id'],
            'program_id' => $validated['program_id'],
            'student_name' => $validated['student_name'],
            'student_email' => $validated['student_email'],
            'student_phone' => $validated['student_phone'],
            'program_price' => $validated['program_price'],
            'commission_percentage' => $program->commission_percentage,
            'commission_amount' => $commissionAmount,
            'status' => 'pending',
            'notes' => $validated['notes'] ?? null,
            'registered_at' => now(),
        ]);

        return redirect()->route('admin.referrals.show', $referral)
            ->with('success', 'Referral berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Referral $referral)
    {
        $referral->load(['affiliate', 'program']);

        return Inertia::render('admin/referrals/show', [
            'referral' => $referral,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Referral $referral)
    {
        $referral->load(['affiliate', 'program']);
        
        return Inertia::render('admin/referrals/edit', [
            'referral' => $referral,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Referral $referral)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
            'notes' => 'nullable|string',
        ]);

        $referral->update($validated);

        // Update affiliate totals if referral is confirmed
        if ($validated['status'] === 'confirmed' && $referral->status !== 'confirmed') {
            $affiliate = $referral->affiliate;
            $affiliate->increment('total_referrals');
            $affiliate->increment('total_commission', $referral->commission_amount);
        }

        return redirect()->route('admin.referrals.show', $referral)
            ->with('success', 'Status referral berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Referral $referral)
    {
        $referral->delete();

        return redirect()->route('admin.referrals.index')
            ->with('success', 'Referral berhasil dihapus.');
    }
}