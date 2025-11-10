"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  Key,
  User,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  Users as UsersIcon,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface AdminData {
  id: string;
  email: string;
  fullName: string;
  role: "Super Admin" | "Admin" | "Sub Admin";
  lastLogin?: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Sub Admin";
  status: "active" | "suspended";
  lastLogin?: string;
  createdAt: string;
}

// Role → Page Access
const ROLE_PERMISSIONS = {
  "Super Admin": ["Dashboard", "User Management", "Settings", "Reports", "Billing"],
  Admin: ["Dashboard", "User Management", "Reports"],
  "Sub Admin": ["Dashboard"],
} as const;

export default function AdminSettingsPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState({ current: false, new: false, confirm: false });

  const [users, setUsers] = useState<AppUser[]>([
    {
      id: "1",
      name: "Aarav Mehta",
      email: "aarav@example.com",
      role: "Admin",
      status: "active",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Isha Kapoor",
      email: "isha@example.com",
      role: "Sub Admin",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [query, setQuery] = useState("");
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Admin" as AppUser["role"],
    status: "active" as AppUser["status"],
  });

  useEffect(() => {
    // Mock current admin
    const mock: AdminData = {
      id: "1",
      email: "admin@credlink.com",
      fullName: "Admin User",
      role: "Admin", // change to test: "Super Admin" | "Admin" | "Sub Admin"
    };
    setAdmin(mock);
    setLoading(false);
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      return toast.error("All fields required");
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setSaving(true);
    await new Promise((res) => setTimeout(res, 900));
    toast.success("Password updated successfully");
    setSaving(false);
  };

  const openModal = (user?: AppUser) => {
    if (user) {
      setEditingUser(user);
      setForm(user);
    } else {
      setEditingUser(null);
      setForm({ name: "", email: "", role: "Admin", status: "active" });
    }
    setIsModalOpen(true);
  };

  const saveUser = () => {
    if (!form.name.trim() || !form.email.trim())
      return toast.error("Name & Email required");
    if (editingUser) {
      setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? { ...u, ...form } : u)));
      toast.success("User updated");
    } else {
      setUsers((prev) => [{ id: Math.random().toString(), createdAt: new Date().toISOString(), ...form }, ...prev]);
      toast.success("User added");
    }
    setIsModalOpen(false);
  };

  // Navigation functions
  const goBackToDashboard = () => {
    router.push("/admin/dashboard");
  };

  const navigateToUsers = () => {
    router.push("/admin/users");
  };

  const navigateToManageAdmins = () => {
    router.push("/admin/manage-admins");
  };

  const navigateToSupport = () => {
    router.push("/admin/support");
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-slate-600">
        Loading…
      </div>
    );

  // Reusable minimal classes
  const card =
    "rounded-xl border border-slate-200 bg-white shadow-sm";
  const sectionTitle =
    "text-sm font-medium text-slate-900";
  const label = "text-sm text-slate-700";
  const input =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-400";
  const iconBtn =
    "inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-sm transition hover:bg-slate-50";
  const badge =
    "px-2.5 py-1 rounded-full text-xs font-medium border";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar spacing */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600 text-white shadow-sm">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Admin Settings</h1>
              <p className="text-sm text-slate-500">Manage security and user access</p>
            </div>
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Profile */}
          <section className={`${card} p-5`}>
            <h2 className={sectionTitle}>Profile</h2>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800">
                <User className="h-4 w-4 text-slate-500" />
                {admin?.fullName}
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800">
                <Mail className="h-4 w-4 text-slate-500" />
                {admin?.email}
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800">
                <Shield className="h-4 w-4 text-slate-500" />
                {admin?.role}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Access Permissions
              </h3>
              <ul className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-700">
                {admin &&
                  ROLE_PERMISSIONS[admin.role].map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      {p}
                    </li>
                  ))}
              </ul>
            </div>
          </section>

          {/* Change Password */}
          <section className={`lg:col-span-2 ${card} p-5`}>
            <h2 className={sectionTitle + " flex items-center gap-2"}>
              <Key className="h-4 w-4 text-sky-600" />
              Change Password
            </h2>

            <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
              {(["currentPassword", "newPassword", "confirmPassword"] as const).map(
                (field, idx) => (
                  <div key={field} className="space-y-1.5">
                    <label className={label}>
                      {["Current Password", "New Password", "Confirm Password"][idx]}
                    </label>
                    <div className="relative">
                      <input
                        type={show[field] ? "text" : "password"}
                        value={passwordData[field]}
                        onChange={(e) =>
                          setPasswordData((s) => ({ ...s, [field]: e.target.value }))
                        }
                        className={`${input} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShow((s) => ({ ...s, [field]: !s[field] }))}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:bg-slate-100"
                      >
                        {show[field] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )
              )}

              {/* small, right-aligned primary button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* User Management (Super Admin & Admin) */}
        {(admin?.role === "Super Admin" || admin?.role === "Admin") && (
          <section className={`${card} mt-6 p-5`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-slate-500" />
                <h3 className="text-sm font-medium text-slate-900">User Management</h3>
              </div>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-black"
              >
                <Plus className="h-4 w-4" />
                Add User
              </button>
            </div>

            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users…"
                className={`${input} pl-9`}
              />
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/60 text-slate-600">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Name</th>
                    <th className="px-4 py-2.5 font-medium">Email</th>
                    <th className="px-4 py-2.5 font-medium">Role</th>
                    <th className="px-4 py-2.5 font-medium">Status</th>
                    <th className="px-4 py-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 text-slate-900">{u.name}</td>
                      <td className="px-4 py-2.5 text-slate-600">{u.email}</td>
                      <td className="px-4 py-2.5 text-slate-700">{u.role}</td>
                      <td className="px-4 py-2.5">
                        <button
                          onClick={() =>
                            setUsers((prev) =>
                              prev.map((x) =>
                                x.id === u.id
                                  ? {
                                      ...x,
                                      status: x.status === "active" ? "suspended" : "active",
                                    }
                                  : x
                              )
                            )
                          }
                          className={`${badge} ${
                            u.status === "active"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-rose-200 bg-rose-50 text-rose-700"
                          }`}
                        >
                          {u.status}
                        </button>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openModal(u)}
                            className={iconBtn}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              setUsers((prev) => prev.filter((x) => x.id !== u.id))
                            }
                            className="inline-flex items-center gap-1 rounded-md border border-rose-300 px-2.5 py-1.5 text-sm text-rose-600 transition hover:bg-rose-50"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4 py-6">
          <div className={`${card} w-full max-w-lg p-5`}>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-base font-semibold text-slate-900">
                {editingUser ? "Edit User" : "Add User"}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={label}>Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={input}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className={label}>Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={input}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className={label}>Role</label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value as AppUser["role"] })
                  }
                  className={input}
                >
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Sub Admin</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={saveUser}
                className="rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-black"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
