import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Invoice, Customer } from '@/lib/types'

interface InvoiceStore {
  invoices: Invoice[]
  customers: Customer[]
  setInvoices: (invoices: Invoice[]) => void
  setCustomers: (customers: Customer[]) => void
  addInvoice: (invoice: Invoice) => void
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void
  deleteInvoice: (id: string) => void
  addCustomer: (customer: Customer) => void
  updateCustomer: (id: string, customer: Partial<Customer>) => void
  deleteCustomer: (id: string) => void
}

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      invoices: [],
      customers: [],
      setInvoices: (invoices) => set({ invoices }),
      setCustomers: (customers) => set({ customers }),
      addInvoice: (invoice) =>
        set((state) => ({ invoices: [...state.invoices, invoice] })),
      updateInvoice: (id, updatedInvoice) =>
        set((state) => ({
          invoices: state.invoices.map((invoice) =>
            invoice.id === id
              ? { ...invoice, ...updatedInvoice, updatedAt: new Date().toISOString() }
              : invoice
          ),
        })),
      deleteInvoice: (id) =>
        set((state) => ({
          invoices: state.invoices.filter((invoice) => invoice.id !== id),
        })),
      addCustomer: (customer) =>
        set((state) => ({ customers: [...state.customers, customer] })),
      updateCustomer: (id, updatedCustomer) =>
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id ? { ...customer, ...updatedCustomer } : customer
          ),
        })),
      deleteCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id),
        })),
    }),
    {
      name: 'invoice-storage',
    }
  )
)