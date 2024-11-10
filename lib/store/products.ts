import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, Category, StockMovement } from '@/lib/types'

interface ProductStore {
  products: Product[]
  categories: Category[]
  stockMovements: StockMovement[]
  setProducts: (products: Product[]) => void
  setCategories: (categories: Category[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  addCategory: (category: Category) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  deleteCategory: (id: string) => void
  addStockMovement: (movement: StockMovement) => void
  updateStock: (productId: string, quantity: number, type: 'in' | 'out', reason: string) => void
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      stockMovements: [],
      setProducts: (products) => set({ products }),
      setCategories: (categories) => set({ categories }),
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct, updatedAt: new Date().toISOString() } : product
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),
      updateCategory: (id, updatedCategory) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, ...updatedCategory } : category
          ),
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        })),
      addStockMovement: (movement) =>
        set((state) => ({
          stockMovements: [...state.stockMovements, movement],
        })),
      updateStock: (productId, quantity, type, reason) => {
        const store = get()
        const product = store.products.find((p) => p.id === productId)
        
        if (!product) return

        const newStock = type === 'in' 
          ? product.stock + quantity 
          : product.stock - quantity

        store.updateProduct(productId, { stock: newStock })
        
        store.addStockMovement({
          id: Math.random().toString(36).slice(2),
          productId,
          quantity,
          type,
          reason,
          date: new Date().toISOString(),
        })
      },
    }),
    {
      name: 'inventory-storage',
    }
  )
)