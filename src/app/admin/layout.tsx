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
    <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-primary-green to-emerald-600 border-b border-gray-700/50">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">CredLink Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/70 hover:text-white lg:hidden transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4 h-[calc(100vh-5rem)] overflow-y-auto pb-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive
                      ? "bg-gradient-to-r from-primary-green to-emerald-600 text-white shadow-lg shadow-primary-green/20 scale-[1.02]"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  } group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02]`}
                >
                  <Icon className={`mr-3.5 h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors`} />
                  <span className="flex-1">{item.name}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <div className="space-y-2">
              <Link
                href="/"
                className="text-gray-300 hover:bg-white/5 hover:text-white group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200"
              >
                <Home className="mr-3.5 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-white transition-colors" />
                Back to Site
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left text-gray-300 hover:bg-red-500/10 hover:text-red-400 group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200"
              >
                <LogOut className="mr-3.5 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-red-400 transition-colors" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Admin Info Footer */}
          {admin && (
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-green to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {admin.role === 'SUPER_ADMIN' ? 'SA' : admin.role === 'ADMIN' ? 'A' : 'SA'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Admin Panel</p>
                  <p className="text-xs text-gray-400 truncate">{admin.role.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900 lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-6 ml-auto">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-green/10 to-emerald-600/10 rounded-full border border-primary-green/20">
                <div className="w-2 h-2 bg-primary-green rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Admin Panel Active</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
