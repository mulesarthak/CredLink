"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { Search, List, Grid, Filter } from "lucide-react"
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
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden" style={{ padding: "40px 32px" }}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>

          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

          <div className="relative px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative group w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg border border-white/30 cursor-pointer transition-all duration-300 hover:scale-105">
                      <Search className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-gray-900 mb-1">Search Professionals</h1>
                      <p className="text-gray-600 text-lg">Find professionals, services, and profiles</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-gray-900">{filtered.length}</div>
                  <div className="text-gray-600 text-sm">Results Found</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex items-center bg-gradient-to-r from-slate-100 via-white to-slate-100 rounded-full p-2.5 shadow-lg border-2 border-slate-200/60 backdrop-blur-sm min-w-[200px]">
                    <div
                      className={`absolute top-0.5 bottom-0.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-xl transition-all duration-500 ease-out transform ${
                        layout === "grid" ? "left-2.5 right-1/2" : "left-1/2 right-2.5"
                      }`}
                      style={{
                        boxShadow:
                          "0 8px 25px -5px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.1)",
                      }}
                    />
                    <button
                      onClick={() => setLayout("grid")}
                      className={`relative z-10 px-12 py-7 text-lg font-bold transition-all duration-500 rounded-full transform min-w-[120px] ${
                        layout === "grid"
                          ? "text-white scale-105"
                          : "text-slate-600 hover:text-slate-800 hover:scale-102"
                      }`}
                    >
                      <Grid className="w-5 h-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => setLayout("list")}
                      className={`relative z-10 px-12 py-7 text-lg font-bold transition-all duration-500 rounded-full transform min-w-[120px] ${
                        layout === "list"
                          ? "text-white scale-105"
                          : "text-slate-600 hover:text-slate-800 hover:scale-102"
                      }`}
                    >
                      <List className="w-5 h-5 mx-auto" />
                    </button>
                  </div>

                  <button
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <Filter className="w-8 h-10" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-12 mb-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-5">
                      <Search className="h-6 w-6 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name, skills, company, category, or location..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="block w-full py-5 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 text-xl font-medium focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 pl-14 pr-20"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="absolute inset-y-0 right-0 flex items-center pr-6"
                      >
                        <span className="text-gray-400 hover:text-gray-600">✕</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group relative bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {p.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      <Link href={`/profile/${p.username}`}>{p.name}</Link>
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{p.designation}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 font-medium truncate">{p.company}</p>
                  <p className="text-xs text-gray-500 truncate">{p.city}</p>
                </div>

                <button
                  onClick={() => handleConnect(p.name)}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
                >
                  Connect Now
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
