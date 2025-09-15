import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  productId: number
  name: string
  barcode: string
  unitPrice: number
  quantity: number
  totalPrice: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: any) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalAmount: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: any) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.productId === product.productId)
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.unitPrice }
            : item
        )
      }
      return [...prev, {
        productId: product.productId,
        name: product.name,
        barcode: product.barcode,
        unitPrice: product.unitPrice,
        quantity: 1,
        totalPrice: product.unitPrice
      }]
    })
  }

  const removeItem = (productId: number) => {
    setItems(prev => prev.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity, totalPrice: quantity * item.unitPrice }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalAmount = () => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0)
  }

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalAmount,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}