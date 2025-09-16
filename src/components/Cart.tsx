import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Trash2, ShoppingCart } from 'lucide-react'
import QuantityInput from './QuantityInput'

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, setQuantityDirect } = useCart() as any

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
        <p>Sepetiniz boş</p>
        <p className="text-sm">Ürün ekleyerek satışa başlayın</p>
      </div>
    )
  }

  type CartItemType = {
    productId: number
    name: string
    barcode: string
    unitPrice: number
    quantity: number
    totalPrice: number
  }

  return (
    <div className="space-y-4">
  <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-1">
  {items.map((item: CartItemType) => (
          <div key={item.productId} className="cart-item">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-error-600 hover:text-error-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QuantityInput
                  value={item.quantity}
                  onChange={(v) => setQuantityDirect(item.productId, v)}
                  step={0.1}
                  min={0}
                  size="md"
                  decimals={3}
                />
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  ₺{item.unitPrice.toFixed(2)} x {item.quantity.toFixed(3)}
                </div>
                <div className="font-semibold text-primary-600">
                  ₺{item.totalPrice.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {items.length > 0 && (
        <button
          onClick={clearCart}
          className="w-full py-2 px-4 text-error-600 border border-error-200 rounded-lg hover:bg-error-50 transition-colors"
        >
          Sepeti Temizle
        </button>
      )}
    </div>
  )
}

export default Cart