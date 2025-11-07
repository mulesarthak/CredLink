"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { toast } from "react-hot-toast";
import styles from "./search.module.css";
import { Modal } from "@/components/ui/modal";
import DigitalCardPreview from "@/components/cards/DigitalCardPreview";

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
  { id: "1", username: "john", name: "John Doe", city: "New York", company: "Tech Corp", designation: "Full Stack Developer", category: "Technology", reviews: 18, views: 1250 },
  { id: "2", username: "jane", name: "Jane Smith", city: "Los Angeles", company: "Marketing Pro", designation: "Digital Marketing Expert", category: "Marketing", reviews: 4, views: 890 },
  { id: "3", username: "alex", name: "Alex Kumar", city: "Mumbai", company: "Design Studio", designation: "UI/UX Designer", category: "Design", reviews: 32, views: 2100 },
  { id: "4", username: "maria", name: "Maria Garcia", city: "Madrid", company: "ConsultCo", designation: "Business Consultant", category: "Consulting", reviews: 0, views: 120 },
  { id: "5", username: "li", name: "Li Wei", city: "Beijing", company: "NextGen AI", designation: "Machine Learning Engineer", category: "AI", reviews: 45, views: 3300 },
  { id: "6", username: "emma", name: "Emma Brown", city: "London", company: "HealthFirst", designation: "Healthcare Analyst", category: "Healthcare", reviews: 11, views: 870 },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [connectionName, setConnectionName] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleConnect = (name: string) => {
    setConnectionName(name);
    setShowModal(true);
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    SAMPLE_PROFILES.forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_PROFILES.filter((p) => {
      const hay = `${p.name} ${p.designation ?? ""} ${p.company ?? ""} ${p.category ?? ""} ${p.city}`.toLowerCase();

      if (q && !hay.includes(q)) return false;
      if (category && p.category !== category) return false;

      return true;
    }).slice(0, 6);
  }, [query, category]);

  return (
    <div className={styles.container}>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Connection Request Sent"
        message={
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.5 }}>
            Your connection request has been sent to <span style={{ fontWeight: 600, color: "#111827" }}>{connectionName}</span>. They'll be notified and can accept your request.
          </p>
        }
        primaryText="Close"
      />

      {selectedProfile && (
        <Modal 
          isOpen={!!selectedProfile}
          onClose={() => setSelectedProfile(null)}
          title=""
          message={null}
          showActions={false}
        >
          <div style={{ padding: 20 }}>
            <DigitalCardPreview
              name={selectedProfile.name}
              title={selectedProfile.designation || ''}
              company={selectedProfile.company}
              location={selectedProfile.city}
              about={`${selectedProfile.designation} at ${selectedProfile.company}`}
              skills=""
              portfolio=""
              experience=""
            />
          </div>
        </Modal>
      )}

      {/* HEADER */}
      <div className="mb-8">
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>Search Professionals</h1>
        <p style={{ fontSize: 16, color: "#4B5563", marginTop: 8 }}>Find and connect with experts across industries</p>
        
        {/* SEARCH BAR WITH INLINE FILTERS */}
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06)",
              padding: 16,
              marginBottom: 16,
              border: "1px solid #E5E7EB",
            }}
          >
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#94A3B8" }} />
                <input
                  type="text"
                  placeholder="Search by name, skills, company, or city..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full"
                  style={{
                    padding: "10px 14px 10px 40px",
                    fontSize: 14,
                    border: "1px solid #CBD5E1",
                    borderRadius: 8,
                    outline: "none",
                  }}
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  padding: "10px 16px",
                  fontSize: 14,
                  border: "1px solid #CBD5E1",
                  borderRadius: 8,
                  outline: "none",
                  backgroundColor: "#FFFFFF",
                  color: "#0F172A",
                }}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className={styles.resultsContainer}>
          <p className={styles.resultsCount}>
            Showing <span>{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
          </p>

          <div className={styles.cardGrid}>
            {filtered.map((p) => (
              <article 
                key={p.id} 
                className={styles.profileCard}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => setSelectedProfile(p)}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardHeader}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>{p.name.charAt(0)}</div>
                      <div>
                        <h3 className={styles.userName}>
                          {p.name}
                        </h3>
                        <p className={styles.userDesignation}>{p.designation}</p>
                      </div>
                    </div>

                    <button onClick={() => handleConnect(p.name)} className={styles.connectBtn}>
                      Connect
                    </button>
                  </div>

                  <div className={styles.companyCity}>
                    <p className={styles.company}>{p.company}</p>
                    <p className={styles.city}>📍 {p.city}</p>
                  </div>

                  <div className={styles.stats}>
                    <span>👁 {p.views ?? 0} views</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-500">No results found. Try changing filters.</div>
        )}
      </div>
    </div>
  );
}
