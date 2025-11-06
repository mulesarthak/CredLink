"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { Search, Filter } from "lucide-react"
import { toast } from "react-hot-toast"

type Profile = {
  id: string
  username: string
  name: string
  city: string
  company?: string
  designation?: string
  category?: string
  reviews?: number
  views?: number
}

const SAMPLE_PROFILES: Profile[] = [
  { id: "1", username: "john", name: "John Doe", city: "New York", company: "Tech Corp", designation: "Full Stack Developer", category: "Technology", reviews: 18, views: 1250 },
  { id: "2", username: "jane", name: "Jane Smith", city: "Los Angeles", company: "Marketing Pro", designation: "Digital Marketing Expert", category: "Marketing", reviews: 4, views: 890 },
  { id: "3", username: "alex", name: "Alex Kumar", city: "Mumbai", company: "Design Studio", designation: "UI/UX Designer", category: "Design", reviews: 32, views: 2100 },
  { id: "4", username: "maria", name: "Maria Garcia", city: "Madrid", company: "ConsultCo", designation: "Business Consultant", category: "Consulting", reviews: 0, views: 120 },
  { id: "5", username: "li", name: "Li Wei", city: "Beijing", company: "NextGen AI", designation: "Machine Learning Engineer", category: "AI", reviews: 45, views: 3300 },
  { id: "6", username: "emma", name: "Emma Brown", city: "London", company: "HealthFirst", designation: "Healthcare Analyst", category: "Healthcare", reviews: 11, views: 870 },
]

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [minReviews, setMinReviews] = useState<number | "">("")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handleConnect = (name: string) => {
    toast.success(`Connection request sent to ${name}!`)
  }

  const categories = useMemo(() => {
    const set = new Set<string>()
    SAMPLE_PROFILES.forEach((p) => p.category && set.add(p.category))
    return Array.from(set)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SAMPLE_PROFILES.filter((p) => {
      const hay = `${p.name} ${p.designation ?? ""} ${p.company ?? ""} ${p.category ?? ""} ${p.city}`.toLowerCase()

      if (q && !hay.includes(q)) return false
      if (category && p.category !== category) return false
      if (minReviews !== "" && p.reviews !== undefined && p.reviews < Number(minReviews)) return false

      return true
    }).slice(0, 6)
  }, [query, category, minReviews])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      
      {/* HEADER */}
      <div className="relative flex flex-col items-center justify-center py-12 px-6 text-center">

        {/* FIXED FILTER BUTTON (smaller + cleaner) */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="absolute right-10 top-8 flex items-center gap-2 px-4 py-1.5 bg-blue-600 w-20 h-5 text-white 
          text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Filter className="w-4 h-4" /> Filter
        </button>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-sky-400">
          Search Professionals
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Search, filter, and connect with experts across industries
        </p>

        {/* SEARCH BAR FIXED TEXT SIZE */}
        <div className="relative mt-10 w-full max-w-2xl px-4">
          <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-blue-100 focus-within:ring-4 focus-within:ring-blue-200 transition-all">
            
            <div className="pl-10 flex items-center">
              <Search className="text-blue-500 w-10 h-5" />
            </div>

            <input
              type="text"
              placeholder="  Search by name, skills, company, or city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-3 pl-3 pr-10 text-base rounded-2xl bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-5 text-blue-400 hover:text-blue-600 text-lg"
              >
                ✕
              </button>
            )}

          </div>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div className={`transition-all duration-500 transform ${filtersOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}>
        {filtersOpen && (
          <div className="mx-auto mt-4 max-w-4xl rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-blue-100 p-6 relative">

            {/* Close Button */}
            <button
              onClick={() => setFiltersOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
            >
              ✕
            </button>

            {/* Header */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Filters</h3>

            {/* Grid Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Min Reviews</label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  min={0}
                  value={minReviews === "" ? "" : String(minReviews)}
                  onChange={(e) => setMinReviews(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                />
              </div>

            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setCategory("")
                setMinReviews("")
              }}
              className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>

          </div>
        )}
      </div>

      {/* RESULTS GRID */}
      <div className="max-w-7xl mx-auto px-8 py-10">

        <p className="text-sm text-gray-600 mb-5">
          Showing <span className="font-semibold">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">

          {filtered.map((p) => (
            
            <article
              key={p.id}
              className="group relative rounded-3xl p-[1px] shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 bg-gradient-to-br from-blue-200 via-blue-300  to-blue-100"
            >
              <div className="relative bg-white/95 backdrop-blur-sm rounded-[calc(1.5rem-2px)] p-6 flex flex-col h-full border border-gray-200 shadow-sm overflow-hidden">

                {/* Header: Avatar + Name (left) and Connect Button (right) */}
                <div className="flex items-center justify-between mb-5 gap-3">
                  
                  {/* Left: Avatar + Name */}
                  <div className="flex items-center gap-4 min-w-0 flex-1 overflow-hidden">
                    
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-700 via-blue-500 to-sky-400 
                    rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md ring-4 
                    ring-blue-100 group-hover:ring-sky-300 transition flex-shrink-0">
                      {p.name.charAt(0)}
                    </div>

                    <div className="min-w-0 flex-1 overflow-hidden">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition truncate overflow-hidden">
                        <Link href={`/profile/${p.username}`} className="block truncate">{p.name}</Link>
                      </h3>
                      <p className="text-sm text-gray-500 truncate overflow-hidden">{p.designation}</p>
                    </div>
                    
                  </div>

                  {/* Right: Connect Button */}
                  <button
                    onClick={() => handleConnect(p.name)}
                    className="px-4 py-1.5 mr-2 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition w-20 h-5 whitespace-nowrap"
                  >
                    Connect
                  </button>
                  
                </div>

                {/* Company + City */}
                <div className="mb-4 space-y-1 overflow-hidden">
                  <p className="text-sm font-semibold text-gray-800 truncate overflow-hidden">{p.company}</p>
                  <p className="text-xs text-gray-500 truncate overflow-hidden">📍 {p.city}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center text-sm text-gray-500 border-t border-gray-100 pt-3 gap-27 px-1">
                  <span className=" overflow-hidden pl-1">👁 {p.views ?? 0} views</span>
                  <span className=" mr-5 pr-1 text-right">⭐ {p.reviews ?? 0} reviews</span>
                </div>

              </div>
            </article>

          ))}

        </div>
      </div>
    </div>
  )
}
