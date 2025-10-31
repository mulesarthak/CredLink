"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiEdit, FiBarChart2, FiZap, FiUser, FiPlus, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/lib/hooks/use-auth";
import { toast } from "react-hot-toast";

// ----------------- Card Type Definition -----------------
interface Card {
  id: number;
  title: string;
  views: string;
  boost: "Active" | "Inactive";
  color: string;
  geometry: "wave" | "slope" | "swoosh";
}

// ----------------- Geometric Separator -----------------
const GeometricSeparator: React.FC<{ shape: "wave" | "slope" | "swoosh" }> = ({ shape }) => {
  switch (shape) {
    case "slope":
      return (
        <svg
          className="absolute bottom-0 left-0 w-full h-12 text-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ transform: "translateY(1px)" }}
        >
          <path d="M0,100 L50,60 L100,100 L100,100 Z" fill="var(--background-white)" />
        </svg>
      );
    case "swoosh":
      return (
        <svg
          className="absolute bottom-0 left-0 w-full h-12 text-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ transform: "translateY(1px)" }}
        >
          <path d="M0,80 Q50,0 100,80 L100,100 L0,100 Z" fill="var(--background-white)" />
        </svg>
      );
    case "wave":
    default:
      return (
        <svg
          className="absolute bottom-0 left-0 w-full h-12 text-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ transform: "translateY(1px)" }}
        >
          <path d="M0,100 C25,50 75,50 100,100 L100,100 L0,100 Z" fill="var(--background-white)" />
        </svg>
      );
  }
};

// ----------------- Card Component -----------------
const CardItem: React.FC<{ card: Card }> = ({ card }) => {
  const router = useRouter();

  const headerStyle: React.CSSProperties = {
  background: card.color,
  position: "relative",
  overflow: "hidden",
};

  const contentStyle = {
    background: "var(--background-white)",
    paddingTop: "3rem",
    marginTop: "-3rem",
    minHeight: "280px",
  };

  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ scale: 1.05, y: -8, boxShadow: "var(--shadow-xl)" }}
      className="w-[340px] max-w-sm bg-white shadow-card rounded-xl overflow-hidden border border-background-light-green transition-all duration-300 relative"
    >
      {/* Header */}
      <div style={headerStyle} className="w-full h-40 flex items-center justify-center p-4 shine">
        <GeometricSeparator shape={card.geometry} />
        <div className="text-white text-xl font-bold tracking-tight z-10">
          {card.title.split("'")[0]}
        </div>
      </div>

      {/* Content */}
      <div style={contentStyle} className="p-5 flex flex-col justify-between">
        <div className="flex-grow">
          <h3 className="card-title text-center text-xl font-bold text-text-primary mb-1">
            {card.title}
          </h3>
          <p className="text-center text-sm description-small mb-6 text-text-secondary">
            Last Updated: 2 days ago
          </p>

          {/* Stats */}
          <div className="flex justify-around items-center text-sm text-text-secondary mb-8 pt-2 border-t border-background-light-green">
            <div className="flex flex-col items-center">
              <p className="font-extrabold text-2xl text-text-primary">{card.views}</p>
              <p className="text-xs">Views</p>
            </div>
            <div className="flex flex-col items-center">
              <p
                className={`font-bold text-lg ${
                  card.boost === "Active" ? "text-success-green" : "text-text-light"
                }`}
              >
                {card.boost}
              </p>
              <p className="text-xs">Boost Status</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 px-3 py-3 text-sm rounded-xl bg-background-light-green text-primary-green-dark font-medium hover:bg-[var(--primary-green-light)] transition-all"
            onClick={() => router.push(`/dashboard/edit/${card.id}`)}
            suppressHydrationWarning
          >
            <FiEdit size={16} /> Edit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 px-3 py-3 text-sm rounded-xl bg-[var(--primary-green-dark)] text-white font-medium hover:bg-[var(--primary-green)] transition-all"
            suppressHydrationWarning
          >
            <FiBarChart2 size={16} /> Analytics
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`flex items-center justify-center gap-2 px-3 py-3 text-sm rounded-xl font-medium transition-all ${
              card.boost === "Active"
                ? "bg-background-light-green text-primary-green-dark border border-primary-green-light hover:bg-background-mint"
                : "bg-background-mint text-primary-green-dark hover:bg-[var(--primary-green-light)]"
            }`}
            suppressHydrationWarning
          >
            <FiZap size={16} /> {card.boost === "Active" ? "Manage" : "Boost"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 px-3 py-3 text-sm rounded-xl bg-background-mint text-primary-green-dark font-medium hover:bg-[var(--primary-green-light)] transition-all"
            suppressHydrationWarning
          >
            <FiUser size={16} /> View Profile
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ----------------- Main Dashboard -----------------
const Dashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  // Auth is checked by the dashboard layout, no need to check here

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/auth/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const cards: Card[] = [
    {
      id: 1,
      title: "Arnav's Business Card",
      views: "234",
      boost: "Active",
      color: "var(--gradient-primary)",
      geometry: "wave",
    },
    {
      id: 2,
      title: "Portfolio Profile",
      views: "180",
      boost: "Inactive",
      color: "var(--gradient-secondary)",
      geometry: "slope",
    },
    {
      id: 3,
      title: "Networking Card",
      views: "302",
      boost: "Active",
      color: "var(--gradient-accent)",
      geometry: "swoosh",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] px-8 sm:px-14 py-14 lg:ml-64 transition-all duration-300">
      {/* Top Bar with User Info and Logout */}
      {isAuthenticated && user && (
        <div className="flex justify-between items-center mb-8 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-green to-primary-green-dark flex items-center justify-center text-white font-bold">
              {user.fullName?.charAt(0) || user.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-text-primary">{user.fullName || 'User'}</p>
              <p className="text-sm text-text-secondary">{user.email}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md"
          >
            <FiLogOut /> Logout
          </motion.button>
        </div>
      )}
      
      {/* Top Create Button with generous space */}
      <div className="flex justify-center my-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/dashboard/create")}
          className="relative flex items-center justify-center gap-3 btn btn-large btn-primary shadow-xl hover:shadow-colored transition-all text-xl font-bold px-14 py-6"
          suppressHydrationWarning
        >
          <FiPlus className="text-2xl" /> Create New Card
        </motion.button>
      </div>

      {/* Cards Grid with wide spacing and room from header/sidebar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 justify-items-center mt-12">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
