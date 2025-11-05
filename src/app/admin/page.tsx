"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import styles from "./admin.module.css";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/auth/me");
        if (response.ok) {
          router.push("/admin/dashboard");
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.loaderWrapper}>
        <Loader2 className={styles.spinner} />
        <p className={styles.message}>Verifying admin access...</p>
      </div>
    </div>
  );
}
