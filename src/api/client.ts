// Basit fetch tabanlı API istemcisi
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5085'

interface RequestOptions extends RequestInit {
  auth?: boolean
}

let accessToken: string | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // 401 ise özel durum
    if (res.status === 401) {
      throw new Error('UNAUTHORIZED')
    }
    const text = await res.text().catch(() => '')
    throw new Error(text || `HTTP ${res.status}`)
  }
  if (res.status === 204) return undefined as unknown as T
  const ct = res.headers.get('content-type') || ''
  if (ct.includes('application/json')) {
    return res.json() as Promise<T>
  }
  return res.text() as unknown as T
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Accept': 'application/json'
  }
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (options.auth && accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers as any) }
  })

  return handleResponse<T>(res)
}

// LOGIN / REFRESH helpers
export interface LoginRequest { username: string; password: string }
export interface LoginResponse { token: string; refreshToken?: string; user?: any }

export function loginApi(data: LoginRequest) {
  return apiFetch<LoginResponse>('/api/Auth/login', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export function refreshApi(refreshToken: string) {
  return apiFetch<LoginResponse>('/api/Auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken })
  })
}

// PRODUCTS
export interface ProductResponse {
  id: number
  name: string
  barcode: string | null
  categoryId: number | null
  unitPrice: number
  taxRate: number
  stockQuantity: number
  isActive: boolean
  criticalQuantity?: number | null
}

export function getProducts() {
  return apiFetch<ProductResponse[]>('/api/Products', { auth: true })
}

export interface CreateProductRequest {
  name: string
  barcode?: string | null
  categoryId?: number | null
  unitPrice: number
  taxRate: number
  initialStock?: number
  criticalQuantity?: number | null
}

export interface UpdateProductRequest {
  name: string
  barcode?: string | null
  categoryId?: number | null
  unitPrice: number
  taxRate: number
  isActive: boolean
  criticalQuantity?: number | null
}

export function createProduct(payload: CreateProductRequest) {
  return apiFetch<ProductResponse>('/api/Products', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(payload)
  })
}

export function updateProduct(id: number, payload: UpdateProductRequest) {
  return apiFetch<void>(`/api/Products/${id}`, {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(payload)
  })
}

export function deleteProduct(id: number) {
  return apiFetch<void>(`/api/Products/${id}`, {
    method: 'DELETE',
    auth: true
  })
}

// Categories (listelemek için)
export interface CategoryResponse { id: number; name: string; isActive: boolean }
export function getCategories() {
  return apiFetch<CategoryResponse[]>('/api/Categories', { auth: true })
}

// SALES
export interface SaleItemCreateRequest {
  productId: number
  quantity: number
  overrideUnitPrice?: number | null
}
export interface SaleCreateRequest {
  paymentType: number
  cashAmount?: number | null
  cardAmount?: number | null
  customerId?: number | null
  items: SaleItemCreateRequest[]
}
export interface SaleResponse { id: number; number: string; total: number }

export function createSale(payload: SaleCreateRequest) {
  return apiFetch<SaleResponse>('/api/Sales', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(payload)
  })
}

// INVENTORY LOW
export interface LowInventoryItem { productId: number; name: string; stock: number; critical: number | null }
export function getLowInventory() {
  return apiFetch<LowInventoryItem[]>('/api/Reports/inventory-low', { auth: true })
}

// DAILY SUMMARY
export interface DailySummaryReportResponse {
  date: string
  totalSales: number
  saleCount: number
  averageTicket: number
}
export function getDailySummary(date?: string) {
  const q = date ? `?date=${encodeURIComponent(date)}` : ''
  return apiFetch<DailySummaryReportResponse>(`/api/Reports/daily-summary${q}`, { auth: true })
}

export const Api = {
  setAccessToken,
  loginApi,
  refreshApi,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createSale,
  getLowInventory,
  getDailySummary
}

export default Api