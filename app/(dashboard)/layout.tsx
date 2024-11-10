import { DashboardNav } from '@/components/layout/dashboard-nav'
import { UserNav } from '@/components/layout/user-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-card overflow-y-auto border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold">IMS</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <DashboardNav />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="w-full h-16 border-b bg-card flex items-center justify-between px-4">
          <div>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}