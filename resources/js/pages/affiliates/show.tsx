import React from 'react';
import { Head, Link } from '@inertiajs/react';
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
    created_at: string;
}

interface Stats {
    total_referrals: number;
    confirmed_referrals: number;
    total_commission: number;
    paid_commission: number;
    pending_commission: number;
}

interface Props {
    affiliate: Affiliate;
    stats: Stats;
}

export default function AffiliateShow({ affiliate, stats }: Props) {
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

    const shareUrl = `https://englishbooster.com/register?ref=${affiliate.referral_code}`;

    const copyReferralLink = () => {
        navigator.clipboard.writeText(shareUrl);
        // You could add a toast notification here
        alert('Link referral berhasil disalin! 📋');
    };

    return (
        <>
            <Head title={`Dashboard - ${affiliate.name}`} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Navigation */}
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-blue-600">🚀 English Booster</h1>
                                <span className="ml-4 text-sm text-gray-500">Affiliate Dashboard</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-700">Hi, {affiliate.name}! 👋</span>
                                <Button variant="outline" size="sm">Logout</Button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto py-8 px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Dashboard Affiliate</h1>
                                <p className="text-gray-600 mt-1">Selamat datang kembali, {affiliate.name}!</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Status:</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[affiliate.status as keyof typeof statusColors]}`}>
                                    {statusIcons[affiliate.status as keyof typeof statusIcons]} {affiliate.status.charAt(0).toUpperCase() + affiliate.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status Alert */}
                    {affiliate.status === 'pending' && (
                        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex">
                                <div className="text-yellow-400 text-xl mr-3">⏳</div>
                                <div>
                                    <h3 className="text-yellow-800 font-medium">Akun Sedang Dalam Review</h3>
                                    <p className="text-yellow-700 text-sm mt-1">
                                        Tim kami sedang meninjau pendaftaran Anda. Proses persetujuan biasanya memakan waktu 1-2 hari kerja.
                                        Anda akan mendapat notifikasi email setelah akun disetujui.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {affiliate.status === 'rejected' && (
                        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex">
                                <div className="text-red-400 text-xl mr-3">❌</div>
                                <div>
                                    <h3 className="text-red-800 font-medium">Pendaftaran Ditolak</h3>
                                    <p className="text-red-700 text-sm mt-1">
                                        Maaf, pendaftaran affiliate Anda tidak dapat diproses saat ini. 
                                        Silakan hubungi tim support untuk informasi lebih lanjut.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm p-6 border">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total_referrals}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <span className="text-2xl">✅</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Confirmed</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.confirmed_referrals}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Komisi</p>
                                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.total_commission)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border">
                            <div className="flex items-center">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <span className="text-2xl">⏳</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Pending Payment</p>
                                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.pending_commission)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Referral Link */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔗 Link Referral Anda</h3>
                            
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 mb-1">Kode Referral:</p>
                                        <p className="font-mono text-lg font-bold text-blue-600">{affiliate.referral_code}</p>
                                    </div>
                                    <Button
                                        onClick={() => navigator.clipboard.writeText(affiliate.referral_code)}
                                        variant="outline"
                                        size="sm"
                                    >
                                        📋 Copy
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <p className="text-sm text-gray-600 mb-2">Link Referral Lengkap:</p>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={shareUrl}
                                        readOnly
                                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm"
                                    />
                                    <Button onClick={copyReferralLink} variant="outline" size="sm">
                                        📋 Copy Link
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-medium text-gray-900">💡 Cara Menggunakan:</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Bagikan link referral ke calon siswa</li>
                                    <li>• Siswa mendaftar melalui link Anda</li>
                                    <li>• Anda mendapat komisi setelah siswa membayar</li>
                                </ul>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
                            
                            <div className="space-y-4">
                                <Link href="/affiliate/referrals" className="block">
                                    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">📊</span>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Lihat Semua Referrals</h4>
                                                <p className="text-sm text-gray-600">Track status dan komisi referrals Anda</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/affiliate/payments" className="block">
                                    <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:bg-green-50 transition-colors">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">💳</span>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Riwayat Pembayaran</h4>
                                                <p className="text-sm text-gray-600">Lihat history pembayaran komisi</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">📱</span>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Share di Media Sosial</h4>
                                            <p className="text-sm text-gray-600">Bagikan link referral di social media</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">📞</span>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Hubungi Support</h4>
                                            <p className="text-sm text-gray-600">Butuh bantuan? Tim support siap membantu</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Marketing Materials */}
                    <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Program yang Tersedia</h3>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="text-2xl mb-2">💻</div>
                                <h4 className="font-medium text-gray-900">Online Programs</h4>
                                <p className="text-sm text-gray-600">Komisi 10-25%</p>
                                <p className="text-xs text-green-600 mt-1">5 programs available</p>
                            </div>
                            
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="text-2xl mb-2">🏫</div>
                                <h4 className="font-medium text-gray-900">Pare Programs</h4>
                                <p className="text-sm text-gray-600">Komisi 15-30%</p>
                                <p className="text-xs text-green-600 mt-1">7 programs available</p>
                            </div>
                            
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="text-2xl mb-2">👥</div>
                                <h4 className="font-medium text-gray-900">Group Programs</h4>
                                <p className="text-sm text-gray-600">Komisi 12-18%</p>
                                <p className="text-xs text-green-600 mt-1">3 programs available</p>
                            </div>
                            
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="text-2xl mb-2">🏢</div>
                                <h4 className="font-medium text-gray-900">Branch Programs</h4>
                                <p className="text-sm text-gray-600">Komisi 10-15%</p>
                                <p className="text-xs text-green-600 mt-1">4 programs available</p>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips untuk Sukses</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Bagikan pengalaman personal Anda dengan English Booster
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Target audience yang tepat (pelajar, profesional)
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Gunakan media sosial untuk jangkauan yang lebih luas
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Berikan informasi yang jelas tentang manfaat program
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Follow up dengan calon siswa yang tertarik
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Manfaatkan testimonial dan success stories
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}