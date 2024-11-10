'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomersTable } from './customers-table'
import { CustomerDialog } from './customer-dialog'
import { useInvoiceStore } from '@/lib/store/invoices'

export default function CustomersPage() {
  const [open, setOpen] = useState(false)
  const customers = useInvoiceStore((state) => state.customers)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your customer relationships
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <CustomersTable customers={customers} />
      <CustomerDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}