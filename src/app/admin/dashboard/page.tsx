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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-sm text-secondary">CredLink Administration</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Info Card */}
        <div className="card mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{admin.fullName}</h2>
              <p className="text-secondary mb-3">{admin.email}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(admin.role)}`}>
                {admin.role.replace('_', ' ')}
              </span>
            </div>
            <Shield className="w-12 h-12 text-primary-green" />
          </div>
        </div>

        {/* Permissions Card */}
        <div className="card mb-8">
          <div className="card-header">
            <h3 className="card-title">Your Permissions</h3>
            <p className="card-description">Access rights granted to your account</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {admin.permissions.map((permission) => (
              <div
                key={permission}
                className="flex items-center gap-2 p-3 bg-background-light-green rounded-md"
              >
                <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                <span className="text-sm font-medium">
                  {permission.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(admin.role === 'SUPER_ADMIN' || admin.permissions.includes('MANAGE_ADMINS')) && (
            <div 
              onClick={() => router.push('/admin/manage-admins')}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-background-light-green rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-green" />
                </div>
                <div>
                  <h3 className="font-semibold">Manage Admins</h3>
                  <p className="text-sm text-secondary">Create and manage admin accounts</p>
                </div>
              </div>
            </div>
          )}

          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-background-light-green rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-green" />
              </div>
              <div>
                <h3 className="font-semibold">Manage Users</h3>
                <p className="text-sm text-secondary">View and manage user accounts</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-background-light-green rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-green" />
              </div>
              <div>
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-secondary">View platform statistics</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-background-light-green rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-primary-green" />
              </div>
              <div>
                <h3 className="font-semibold">Settings</h3>
                <p className="text-sm text-secondary">Configure platform settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
