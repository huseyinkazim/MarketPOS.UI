import React, { useState } from 'react'
import { BarChart3, Calendar, TrendingUp, Package, Users, DollarSign } from 'lucide-react'

const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('today')

  // Mock data for reports
  const salesData = {
    today: { sales: 1250.75, transactions: 23, customers: 18 },
    week: { sales: 8750.50, transactions: 164, customers: 89 },
    month: { sales: 35200.25, transactions: 672, customers: 234 }
  }

  const topProducts = [
    { name: 'Coca Cola 330ml', sales: 245.50, quantity: 45 },
    { name: 'Ekmek', sales: 120.00, quantity: 60 },
    { name: 'Süt 1L', sales: 175.00, quantity: 20 },
    { name: 'Yoğurt 500g', sales: 156.25, quantity: 25 },
    { name: 'Domates 1kg', sales: 144.00, quantity: 12 }
  ]

  const currentData = salesData[dateRange as keyof typeof salesData]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Raporlar</h1>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
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
          <div className="text-sm text-gray-600 mt-1">
            {dateRange === 'today' ? 'Bugün' : dateRange === 'week' ? 'Bu hafta' : 'Bu ay'}
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
          <div className="text-sm text-gray-600 mt-1">
            Ortalama ₺{(currentData.sales / currentData.transactions).toFixed(2)}
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
          <div className="text-sm text-gray-600 mt-1">
            Benzersiz müşteri
          </div>
        </div>
      </div>

      {/* Charts and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Satış Trendi</h2>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Grafik görüntülenecek</p>
              <p className="text-sm">(Chart.js entegrasyonu gerekli)</p>
            </div>
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
                  <div className="font-semibold text-primary-600">
                    ₺{product.sales.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">
                    #{index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ödeme Yöntemleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-success-50 p-4 rounded-lg">
            <div className="text-sm text-success-600 mb-1">Nakit</div>
            <div className="text-xl font-bold text-success-900">
              ₺{(currentData.sales * 0.55).toFixed(2)}
            </div>
            <div className="text-xs text-success-600 mt-1">%55</div>
          </div>
          
          <div className="bg-primary-50 p-4 rounded-lg">
            <div className="text-sm text-primary-600 mb-1">Kredi Kartı</div>
            <div className="text-xl font-bold text-primary-900">
              ₺{(currentData.sales * 0.35).toFixed(2)}
            </div>
            <div className="text-xs text-primary-600 mt-1">%35</div>
          </div>
          
          <div className="bg-warning-50 p-4 rounded-lg">
            <div className="text-sm text-warning-600 mb-1">Diğer</div>
            <div className="text-xl font-bold text-warning-900">
              ₺{(currentData.sales * 0.10).toFixed(2)}
            </div>
            <div className="text-xs text-warning-600 mt-1">%10</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage