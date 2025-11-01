"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { Search, List, Grid, Filter } from "lucide-react"
import Sidebar from "@/components/layout/Sidebar"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"

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

// Sample data
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
  const [expanded, setExpanded] = useState(true)

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
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {/* Main Content */}
      <motion.div
        animate={{ marginLeft: expanded ? 270 : 90 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-screen p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <header className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Search Professionals</h1>
                    <p className="text-sm text-gray-600 mt-1">Find professionals, services, and profiles</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      title="List view"
                      onClick={() => setLayout("list")}
                      className={`p-2.5 rounded-lg transition-all ${
                        layout === "list"
                          ? "bg-green-600 text-white shadow-sm"
                          : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                    <button
                      title="Grid view"
                      onClick={() => setLayout("grid")}
                      className={`p-2.5 rounded-lg transition-all ${
                        layout === "grid"
                          ? "bg-green-600 text-white shadow-sm"
                          : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Search bar + filters */}
                <div className="flex justify-center items-center gap-4">
                  <div className="flex items-center gap-3 w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3.5 focus-within:ring-2 focus-within:ring-green-500 transition-all hover:shadow-md">
                    <Search className="text-gray-500 w-5 h-5" />
                    <input
                      aria-label="Search"
                      placeholder="Search by name, skills, company, category, or location..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full border-none focus:outline-none text-base bg-transparent text-gray-800 placeholder-gray-400"
                    />
                  </div>

                  {/* Filter button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setFiltersOpen((v) => !v)}
                      className={`p-3 rounded-lg border transition-all shadow-sm ${
                        filtersOpen
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white border-gray-300 hover:bg-gray-50 text-gray-700"
                      }`}
                      aria-label="Open filters"
                      title="Filters"
                    >
                      <Filter className="w-5 h-5" />
                    </button>

                    {filtersOpen && (
                      <div className="absolute right-0 top-14 z-20 bg-white border border-gray-200 rounded-xl shadow-xl p-5 w-72">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-base font-semibold text-gray-800">Filters</p>
                          <button
                            type="button"
                            onClick={() => setFiltersOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
                            <select
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="">All categories</option>
                              {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={onlyVerified}
                                onChange={(e) => setOnlyVerified(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                              />
                              <span className="text-sm text-gray-700">Verified only</span>
                            </label>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Min reviews</label>
                            <input
                              type="number"
                              min={0}
                              placeholder="e.g. 5"
                              value={minReviews === "" ? "" : String(minReviews)}
                              onChange={(e) =>
                                setMinReviews(e.target.value === "" ? "" : Number(e.target.value))
                              }
                              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          className="mt-4 w-full text-sm text-green-700 font-medium hover:text-green-600 transition-colors"
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

              {/* Results */}
              <section>
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{filtered.length}</span>{" "}
                    result{filtered.length !== 1 ? "s" : ""} found
                  </p>
                  <div className="text-sm text-gray-500">
                    Sort by: <span className="font-medium text-gray-700">Relevance</span>
                  </div>
                </div>

                {layout === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {filtered.map((p) => (
                      <article
                        key={p.id}
                        className="flex flex-col justify-between h-full border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                <Link href={`/profile/${p.username}`} className="hover:text-green-700 transition-colors">
                                  {p.name}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-500 truncate">
                                {p.designation} • {p.company}
                              </p>
                            </div>
                            <div className="text-right ml-2 shrink-0">
                              <span
                                className={`block text-xs font-semibold px-2 py-0.5 rounded-full ${
                                  p.verified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {p.verified ? "Verified" : "Unverified"}
                              </span>
                              <p className="text-xs text-gray-400 mt-1">{p.reviews ?? 0} reviews</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 truncate">
                            {p.category} • {p.city}
                          </p>
                        </div>

                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 text-sm text-gray-500">
                          <span className="truncate">{p.views ?? 0} views</span>
                          <div className="flex gap-3 shrink-0">
                            <Link href={`/profile/${p.username}`} className="text-green-700 font-medium hover:underline">
                              View profile
                            </Link>
                            <button
                              onClick={() => handleConnect(p.name)}
                              className="px-3 py-1 bg-green-600 text-white rounded-md text-xs font-medium hover:bg-green-700 transition-colors"
                            >
                              Connect
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filtered.map((p) => (
                      <article
                        key={p.id}
                        className="flex items-center gap-4 border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold text-lg">
                          {p.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold truncate">
                            <Link href={`/profile/${p.username}`} className="hover:text-green-700 transition-colors">
                              {p.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {p.designation} at {p.company} • {p.city}
                          </p>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div className="text-right">
                            <span
                              className={`block text-xs font-semibold px-2 py-0.5 rounded-full ${
                                p.verified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {p.verified ? "Verified" : "Unverified"}
                            </span>
                            <p className="text-xs text-gray-400 mt-1">{p.reviews ?? 0} reviews</p>
                          </div>
                          <button
                            onClick={() => handleConnect(p.name)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
                          >
                            Connect
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {filtered.length === 0 && (
                  <div className="mt-8 text-center text-gray-500">
                    <p>No results found. Try adjusting your search criteria.</p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
