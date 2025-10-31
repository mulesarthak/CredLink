"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Shield, Ban, Mail } from "lucide-react"

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    isVerified: true,
    profileStatus: "published",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    profileViews: 1250,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    isVerified: false,
    profileStatus: "draft",
    joinDate: "2024-01-18",
    lastActive: "2024-01-21",
    profileViews: 890,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1234567892",
    isVerified: true,
    profileStatus: "published",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19",
    profileViews: 2100,
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "verified" && user.isVerified) ||
                         (filterStatus === "unverified" && !user.isVerified)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Users</h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">Manage all registered users</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Export Users
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-5 md:gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-base"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Users</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
            <button className="w-full sm:w-auto flex items-center justify-center px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="relative px-8 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-8 py-7 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-sm font-medium text-gray-700">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-8">
                        <div className="text-sm font-medium text-gray-900 mb-1.5">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-7 whitespace-nowrap">
                    <div className="text-sm text-gray-900 mb-1.5">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-8 py-7 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isVerified 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.isVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-7 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.profileStatus === 'published'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.profileStatus}
                    </span>
                  </td>
                  <td className="px-8 py-7 whitespace-nowrap text-sm text-gray-500">
                    <div className="mb-1.5">Joined: {user.joinDate}</div>
                    <div>Last: {user.lastActive}</div>
                  </td>
                  <td className="px-8 py-7 whitespace-nowrap text-sm text-gray-900">
                    {user.profileViews.toLocaleString()}
                  </td>
                  <td className="px-8 py-7 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-900 p-1.5">
                        <Shield className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1.5">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1.5">
                        <Ban className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1.5">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  )
}
