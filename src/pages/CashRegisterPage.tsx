import React, { useState } from 'react'
import { Calculator, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react'

const CashRegisterPage: React.FC = () => {
  const [currentSession, setCurrentSession] = useState<any>(null)
  const [openingAmount, setOpeningAmount] = useState<number>(0)
  const [closingAmount, setClosingAmount] = useState<number>(0)

  const handleOpenCash = () => {
    const session = {
      cashId: Date.now(),
      cashDate: new Date(),
      openingAmount,
      status: 'open',
      userId: 1
    }
    setCurrentSession(session)
    alert('Kasa açıldı!')
  }

  const handleCloseCash = () => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        closingAmount,
        status: 'closed'
      })
      alert('Kasa kapatıldı!')
    }
  }

  // Mock daily sales data
  const dailySales = {
    totalSales: 1250.75,
    totalCash: 680.50,
    totalCard: 570.25,
    salesCount: 23
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Kasa Yönetimi</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{new Date().toLocaleDateString('tr-TR')}</span>
        </div>
      </div>

      {/* Current Session Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Kasa Durumu</h2>
        </div>

        {currentSession ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success-600" />
              <span className="text-success-700 font-medium">
                Kasa Açık - {currentSession.cashDate.toLocaleTimeString('tr-TR')}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="text-sm text-primary-600 mb-1">Açılış Tutarı</div>
                <div className="text-2xl font-bold text-primary-900">
                  ₺{currentSession.openingAmount.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-success-50 p-4 rounded-lg">
                <div className="text-sm text-success-600 mb-1">Günlük Satış</div>
                <div className="text-2xl font-bold text-success-900">
                  ₺{dailySales.totalSales.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Beklenen Tutar</div>
                <div className="text-2xl font-bold text-gray-900">
                  ₺{(currentSession.openingAmount + dailySales.totalCash).toFixed(2)}
                </div>
              </div>
            </div>

            {currentSession.status === 'open' && (
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Kasa Kapat</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kapanış Tutarı
                    </label>
                    <input
                      type="number"
                      value={closingAmount}
                      onChange={(e) => setClosingAmount(Number(e.target.value))}
                      className="input-field"
                      placeholder="Kasadaki nakit tutarı"
                      step="0.01"
                    />
                  </div>
                  <button
                    onClick={handleCloseCash}
                    className="btn-error"
                  >
                    <XCircle className="h-5 w-5" />
                    Kasa Kapat
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-error-600" />
              <span className="text-error-700 font-medium">Kasa Kapalı</span>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-3">Kasa Aç</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açılış Tutarı
                  </label>
                  <input
                    type="number"
                    value={openingAmount}
                    onChange={(e) => setOpeningAmount(Number(e.target.value))}
                    className="input-field"
                    placeholder="Kasadaki başlangıç tutarı"
                    step="0.01"
                  />
                </div>
                <button
                  onClick={handleOpenCash}
                  className="btn-success"
                >
                  <CheckCircle className="h-5 w-5" />
                  Kasa Aç
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Daily Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Günlük Özet</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-primary-50 p-4 rounded-lg">
            <div className="text-sm text-primary-600 mb-1">Toplam Satış</div>
            <div className="text-xl font-bold text-primary-900">
              ₺{dailySales.totalSales.toFixed(2)}
            </div>
            <div className="text-xs text-primary-600 mt-1">
              {dailySales.salesCount} işlem
            </div>
          </div>
          
          <div className="bg-success-50 p-4 rounded-lg">
            <div className="text-sm text-success-600 mb-1">Nakit Satış</div>
            <div className="text-xl font-bold text-success-900">
              ₺{dailySales.totalCash.toFixed(2)}
            </div>
            <div className="text-xs text-success-600 mt-1">
              %{((dailySales.totalCash / dailySales.totalSales) * 100).toFixed(1)}
            </div>
          </div>
          
          <div className="bg-warning-50 p-4 rounded-lg">
            <div className="text-sm text-warning-600 mb-1">Kart Satış</div>
            <div className="text-xl font-bold text-warning-900">
              ₺{dailySales.totalCard.toFixed(2)}
            </div>
            <div className="text-xs text-warning-600 mt-1">
              %{((dailySales.totalCard / dailySales.totalSales) * 100).toFixed(1)}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Ortalama İşlem</div>
            <div className="text-xl font-bold text-gray-900">
              ₺{(dailySales.totalSales / dailySales.salesCount).toFixed(2)}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              İşlem başına
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CashRegisterPage