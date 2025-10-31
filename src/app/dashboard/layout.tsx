"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/header"; // ensure Header is a named export
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);

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
