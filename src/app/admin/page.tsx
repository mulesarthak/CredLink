"use client"

import { Users, Shield, DollarSign, Eye, TrendingUp, UserCheck } from "lucide-react"

const stats = [
  {
    name: "Total Users",
    value: "12,345",
    change: "+12%",
    changeType: "increase",
    icon: Users,
  },
  {
    name: "Verified Profiles",
    value: "8,234",
    change: "+8%",
    changeType: "increase",
    icon: UserCheck,
  },
  {
    name: "Active Promotions",
    value: "456",
    change: "+23%",
    changeType: "increase",
    icon: DollarSign,
  },
  {
    name: "Profile Views",
    value: "89,234",
    change: "+15%",
    changeType: "increase",
    icon: Eye,
  },
]

const recentActivity = [
  {
    id: 1,
    user: "John Doe",
    action: "Created new profile",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Upgraded to Premium",
    time: "4 hours ago",
    status: "completed",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Profile verification requested",
    time: "6 hours ago",
    status: "pending",
  },
  {
    id: 4,
    user: "Sarah Wilson",
    action: "Started promotion campaign",
    time: "8 hours ago",
    status: "active",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the CredLink Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-600 ml-1">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{activity.time}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activity.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : activity.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="font-medium text-blue-900">Review Pending Profiles</div>
              <div className="text-sm text-blue-700">23 profiles awaiting approval</div>
            </button>
            <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="font-medium text-green-900">Manage Promotions</div>
              <div className="text-sm text-green-700">15 active campaigns</div>
            </button>
            <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="font-medium text-purple-900">User Support</div>
              <div className="text-sm text-purple-700">8 support tickets</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Server Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Payment Gateway</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Email Service</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Limited
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
