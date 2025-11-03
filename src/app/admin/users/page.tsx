"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Shield, Mail, Trash2, MoreHorizontal } from "lucide-react";
import styles from "./users.module.css";

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "all", // all, active, inactive
    verified: "all", // all, verified, unverified
    dateRange: "all", // all, today, week, month
    role: "all" // all, designer, developer, etc.
  });

  const [mobileActionId, setMobileActionId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(`.${styles.actionsContainer}`)) {
        setMobileActionId(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");
      const data = await response.json();
      if (data.users) setUsers(data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      if (response.ok) {
        setUsers(users.filter((u) => u.id !== userId));
        alert("User deleted successfully");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter((user) => {
    const match =
      user.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());
    return match;
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.headerCard}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>User Management</h1>
              <p className={styles.subtitle}>
                Manage all registered users on the platform
              </p>
              <div className={styles.statsRow}>
                <span className={styles.statBadge}>
                  <span className={styles.dotBlue}></span>
                  {users.length} Total Users
                </span>
                <span className={styles.statBadge}>
                  <span className={styles.dotGreen}></span>
                  {filteredUsers.length} Filtered
                </span>
              </div>
            </div>
            <button className={styles.exportBtn}>
              <Shield className={styles.icon} /> Export Users
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filterCard}>
          <div className={styles.filterRow}>
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search users..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filterActions}>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className={styles.filterSelect}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={filters.verified}
                onChange={(e) => setFilters({ ...filters, verified: e.target.value })}
                className={styles.filterSelect}
              >
                <option value="all">All Verification</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                className={styles.filterSelect}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <button className={styles.filterBtn}>
                <Filter className={styles.filterIcon} />
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Mobile List (visible on mobile only) */}
        <div className={styles.mobileList}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.loader}></div>
              <p>Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className={styles.noResults}>
              <Search className={styles.noIcon} />
              <p>No users found</p>
              <small>Try adjusting your search or filters</small>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className={styles.userCard}>
                <div className={styles.userCardLeft}>
                  <div className={styles.avatarSm}>
                    {user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className={styles.userMeta}>
                    <div className={styles.userName}>{user.fullName}</div>
                    <div className={styles.userEmail}>{user.email}</div>
                    {user.phone && <div className={styles.userPhone}>{user.phone}</div>}
                    <div className={styles.userJoined}>
                      Joined: {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.actionsContainer}>
                  <button 
                    className={styles.moreBtn} 
                    onClick={() => setMobileActionId(mobileActionId === user.id ? null : user.id)}
                  >
                    <MoreHorizontal />
                  </button>
                  
                  {mobileActionId === user.id && (
                    <div className={styles.actionMenu}>
                      <button 
                        className={styles.mobileActionBtn}
                        onClick={() => {/* mail handler */}}
                      >
                        <Mail size={16} /> Email
                      </button>
                      <button 
                        className={`${styles.mobileActionBtn} ${styles.deleteActionBtn}`}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Table */}
        <div className={styles.tableCard}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.loader}></div>
              <p>Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className={styles.noResults}>
              <Search className={styles.noIcon} />
              <p>No users found</p>
              <small>Try adjusting your search or filters</small>
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Joined</th>
                    <th>Last Updated</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className={styles.userCell}>
                          <div className={styles.avatar}>
                            {user.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div>
                            <div className={styles.name}>{user.fullName}</div>
                            <div className={styles.id}>
                              ID: {user.id.substring(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone || "N/A"}</td>
                      <td>
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        {new Date(user.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className={styles.actionsCell}>
                        <button className={styles.mailBtn} title="Send Email">
                          <Mail />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className={styles.deleteBtn}
                          title="Delete User"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
