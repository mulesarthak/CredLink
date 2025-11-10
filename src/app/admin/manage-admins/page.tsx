"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import styles from "./manage-admins.module.css";

interface Admin {
  id: string;
  email: string;
  fullName: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

interface CurrentAdmin {
  id: string;
  role: string;
  permissions: string[];
}

const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin", description: "Full system access" },
  { value: "ADMIN", label: "Admin", description: "Elevated privileges" },
  { value: "SUB_ADMIN", label: "Sub Admin", description: "Limited access" },
];

const PERMISSIONS = [
  { value: "MANAGE_USERS", label: "Manage Users" },
  { value: "MANAGE_ADMINS", label: "Manage Admins" },
  { value: "MANAGE_PROFILES", label: "Manage Profiles" },
  { value: "VIEW_ANALYTICS", label: "View Analytics" },
  { value: "MANAGE_SETTINGS", label: "Manage Settings" },
  { value: "MANAGE_CONTENT", label: "Manage Content" },
  { value: "VIEW_LOGS", label: "View Logs" },
  { value: "MANAGE_BILLING", label: "Manage Billing" },
];

export default function ManageAdminsPage() {
  const router = useRouter();
  const [currentAdmin, setCurrentAdmin] = useState<CurrentAdmin | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    role: "SUB_ADMIN",
    permissions: [] as string[],
    newPassword: "", // ✅ new field
  });

  useEffect(() => {
    checkAuth();
    fetchAdmins();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth/me");

      if (!response.ok) {
        router.push("/admin/login");
        return;
      }

      const data = await response.json();

      if (data.admin.role !== "SUPER_ADMIN" && !data.admin.permissions.includes("MANAGE_ADMINS")) {
        toast.error("You do not have permission to manage admins");
        router.push("/admin/dashboard");
        return;
      }

      setCurrentAdmin(data.admin);
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch("/api/admin/manage");
      if (response.ok) {
        const data = await response.json();
        setAdmins(data.admins);
      }
    } catch (error) {
      console.error("Fetch admins error:", error);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.fullName || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/admin/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to create admin");
        return;
      }

      toast.success("Admin created successfully!");
      setShowCreateModal(false);
      setFormData({ email: "", fullName: "", password: "", role: "SUB_ADMIN", permissions: [], newPassword: "" });
      fetchAdmins();
    } catch (error) {
      console.error("Create admin error:", error);
      toast.error("Failed to create admin");
    }
  };

  const handleUpdateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin) return;

    try {
      const response = await fetch(`/api/admin/manage/${selectedAdmin.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: formData.role,
          permissions: formData.permissions,
          isActive: selectedAdmin.isActive,
          ...(formData.newPassword ? { password: formData.newPassword } : {}), // ✅ only send if provided
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to update admin");
        return;
      }

      toast.success("Admin updated successfully!");
      setShowEditModal(false);
      setSelectedAdmin(null);
      fetchAdmins();
    } catch (error) {
      console.error("Update admin error:", error);
      toast.error("Failed to update admin");
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;

    try {
      const response = await fetch(`/api/admin/manage/${adminId}`, { method: "DELETE" });

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.error || "Failed to delete admin");
        return;
      }

      toast.success("Admin deleted successfully!");
      fetchAdmins();
    } catch (error) {
      console.error("Delete admin error:", error);
      toast.error("Failed to delete admin");
    }
  };

  const togglePermission = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const openEditModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setFormData({
      email: admin.email,
      fullName: admin.fullName,
      password: "",
      role: admin.role,
      permissions: admin.permissions,
      newPassword: "", // ✅ reset
    });
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.tableWrapper}>
          <div style={{ padding: 20, textAlign: "center" }}>
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Admin Management</h1>
          <p>Create and manage admin accounts with permissions</p>
        </div>
        <button
          className={styles.createBtn}
          onClick={() => {
            setFormData({ email: "", fullName: "", password: "", role: "SUB_ADMIN", permissions: [], newPassword: "" });
            setShowCreateModal(true);
          }}
        >
          <Plus size={18} /> Create Admin
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Admin</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Status</th>
              <th>Last Login</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: "linear-gradient(135deg, #1e3a8a, #2563eb, #1d4ed8)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      {admin.fullName.split(" ").map((n) => n[0]).join("").toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{admin.fullName}</div>
                      <div style={{ color: "#64748b", fontSize: 13 }}>{admin.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.roleBadge} ${
                      admin.role === "SUPER_ADMIN"
                        ? styles.roleSuper
                        : admin.role === "ADMIN"
                        ? styles.roleAdmin
                        : styles.roleSub
                    }`}
                  >
                    {admin.role.replace("_", " ")}
                  </span>
                </td>
                <td>{admin.permissions.length} permissions</td>
                <td>
                  <span className={admin.isActive ? styles.statusActive : styles.statusInactive}>
                    {admin.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  {admin.lastLogin
                    ? new Date(admin.lastLogin).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Never"}
                </td>
                <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <button className={styles.actionBtn} onClick={() => openEditModal(admin)}>
                    <Edit size={16} />
                  </button>
                  {admin.role !== "SUPER_ADMIN" && (
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDeleteAdmin(admin.id)}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Create Admin</h2>
            <form onSubmit={handleCreateAdmin}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="admin@credlink.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <label>Role</label>
              <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                {ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label} - {role.description}
                  </option>
                ))}
              </select>

              <label>Permissions</label>
              <div className={styles.permissionList}>
                {PERMISSIONS.map((perm) => (
                  <label key={perm.value} className={styles.permissionItem}>
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(perm.value)}
                      onChange={() => togglePermission(perm.value)}
                    />
                    {perm.label}
                  </label>
                ))}
              </div>

              <div className={styles.modalButtons}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedAdmin && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Admin</h2>
            <form onSubmit={handleUpdateAdmin}>
              <label>Email</label>
              <input type="email" value={formData.email} disabled />

              <label>Full Name</label>
              <input type="text" value={formData.fullName} disabled />

              <label>Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                disabled={selectedAdmin.role === "SUPER_ADMIN"}
              >
                {ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>

              {/* ✅ Change Password Field */}
              <label>Change Password (optional)</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                disabled={selectedAdmin.role === "SUPER_ADMIN"}
              />

              <label>Permissions</label>
              <div className={styles.permissionList}>
                {PERMISSIONS.map((perm) => (
                  <label key={perm.value} className={styles.permissionItem}>
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(perm.value)}
                      onChange={() => togglePermission(perm.value)}
                      disabled={selectedAdmin.role === "SUPER_ADMIN"}
                    />
                    {perm.label}
                  </label>
                ))}
              </div>

              <div className={styles.modalButtons}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={selectedAdmin.role === "SUPER_ADMIN"}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
