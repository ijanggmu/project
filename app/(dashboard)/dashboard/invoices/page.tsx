'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InvoicesTable } from './invoices-table'
import { InvoiceDialog } from './invoice-dialog'
import { useInvoiceStore } from '@/lib/store/invoices'

export default function InvoicesPage() {
  const [open, setOpen] = useState(false)
  const invoices = useInvoiceStore((state) => state.invoices)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">
            Manage customer invoices and track payments
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <InvoicesTable invoices={invoices} />
      <InvoiceDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}