import React, { useState } from 'react';
import {
    BarChart3,
    Calendar,
    TrendingUp,
    Package,
    Users,
    DollarSign
} from 'lucide-react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Chart.js Register
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ReportsPage: React.FC = () => {
    const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today');

    // Mock data
    const salesData = {
        today: { sales: 1250.75, transactions: 23, customers: 18 },
        week: { sales: 8750.50, transactions: 164, customers: 89 },
        month: { sales: 35200.25, transactions: 672, customers: 234 }
    };

    const topProducts = [
        { name: 'Coca Cola 330ml', sales: 245.50, quantity: 45 },
        { name: 'Ekmek', sales: 120.00, quantity: 60 },
        { name: 'Süt 1L', sales: 175.00, quantity: 20 },
        { name: 'Yoğurt 500g', sales: 156.25, quantity: 25 },
        { name: 'Domates 1kg', sales: 144.00, quantity: 12 }
    ];

    const currentData = salesData[dateRange];

    // Satış Trendi Grafik Verileri
    const salesTrendData = {
        today: {
            labels: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'],
            datasets: [{
                label: 'Saatlik Satış (₺)',
                data: [85, 145, 320, 280, 195, 165, 110],
                backgroundColor: 'rgba(16, 185, 129, 0.85)',
                borderColor: '#10b981',
                borderWidth: 2,
                borderRadius: 6,
            }]
        },
        week: {
            labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
            datasets: [{
                label: 'Günlük Satış (₺)',
                data: [1240, 980, 1450, 1320, 1890, 2150, 1720],
                backgroundColor: 'rgba(16, 185, 129, 0.85)',
                borderColor: '#10b981',
                borderWidth: 2,
                borderRadius: 6,
            }]
        },
        month: {
            labels: ['1-5', '6-10', '11-15', '16-20', '21-25', '26-31'],
            datasets: [{
                label: 'Dönem Satış (₺)',
                data: [6800, 9200, 7500, 10800, 8900, 7200],
                backgroundColor: 'rgba(16, 185, 129, 0.85)',
                borderColor: '#10b981',
                borderWidth: 2,
                borderRadius: 6,
            }]
        }
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const },
            tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#f3f4f6',
                bodyColor: '#f3f4f6',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: number) => `₺${value}`,
                }
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Raporlar</h1>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value as 'today' | 'week' | 'month')}
                        className="input-field w-auto"
                    >
                        <option value="today">Bugün</option>
                        <option value="week">Bu Hafta</option>
                        <option value="month">Bu Ay</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-success-600" />
                        <h3 className="font-medium text-gray-900">Toplam Satış</h3>
                    </div>
                    <div className="text-2xl font-bold text-success-600">
                        ₺{currentData.sales.toFixed(2)}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-primary-600" />
                        <h3 className="font-medium text-gray-900">İşlem Sayısı</h3>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                        {currentData.transactions}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-warning-600" />
                        <h3 className="font-medium text-gray-900">Müşteri Sayısı</h3>
                    </div>
                    <div className="text-2xl font-bold text-warning-600">
                        {currentData.customers}
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Trend Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-gray-500" />
                        <h2 className="text-lg font-semibold text-gray-900">Satış Trendi</h2>
                    </div>
                    <div className="h-64">
                        <Bar data={salesTrendData[dateRange]} options={chartOptions} />
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Package className="h-5 w-5 text-gray-500" />
                        <h2 className="text-lg font-semibold text-gray-900">En Çok Satan Ürünler</h2>
                    </div>
                    <div className="space-y-3">
                        {topProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                                    <p className="text-sm text-gray-600">{product.quantity} adet</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-primary-600">₺{product.sales.toFixed(2)}</div>
                                    <div className="text-xs text-gray-500">#{index + 1}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;