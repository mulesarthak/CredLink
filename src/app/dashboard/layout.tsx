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
  const [isMobile, setIsMobile] = useState(false);

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

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {/* Main Content */}
      <motion.div
        animate={{ 
          marginLeft: isMobile ? 0 : (expanded ? 280 : 80)
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex-1 flex flex-col min-w-0"
        style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-20">
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
    </div>
  );
}
