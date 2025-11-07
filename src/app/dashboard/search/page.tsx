"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { toast } from "react-hot-toast";

type Profile = {
  id: string;
  username: string;
  name: string;
  city: string;
  company?: string;
  designation?: string;
  category?: string;
  verified?: boolean;
  reviews?: number;
  views?: number;
};

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
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [minReviews, setMinReviews] = useState<number | "">("");

  const handleConnect = (name: string) => {
    toast.success(`Connection request sent to ${name}!`);
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    SAMPLE_PROFILES.forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_PROFILES.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.designation ?? ""} ${p.company ?? ""} ${p.category ?? ""} ${p.city}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (category && p.category !== category) return false;
      if (onlyVerified && !p.verified) return false;
      if (minReviews !== "" && p.reviews !== undefined && p.reviews < Number(minReviews)) return false;
      return true;
    });
  }, [query, category, onlyVerified, minReviews]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-6 shadow-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow">
              <Search className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Search Professionals</h1>
              <p className="text-gray-600 text-sm">Find talented professionals easily</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-3xl font-bold text-gray-900">{filtered.length}</p>
            <p className="text-gray-600 text-sm">Results Found</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
            <input
              type="text"
              placeholder="Search by name, skills, company, or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white border border-blue-200 text-gray-800 shadow-md focus:ring-4 focus:ring-blue-200 outline-none text-lg"
            />
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-6xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_22px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-1"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 text-white flex items-center justify-center text-xl font-semibold shadow-md">
                  {p.name.charAt(0)}
                </div>

                <div>
                  <Link href={`/profile/${p.username}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                    {p.name}
                  </Link>
                  <p className="text-sm text-gray-500">{p.designation}</p>
                </div>
              </div>

              {/* Company + City */}
              <div className="mt-4 space-y-1 text-sm">
                <p className="text-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> {p.company}
                </p>
                <p className="text-gray-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> {p.city}
                </p>
              </div>

              {/* Views + Verified */}
              <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" />
                    <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  </svg>
                  {p.views} views
                </span>

                {p.verified && <span className="text-blue-600 text-xs bg-blue-50 px-2 py-1 rounded-full">✓ Verified</span>}
              </div>

              {/* Button */}
              <button
                onClick={() => handleConnect(p.name)}
                className="mt-5 w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-95 transition"
              >
                Connect Now
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500">No results found. Try changing filters.</div>
        )}
      </div>
    </div>
  );
}
