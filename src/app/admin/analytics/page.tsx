"use client";

import React, { useState, useEffect } from "react";
import styles from "./analytics.module.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from 'next/navigation';

export default function AdminAnalyticsPage() {
  // State for analytics data
  const [analyticsData, setAnalyticsData] = useState({
    trafficData: [],
    engagementData: [],
    stats: {
      totalVisits: 0,
      profileViews: 0,
      totalSearches: 0,
      newUsers: 0,
      totalUsers: 0,
      totalMessages: 0,
      newMessagesThisWeek: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#facc15"];

  const [filters, setFilters] = useState({
    category: "All",
    location: "All",
    dateRange: "Last 7 Days",
    sortBy: "Views",
  });

  const [isMobile, setIsMobile] = useState(false);

  // Fetch analytics data from API
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/analytics');
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      
      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Fetch analytics data on component mount
    fetchAnalyticsData();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleExport = async () => {
    try {
      const response = await fetch('/api/admin/analytics/export');
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analytics-export.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export analytics data');
    }
  };

  return (
    <div className={styles.analyticsContainer}>
      {/* HEADER */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Platform <span>Analytics Dashboard</span>
          </h1>
          <p className={styles.subtitle}>
            View traffic, profile engagement, and behavior trends across the
            platform.
          </p>
        </div>
        <button className={styles.ctaButton} onClick={handleExport}>Export Report</button>
      </header>

      {/* FILTERS */}
      <section className={styles.filtersSection}>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option>All Categories</option>
          <option>Developers</option>
          <option>Designers</option>
          <option>Consultants</option>
        </select>

        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option>All Locations</option>
          <option>Mumbai</option>
          <option>Pune</option>
          <option>Delhi</option>
        </select>

        <select
          value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option>Views</option>
          <option>Clicks</option>
          <option>Messages</option>
          <option>Conversions</option>
        </select>
      </section>

      {/* OVERVIEW CARDS */}
      <section className={styles.statsGrid}>
        {loading ? (
          <div className={styles.loadingMessage}>Loading analytics data...</div>
        ) : error ? (
          <div className={styles.errorMessage}>Error: {error}</div>
        ) : (
          [
            { title: "Total Visits", value: analyticsData.stats.totalVisits?.toLocaleString() || "0", key: "totalVisits" },
            { title: "Profile Views", value: analyticsData.stats.profileViews?.toLocaleString() || "0", key: "profileViews" },
            { title: "Total Users", value: analyticsData.stats.totalUsers?.toLocaleString() || "0", key: "totalUsers" },
            { title: "New Users (7d)", value: analyticsData.stats.newUsers?.toLocaleString() || "0", key: "newUsers" },
            { title: "Total Messages", value: analyticsData.stats.totalMessages?.toLocaleString() || "0", key: "totalMessages" },
            { title: "New Messages (7d)", value: analyticsData.stats.newMessagesThisWeek?.toLocaleString() || "0", key: "newMessagesThisWeek" },
            { title: "Total Searches", value: analyticsData.stats.totalSearches?.toLocaleString() || "0", key: "totalSearches" },
            { title: "Active Profiles", value: analyticsData.stats.totalUsers?.toLocaleString() || "0", key: "activeProfiles" },
          ].map((card, i) => (
            <div key={i} className={styles.card}>
              <h3>{card.title}</h3>
              <p className={styles.metric}>{card.value}</p>
            </div>
          ))
        )}
      </section>

      {/* CHARTS */}
      <section className={styles.chartsContainer}>
        <div className={styles.chartBox}>
          <h2>User Registrations (Last 7 Days)</h2>
          {loading ? (
            <div className={styles.loadingChart}>Loading chart data...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.trafficData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={styles.chartBox}>
          <h2>User Distribution</h2>
          {loading ? (
            <div className={styles.loadingChart}>Loading chart data...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.engagementData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  label
                >
                  {analyticsData.engagementData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* USER BEHAVIOR INSIGHTS */}
      <section className={styles.insightSection}>
        <h2>User Behavior Insights</h2>
        <ul>
          <li>
            <strong>Most Viewed Profiles:</strong> Top 10 profiles with the
            highest visibility.
          </li>
          <li>
            <strong>Most Searched Keywords:</strong> e.g. “Web Developer
            Mumbai”, “UI Designer Pune”.
          </li>
          <li>
            <strong>Most Engaged Categories:</strong> Developers, Designers, and
            Consultants.
          </li>
          <li>
            <strong>Conversion Funnel:</strong> Search → View Profile → Message
            Sent (38% conversion rate).
          </li>
        </ul>
      </section>
    </div>
  );
}
