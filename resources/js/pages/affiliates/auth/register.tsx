import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function AffiliateRegister() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        bank_name: '',
        bank_account_number: '',
        bank_account_name: ''
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [step, setStep] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/affiliate/register', formData, {
            onSuccess: () => {
                // Will redirect to success page
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            }
        });
    };

    return (
        <>
            <Head title="Daftar Affiliate - English Booster" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-600">🚀 English Booster</h1>
                        <p className="text-gray-600 mt-2">Program Affiliate Registration</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center space-x-4">
                            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                    1
                                </span>
                                <span className="ml-2 text-sm">Informasi Pribadi</span>
                            </div>
                            <div className="w-12 h-px bg-gray-300"></div>
                            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                                    2
                                </span>
                                <span className="ml-2 text-sm">Informasi Bank</span>
                            </div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {step === 1 ? '📝 Bergabung Sebagai Affiliate' : '💳 Informasi Pembayaran'}
                            </h2>
                            <p className="text-gray-600">
                                {step === 1 
                                    ? 'Lengkapi data diri Anda untuk memulai journey sebagai affiliate'
                                    : 'Masukkan informasi bank untuk menerima pembayaran komisi'
                                }
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {step === 1 ? (
                                <>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                👤 Nama Lengkap *
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="John Doe"
                                                required
                                            />
                                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                📱 Nomor Telepon
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="+62 812-3456-7890"
                                            />
                                            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            📧 Email Address *
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="john@example.com"
                                            required
                                        />
                                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                            🏠 Alamat Lengkap
                                        </label>
                                        <textarea
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={3}
                                            placeholder="Jl. Contoh No. 123, Jakarta"
                                        />
                                        {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                                🔒 Password *
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Minimum 8 karakter"
                                                required
                                            />
                                            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                                                🔒 Konfirmasi Password *
                                            </label>
                                            <input
                                                id="password_confirmation"
                                                type="password"
                                                value={formData.password_confirmation}
                                                onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Ulangi password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                    >
                                        Lanjut ke Informasi Bank →
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-2">
                                            🏦 Nama Bank
                                        </label>
                                        <select
                                            id="bank_name"
                                            value={formData.bank_name}
                                            onChange={(e) => setFormData({...formData, bank_name: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Pilih Bank</option>
                                            <option value="BCA">Bank BCA</option>
                                            <option value="Mandiri">Bank Mandiri</option>
                                            <option value="BRI">Bank BRI</option>
                                            <option value="BNI">Bank BNI</option>
                                            <option value="CIMB Niaga">CIMB Niaga</option>
                                            <option value="Danamon">Bank Danamon</option>
                                            <option value="Permata">Bank Permata</option>
                                            <option value="Other">Lainnya</option>
                                        </select>
                                        {errors.bank_name && <p className="text-red-600 text-sm mt-1">{errors.bank_name}</p>}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="bank_account_number" className="block text-sm font-medium text-gray-700 mb-2">
                                                💳 Nomor Rekening
                                            </label>
                                            <input
                                                id="bank_account_number"
                                                type="text"
                                                value={formData.bank_account_number}
                                                onChange={(e) => setFormData({...formData, bank_account_number: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="1234567890"
                                            />
                                            {errors.bank_account_number && <p className="text-red-600 text-sm mt-1">{errors.bank_account_number}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="bank_account_name" className="block text-sm font-medium text-gray-700 mb-2">
                                                👤 Nama Pemilik Rekening
                                            </label>
                                            <input
                                                id="bank_account_name"
                                                type="text"
                                                value={formData.bank_account_name}
                                                onChange={(e) => setFormData({...formData, bank_account_name: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="John Doe"
                                            />
                                            {errors.bank_account_name && <p className="text-red-600 text-sm mt-1">{errors.bank_account_name}</p>}
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-blue-800 text-sm">
                                            💡 <strong>Tips:</strong> Informasi bank dapat diisi nanti, namun diperlukan untuk menerima pembayaran komisi.
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            ← Kembali
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            className="flex-1 bg-green-600 hover:bg-green-700"
                                            disabled={processing}
                                        >
                                            {processing ? 'Mendaftar...' : '🎉 Daftar Sekarang!'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Sudah punya akun affiliate? 
                                <Link href="/affiliate/login" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                                    Login Sekarang 🚀
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                                ← Kembali ke Homepage
                            </Link>
                        </div>
                    </div>

                    {/* Benefits Preview */}
                    <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-3xl mb-2">💰</div>
                            <h3 className="font-semibold text-gray-900">Komisi Hingga 30%</h3>
                            <p className="text-sm text-gray-600">Dapatkan komisi kompetitif</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-3xl mb-2">📊</div>
                            <h3 className="font-semibold text-gray-900">Dashboard Real-time</h3>
                            <p className="text-sm text-gray-600">Monitor performa Anda</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-3xl mb-2">🎯</div>
                            <h3 className="font-semibold text-gray-900">Support Penuh</h3>
                            <p className="text-sm text-gray-600">Tim support siap membantu</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}