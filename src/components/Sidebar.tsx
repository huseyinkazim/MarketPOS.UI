import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Calculator,
  Store
} from 'lucide-react'

const Sidebar: React.FC = () => {
  const menuItems = [
    {
      path: '/',
      icon: ShoppingCart,
      label: 'Satış',
      description: 'Ürün satışı yapın'
    },
    {
      path: '/products',
      icon: Package,
      label: 'Ürünler',
      description: 'Ürün yönetimi'
    },
    {
      path: '/cash-register',
      icon: Calculator,
      label: 'Kasa',
      description: 'Kasa işlemleri'
    },
    {
      path: '/reports',
      icon: BarChart3,
      label: 'Raporlar',
      description: 'Satış raporları'
    }
  ]

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Store className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Market POS</h2>
            <p className="text-sm text-gray-600">Satış Sistemi</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </NavLink>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar