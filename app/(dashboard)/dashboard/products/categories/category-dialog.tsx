'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Category } from '@/lib/types'
import { useProductStore } from '@/lib/store/products'
import { toast } from 'sonner'

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

interface CategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
}

export function CategoryDialog({
  open,
  onOpenChange,
  category,
}: CategoryDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const addCategory = useProductStore((state) => state.addCategory)
  const updateCategory = useProductStore((state) => state.updateCategory)

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
    },
  })

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (category) {
        updateCategory(category.id, values)
        toast.success('Category updated successfully')
      } else {
        const newCategory = {
          ...values,
          id: Math.random().toString(36).slice(2),
        }
        addCategory(newCategory)
        toast.success('Category added successfully')
      }
      
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error(category ? 'Failed to update category' : 'Failed to add category')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? 'Edit Category' : 'Add New Category'}
          </DialogTitle>
          <DialogDescription>
            {category
              ? 'Edit the category details below'
              : 'Add a new category to organize your products'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? category
                    ? 'Updating...'
                    : 'Adding...'
                  : category
                  ? 'Update Category'
                  : 'Add Category'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}