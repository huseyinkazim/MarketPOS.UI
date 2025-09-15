import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import ProductSearch from '../components/ProductSearch'
import Cart from '../components/Cart'
import PaymentModal from '../components/PaymentModal'
import { ShoppingCart, CreditCard, Banknote } from 'lucide-react'

const POSPage: React.FC = () => {
  const { items, getTotalAmount, getTotalItems } = useCart()
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const canProceedToPayment = items.length > 0

  return (
    <div className="h-full flex gap-6">
      {/* Left Panel - Product Search */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ürün Arama</h2>
          <ProductSearch />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Popüler Ürünler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Popular products would be loaded from API */}
            <div className="text-center py-8 text-gray-500">
              Popüler ürünler yükleniyor...
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Cart */}
      <div className="w-96 flex flex-col">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Sepet</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShoppingCart className="h-4 w-4" />
              <span>{getTotalItems()} adet</span>
            </div>
          </div>
          <Cart />
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Toplam:</span>
              <span className="text-2xl text-primary-600">
                ₺{getTotalAmount().toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => setShowPaymentModal(true)}
                disabled={!canProceedToPayment}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  canProceedToPayment
                    ? 'bg-success-600 hover:bg-success-700 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CreditCard className="h-5 w-5" />
                Ödeme Al
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={!canProceedToPayment}
                  className={`py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm ${
                    canProceedToPayment
                      ? 'bg-success-100 text-success-700 hover:bg-success-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Banknote className="h-4 w-4" />
                  Nakit
                </button>
                
                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={!canProceedToPayment}
                  className={`py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm ${
                    canProceedToPayment
                      ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  Kart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          totalAmount={getTotalAmount()}
        />
      )}
    </div>
  )
}

export default POSPage