import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function AffiliateLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/affiliate/login', formData, {
            onSuccess: () => {
                // Will redirect to affiliate dashboard
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            }
        });
    };

    return (
        <>
            <Head title="Login Affiliate - English Booster" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-600">🚀 English Booster</h1>
                        <p className="text-gray-600 mt-2">Affiliate Login Portal</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang Kembali! 👋</h2>
                            <p className="text-gray-600">Masuk ke dashboard affiliate Anda</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    📧 Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="affiliate@example.com"
                                    required
                                />
                                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    🔒 Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Masukkan password"
                                    required
                                />
                                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.remember}
                                        onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700">
                                    Lupa Password?
                                </Link>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={processing}
                            >
                                {processing ? 'Logging in...' : '🚀 Masuk ke Dashboard'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Belum punya akun affiliate? 
                                <Link href="/affiliate/register" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                                    Daftar Sekarang 📝
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                                ← Kembali ke Homepage
                            </Link>
                        </div>
                    </div>

                    {/* Admin Login Link */}
                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700">
                            🔐 Admin Login Portal
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}