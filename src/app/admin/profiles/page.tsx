"use client"

import { useState } from "react"
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from "lucide-react"

const profiles = [
  {
    id: 1,
    name: "John Doe",
    designation: "Full Stack Developer",
    company: "Tech Corp",
    city: "New York",
    category: "Technology",
    status: "pending",
    submittedDate: "2024-01-20",
    views: 0,
    isPromoted: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Digital Marketing Expert",
    company: "Marketing Pro",
    city: "Los Angeles",
    category: "Marketing",
    status: "approved",
    submittedDate: "2024-01-18",
    views: 1250,
    isPromoted: true,
  },
  {
    id: 3,
    name: "Mike Johnson",
    designation: "UI/UX Designer",
    company: "Design Studio",
    city: "San Francisco",
    category: "Design",
    status: "rejected",
    submittedDate: "2024-01-15",
    views: 890,
    isPromoted: false,
  },
]

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || profile.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleApprove = (profileId: number) => {
    console.log("Approving profile:", profileId)
  }

  const handleReject = (profileId: number) => {
    console.log("Rejecting profile:", profileId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profiles</h1>
          <p className="text-gray-600">Review and manage user profiles</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Bulk Approve
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.filter(p => p.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.filter(p => p.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-700">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                  <p className="text-sm text-gray-600">{profile.designation}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                profile.status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : profile.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {profile.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Company:</span>
                <span className="text-gray-900">{profile.company}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="text-gray-900">{profile.city}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="text-gray-900">{profile.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Views:</span>
                <span className="text-gray-900">{profile.views.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Submitted:</span>
                <span className="text-gray-900">{profile.submittedDate}</span>
              </div>
            </div>

            {profile.isPromoted && (
              <div className="mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Promoted
                </span>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={() => handleApprove(profile.id)}
                className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                disabled={profile.status === 'approved'}
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(profile.id)}
                className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                disabled={profile.status === 'rejected'}
              >
                Reject
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
