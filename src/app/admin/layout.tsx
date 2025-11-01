"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  DollarSign, 
  Menu, 
  X,
  LogOut,
  Home
} from "lucide-react"

interface AdminData {
  id: string
  role: string
  permissions: string[]
}

const allNavigation = [
  { name: "Dashboard", href: "/admin", icon: Home, permission: null },
  { name: "Users", href: "/admin/users", icon: Users, permission: "MANAGE_USERS" },
  { name: "Manage Admins", href: "/admin/manage-admins", icon: Shield, permission: "MANAGE_ADMINS" },
  { name: "Profiles", href: "/admin/profiles", icon: Users, permission: "MANAGE_PROFILES" },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3, permission: "VIEW_ANALYTICS" },
  { name: "Settings", href: "/admin/settings", icon: Settings, permission: "MANAGE_SETTINGS" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState<AdminData | null>(null)
  const [navigation, setNavigation] = useState<typeof allNavigation>([])
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/me')
      if (response.ok) {
        const data = await response.json()
        setAdmin(data.admin)
        
        // Filter navigation based on permissions
        const filteredNav = allNavigation.filter(item => {
          // Dashboard is always visible
          if (!item.permission) return true
          
          // Super admin sees everything
          if (data.admin.role === 'SUPER_ADMIN') return true
          
          // Check if admin has the required permission
          return data.admin.permissions.includes(item.permission)
        })
        
        setNavigation(filteredNav)
      }
    } catch (error) {
      console.error('Auth check error:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-20 px-6 bg-gray-800 border-b border-gray-700">
          <Link href="/admin" className="text-white text-2xl font-bold">
            CredLink Admin
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <div key={item.name} className="p-5">
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive
                      ? "bg-gray-800 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } group flex items-center px-6 py-5 text-base font-medium rounded-xl transition-all duration-200 hover:shadow-md`}
                >
                  <Icon className="mr-4 h-6 w-6 flex-shrink-0" />
                  {item.name}
                </Link>
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="space-y-1">
              <Link
                href="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-6 py-5 text-base font-medium rounded-xl transition-all duration-200 hover:shadow-md"
              >
                <Home className="mr-4 h-6 w-6 flex-shrink-0" />
                Back to Site
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-6 py-5 text-base font-medium rounded-xl transition-all duration-200 hover:shadow-md"
              >
                <LogOut className="mr-4 h-6 w-6 flex-shrink-0" />
                Sign Out
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Admin Panel
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
