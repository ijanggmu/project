export interface Product {
  id: string
  name: string
  description: string
  sku: string
  category: string
  price: number
  stock: number
  threshold: number
  attributes: ProductAttribute[]
  createdAt: string
  updatedAt: string
}

export interface ProductAttribute {
  name: string
  value: string
}

export interface Category {
  id: string
  name: string
}

export interface StockMovement {
  id: string
  productId: string
  quantity: number
  type: 'in' | 'out'
  reason: string
  date: string
}

export interface Invoice {
  id: string
  number: string
  customerId: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: 'draft' | 'pending' | 'paid' | 'overdue'
  dueDate: string
  createdAt: string
  updatedAt: string
}

export interface InvoiceItem {
  productId: string
  quantity: number
  price: number
  total: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export type ProductFormValues = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>

export interface StockAdjustment {
  productId: string
  quantity: number
  type: 'in' | 'out'
  reason: string
}