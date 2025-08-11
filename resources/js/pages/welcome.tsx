import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const programs = [
        {
            category: '💻 Program Online',
            items: ['Kids Teen', 'TOEFL Easy Peasy', 'Private General English', 'Speaking Booster', 'Grammar Booster'],
            commission: '10-25%'
        },
        {
            category: '🏫 Program Offline (Pare)',
            items: ['Paket 2 Minggu - 3 Bulan', 'TOEFL', 'RPL', 'Kapal Pesiar'],
            commission: '15-30%'
        },
        {
            category: '👥 Program Rombongan',
            items: ['English Trip', 'Special English Day', 'Tutor Visit'],
            commission: '12-18%'
        },
        {
            category: '🏢 Program Cabang',
            items: ['Cilukba (TK)', 'Hompimpa (SD)', 'Hip Hip Hurray (SMP)', 'Insight Out (SMA)'],
            commission: '10-15%'
        }
    ];

    const features = [
        {
            icon: '🔗',
            title: 'Link Referral Unik',
            description: 'Dapatkan link referral khusus untuk melacak setiap pendaftaran dari Anda'
        },
        {
            icon: '📊',
            title: 'Dashboard Analytics',
            description: 'Pantau performa referral dan komisi yang diperoleh secara real-time'
        },
        {
            icon: '💰',
            title: 'Komisi Kompetitif',
            description: 'Dapatkan komisi hingga 30% dari setiap siswa yang berhasil didaftarkan'
        },
        {
            icon: '💳',
            title: 'Pembayaran Mudah',
            description: 'Terima pembayaran komisi langsung ke rekening bank Anda'
        },
        {
            icon: '📈',
            title: 'Tracking Lengkap',
            description: 'Lihat riwayat semua referral dan status pembayaran komisi'
        },
        {
            icon: '🎯',
            title: 'Target Bonus',
            description: 'Capai target bulanan dan dapatkan bonus tambahan yang menarik'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Putri',
            role: 'Affiliate Partner',
            comment: 'Dalam 3 bulan, saya sudah meraih komisi Rp 15 juta! Sistemnya mudah dan transparan.',
            earnings: 'Rp 15.000.000'
        },
        {
            name: 'Ahmad Rizki',
            role: 'Top Performer',
            comment: 'English Booster memberikan komisi terbaik. Support tim juga sangat responsif.',
            earnings: 'Rp 22.000.000'
        },
        {
            name: 'Maya Sari',
            role: 'Senior Affiliate',
            comment: 'Program afiliasi yang paling menguntungkan yang pernah saya ikuti. Highly recommended!',
            earnings: 'Rp 18.500.000'
        }
    ];

    return (
        <>
            <Head title="English Booster - Affiliate Program" />
            
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-2xl font-bold text-blue-600">🚀 English Booster</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/affiliate/login">
                                <Button variant="ghost">Login Affiliate</Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="ghost">Admin Login</Button>
                            </Link>
                            <Link href="/affiliate/register">
                                <Button>Daftar Affiliate</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="mb-8">
                            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                                🎯 Program Affiliate Terbaik 2024
                            </span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                            Raih <span className="text-blue-600">Penghasilan</span><br />
                            <span className="text-gradient bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Jutaan Rupiah
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Bergabunglah dengan program affiliate English Booster dan dapatkan komisi hingga 
                            <span className="font-bold text-green-600"> 30% </span>
                            dari setiap siswa yang berhasil Anda referensikan!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/affiliate/register">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                                    🚀 Mulai Sekarang - GRATIS!
                                </Button>
                            </Link>
                            <Link href="#programs">
                                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                                    📚 Lihat Program
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">500+</div>
                                <div className="text-gray-600">Affiliate Aktif</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">Rp 50M+</div>
                                <div className="text-gray-600">Total Komisi Dibayar</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">10,000+</div>
                                <div className="text-gray-600">Siswa Terdaftar</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600">4.9/5</div>
                                <div className="text-gray-600">Rating Affiliate</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section id="programs" className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                📚 Program English Booster
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Lebih dari 18 program berkualitas dengan komisi menarik menanti Anda
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {programs.map((program, index) => (
                                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900">{program.category}</h3>
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                            Komisi {program.commission}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {program.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex items-center text-gray-700">
                                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/affiliate/register">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4">
                                    💫 Dapatkan Akses Semua Program
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                ✨ Mengapa Memilih Kami?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Platform affiliate terdepan dengan fitur lengkap dan sistem pembayaran terpercaya
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                💬 Success Stories
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Dengarkan kesuksesan partner affiliate kami
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">Total Earnings</div>
                                            <div className="font-bold text-green-600">{testimonial.earnings}</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                                    <div className="flex mt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-yellow-400">⭐</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            🎯 Siap Memulai Journey Anda?
                        </h2>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            Bergabunglah dengan ribuan affiliate sukses lainnya dan mulai meraih penghasilan impian Anda hari ini!
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Link href="/affiliate/register">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                                    🚀 Daftar Sekarang - 100% GRATIS
                                </Button>
                            </Link>
                            <Link href="#programs">
                                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                                    📞 Hubungi Tim Kami
                                </Button>
                            </Link>
                        </div>

                        <div className="text-lg opacity-75">
                            ⚡ Proses persetujuan hanya 24 jam • 🔒 Sistem pembayaran aman • 📞 Support 24/7
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <h3 className="text-2xl font-bold mb-4">🚀 English Booster</h3>
                                <p className="text-gray-400 mb-4">
                                    Platform affiliate terdepan untuk program pembelajaran bahasa Inggris terbaik di Indonesia.
                                </p>
                                <div className="flex space-x-4">
                                    <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📧</span>
                                    <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📱</span>
                                    <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🌐</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                <div className="space-y-2 text-gray-400">
                                    <div><Link href="/affiliate/register" className="hover:text-white transition-colors">Daftar Affiliate</Link></div>
                                    <div><Link href="/affiliate/login" className="hover:text-white transition-colors">Login Affiliate</Link></div>
                                    <div><Link href="/login" className="hover:text-white transition-colors">Admin Panel</Link></div>
                                    <div><Link href="#programs" className="hover:text-white transition-colors">Program</Link></div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Support</h4>
                                <div className="space-y-2 text-gray-400">
                                    <div>📧 affiliate@englishbooster.com</div>
                                    <div>📱 +62 812-3456-7890</div>
                                    <div>🕐 24/7 Support</div>
                                    <div>💬 Live Chat Available</div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 English Booster Affiliate Program. All rights reserved. 🚀</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}