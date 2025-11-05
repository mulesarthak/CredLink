"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users2,
  Search,
  Settings2,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import "./sidebar.css"; // 👈 linked CSS file
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Messages", path: "/dashboard/messages", icon: <MessageSquare /> },
    { name: "Connections", path: "/dashboard/connections", icon: <Users2 /> },
    { name: "Search", path: "/dashboard/search", icon: <Search /> },
  ];

  const bottomItems = [
    { name: "Settings", path: "/dashboard/settings", icon: <Settings2 /> },
    { name: "Help & Support", path: "/dashboard/help", icon: <HelpCircle /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="mobileToggle"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      )}

      {/* Overlay (for mobile) */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="mobileOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`sidebar ${isMobile ? (isOpen ? "open" : "closed") : ""}`}
        initial={{ x: isMobile ? -300 : 0 }}
        animate={{ x: isMobile ? (isOpen ? 0 : -300) : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        {/* Header */}
        <div className="sidebarHeader">
          <Link href="/" className="logoArea">
            <div className="logoIcon">
              <LayoutDashboard />
            </div>
            <span className="logoText">CredLink</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="navMenu">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                href={item.path}
                key={item.name}
                className={`navItem ${isActive ? "activeNav" : ""}`}
              >
                <span className="navIcon">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Links */}
        <div className="navFooter">
          {bottomItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                href={item.path}
                key={item.name}
                className={`footerLink ${isActive ? "activeNav" : ""}`}
              >
                <span className="navIcon">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
          <button className="footerLogout">
            <X />
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
