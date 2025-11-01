"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Shield, Users, Settings, LogOut, BarChart3 } from "lucide-react"
import { toast } from "react-hot-toast"

interface AdminData {
  id: string
  email: string
  fullName: string
  role: string
  permissions: string[]
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/me')
      
      if (!response.ok) {
        router.push('/admin/login')
        return
      }

      const data = await response.json()
      setAdmin(data.admin)
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary-green" />
      </div>
    )
  }

  if (!admin) {
    return null
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-gradient-primary text-white'
      case 'ADMIN':
        return 'bg-primary-green text-white'
      case 'SUB_ADMIN':
        return 'bg-background-mint text-primary-green'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header with Gradient */}
      <div className="bg-gradient-to-r from-primary-green via-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Welcome back, {admin.fullName.split(' ')[0]}!</h1>
                <p className="text-white/90 text-base">Here's what's happening with your admin panel today</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl transition-all font-medium shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Admin Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin Profile Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{admin.fullName}</h2>
              <p className="text-gray-600 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {admin.email}
              </p>
              <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold shadow-sm ${getRoleBadgeColor(admin.role)}`}>
                {admin.role.replace('_', ' ')}
              </span>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-primary-green to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{admin.permissions.length}</p>
              <p className="text-sm text-gray-600 mt-1">Permissions</p>
            </div>
            <div className="text-center border-l border-gray-200">
              <p className="text-2xl font-bold text-primary-green">Active</p>
              <p className="text-sm text-gray-600 mt-1">Status</p>
            </div>
            <div className="text-center border-l border-gray-200">
              <p className="text-2xl font-bold text-gray-900">Admin</p>
              <p className="text-sm text-gray-600 mt-1">Access Level</p>
            </div>
          </div>
        </div>

        {/* Permissions Summary Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Access Rights</h3>
              <p className="text-sm text-gray-600">Your permissions</p>
            </div>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {admin.permissions.slice(0, 5).map((permission) => (
              <div
                key={permission}
                className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm"
              >
                <div className="w-2 h-2 bg-primary-green rounded-full" />
                <span className="text-sm font-medium text-gray-700">
                  {permission.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
            {admin.permissions.length > 5 && (
              <p className="text-sm text-gray-500 text-center pt-2">
                +{admin.permissions.length - 5} more permissions
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
            <p className="text-gray-600 mt-1">Manage your admin panel efficiently</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(admin.role === 'SUPER_ADMIN' || admin.permissions.includes('MANAGE_ADMINS')) && (
            <div 
              onClick={() => router.push('/admin/manage-admins')}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Manage Admins</h3>
              <p className="text-sm text-gray-600">Create and manage admin accounts</p>
            </div>
          )}

          <div 
            onClick={() => router.push('/admin/users')}
            className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Manage Users</h3>
            <p className="text-sm text-gray-600">View and manage user accounts</p>
          </div>

          <div 
            onClick={() => router.push('/admin/profiles')}
            className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Profiles</h3>
            <p className="text-sm text-gray-600">Review and approve profiles</p>
          </div>

          <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Analytics</h3>
            <p className="text-sm text-gray-600">View platform statistics</p>
          </div>
        </div>
      </div>
    </div>
  )
}
