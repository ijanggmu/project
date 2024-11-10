import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
} from 'lucide-react'

const stats = [
  {
    name: 'Total Products',
    value: '2,345',
    icon: Package,
    description: 'Active products in inventory',
  },
  {
    name: 'Low Stock Items',
    value: '15',
    icon: AlertTriangle,
    description: 'Products below threshold',
  },
  {
    name: 'Monthly Revenue',
    value: '$45,231',
    icon: DollarSign,
    description: '+20.1% from last month',
  },
  {
    name: 'Growth Rate',
    value: '24.5%',
    icon: TrendingUp,
    description: 'Compared to last quarter',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Placeholder for additional dashboard widgets */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your inventory movements from the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Activity chart will be implemented here
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Stock Alerts</CardTitle>
            <CardDescription>Products requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Alerts will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}