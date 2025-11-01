"use client"

import { useState } from "react"
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Users } from "lucide-react"

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
    <div className="space-y-8 max-w-screen-xl mx-auto px-6 md:px-8 py-6 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10">
          <div className="flex items-center justify-center sm:justify-between flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-1">Profile Management</h1>
                <p className="text-white/90 text-base">Review and manage user profiles on the platform</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-medium">{profiles.length} Total Profiles</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-end">
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-5 py-3 rounded-xl transition-all font-medium shadow-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Bulk Approve
              </button>
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-5 py-3 rounded-xl transition-all font-medium shadow-lg flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-7 md:p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-gray-600 mb-1">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <Clock className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-7 md:p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-gray-600 mb-1">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.filter(p => p.status === 'approved').length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-7 md:p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-gray-600 mb-1">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.filter(p => p.status === 'rejected').length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
              <XCircle className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-7 md:p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <Eye className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-green h-5 w-5" />
            <input
              type="text"
              placeholder="Search profiles by name, designation, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-primary-green focus:border-primary-green focus:bg-white transition-all text-base"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-primary-green bg-white font-medium"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button className="flex items-center px-4 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 justify-items-center">
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className="relative bg-white rounded-xl shadow-md border border-gray-100 p-5 md:p-6 hover:shadow-lg transition-shadow group max-w-[330px] w-full">
            <div className="flex items-start justify-between mb-6 flex-col sm:flex-row gap-4">
              <div className="flex items-center sm:flex-row flex-col space-x-0 sm:space-x-4 space-y-3 sm:space-y-0">
                <div className="h-[50px] w-[50px] bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <span className="text-lg font-bold text-white">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-[18px] font-bold text-gray-900 break-words">{profile.name}</h3>
                  <p className="text-[14px] text-gray-600 font-medium break-words">{profile.designation}</p>
                </div>
              </div>
              {/* status badge moved to absolute position */}
            </div>

            <div className="mb-6 p-5 bg-gray-50 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 font-medium">Company</p>
                  <p className="text-sm text-gray-900 font-semibold break-words">{profile.company}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Location</p>
                  <p className="text-sm text-gray-900 font-semibold break-words">{profile.city}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Category</p>
                  <p className="text-sm text-gray-900 font-semibold break-words">{profile.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Views</p>
                  <p className="text-sm text-gray-900 font-semibold">{profile.views.toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-600 font-medium">Submitted</p>
                  <p className="text-sm text-gray-500 break-words">{profile.submittedDate}</p>
                </div>
              </div>
            </div>

            {profile.isPromoted && (
              <div className="mb-5 flex justify-center sm:justify-start">
                <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                  ⭐ Promoted
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleApprove(profile.id)}
                title="Approve profile"
                className="h-[42px] bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 rounded-xl text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={profile.status === 'approved'}
              >
                <CheckCircle className="h-4 w-4 inline mr-2 align-text-bottom" />
                Approve
              </button>
              <button
                onClick={() => handleReject(profile.id)}
                title="Reject profile"
                className="h-[42px] bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 rounded-xl text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={profile.status === 'rejected'}
              >
                <XCircle className="h-4 w-4 inline mr-2 align-text-bottom" />
                Reject
              </button>
              <button className="col-span-2 h-[42px] px-4 border-2 border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-all">
                <Eye className="h-4 w-4 inline mr-2 align-text-bottom" />
                Preview
              </button>
            </div>

            {/* absolute status badge */}
            <span className={`absolute top-4 right-4 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
              profile.status === 'approved'
                ? 'bg-green-100 text-green-800'
                : profile.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {profile.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
