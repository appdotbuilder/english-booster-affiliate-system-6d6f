<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Program::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', $request->is_active === 'true');
        }

        $programs = $query->withCount('referrals')->latest()->paginate(15)->withQueryString();

        $categories = [
            'online' => 'Program Online',
            'offline_pare' => 'Program Offline (Pare)',
            'group' => 'Program Rombongan',
            'branch' => 'Program Cabang',
        ];

        return Inertia::render('admin/programs/index', [
            'programs' => $programs,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'is_active']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Program $program)
    {
        $program->load(['referrals' => function ($query) {
            $query->with('affiliate')->latest()->limit(10);
        }]);

        $stats = [
            'total_referrals' => $program->referrals()->count(),
            'confirmed_referrals' => $program->referrals()->where('status', 'confirmed')->count(),
            'total_commission_paid' => $program->referrals()->where('status', 'confirmed')->sum('commission_amount'),
        ];

        return Inertia::render('admin/programs/show', [
            'program' => $program,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Program $program)
    {
        $categories = [
            'online' => 'Program Online',
            'offline_pare' => 'Program Offline (Pare)',
            'group' => 'Program Rombongan',
            'branch' => 'Program Cabang',
        ];

        return Inertia::render('admin/programs/edit', [
            'program' => $program,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'commission_percentage' => 'required|numeric|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        $program->update($validated);

        return redirect()->route('admin.programs.show', $program)
            ->with('success', 'Program berhasil diperbarui.');
    }
}