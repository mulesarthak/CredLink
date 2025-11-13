"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Key,
  User,
  Mail,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import styles from "./settings.module.css";

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

const ROLE_PERMISSIONS = {
  "Super Admin": ["Dashboard", "User Management", "Settings", "Reports", "Billing"],
  Admin: ["Dashboard", "User Management", "Reports"],
  "Sub Admin": ["Dashboard"],
} as const;

export default function AdminSettingsPage() {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const mock: AdminData = {
      id: "1",
      email: "admin@credlink.com",
      fullName: "Admin User",
      role: "Admin",
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
     try {
      const response = await fetch("/api/admin/profile/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to change password");
      }
      alert("Password changed successfully");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
      return;
    }

    setSaving(true);
    await new Promise((res) => setTimeout(res, 900));
    toast.success("Password updated successfully");
    setSaving(false);
  };

  if (loading) return <div className={styles.loading}>Loading…</div>;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerIcon}>
            <Shield size={20} />
          </div>
          <div>
            <h1 className={styles.title}>Admin Settings</h1>
            <p className={styles.subtitle}>Manage security and user access</p>
          </div>
        </header>

        <div className={styles.grid}>
          {/* Profile */}
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Profile</h2>
            <div className={styles.profileInfo}>
              <div className={styles.infoItem}>
                <User size={16} />
                {admin?.fullName}
              </div>
              <div className={styles.infoItem}>
                <Mail size={16} />
                {admin?.email}
              </div>
              <div className={styles.infoItem}>
                <Shield size={16} />
                {admin?.role}
              </div>
            </div>

            <div className={styles.permissions}>
              <h3>Access Permissions</h3>
              <ul>
                {admin &&
                  ROLE_PERMISSIONS[admin.role].map((p) => (
                    <li key={p}>
                      <span className={styles.dot}></span>
                      {p}
                    </li>
                  ))}
              </ul>
            </div>
          </section>

          {/* Change Password */}
          <section className={`${styles.card} ${styles.passwordCard}`}>
            <h2 className={styles.sectionTitle}>
              <Key size={16} /> Change Password
            </h2>

            <form onSubmit={handlePasswordChange} className={styles.form}>
              {(["currentPassword", "newPassword", "confirmPassword"] as const).map((field) => (
                <div key={field}>
                  <label className={styles.label}>
                    {field === "currentPassword" ? "Current Password" : 
                     field === "newPassword" ? "New Password" : "Confirm Password"}
                  </label>
                  <div className={styles.passwordField}>
                    <input
                      type={show[field] ? "text" : "password"}
                      value={passwordData[field]}
                      onChange={(e) => setPasswordData((s) => ({ ...s, [field]: e.target.value }))}
                      className={styles.input}
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => ({ ...s, [field]: !s[field] }))}
                      className={styles.eyeBtn}
                    >
                      {show[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              ))}
              <div className={styles.actions}>
                <button type="submit" disabled={saving} className={styles.primaryBtn}>
                  {saving && <Loader2 className={styles.loader} />}
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
