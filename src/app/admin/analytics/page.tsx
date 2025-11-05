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
  // Mock Data
  const trafficData = [
    { name: "Mon", visits: 120 },
    { name: "Tue", visits: 180 },
    { name: "Wed", visits: 160 },
    { name: "Thu", visits: 240 },
    { name: "Fri", visits: 300 },
    { name: "Sat", visits: 260 },
    { name: "Sun", visits: 200 },
  ];

  const engagementData = [
    { name: "Designers", value: 400 },
    { name: "Developers", value: 350 },
    { name: "Consultants", value: 300 },
    { name: "Photographers", value: 250 },
  ];

  const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#facc15"];

  const [filters, setFilters] = useState({
    category: "All",
    location: "All",
    dateRange: "Last 7 Days",
    sortBy: "Views",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
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
        {[
          { title: "Total Visits", value: "12,540", trend: "+12.4%" },
          { title: "Profile Views", value: "8,340", trend: "+8.7%" },
          { title: "Total Searches", value: "4,950", trend: "-3.1%" },
          { title: "New Users", value: "1,230", trend: "+5.2%" },
          { title: "Active Users", value: "830", trend: "+4.8%" },
          { title: "Boosted Profiles", value: "120", trend: "+2.3%" },
          { title: "Messages Sent", value: "740", trend: "+6.1%" },
          { title: "Verified Profiles", value: "310", trend: "+9.4%" },
        ].map((card, i) => (
          <div key={i} className={styles.card}>
            <h3>{card.title}</h3>
            <p className={styles.metric}>{card.value}</p>
            <span
              className={
                card.trend.includes("-")
                  ? styles.trendDown
                  : styles.trendUp
              }
            >
              {card.trend}
            </span>
          </div>
        ))}
      </section>

      {/* CHARTS */}
      <section className={styles.chartsContainer}>
        <div className={styles.chartBox}>
          <h2>Traffic Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
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
        </div>

        <div className={styles.chartBox}>
          <h2>Category Engagement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={engagementData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {engagementData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
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
