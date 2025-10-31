"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/header";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { checkAuth, isLoading } = useAuth();
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    // Check auth when dashboard loads
    let mounted = true;
    if (mounted) {
      checkAuth();
    }
    return () => {
      mounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {/* Main Content */}
      <motion.div
        animate={{ marginLeft: expanded ? 270 : 90 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <Header />
        </div>

        {/* Main Page Area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </motion.div>
    </div>
  );
}
