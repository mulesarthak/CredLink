
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
  const { isAuthenticated, checkAuth, isLoading } = useAuth();
  const [isLgUp, setIsLgUp] = useState(false);

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
      <Sidebar />

      {/* Main Content */}
      <div
        className="h-full flex flex-col"
        style={{ 
          marginLeft: isLgUp ? '18rem' : '0', // 18rem = 288px matches sidebar width
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          transition: 'margin-left 0.3s ease-in-out'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          {/* Removed duplicate mobile hamburger - using Sidebar's blue hamburger instead */}
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
      </div>
    </div>
  );
}