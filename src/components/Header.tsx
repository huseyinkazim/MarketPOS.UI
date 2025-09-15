import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { User, ShoppingCart, LogOut } from 'lucide-react'

const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">POS Sistemi</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Aktif Kullanıcı:</span>
            <span className="font-medium">{user?.fullName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user?.role}</span>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Çıkış
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header