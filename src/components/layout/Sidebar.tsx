"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiMessageSquare,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, setExpanded }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Messages / Leads", path: "/dashboard/messages", icon: <FiMessageSquare /> },
    { name: "Connections", path: "/dashboard/connections", icon: <FiUsers /> },
  ];

  const bottomItems = [
    { name: "Settings", path: "/dashboard/settings", icon: <FiSettings /> },
    { name: "Support", path: "/dashboard/support", icon: <FiHelpCircle /> },
  ];

  return (
    <motion.div
      initial={{ width: expanded ? 270 : 90 }}
      animate={{ width: expanded ? 270 : 90 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen flex flex-col justify-between bg-gradient-to-b from-white via-gray-50 to-white border-r border-gray-200 shadow-xl z-40"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 50%, #ffffff 100%)'
      }}
    >
      {/* ---------- Top Section ---------- */}
      <div>
        {/* Logo / Title */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 bg-white">
          <AnimatePresence mode="wait">
            {expanded && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-green to-primary-green-dark rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <span className="font-extrabold text-2xl tracking-tight text-gray-800">
                  CredLink
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2.5 hover:bg-primary-green hover:text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <motion.div
              animate={{ rotate: expanded ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              className="text-xl"
            >
              {expanded ? <FiChevronLeft /> : <FiChevronRight />}
            </motion.div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex flex-col gap-2 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-primary-green to-primary-green-dark text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                  }`}
                >
                  <motion.div 
                    whileHover={{ rotate: 8 }} 
                    className={`text-2xl ${isActive ? 'text-white' : 'text-primary-green'}`}
                  >
                    {item.icon}
                  </motion.div>

                  <AnimatePresence>
                    {expanded && (
                      <motion.span
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-base font-semibold"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ---------- Bottom Section ---------- */}
      <div className="mb-8 px-4">
        {/* Divider */}
        <div className="border-t border-gray-200 mb-6"></div>

        <div className="flex flex-col gap-2">
          {bottomItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-primary-green to-primary-green-dark text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                  }`}
                >
                  <motion.div 
                    whileHover={{ rotate: 8 }} 
                    className={`text-2xl ${isActive ? 'text-white' : 'text-primary-green'}`}
                  >
                    {item.icon}
                  </motion.div>

                  <AnimatePresence>
                    {expanded && (
                      <motion.span
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-base font-semibold"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
