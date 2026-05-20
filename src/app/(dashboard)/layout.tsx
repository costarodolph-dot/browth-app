import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Header />
      <main className="ml-[220px] pt-[64px] min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
