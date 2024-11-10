'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CategoryDialog } from './category-dialog'
import { CategoriesTable } from './categories-table'
import { useProductStore } from '@/lib/store/products'

export default function CategoriesPage() {
  const [open, setOpen] = useState(false)
  const categories = useProductStore((state) => state.categories)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage your product categories here.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <CategoriesTable categories={categories} />
      <CategoryDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}