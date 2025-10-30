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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Manage Admins</h1>
              <p className="text-sm text-secondary">Create and manage admin accounts</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-md hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Create Admin
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Admins List */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-light-green">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-primary">{admin.fullName}</div>
                        <div className="text-sm text-secondary">{admin.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        admin.role === 'SUPER_ADMIN' 
                          ? 'bg-gradient-primary text-white'
                          : admin.role === 'ADMIN'
                          ? 'bg-primary-green text-white'
                          : 'bg-background-mint text-primary-green'
                      }`}>
                        {admin.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-secondary">
                        {admin.permissions.length} permissions
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        admin.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {admin.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                      {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(admin)}
                        className="text-primary-green hover:text-primary-green-dark mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {admin.role !== 'SUPER_ADMIN' && (
                        <button
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Create New Admin</h2>
                <button onClick={() => setShowCreateModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAdmin} className="space-y-4">
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="auth-input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="auth-input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="auth-input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="auth-input"
                  >
                    {ROLES.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label} - {role.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label mb-2 block">Permissions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PERMISSIONS.map(permission => (
                      <label key={permission.value} className="flex items-center gap-2 p-2 bg-background-light-green rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.value)}
                          onChange={() => togglePermission(permission.value)}
                          className="rounded text-primary-green"
                        />
                        <span className="text-sm">{permission.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 auth-submit-button"
                  >
                    Create Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Edit Admin</h2>
                <button onClick={() => setShowEditModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateAdmin} className="space-y-4">
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    className="auth-input bg-gray-100"
                    disabled
                  />
                </div>

                <div>
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    className="auth-input bg-gray-100"
                    disabled
                  />
                </div>

                <div>
                  <label className="label">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="auth-input"
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
                  <label className="label mb-2 block">Permissions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PERMISSIONS.map(permission => (
                      <label key={permission.value} className="flex items-center gap-2 p-2 bg-background-light-green rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.value)}
                          onChange={() => togglePermission(permission.value)}
                          className="rounded text-primary-green"
                          disabled={selectedAdmin.role === 'SUPER_ADMIN'}
                        />
                        <span className="text-sm">{permission.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 auth-submit-button"
                    disabled={selectedAdmin.role === 'SUPER_ADMIN'}
                  >
                    Update Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
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
