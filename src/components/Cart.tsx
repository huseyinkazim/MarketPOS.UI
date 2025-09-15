import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
        <p>Sepetiniz boş</p>
        <p className="text-sm">Ürün ekleyerek satışa başlayın</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {items.map((item) => (
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
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  ₺{item.unitPrice.toFixed(2)} x {item.quantity}
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