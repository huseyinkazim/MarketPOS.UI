import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { X, CreditCard, Banknote, Check } from 'lucide-react'

interface PaymentModalProps {
  onClose: () => void
  totalAmount: number
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, totalAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'mixed'>('cash')
  const [cashAmount, setCashAmount] = useState(totalAmount)
  const [cardAmount, setCardAmount] = useState(0)
  const [processing, setProcessing] = useState(false)
  const { clearCart } = useCart()

  const handlePayment = async () => {
    setProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear cart and close modal
    clearCart()
    setProcessing(false)
    alert('Ödeme başarıyla alındı!')
    onClose()
  }

  const calculateChange = () => {
    if (paymentMethod === 'cash') {
      return Math.max(0, cashAmount - totalAmount)
    }
    return 0
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Ödeme Al</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Ödeme Yöntemi</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'cash')}
                  className="text-primary-600"
                />
                <Banknote className="h-5 w-5 text-gray-500" />
                <span>Nakit</span>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                  className="text-primary-600"
                />
                <CreditCard className="h-5 w-5 text-gray-500" />
                <span>Kart</span>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mixed"
                  checked={paymentMethod === 'mixed'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'mixed')}
                  className="text-primary-600"
                />
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-gray-500" />
                  <CreditCard className="h-4 w-4 text-gray-500" />
                </div>
                <span>Karma</span>
              </label>
            </div>
          </div>

          {/* Amount Inputs */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Toplam:</span>
                <span className="text-primary-600">₺{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {(paymentMethod === 'cash' || paymentMethod === 'mixed') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nakit Ödeme
                </label>
                <input
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(Number(e.target.value))}
                  className="input-field"
                  step="0.01"
                  min="0"
                />
              </div>
            )}

            {(paymentMethod === 'card' || paymentMethod === 'mixed') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kart Ödeme
                </label>
                <input
                  type="number"
                  value={cardAmount}
                  onChange={(e) => setCardAmount(Number(e.target.value))}
                  className="input-field"
                  step="0.01"
                  min="0"
                />
              </div>
            )}

            {paymentMethod === 'cash' && calculateChange() > 0 && (
              <div className="bg-success-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-success-800">Para Üstü:</span>
                  <span className="text-lg font-semibold text-success-700">
                    ₺{calculateChange().toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              onClick={handlePayment}
              disabled={processing}
              className="flex-1 btn-success py-3"
            >
              {processing ? (
                'İşleniyor...'
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  Ödeme Al
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal