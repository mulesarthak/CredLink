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
      className="fixed left-0 top-0 h-screen flex flex-col justify-between bg-gradient-to-b from-white via-[var(--background-light-green)] to-white border-r shadow-lg z-40"
    >
      {/* ---------- Top Section ---------- */}
      <div>
        {/* Logo / Title */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-200">
          <AnimatePresence mode="wait">
            {expanded && (
              <motion.span
                key="logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-extrabold text-3xl tracking-wide text-[var(--primary-green)]"
              >
                CredLink
              </motion.span>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-[var(--primary-green)] hover:text-white rounded-full transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: expanded ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              className="text-3xl"
            >
              {expanded ? <FiChevronLeft /> : <FiChevronRight />}
            </motion.div>
          </button>
        </div>

        {/* Top Partition Line (Black) */}
        <div className="h-[1px] bg-black mx-4 mt-0.5"></div>

        {/* 2-finger gap above Dashboard */}
        <nav className="mt-10 flex flex-col gap-5 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05, x: 6 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-5 px-5 py-3 rounded-lg cursor-pointer transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-green-dark)] text-white shadow-md"
                      : "text-gray-700 hover:bg-white/70 hover:shadow-sm"
                  }`}
                >
                  <motion.div whileHover={{ rotate: 12 }} className="text-[1.7rem]">
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
                        className="text-lg font-semibold"
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
      <div className="mb-10"> {/* Added extra gap below Support */}
        {/* Faint Divider Above Settings */}
        <div className="border-t border-black/30 mx-6 mb-3"></div>

        <div className="flex flex-col gap-5 px-2">
          {bottomItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05, x: 6 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-5 px-5 py-3 rounded-lg cursor-pointer transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-green-dark)] text-white shadow-md"
                      : "text-gray-700 hover:bg-white/70 hover:shadow-sm"
                  }`}
                >
                  <motion.div whileHover={{ rotate: 12 }} className="text-[1.7rem]">
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
                        className="text-lg font-semibold"
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
