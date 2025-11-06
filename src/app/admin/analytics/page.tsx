"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, BarChart3, Users, Link2, MapPin, Clock } from "lucide-react";
import styles from "./analytics.module.css";

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<any>(null);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [engagementData, setEngagementData] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    city: "all",
    category: "all",
    fromDate: "",
    toDate: "",
  });
  const [loading, setLoading] = useState(true);

  // ===== Fetch Overview Metrics =====
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [overviewRes, catRes, engRes, actRes] = await Promise.all([
          fetch("/api/admin/analytics/overview"),
          fetch("/api/admin/analytics/category-distribution"),
          fetch(`/api/admin/analytics/engagement-trend?city=${filters.city}&category=${filters.category}`),
          fetch("/api/admin/analytics/activity-summary"),
        ]);

        const overviewJson = await overviewRes.json();
        const categoryJson = await catRes.json();
        const engagementJson = await engRes.json();
        const activityJson = await actRes.json();

        setOverview(overviewJson);
        setCategoryData(categoryJson);
        setEngagementData(engagementJson);
        setActivityData(activityJson);
      } catch (err) {
        console.error("Error loading analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [filters]);

  // ===== Export Handlers =====
  const exportCSV = () => {
    const csvContent = [
      ["Date", "New Users", "Connections", "Top City", "Top Category"],
      ...activityData.map((r) => [r.date, r.newUsers, r.connections, r.topCity, r.topCategory]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics_report.csv";
    a.click();
  };

  const exportPDF = () => window.print();

  const COLORS = ["#2563eb", "#3b82f6", "#93c5fd", "#1d4ed8", "#60a5fa"];

  if (loading) return <div className="flex justify-center items-center min-h-screen text-lg">Loading analytics...</div>;

  return (
    <div className={styles.analyticsContainer}>
      {/* ===== HEADER ===== */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Platform <span>Analytics</span>
          </h1>
          <p className={styles.subtitle}>
            Visualize user growth, connections, and engagement trends across categories and cities.
          </p>
        </div>
        <button className={styles.ctaButton} onClick={exportPDF}>
          <Download size={18} className="inline mr-2" /> Export as PDF
        </button>
      </div>

      {/* ===== FILTERS ===== */}
      <div className={styles.filtersSection}>
        <select value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })}>
          <option value="all">All Cities</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Pune">Pune</option>
          <option value="Delhi">Delhi</option>
        </select>

        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="all">All Categories</option>
          <option value="Doctor">Doctor</option>
          <option value="Designer">Designer</option>
          <option value="Developer">Developer</option>
          <option value="Artist">Artist</option>
        </select>

        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
        />
        <input
          type="date"
          value={filters.toDate}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
        />

        <button className={styles.ctaButton} onClick={exportCSV}>
          <Download size={18} className="inline mr-2" /> Export CSV
        </button>
      </div>

      {/* ===== METRIC CARDS ===== */}
      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <Users className="text-blue-600" size={28} />
          <h3>Total Users</h3>
          <p className={styles.metric}>{overview?.totalUsers || 0}</p>
        </div>

        <div className={styles.card}>
          <Link2 className="text-blue-600" size={28} />
          <h3>Total Connections</h3>
          <p className={styles.metric}>{overview?.totalConnections || 0}</p>
        </div>

        <div className={styles.card}>
          <MapPin className="text-blue-600" size={28} />
          <h3>Active Cities</h3>
          <p className={styles.metric}>{overview?.activeCities || 0}</p>
        </div>

        <div className={styles.card}>
          <Clock className="text-blue-600" size={28} />
          <h3>New Users (This Month)</h3>
          <p className={styles.metric}>{overview?.newUsersThisMonth || 0}</p>
        </div>
      </div>

      {/* ===== GRAPHS ===== */}
      <div className={styles.chartsContainer}>
        <div className={styles.chartBox}>
          <h2>Profile Distribution by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="count" nameKey="category" outerRadius={100} label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartBox}>
          <h2>Engagement Trend (Last 30 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#2563eb" name="Profile Views" />
              <Line type="monotone" dataKey="shares" stroke="#22c55e" name="Connections" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== ACTIVITY TABLE ===== */}
      <div className={styles.insightSection}>
        <h2>Activity Summary</h2>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2">Date</th>
              <th>New Users</th>
              <th>Connections</th>
              <th>Top City</th>
              <th>Top Category</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2">{row.date}</td>
                <td>{row.newUsers}</td>
                <td>{row.connections}</td>
                <td>{row.topCity}</td>
                <td>{row.topCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
