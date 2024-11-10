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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Invoice, Customer, Product } from '@/lib/types'
import { useInvoiceStore } from '@/lib/store/invoices'
import { useProductStore } from '@/lib/store/products'
import { toast } from 'sonner'
import { format } from 'date-fns'

const invoiceSchema = z.object({
  customerId: z.string().min(1, 'Please select a customer'),
  items: z.array(z.object({
    productId: z.string().min(1, 'Please select a product'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price must be positive'),
  })).min(1, 'Add at least one item'),
  dueDate: z.string().min(1, 'Please select a due date'),
})

interface InvoiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoice?: Invoice
}

export function InvoiceDialog({
  open,
  onOpenChange,
  invoice,
}: InvoiceDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const customers = useInvoiceStore((state) => state.customers)
  const products = useProductStore((state) => state.products)
  const addInvoice = useInvoiceStore((state) => state.addInvoice)
  const updateInvoice = useInvoiceStore((state) => state.updateInvoice)

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customerId: invoice?.customerId || '',
      items: invoice?.items || [{ productId: '', quantity: 1, price: 0 }],
      dueDate: invoice?.dueDate || format(new Date(), 'yyyy-MM-dd'),
    },
  })

  async function onSubmit(values: z.infer<typeof invoiceSchema>) {
    setIsLoading(true)
    try {
      const items = values.items.map((item) => ({
        ...item,
        total: item.price * item.quantity,
      }))

      const subtotal = items.reduce((sum, item) => sum + item.total, 0)
      const tax = subtotal * 0.1 // 10% tax
      const total = subtotal + tax

      const invoiceData = {
        id: invoice?.id || Math.random().toString(36).slice(2),
        number: invoice?.number || `INV-${Date.now()}`,
        customerId: values.customerId,
        items,
        subtotal,
        tax,
        total,
        status: invoice?.status || 'pending',
        dueDate: values.dueDate,
        createdAt: invoice?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Invoice

      if (invoice) {
        updateInvoice(invoice.id, invoiceData)
        toast.success('Invoice updated successfully')
      } else {
        addInvoice(invoiceData)
        toast.success('Invoice created successfully')
      }

      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error(invoice ? 'Failed to update invoice' : 'Failed to create invoice')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {invoice ? 'Edit Invoice' : 'Create New Invoice'}
          </DialogTitle>
          <DialogDescription>
            {invoice
              ? 'Edit the invoice details below'
              : 'Create a new invoice for a customer'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Items section will be implemented in the next part */}

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
                  ? invoice
                    ? 'Updating...'
                    : 'Creating...'
                  : invoice
                  ? 'Update Invoice'
                  : 'Create Invoice'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}