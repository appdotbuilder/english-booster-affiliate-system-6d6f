import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

export default function Dashboard() {
    return (
        <AppShell>
            <Head title="English Booster - Admin Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🚀 English Booster Admin</h1>
                        <p className="text-gray-600 mt-1">Affiliate System Management Dashboard</p>
                    </div>
                    <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('id-ID', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 border">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Affiliates</p>
                                <p className="text-2xl font-bold text-gray-900">156</p>
                                <p className="text-xs text-green-600">+12 this month</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Commission</p>
                                <p className="text-2xl font-bold text-gray-900">Rp 125M</p>
                                <p className="text-xs text-green-600">+8.5% this month</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <span className="text-2xl">📚</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                                <p className="text-2xl font-bold text-gray-900">2,847</p>
                                <p className="text-xs text-green-600">+156 this month</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <span className="text-2xl">⏳</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                                <p className="text-2xl font-bold text-gray-900">23</p>
                                <p className="text-xs text-orange-600">Needs attention</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
                        
                        <div className="space-y-3">
                            <Link href="/admin/affiliates" className="block">
                                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                    <span className="text-2xl mr-4">👥</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Manage Affiliates</h4>
                                        <p className="text-sm text-gray-600">Review and approve affiliate registrations</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/admin/referrals" className="block">
                                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                                    <span className="text-2xl mr-4">📊</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Track Referrals</h4>
                                        <p className="text-sm text-gray-600">Monitor all referral activities and commissions</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/admin/commission-payments" className="block">
                                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                                    <span className="text-2xl mr-4">💳</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Commission Payments</h4>
                                        <p className="text-sm text-gray-600">Process and track commission payments</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/admin/programs" className="block">
                                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
                                    <span className="text-2xl mr-4">📚</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Manage Programs</h4>
                                        <p className="text-sm text-gray-600">Update program prices and commission rates</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Recent Activity</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">
                                        <span className="font-medium">Sarah Putri</span> registered as new affiliate
                                    </p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">
                                        New referral for <span className="font-medium">TOEFL Easy Peasy</span> program
                                    </p>
                                    <p className="text-xs text-gray-500">15 minutes ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mt-2"></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">
                                        Commission payment of <span className="font-medium">Rp 2,500,000</span> processed
                                    </p>
                                    <p className="text-xs text-gray-500">1 hour ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mt-2"></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">
                                        <span className="font-medium">Ahmad Rizki</span> approved as affiliate
                                    </p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">
                                        Program commission rate updated for <span className="font-medium">Speaking Booster</span>
                                    </p>
                                    <p className="text-xs text-gray-500">3 hours ago</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                View all activity →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Programs Overview */}
                <div className="bg-white rounded-xl shadow-sm p-6 border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">📚 Programs Performance</h3>
                        <Link href="/admin/programs">
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                Manage Programs →
                            </button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <div className="text-2xl mb-2">💻</div>
                            <h4 className="font-medium text-gray-900">Online Programs</h4>
                            <p className="text-2xl font-bold text-blue-600 mt-1">854</p>
                            <p className="text-xs text-gray-500">total referrals</p>
                        </div>

                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <div className="text-2xl mb-2">🏫</div>
                            <h4 className="font-medium text-gray-900">Pare Programs</h4>
                            <p className="text-2xl font-bold text-green-600 mt-1">1,247</p>
                            <p className="text-xs text-gray-500">total referrals</p>
                        </div>

                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <div className="text-2xl mb-2">👥</div>
                            <h4 className="font-medium text-gray-900">Group Programs</h4>
                            <p className="text-2xl font-bold text-purple-600 mt-1">423</p>
                            <p className="text-xs text-gray-500">total referrals</p>
                        </div>

                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <div className="text-2xl mb-2">🏢</div>
                            <h4 className="font-medium text-gray-900">Branch Programs</h4>
                            <p className="text-2xl font-bold text-orange-600 mt-1">323</p>
                            <p className="text-xs text-gray-500">total referrals</p>
                        </div>
                    </div>
                </div>

                {/* Additional Actions */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">🎯 Need Help?</h3>
                            <p className="text-gray-600 mt-1">
                                Access documentation, tutorials, and support resources for managing your affiliate program.
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border hover:bg-gray-50 transition-colors text-sm">
                                📖 Documentation
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                💬 Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}