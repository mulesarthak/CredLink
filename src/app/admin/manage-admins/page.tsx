"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Shield, Plus, Edit, Trash2, X } from "lucide-react"
import { toast } from "react-hot-toast"

interface Admin {
  id: string
  email: string
  fullName: string
  role: string
  permissions: string[]
  isActive: boolean
  lastLogin: string | null
  createdAt: string
}

interface CurrentAdmin {
  id: string
  role: string
  permissions: string[]
}

const ROLES = [
  { value: 'SUPER_ADMIN', label: 'Super Admin', description: 'Full system access' },
  { value: 'ADMIN', label: 'Admin', description: 'Elevated privileges' },
  { value: 'SUB_ADMIN', label: 'Sub Admin', description: 'Limited access' }
]

const PERMISSIONS = [
  { value: 'MANAGE_USERS', label: 'Manage Users' },
  { value: 'MANAGE_ADMINS', label: 'Manage Admins' },
  { value: 'MANAGE_PROFILES', label: 'Manage Profiles' },
  { value: 'VIEW_ANALYTICS', label: 'View Analytics' },
  { value: 'MANAGE_SETTINGS', label: 'Manage Settings' },
  { value: 'MANAGE_CONTENT', label: 'Manage Content' },
  { value: 'VIEW_LOGS', label: 'View Logs' },
  { value: 'MANAGE_BILLING', label: 'Manage Billing' }
]

export default function ManageAdminsPage() {
  const router = useRouter()
  const [currentAdmin, setCurrentAdmin] = useState<CurrentAdmin | null>(null)
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    role: 'SUB_ADMIN',
    permissions: [] as string[]
  })

  useEffect(() => {
    checkAuth()
    fetchAdmins()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/me')
      
      if (!response.ok) {
        router.push('/admin/login')
        return
      }

      const data = await response.json()
      
      // Only SUPER_ADMIN can manage admins
      if (data.admin.role !== 'SUPER_ADMIN' && !data.admin.permissions.includes('MANAGE_ADMINS')) {
        toast.error('You do not have permission to manage admins')
        router.push('/admin/dashboard')
        return
      }

      setCurrentAdmin(data.admin)
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/manage')
      if (response.ok) {
        const data = await response.json()
        setAdmins(data.admins)
      }
    } catch (error) {
      console.error('Fetch admins error:', error)
    }
  }

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.fullName || !formData.password) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('/api/admin/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || 'Failed to create admin')
        return
      }

      toast.success('Admin created successfully!')
      setShowCreateModal(false)
      setFormData({ email: '', fullName: '', password: '', role: 'SUB_ADMIN', permissions: [] })
      fetchAdmins()
    } catch (error) {
      console.error('Create admin error:', error)
      toast.error('Failed to create admin')
    }
  }

  const handleUpdateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedAdmin) return

    try {
      const response = await fetch(`/api/admin/manage/${selectedAdmin.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: formData.role,
          permissions: formData.permissions,
          isActive: selectedAdmin.isActive
        })
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || 'Failed to update admin')
        return
      }

      toast.success('Admin updated successfully!')
      setShowEditModal(false)
      setSelectedAdmin(null)
      fetchAdmins()
    } catch (error) {
      console.error('Update admin error:', error)
      toast.error('Failed to update admin')
    }
  }

  const handleDeleteAdmin = async (adminId: string) => {
    if (!confirm('Are you sure you want to delete this admin?')) return

    try {
      const response = await fetch(`/api/admin/manage/${adminId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const result = await response.json()
        toast.error(result.error || 'Failed to delete admin')
        return
      }

      toast.success('Admin deleted successfully!')
      fetchAdmins()
    } catch (error) {
      console.error('Delete admin error:', error)
      toast.error('Failed to delete admin')
    }
  }

  const togglePermission = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const openEditModal = (admin: Admin) => {
    setSelectedAdmin(admin)
    setFormData({
      email: admin.email,
      fullName: admin.fullName,
      password: '',
      role: admin.role,
      permissions: admin.permissions
    })
    setShowEditModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary-green" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Admin Management</h1>
                <p className="text-white/90 text-base">Create and manage admin accounts with permissions</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-medium">{admins.length} Active Admins</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setFormData({ email: '', fullName: '', password: '', role: 'SUB_ADMIN', permissions: [] })
                setShowCreateModal(true)
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl transition-all font-medium shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Admin
            </button>
          </div>
        </div>
      </div>

      {/* Admins List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all group">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                          <span className="text-sm font-bold text-white">
                            {admin.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">{admin.fullName}</div>
                          <div className="text-xs text-gray-600">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-xl shadow-sm ${
                        admin.role === 'SUPER_ADMIN' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : admin.role === 'ADMIN'
                          ? 'bg-gradient-to-r from-primary-green to-emerald-600 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      }`}>
                        {admin.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-green rounded-full" />
                        <span className="text-sm font-medium text-gray-700">
                          {admin.permissions.length} permissions
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-xl ${
                        admin.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {admin.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700">
                      {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(admin)}
                          className="text-blue-600 hover:text-white hover:bg-blue-600 p-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                          title="Edit Admin"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {admin.role !== 'SUPER_ADMIN' && (
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="text-red-600 hover:text-white hover:bg-red-600 p-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
                            title="Delete Admin"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Create New Admin</h2>
                    <p className="text-sm text-gray-600 mt-0.5">Add a new administrator to the system</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowCreateModal(false)
                    setFormData({ email: '', fullName: '', password: '', role: 'SUB_ADMIN', permissions: [] })
                  }}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAdmin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all"
                    placeholder="admin@credlink.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all font-medium"
                  >
                    {ROLES.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label} - {role.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Permissions</label>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                    {PERMISSIONS.map(permission => (
                      <label key={permission.value} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-all border-2 border-transparent hover:border-primary-green/20">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.value)}
                          onChange={() => togglePermission(permission.value)}
                          className="w-4 h-4 rounded text-primary-green focus:ring-primary-green"
                        />
                        <span className="text-sm font-medium text-gray-700">{permission.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary-green to-emerald-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Create Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false)
                      setFormData({ email: '', fullName: '', password: '', role: 'SUB_ADMIN', permissions: [] })
                    }}
                    className="flex-1 px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Edit className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Edit Admin</h2>
                    <p className="text-sm text-gray-600 mt-0.5">Update administrator details and permissions</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateAdmin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-primary-green transition-all font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={selectedAdmin.role === 'SUPER_ADMIN'}
                  >
                    {ROLES.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label} - {role.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Permissions</label>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
                    {PERMISSIONS.map(permission => (
                      <label key={permission.value} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-all border-2 border-transparent hover:border-primary-green/20">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.value)}
                          onChange={() => togglePermission(permission.value)}
                          className="w-4 h-4 rounded text-primary-green focus:ring-primary-green disabled:cursor-not-allowed"
                          disabled={selectedAdmin.role === 'SUPER_ADMIN'}
                        />
                        <span className="text-sm font-medium text-gray-700">{permission.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedAdmin.role === 'SUPER_ADMIN'}
                  >
                    Update Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
