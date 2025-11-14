"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Shield, Users, Settings, LogOut, BarChart3, Tag } from "lucide-react"
import { toast } from "react-hot-toast"
import styles from "./dashboard.module.css";

interface AdminData {
  id: string;
  email: string;
  fullName: string;
  role: string;
  permissions: {
    users?: { read?: boolean; write?: boolean; delete?: boolean };
    analytics?: { read?: boolean };
    profiles?: { read?: boolean; write?: boolean; delete?: boolean };
    support?: { read?: boolean; write?: boolean };
  };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth/me");

      if (!response.ok) {
        router.push("/admin/login");
        return;
      }

      const data = await response.json();
      setAdmin(data.admin);
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <Loader2 className={styles.spinner} />
      </div>
    );
  }

  if (!admin) return null;

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return styles.roleSuper;
      case "ADMIN":
        return styles.roleAdmin;
      case "SUB_ADMIN":
        return styles.roleSub;
      default:
        return styles.roleDefault;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.headerCard}>
          <div className={styles.headerOverlay}></div>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <div className={styles.headerIcon}>
                <Shield />
              </div>
              <div>
                <h1 className={styles.title}>Welcome back, {admin.fullName.split(" ")[0]}!</h1>
                <p className={styles.subtitle}>
                  Here's what's happening with your admin panel today
                </p>
              </div>
            </div>
            {/* <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut />
              Logout
            </button> */}
          </div>
        </div>

        {/* Profile Card */}
        <div className={styles.infoGrid}>
          <div className={styles.profileCard}>
            <div className={styles.profileTop}>
              <div>
                <h2 className={styles.profileName}>{admin.fullName}</h2>
                <p className={styles.profileEmail}>
                  <span className={styles.activeDot}></span>
                  {admin.email}
                </p>
                <span className={`${styles.roleBadge} ${getRoleBadgeColor(admin.role)}`}>
                  {admin.role.replace("_", " ")}
                </span>
              </div>
              <div className={styles.avatar}>
                <Shield />
              </div>
            </div>
            <div className={styles.statsGrid}>
              <div>
                <p className={styles.statValue}>{Object.keys(admin.permissions).length}</p>
                <p className={styles.statLabel}>Permissions</p>
              </div>
              <div>
                <p className={styles.statValueGreen}>Active</p>
                <p className={styles.statLabel}>Status</p>
              </div>
              <div>
                <p className={styles.statValue}>Admin</p>
                <p className={styles.statLabel}>Access Level</p>
              </div>
            </div>
          </div>

          {/* Permissions Card */}
          <div className={styles.permCard}>
            <div className={styles.permHeader}>
              <div className={styles.permIcon}>
                <Settings />
              </div>
              <div>
                <h3 className={styles.permTitle}>Access Rights</h3>
                <p className={styles.permSubtitle}>Your permissions</p>
              </div>
            </div>
            <div className={styles.permList}>
              {Object.keys(admin.permissions).slice(0, 5).map((permKey) => (
                <div key={permKey} className={styles.permItem}>
                  <span className={styles.permDot}></span>
                  {permKey.replace(/_/g, " ")}
                </div>
              ))}
              {Object.keys(admin.permissions).length > 5 && (
                <p className={styles.morePerm}>
                  +{Object.keys(admin.permissions).length - 5} more permissions
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.actionsSection}>
          <h3 className={styles.actionsTitle}>Quick Actions</h3>
          <p className={styles.actionsSubtitle}>
            Manage your admin panel efficiently
          </p>
          <div className={styles.actionsGrid}>
            {(admin.role === "SUPER_ADMIN") && (
              <div
                onClick={() => router.push("/admin/manage-admins")}
                className={styles.actionCard}
              >
                <div className={`${styles.actionIcon} ${styles.purple}`}>
                  <Shield />
                </div>
                <h4 className={styles.actionName}>Manage Admins</h4>
                <p className={styles.actionDesc}>
                  Create and manage admin accounts
                </p>
              </div>
            )}

            <div
              onClick={() => router.push("/admin/users")}
              className={styles.actionCard}
            >
              <div className={`${styles.actionIcon} ${styles.blue}`}>
                <Users />
              </div>
              <h4 className={styles.actionName}>Manage Users</h4>
              <p className={styles.actionDesc}>View and manage user accounts</p>
            </div>

            <div
              onClick={() => router.push("/admin/profiles")}
              className={styles.actionCard}
            >
              <div className={`${styles.actionIcon} ${styles.orange}`}>
                <Users />
              </div>
              <h4 className={styles.actionName}>Profiles</h4>
              <p className={styles.actionDesc}>Review and approve profiles</p>
            </div>

            <div
              onClick={() => router.push("/admin/categories")}
              className={styles.actionCard}
            >
              <div className={`${styles.actionIcon} ${styles.purple}`}>
                <Tag />
              </div>
              <h4 className={styles.actionName}>Categories</h4>
              <p className={styles.actionDesc}>Manage professional categories</p>
            </div>

            <div
              onClick={() => router.push("/admin/analytics")}
              className={styles.actionCard}
            >
              <div className={`${styles.actionIcon} ${styles.green}`}>
                <BarChart3 />
              </div>
              <h4 className={styles.actionName}>Analytics</h4>
              <p className={styles.actionDesc}>View platform statistics</p>
            </div>

            {admin.role === "SUPER_ADMIN" && (
              <div
                onClick={() => router.push("/admin/dashboard/adminsetting")}
                className={styles.actionCard}
              >
                <div className={`${styles.actionIcon} ${styles.blue}`}>
                  <Settings />
                </div>
                <h4 className={styles.actionName}>Settings</h4>
                <p className={styles.actionDesc}>Manage admin settings and security</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
