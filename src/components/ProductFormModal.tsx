import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { createProduct, updateProduct, getCategories, CategoryResponse, ProductResponse } from '../api/client'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  editProduct?: ProductResponse | null
}

const ProductFormModal: React.FC<Props> = ({ open, onClose, onSuccess, editProduct }) => {
  const isEdit = !!editProduct
  const [name, setName] = useState('')
  const [barcode, setBarcode] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [taxRate, setTaxRate] = useState('18')
  const [categoryId, setCategoryId] = useState<string>('')
  const [criticalQuantity, setCriticalQuantity] = useState('')
  const [initialStock, setInitialStock] = useState('')
  const [active, setActive] = useState(true)
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    getCategories().then(setCategories).catch(() => {})
  }, [open])

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name)
      setBarcode(editProduct.barcode || '')
      setUnitPrice(String(editProduct.unitPrice))
      setTaxRate(String(editProduct.taxRate))
      setCategoryId(editProduct.categoryId ? String(editProduct.categoryId) : '')
      setCriticalQuantity(editProduct.criticalQuantity != null ? String(editProduct.criticalQuantity) : '')
      setActive(editProduct.isActive)
    } else {
      setName('')
      setBarcode('')
      setUnitPrice('')
      setTaxRate('18')
      setCategoryId('')
      setCriticalQuantity('')
      setInitialStock('')
      setActive(true)
    }
  }, [editProduct, open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (isEdit && editProduct) {
        await updateProduct(editProduct.id, {
          name,
          barcode: barcode || null,
            categoryId: categoryId ? Number(categoryId) : null,
            unitPrice: Number(unitPrice),
            taxRate: Number(taxRate),
            isActive: active,
            criticalQuantity: criticalQuantity ? Number(criticalQuantity) : null
        })
      } else {
        await createProduct({
          name,
          barcode: barcode || null,
          categoryId: categoryId ? Number(categoryId) : null,
          unitPrice: Number(unitPrice),
          taxRate: Number(taxRate),
          initialStock: initialStock ? Number(initialStock) : undefined,
          criticalQuantity: criticalQuantity ? Number(criticalQuantity) : null
        })
      }
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'İşlem başarısız')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{isEdit ? 'Ürün Güncelle' : 'Yeni Ürün'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <div className="bg-error-50 text-error-700 text-sm p-2 rounded border border-error-200">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Ad</label>
              <input required value={name} onChange={e=>setName(e.target.value)} className="input-field" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Barkod</label>
              <input value={barcode} onChange={e=>setBarcode(e.target.value)} className="input-field" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Birim Fiyat</label>
              <input required type="number" step="0.01" value={unitPrice} onChange={e=>setUnitPrice(e.target.value)} className="input-field" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">KDV (%)</label>
              <input required type="number" step="0.01" value={taxRate} onChange={e=>setTaxRate(e.target.value)} className="input-field" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Kategori</label>
              <select value={categoryId} onChange={e=>setCategoryId(e.target.value)} className="input-field">
                <option value="">Seç</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            {!isEdit && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Başlangıç Stok</label>
                <input type="number" step="0.01" value={initialStock} onChange={e=>setInitialStock(e.target.value)} className="input-field" />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Kritik Seviye</label>
              <input type="number" step="0.01" value={criticalQuantity} onChange={e=>setCriticalQuantity(e.target.value)} className="input-field" />
            </div>
            {isEdit && (
              <div className="flex items-center gap-2 pt-6">
                <input id="active" type="checkbox" checked={active} onChange={e=>setActive(e.target.checked)} />
                <label htmlFor="active" className="text-sm text-gray-700">Aktif</label>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">İptal</button>
            <button disabled={loading} type="submit" className="btn-primary">
              {loading ? 'Kaydediliyor...' : (isEdit ? 'Güncelle' : 'Ekle')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductFormModal