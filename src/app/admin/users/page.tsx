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
        const res = await fetch("/api/admin/users");
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

<<<<<<< HEAD
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
      const response = await fetch("/api/users", { method: "GET" });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Fetched users data:", data);
      
      if (!response.ok) {
        console.error("API Error:", data.error);
        alert(`Failed to fetch users: ${data.error || 'Unknown error'}`);
        return;
      }
      
      if (data.users) {
        console.log("Setting users:", data.users.length);
        setUsers(data.users);
      } else {
        console.warn("No users array in response");
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert(`Error fetching users: ${error}`);
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

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditFormData({
      fullName: user.fullName,
      phone: user.phone || "",
      password: "",
      confirmPassword: ""
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    if (editFormData.password && editFormData.password !== editFormData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setUpdating(true);
      const updateData: any = {
        fullName: editFormData.fullName,
        phone: editFormData.phone
      };
      
      if (editFormData.password.trim()) {
        updateData.password = editFormData.password;
      }

      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...data.user } : u));
        setShowEditModal(false);
        setSelectedUser(null);
        alert("User updated successfully");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update user");
      }
    } catch (error) {
      console.error("Update user error:", error);
      alert("Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  const handleBlockUnblockUser = async (userId: string, action: 'block' | 'unblock') => {
    const confirmMessage = action === 'block' ? 
      "Are you sure you want to block this user?" : 
      "Are you sure you want to unblock this user?";
    
    if (!confirm(confirmMessage)) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map(u => u.id === userId ? { ...u, ...data.user } : u));
        alert(`User ${action}ed successfully`);
      } else {
        const data = await response.json();
        alert(data.error || `Failed to ${action} user`);
      }
    } catch (error) {
      console.error(`${action} user error:`, error);
      alert(`Failed to ${action} user`);
    }
  };

  const getStatusBadge = (status: string | null) => {
    const statusValue = status || "active";
    const statusClass = statusValue === "blocked" ? styles.statusBlocked : styles.statusActive;
    return (
      <span className={`${styles.statusBadge} ${statusClass}`}>
        {statusValue === "blocked" ? "Blocked" : "Active"}
      </span>
    );
  };

=======
  // ✅ Filter logic
>>>>>>> a95feb4271afd8610c4f2f359315e10816d250d2
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
