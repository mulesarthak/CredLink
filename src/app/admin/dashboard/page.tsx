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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-secondary mt-0.5">CredLink Administration</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors shadow-sm hover:shadow"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Admin Info Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">{admin.fullName}</h2>
            <p className="text-secondary mb-4 text-base">{admin.email}</p>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getRoleBadgeColor(admin.role)}`}>
              {admin.role.replace('_', ' ')}
            </span>
          </div>
          <Shield className="w-14 h-14 text-primary-green" />
        </div>
      </div>

      {/* Permissions Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-primary">Your Permissions</h3>
          <p className="text-sm text-secondary mt-1">Access rights granted to your account</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {admin.permissions.map((permission) => (
            <div
              key={permission}
              className="flex items-center gap-3 p-4 bg-background-light-green rounded-lg hover:bg-opacity-80 transition-colors"
            >
              <div className="w-2.5 h-2.5 bg-primary-green rounded-full"></div>
              <span className="text-sm font-medium">
                {permission.replace(/_/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold text-primary mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(admin.role === 'SUPER_ADMIN' || admin.permissions.includes('MANAGE_ADMINS')) && (
            <div 
              onClick={() => router.push('/admin/manage-admins')}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-background-light-green rounded-xl flex items-center justify-center shadow-sm">
                  <Shield className="w-7 h-7 text-primary-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">Manage Admins</h3>
                  <p className="text-sm text-secondary">Create and manage admin accounts</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-background-light-green rounded-xl flex items-center justify-center shadow-sm">
                <Users className="w-7 h-7 text-primary-green" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1">Manage Users</h3>
                <p className="text-sm text-secondary">View and manage user accounts</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-background-light-green rounded-xl flex items-center justify-center shadow-sm">
                <BarChart3 className="w-7 h-7 text-primary-green" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1">Analytics</h3>
                <p className="text-sm text-secondary">View platform statistics</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-background-light-green rounded-xl flex items-center justify-center shadow-sm">
                <Settings className="w-7 h-7 text-primary-green" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1">Settings</h3>
                <p className="text-sm text-secondary">Configure platform settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
