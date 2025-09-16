import React, { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartContext'
import { Search, Scan, Plus, Package } from 'lucide-react'
import { getProducts, ProductResponse } from '../api/client'
import { useAuth } from '../contexts/AuthContext'

interface UIProduct {
  productId: number
  name: string
  barcode: string
  unitPrice: number
  stockQuantity: number
}

const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<UIProduct[]>([])
  const [searchResults, setSearchResults] = useState<UIProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) return
    let active = true
    setLoading(true)
    getProducts()
      .then(data => {
        if (!active) return
        const mapped: UIProduct[] = data.map(p => ({
          productId: p.id,
          name: p.name,
          barcode: p.barcode || '-',
          unitPrice: p.unitPrice,
          stockQuantity: p.stockQuantity
        }))
        setProducts(mapped)
        setSearchResults(mapped)
      })
      .catch(err => {
        if (!active) return
        setError(err.message || 'Ürünler alınırken hata')
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [isAuthenticated])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.trim() === '') {
      setSearchResults(products)
      return
    }
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.barcode.includes(term)
    )
    setSearchResults(filtered)
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
        {loading && (
          <div className="text-center py-6 text-sm text-gray-500">Yükleniyor...</div>
        )}
        {error && (
          <div className="text-center py-6 text-sm text-error-600">{error}</div>
        )}
        {!loading && !error && searchResults.map((product) => (
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
        
        {!loading && !error && searchResults.length === 0 && (
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