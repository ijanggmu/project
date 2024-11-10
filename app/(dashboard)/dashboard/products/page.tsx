'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductsTable } from './products-table'
import { ProductDialog } from './product-dialog'
import { useProductStore } from '@/lib/store/products'

export default function ProductsPage() {
  const [open, setOpen] = useState(false)
  const products = useProductStore((state) => state.products)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product inventory here.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductsTable products={products} />
      <ProductDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}