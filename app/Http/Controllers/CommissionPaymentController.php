<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommissionPaymentRequest;
use App\Models\Affiliate;
use App\Models\CommissionPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommissionPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = CommissionPayment::with(['affiliate', 'paidBy']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('affiliate', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('affiliate_id')) {
            $query->where('affiliate_id', $request->affiliate_id);
        }

        $payments = $query->latest()->paginate(15)->withQueryString();

        $affiliates = Affiliate::approved()->select('id', 'name')->get();

        return Inertia::render('admin/commission-payments/index', [
            'payments' => $payments,
            'affiliates' => $affiliates,
            'filters' => $request->only(['search', 'status', 'affiliate_id']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $affiliates = Affiliate::where('status', 'approved')
            ->select('id', 'name', 'bank_name', 'bank_account_number', 'bank_account_name')
            ->withSum('referrals as pending_commission', 'commission_amount')
            ->withSum('commissionPayments as paid_commission', 'amount')
            ->get()
            ->map(function ($affiliate) {
                $pendingCommission = $affiliate->pending_commission ?? 0;
                $paidCommission = $affiliate->paid_commission ?? 0;
                $affiliate->setAttribute('available_commission', $pendingCommission - $paidCommission);
                return $affiliate;
            })
            ->filter(function ($affiliate) {
                return $affiliate->getAttribute('available_commission') > 0;
            });

        return Inertia::render('admin/commission-payments/create', [
            'affiliates' => $affiliates,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommissionPaymentRequest $request)
    {
        $validated = $request->validated();
        
        $payment = CommissionPayment::create([
            'affiliate_id' => $validated['affiliate_id'],
            'amount' => $validated['amount'],
            'status' => 'pending',
            'payment_method' => $validated['payment_method'],
            'payment_details' => $validated['payment_details'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()->route('admin.commission-payments.show', $payment)
            ->with('success', 'Pembayaran komisi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CommissionPayment $commissionPayment)
    {
        $commissionPayment->load(['affiliate', 'paidBy']);

        return Inertia::render('admin/commission-payments/show', [
            'payment' => $commissionPayment,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CommissionPayment $commissionPayment)
    {
        $commissionPayment->load('affiliate');

        return Inertia::render('admin/commission-payments/edit', [
            'payment' => $commissionPayment,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CommissionPayment $commissionPayment)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,paid,failed',
            'payment_method' => 'required|in:bank_transfer,cash,other',
            'payment_details' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $updateData = $validated;

        // Set paid_at and paid_by if status is paid
        if ($validated['status'] === 'paid' && $commissionPayment->status !== 'paid') {
            $updateData['paid_at'] = now();
            $updateData['paid_by'] = Auth::id();
        } elseif ($validated['status'] !== 'paid') {
            $updateData['paid_at'] = null;
            $updateData['paid_by'] = null;
        }

        $commissionPayment->update($updateData);

        return redirect()->route('admin.commission-payments.show', $commissionPayment)
            ->with('success', 'Status pembayaran berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CommissionPayment $commissionPayment)
    {
        $commissionPayment->delete();

        return redirect()->route('admin.commission-payments.index')
            ->with('success', 'Pembayaran komisi berhasil dihapus.');
    }
}