"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/header";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/use-auth";
import { FiMenu, FiX } from "react-icons/fi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, checkAuth, isLoading } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLgUp, setIsLgUp] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };
    
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check auth when dashboard layout mounts
    checkAuth();
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsLgUp(mql.matches);
    onChange();
    // @ts-ignore
    (mql.addEventListener ? mql.addEventListener("change", onChange) : mql.addListener(onChange));
    return () => {
      // @ts-ignore
      (mql.removeEventListener ? mql.removeEventListener("change", onChange) : mql.removeListener(onChange));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      {(!isMobile || mobileOpen) && <Sidebar expanded={expanded} setExpanded={setExpanded} mobileOpen={mobileOpen} />}

      {/* Main Content */}
      <motion.div
        animate={{ marginLeft: isMobile ? 0 : (isLgUp ? (expanded ? 270 : 90) : 0) }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full flex flex-col"
        style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          {/* Mobile top bar with hamburger */}
          <div className="flex items-center gap-3 px-4 py-3 lg:hidden">
            <button
              aria-label="Open sidebar"
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <div className="flex-1" />
          </div>
          <Header />
        </div>

        {/* Main Page Area */}
        <main 
          className="flex-1 overflow-y-auto"
          style={{ 
            padding: '24px',
            background: 'transparent'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </motion.div>

      {/* Backdrop for mobile sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}
