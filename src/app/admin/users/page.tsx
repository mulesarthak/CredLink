"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Shield, Edit, Trash2, MoreHorizontal, X, Eye, EyeOff } from "lucide-react";
import styles from "./users.module.css";

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
    status: "all", // all, active, inactive
    verified: "all", // all, verified, unverified
    dateRange: "all", // all, today, week, month
    role: "all" // all, designer, developer, etc.
  });

  const [mobileActionId, setMobileActionId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [updating, setUpdating] = useState(false);

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
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button 
                        className={styles.mobileActionBtn}
                        onClick={() => handleBlockUnblockUser(user.id, user.status === "blocked" ? "unblock" : "block")}
                      >
                        <Shield size={16} /> {user.status === "blocked" ? "Unblock" : "Block"}
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
                    <th>Status</th>
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
                      <td>{getStatusBadge(user.status)}</td>
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
                        <button 
                          onClick={() => handleEditUser(user)}
                          className={styles.editBtn} 
                          title="Edit User"
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={() => handleBlockUnblockUser(user.id, user.status === "blocked" ? "unblock" : "block")}
                          className={user.status === "blocked" ? styles.unblockBtn : styles.blockBtn}
                          title={user.status === "blocked" ? "Unblock User" : "Block User"}
                        >
                          <Shield />
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

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>Edit User</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className={styles.closeBtn}
                >
                  <X />
                </button>
              </div>
              
              <div className={styles.modalBody}>
                <div className={styles.userInfo}>
                  <div className={styles.avatarLg}>
                    {selectedUser.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <h3>{selectedUser.fullName}</h3>
                    <p>{selectedUser.email}</p>
                    <p>Status: {getStatusBadge(selectedUser.status)}</p>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={editFormData.fullName}
                      onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>New Password (leave blank to keep current)</label>
                    <div className={styles.passwordInput}>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={editFormData.password}
                        onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                        className={styles.formInput}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.passwordToggle}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  {editFormData.password && (
                    <div className={styles.formGroup}>
                      <label>Confirm New Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={editFormData.confirmPassword}
                        onChange={(e) => setEditFormData({ ...editFormData, confirmPassword: e.target.value })}
                        className={styles.formInput}
                        placeholder="Confirm new password"
                      />
                    </div>
                  )}

                  <div className={styles.modalActions}>
                    <div className={styles.statusActions}>
                      <button
                        type="button"
                        onClick={() => handleBlockUnblockUser(selectedUser.id, selectedUser.status === "blocked" ? "unblock" : "block")}
                        className={selectedUser.status === "blocked" ? styles.unblockBtn : styles.blockBtn}
                      >
                        <Shield /> {selectedUser.status === "blocked" ? "Unblock User" : "Block User"}
                      </button>
                    </div>
                    
                    <div className={styles.formActions}>
                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className={styles.cancelBtn}
                        disabled={updating}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={styles.saveBtn}
                        disabled={updating}
                      >
                        {updating ? "Updating..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
