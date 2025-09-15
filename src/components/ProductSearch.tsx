import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { Search, Scan, Plus, Package } from 'lucide-react'

// Mock product data
const mockProducts = [
  { productId: 1, name: 'Coca Cola 330ml', barcode: '1234567890123', unitPrice: 5.50, stockQuantity: 100 },
  { productId: 2, name: 'Ekmek', barcode: '1234567890124', unitPrice: 2.00, stockQuantity: 50 },
  { productId: 3, name: 'Süt 1L', barcode: '1234567890125', unitPrice: 8.75, stockQuantity: 75 },
  { productId: 4, name: 'Yoğurt 500g', barcode: '1234567890126', unitPrice: 6.25, stockQuantity: 60 },
  { productId: 5, name: 'Domates 1kg', barcode: '1234567890127', unitPrice: 12.00, stockQuantity: 30 }
]

const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(mockProducts)
  const { addItem } = useCart()

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.trim() === '') {
      setSearchResults(mockProducts)
    } else {
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.barcode.includes(term)
      )
      setSearchResults(filtered)
    }
  }

  const handleBarcodeSearch = () => {
    // In a real app, this would open barcode scanner
    alert('Barkod tarayıcı açılıyor...')
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="input-field pl-10"
            placeholder="Ürün adı veya barkod ile ara..."
          />
        </div>
        <button
          onClick={handleBarcodeSearch}
          className="btn-secondary"
        >
          <Scan className="h-5 w-5" />
          Barkod
        </button>
      </div>

      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {searchResults.map((product) => (
          <div key={product.productId} className="product-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">Barkod: {product.barcode}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-lg font-semibold text-primary-600">
                    ₺{product.unitPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stok: {product.stockQuantity}
                  </span>
                </div>
              </div>
              <button
                onClick={() => addItem(product)}
                className="btn-primary"
                disabled={product.stockQuantity <= 0}
              >
                <Plus className="h-4 w-4" />
                Ekle
              </button>
            </div>
          </div>
        ))}
        
        {searchResults.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>Ürün bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductSearch