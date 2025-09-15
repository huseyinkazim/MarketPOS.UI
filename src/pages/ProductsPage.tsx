import React, { useState } from 'react'
import { Package, Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-react'

// Mock product data
const mockProducts = [
  { productId: 1, name: 'Coca Cola 330ml', barcode: '1234567890123', unitPrice: 5.50, stockQuantity: 100, criticalQuantity: 20 },
  { productId: 2, name: 'Ekmek', barcode: '1234567890124', unitPrice: 2.00, stockQuantity: 5, criticalQuantity: 10 },
  { productId: 3, name: 'Süt 1L', barcode: '1234567890125', unitPrice: 8.75, stockQuantity: 75, criticalQuantity: 15 },
  { productId: 4, name: 'Yoğurt 500g', barcode: '1234567890126', unitPrice: 6.25, stockQuantity: 60, criticalQuantity: 25 },
  { productId: 5, name: 'Domates 1kg', barcode: '1234567890127', unitPrice: 12.00, stockQuantity: 8, criticalQuantity: 15 }
]

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [products] = useState(mockProducts)

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  )

  const lowStockProducts = products.filter(product => 
    product.stockQuantity <= (product.criticalQuantity || 0)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1>
        <button className="btn-primary">
          <Plus className="h-5 w-5" />
          Yeni Ürün
        </button>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-warning-600" />
            <h3 className="font-medium text-warning-800">Stok Uyarısı</h3>
          </div>
          <p className="text-warning-700 text-sm">
            {lowStockProducts.length} ürünün stok seviyesi kritik seviyenin altında
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {lowStockProducts.map(product => (
              <span key={product.productId} className="bg-warning-200 text-warning-800 px-2 py-1 rounded text-xs">
                {product.name} ({product.stockQuantity} adet)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
            placeholder="Ürün adı veya barkod ile ara..."
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Ürünler</h2>
            <span className="text-sm text-gray-500">({filteredProducts.length} adet)</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Ürün</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Barkod</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Birim Fiyat</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Stok</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Kritik Seviye</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Durum</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.productId} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-sm">
                      {product.barcode}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">
                      ₺{product.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`font-medium ${
                        product.stockQuantity <= (product.criticalQuantity || 0)
                          ? 'text-error-600'
                          : 'text-gray-900'
                      }`}>
                        {product.stockQuantity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {product.criticalQuantity || '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {product.stockQuantity <= (product.criticalQuantity || 0) ? (
                        <span className="inline-flex items-center gap-1 bg-error-100 text-error-800 text-xs px-2 py-1 rounded-full">
                          <AlertTriangle className="h-3 w-3" />
                          Düşük Stok
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-success-100 text-success-800 text-xs px-2 py-1 rounded-full">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-primary-600 hover:text-primary-700">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-error-600 hover:text-error-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Ürün bulunamadı</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage