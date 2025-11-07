"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import styles from "./users.module.css";
import { he } from "zod/v4/locales";

interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
  });

  // ✅ Fetching data from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Filter logic
  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.fullName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email?.toLowerCase().includes(filters.search.toLowerCase());

    if (filters.status === "most-recent") {
      const userDate = new Date(user.createdAt);
      const recentThreshold = new Date();
      recentThreshold.setDate(recentThreshold.getDate() - 7);
      return userDate >= recentThreshold && searchMatch;
    }

    if (filters.status === "active")
      return user.status === "active" && searchMatch;
    if (filters.status === "inactive")
      return user.status === "inactive" && searchMatch;
    if (filters.status === "suspended")
      return user.status === "blocked" && searchMatch;

    return searchMatch;
  });

  return (
    <div className={styles.container}>
      {/* ===== Header ===== */}
      <div className={styles.header}>
        <h1>User Management</h1>
      </div>

      {/* ===== Filters ===== */}
      <div className={styles.filterCard}>
        <div className={styles.filterSearch}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />
        </div>

        <div className={styles.filterActions}>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
            className={styles.filterSelect}
          >
            <option value="all">All Users</option>
            <option value="most-recent">Most Recent</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          <button className={styles.filterBtn}>
            <Filter className={styles.filterIcon} />
            Apply
          </button>
        </div>
      </div>

      {/* ===== Loading State ===== */}
      {loading ? (
        <p className={styles.loadingText}>Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className={styles.loadingText}>No users found.</p>
      ) : (
        <>
          {/* ===== Desktop Table ===== */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "N/A"}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          user.status === "active"
                            ? styles.active
                            : user.status === "inactive"
                            ? styles.inactive
                            : styles.blocked
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.actionBtns}>
                        <Edit className={styles.editIcon} />
                        <Trash2 className={styles.deleteIcon} />
                        <MoreHorizontal className={styles.moreIcon} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Mobile View ===== */}
          <div className={styles.mobileList}>
            {filteredUsers.map((user) => (
              <div key={user.id} className={styles.userCard}>
                <div className={styles.userCardTop}>
                  <div>
                    <h3>{user.fullName}</h3>
                    <p>{user.email}</p>
                    <p>{user.phone || "N/A"}</p>
                  </div>
                  <span
                    className={`${styles.statusBadge} ${
                      user.status === "active"
                        ? styles.active
                        : user.status === "inactive"
                        ? styles.inactive
                        : styles.blocked
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
                <div className={styles.userCardBottom}>
                  <p className={styles.createdDate}>
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <div className={styles.mobileActions}>
                    <Edit className={styles.editIcon} />
                    <Trash2 className={styles.deleteIcon} />
                    <MoreHorizontal className={styles.moreIcon} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
