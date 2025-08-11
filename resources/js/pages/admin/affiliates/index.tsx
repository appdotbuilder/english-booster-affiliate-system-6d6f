import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Affiliate {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    referral_code: string;
    status: string;
    total_commission: number;
    total_referrals: number;
    referrals_count: number;
    total_commission_sum: number;
    created_at: string;
}

interface PaginatedData {
    data: Affiliate[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

interface Filters {
    search?: string;
    status?: string;
}

interface Props {
    affiliates: PaginatedData;
    filters: Filters;
    [key: string]: unknown;
}

export default function AffiliateIndex({ affiliates, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleSearch = () => {
        router.get(route('admin.affiliates.index'), {
            search: searchTerm,
            status: statusFilter,
        }, {
            preserveState: true,
        });
    };

    const handleStatusChange = (affiliateId: number, newStatus: string) => {
        router.patch(route('admin.affiliates.update', affiliateId), {
            status: newStatus,
        }, {
            preserveState: true,
        });
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
    };

    const statusIcons = {
        pending: '⏳',
        approved: '✅',
        rejected: '❌'
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AppShell>
            <Head title="Manage Affiliates" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">👥 Manage Affiliates</h1>
                        <p className="text-gray-600 mt-1">Kelola pendaftaran dan status affiliate</p>
                    </div>
                    <div className="text-sm text-gray-500">
                        Total: {affiliates.meta.total} affiliates
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🔍 Search Affiliates
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name, email, or referral code..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📊 Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <Button onClick={handleSearch} className="w-full">
                                🔍 Search
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-xl">👥</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Affiliates</p>
                                <p className="text-2xl font-bold text-gray-900">{affiliates.meta.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <span className="text-xl">⏳</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {affiliates.data.filter(a => a.status === 'pending').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Approved</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {affiliates.data.filter(a => a.status === 'approved').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <span className="text-xl">💰</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Commission</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(affiliates.data.reduce((sum, a) => sum + (a.total_commission_sum || 0), 0))}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Affiliates Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Affiliate Info
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Referral Code
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Performance
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {affiliates.data.map((affiliate) => (
                                    <tr key={affiliate.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {affiliate.name}
                                                </div>
                                                <div className="text-sm text-gray-500">{affiliate.email}</div>
                                                {affiliate.phone && (
                                                    <div className="text-xs text-gray-400">{affiliate.phone}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-mono font-medium text-blue-600">
                                                {affiliate.referral_code}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <div>{affiliate.referrals_count || 0} referrals</div>
                                                <div className="text-xs text-green-600">
                                                    {formatCurrency(affiliate.total_commission_sum || 0)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[affiliate.status as keyof typeof statusColors]}`}>
                                                {statusIcons[affiliate.status as keyof typeof statusIcons]} {affiliate.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(affiliate.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            {affiliate.status === 'pending' && (
                                                <>
                                                    <Button
                                                        onClick={() => handleStatusChange(affiliate.id, 'approved')}
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        ✅ Approve
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleStatusChange(affiliate.id, 'rejected')}
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                                    >
                                                        ❌ Reject
                                                    </Button>
                                                </>
                                            )}
                                            <Link href={route('admin.affiliates.show', affiliate.id)}>
                                                <Button size="sm" variant="outline">
                                                    👁️ View
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {affiliates.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-4xl mb-4">👥</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No affiliates found</h3>
                            <p className="text-gray-500">
                                {filters.search || filters.status
                                    ? 'Try adjusting your search or filters to find what you\'re looking for.'
                                    : 'No affiliates have registered yet.'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {affiliates.meta.last_page > 1 && (
                    <div className="bg-white rounded-lg shadow-sm px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing {((affiliates.meta.current_page - 1) * affiliates.meta.per_page) + 1} to {Math.min(affiliates.meta.current_page * affiliates.meta.per_page, affiliates.meta.total)} of {affiliates.meta.total} results
                            </div>
                            <div className="flex space-x-2">
                                {affiliates.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 text-sm rounded ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}