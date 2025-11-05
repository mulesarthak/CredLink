"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { Search, Filter, List, Grid } from "lucide-react"

type Profile = {
  id: string
  username: string
  name: string
  city: string
  company?: string
  designation?: string
  category?: string
  verified?: boolean
  reviews?: number
  views?: number
}

const SAMPLE_PROFILES: Profile[] = [
  {
    id: "1",
    username: "john",
    name: "John Doe",
    city: "New York",
    company: "Tech Corp",
    designation: "Full Stack Developer",
    category: "Technology",
    verified: true,
    reviews: 18,
    views: 1250,
  },
  {
    id: "2",
    username: "jane",
    name: "Jane Smith",
    city: "Los Angeles",
    company: "Marketing Pro",
    designation: "Digital Marketing Expert",
    category: "Marketing",
    verified: false,
    reviews: 4,
    views: 890,
  },
  {
    id: "3",
    username: "alex",
    name: "Alex Kumar",
    city: "Mumbai",
    company: "Design Studio",
    designation: "UI/UX Designer",
    category: "Design",
    verified: true,
    reviews: 32,
    views: 2100,
  },
  {
    id: "4",
    username: "maria",
    name: "Maria Garcia",
    city: "Madrid",
    company: "ConsultCo",
    designation: "Business Consultant",
    category: "Consulting",
    verified: false,
    reviews: 0,
    views: 120,
  },
]

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [onlyVerified, setOnlyVerified] = useState(false)
  const [minReviews, setMinReviews] = useState<number | "">("")
  const [layout, setLayout] = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handleConnect = (name: string) => {
    alert(`Connection request sent to ${name}!`)
  }

  const categories = useMemo(() => {
    const set = new Set<string>()
    SAMPLE_PROFILES.forEach((p) => p.category && set.add(p.category))
    return Array.from(set)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SAMPLE_PROFILES.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.designation ?? ""} ${p.company ?? ""} ${p.category ?? ""} ${p.city}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (category && p.category !== category) return false
      if (onlyVerified && !p.verified) return false
      if (minReviews !== "" && p.reviews !== undefined && p.reviews < Number(minReviews)) return false
      return true
    })
  }, [query, category, onlyVerified, minReviews])

  return (
    <div className="flex bg-gray-50 min-h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto transition-all duration-300">
        <div className="min-h-screen px-4 sm:px-8 py-10 bg-gray-50 flex justify-center">
          <div className="w-full max-w-5xl">
            
            {/* Header */}
            <header className="mb-12 bg-white rounded-2xl shadow-md p-8 border border-gray-100 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Search <span className="text-blue-600">Professionals</span>
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Find professionals, services, and verified profiles
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLayout("list")}
                    className={`p-2.5 rounded-lg transition-all ${
                      layout === "list"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setLayout("grid")}
                    className={`p-2.5 rounded-lg transition-all ${
                      layout === "grid"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Search + Filters */}
              <div className="mt-8 flex flex-col lg:flex-row justify-center items-center gap-4 w-full">
                <div className="flex items-center gap-3 w-full max-w-2xl bg-white border border-gray-200 rounded-full shadow-sm px-5 py-3 focus-within:ring-2 focus-within:ring-blue-500 hover:shadow-md transition-all">
                  <Search className="text-gray-400 w-5 h-5" />
                  <input
                    placeholder="Search by name, skills, company, category, or location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border-none focus:outline-none text-base bg-transparent text-gray-800 placeholder-gray-400"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className={`p-3 rounded-full border transition-all shadow-sm ${
                      filtersOpen
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Filter className="w-5 h-5" />
                  </button>

                  {/* Filters Dropdown */}
                  {filtersOpen && (
                    <div className="absolute right-0 top-14 z-20 bg-white border border-gray-200 rounded-xl shadow-xl p-5 w-72">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-base font-semibold text-gray-800">Filters</p>
                        <button onClick={() => setFiltersOpen(false)} className="text-gray-400 hover:text-gray-600">
                          ✕
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">All categories</option>
                            {categories.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={onlyVerified}
                            onChange={(e) => setOnlyVerified(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Verified only</span>
                        </label>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Min reviews</label>
                          <input
                            type="number"
                            min={0}
                            placeholder="e.g. 5"
                            value={minReviews === "" ? "" : String(minReviews)}
                            onChange={(e) => setMinReviews(e.target.value === "" ? "" : Number(e.target.value))}
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <button
                        className="mt-4 w-full text-sm text-blue-700 font-medium hover:text-blue-600 transition-colors"
                        onClick={() => {
                          setCategory("")
                          setOnlyVerified(false)
                          setMinReviews("")
                        }}
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Results Section */}
            <section className="mt-6">
              <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">{filtered.length}</span> results found
                </p>
                <div className="text-sm text-gray-500">
                  Sort by: <span className="font-medium text-gray-700">Relevance</span>
                </div>
              </div>

              {/* Enhanced 2-column grid with proper spacing */}
              {layout === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
                  {filtered.map((p) => (
                    <article
                      key={p.id}
                      className="flex flex-col justify-between border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden ml-4 mb-6"
                    >
                      {/* Card Header */}
                      <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 leading-tight pr-3">
                            <Link href={`/profile/${p.username}`} className="hover:text-blue-600 transition-colors">
                              {p.name}
                            </Link>
                          </h3>
                          {p.verified && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        
                        {/* Professional Info */}
                        <div className="space-y-2">
                          <p className="text-base font-semibold text-gray-700">
                            {p.designation}
                          </p>
                          <p className="text-sm text-gray-600">
                            {p.company}
                          </p>
                          <p className="text-sm text-blue-600 font-medium">
                            {p.category} • {p.city}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="border-t border-gray-100 bg-gray-50 p-6">
                        {/* Stats */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <span className="text-blue-500">👁</span>
                              {p.views ?? 0} views
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="text-yellow-500">⭐</span>
                              {p.reviews ?? 0} reviews
                            </span>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Link 
                            href={`/profile/${p.username}`} 
                            className="flex-1 text-center py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 hover:border-blue-700 transition-all duration-200"
                          >
                            View Profile
                          </Link>
                          <button
                            onClick={() => handleConnect(p.name)}
                            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 hover:shadow-md transition-all duration-200"
                          >
                            Connect
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="space-y-6 px-4">
                  {filtered.map((p) => (
                    <article
                      key={p.id}
                      className="flex items-center gap-6 border border-gray-200 rounded-xl p-6 m-2 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                    >
                      <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-lg">
                        {p.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          <Link href={`/profile/${p.username}`} className="hover:text-blue-700 transition-colors">
                            {p.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {p.designation} at {p.company} • {p.city}
                        </p>
                      </div>
                      <button
                        onClick={() => handleConnect(p.name)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                      >
                        Connect
                      </button>
                    </article>
                  ))}
                </div>
              )}

              {filtered.length === 0 && (
                <div className="mt-10 text-center text-gray-500">
                  <p>No results found. Try adjusting your search criteria.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
