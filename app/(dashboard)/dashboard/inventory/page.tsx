'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useProductStore } from '@/lib/store/products'

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all')
  const stockMovements = useProductStore((state) => state.stockMovements)
  const products = useProductStore((state) => state.products)

  const filteredMovements = stockMovements
    .filter((movement) => {
      const product = products.find((p) => p.id === movement.productId)
      if (!product) return false

      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = filter === 'all' || movement.type === filter

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Inventory Movements</h2>
        <p className="text-muted-foreground">
          Track all stock movements and adjustments.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by product name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filter} onValueChange={(value: 'all' | 'in' | 'out') => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Movements</SelectItem>
            <SelectItem value="in">Stock In</SelectItem>
            <SelectItem value="out">Stock Out</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovements.map((movement) => {
              const product = products.find((p) => p.id === movement.productId)
              if (!product) return null

              return (
                <TableRow key={movement.id}>
                  <TableCell>
                    {format(new Date(movement.date), 'MMM d, yyyy HH:mm')}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        movement.type === 'in'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {movement.type === 'in' ? 'Stock In' : 'Stock Out'}
                    </div>
                  </TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {movement.reason}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}