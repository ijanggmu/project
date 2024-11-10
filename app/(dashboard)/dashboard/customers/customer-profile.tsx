'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Customer } from '@/lib/types'
import { useInvoiceStore } from '@/lib/store/invoices'
import { format } from 'date-fns'
import { formatCurrency } from '@/lib/utils'

interface CustomerProfileProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: Customer | null
}

export function CustomerProfile({
  open,
  onOpenChange,
  customer,
}: CustomerProfileProps) {
  const invoices = useInvoiceStore((state) => state.invoices)
  
  if (!customer) return null

  const customerInvoices = invoices.filter(
    (invoice) => invoice.customerId === customer.id
  )

  const totalSpent = customerInvoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Customer Profile</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Contact Information</h3>
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">Email:</span>{' '}
                    {customer.email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phone:</span>{' '}
                    {customer.phone}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Address:</span>{' '}
                    {customer.address}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Statistics</h3>
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">Total Orders:</span>{' '}
                    {customerInvoices.length}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Total Spent:</span>{' '}
                    {formatCurrency(totalSpent)}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Last Order:</span>{' '}
                    {customerInvoices.length > 0
                      ? format(
                          new Date(
                            customerInvoices[customerInvoices.length - 1].createdAt
                          ),
                          'MMM d, yyyy'
                        )
                      : 'No orders yet'}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invoices">
            <div className="space-y-4">
              {customerInvoices.length > 0 ? (
                customerInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{invoice.number}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(invoice.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(invoice.total)}
                      </p>
                      <p
                        className={`text-sm ${
                          invoice.status === 'paid'
                            ? 'text-green-600'
                            : invoice.status === 'overdue'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No invoices found for this customer
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-4">
              {/* Activity timeline will be implemented in the next phase */}
              <p className="text-center text-muted-foreground py-8">
                Activity timeline coming soon
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}