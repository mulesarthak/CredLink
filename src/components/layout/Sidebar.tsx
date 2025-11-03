"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users2,
  Settings2,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
    mobileOpen?: boolean; 
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, setExpanded }) => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile detection and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

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
      <AnimatePresence>
        {isMobile && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={toggleMobileMenu}
            className="fixed top-4 left-4 z-50 p-3 bg-linear-to-br from-[#0072EE] to-[#0052CC] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
            style={{
              boxShadow: '0 8px 32px rgba(0, 114, 238, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            <motion.div
              animate={{ rotate: isMobileOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ 
          width: isMobile ? 0 : (expanded ? 270 : 90),
          x: isMobile ? -270 : 0
        }}
        animate={{ 
          width: isMobile ? 270 : (expanded ? 270 : 90),
          x: isMobile ? (isMobileOpen ? 0 : -270) : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-screen flex flex-col justify-between bg-gradient-to-b from-[#0072EE] via-[#0052CC] to-[#0072EE] border-r border-blue-800/30 shadow-2xl ${
          isMobile ? 'z-40' : 'z-40'
        }`}
        style={{
          boxShadow: isMobile 
            ? '8px 0 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            : '4px 0 24px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* ---------- Top Section ---------- */}
        <div>
          {/* Logo / Title */}
          <div className={`flex items-center ${(isMobile || expanded) ? 'justify-between px-5' : 'justify-center px-2'} h-16 border-b border-white/20 mt-6`}>
            <AnimatePresence mode="wait">
              {(isMobile || expanded) && (
                <motion.span
                  key="logo"
                  initial={{ opacity: 0, x: -15, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -15, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="font-extrabold text-3xl tracking-wide text-white"
                  style={{
                    textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  CredLink
                </motion.span>
              )}
            </AnimatePresence>

            {!isMobile && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <motion.div
                  animate={{ rotate: expanded ? 0 : 180 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-white"
                >
                  {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </motion.div>
              </button>
            )}
          </AnimatePresence>

          {!isMobile && (
            <motion.button
              onClick={() => setExpanded(!expanded)}
              className="p-2 hover:bg-white/20 hover:shadow-lg hover:shadow-white/25 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 0 20px rgba(255,255,255,0.2)'
              }}
            >
              <motion.div
                animate={{ rotate: expanded ? 0 : 180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-3xl"
              >
                {expanded ? <ChevronLeft /> : <ChevronRight />}
              </motion.div>
            </motion.button>
          )}
        </div>

          {/* Top Partition Line */}
          <div className="h-px bg-white/30 mx-4 mt-0.5 shadow-sm"></div>
          
          <p className="opacity-0 select-none text-sm">Spacer</p>

        {/* 2-finger gap above Dashboard (1rem = 16px) */}
        <nav className="mt-8 flex flex-col gap-5 px-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 6 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center ${(isMobile || expanded) ? 'gap-5 px-4' : 'justify-center px-2'} py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "text-white font-bold shadow-lg shadow-white/25 backdrop-blur-sm border border-white/30"
                        : "text-white/90 hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 hover:backdrop-blur-sm hover:border hover:border-white/20"
                    }`}
                    style={isActive ? { 
                      textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4)',
                      boxShadow: '0 0 25px rgba(255,255,255,0.4), 0 0 50px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                    } : {}}
                  >
                    <motion.div 
                      whileHover={{ rotate: 12, scale: 1.15 }} 
                      className="text-[1.6rem] transition-all duration-300"
                      style={isActive ? { 
                        textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4)',
                        boxShadow: '0 0 25px rgba(255,255,255,0.4), 0 0 50px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                      } : {}}
                    >
                      <motion.div 
                        whileHover={{ rotate: 12, scale: 1.15 }} 
                        className="text-[1.6rem] transition-all duration-300"
                        style={isActive ? { 
                          filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.9)) drop-shadow(0 0 8px rgba(255,255,255,0.7))' 
                        } : { 
                          filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.4))' 
                        }}
                      >
                        {item.icon}
                      </motion.div>

                      <AnimatePresence>
                        {(isMobile || expanded) && (
                          <motion.span
                            key={item.name}
                            initial={{ opacity: 0, x: -15, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -15, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-lg font-semibold tracking-wide"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

      {/* ---------- Bottom Section ---------- */}
      <div className="mb-6"> {/* Added extra gap below Support (1.5rem) */}
        {/* Faint Divider Above Settings */}
        <div className="border-t border-white/30 mx-6 mb-3 shadow-sm"></div>

        <div className="flex flex-col gap-5 px-2">
          {bottomItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (menuItems.length + index) * 0.1 }}
              >
                <Link href={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 6 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center ${(isMobile || expanded) ? 'gap-5 px-4' : 'justify-center px-2'} py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "text-white font-bold shadow-lg shadow-white/25 backdrop-blur-sm border border-white/30"
                        : "text-white/90 hover:bg-white/15 hover:shadow-lg hover:shadow-white/20 hover:backdrop-blur-sm hover:border hover:border-white/20"
                    }`}
                    style={isActive ? { 
                      textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4)',
                      boxShadow: '0 0 25px rgba(255,255,255,0.4), 0 0 50px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                    } : {}}
                  >
                    <motion.div 
                      whileHover={{ rotate: 12, scale: 1.15 }} 
                      className="text-[1.6rem] transition-all duration-300"
                      style={isActive ? { 
                        textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4)',
                        boxShadow: '0 0 25px rgba(255,255,255,0.4), 0 0 50px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                      } : {}}
                    >
                      <motion.div 
                        whileHover={{ rotate: 12, scale: 1.15 }} 
                        className="text-[1.6rem] transition-all duration-300"
                        style={isActive ? { 
                          filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.9)) drop-shadow(0 0 8px rgba(255,255,255,0.7))' 
                        } : { 
                          filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.4))' 
                        }}
                      >
                        {item.icon}
                      </motion.div>

                    <AnimatePresence>
                      {(isMobile || expanded) && (
                        <motion.span
                          key={item.name}
                          initial={{ opacity: 0, x: -15, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -15, scale: 0.9 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-lg font-semibold tracking-wide"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        <p className="opacity-0 select-none text-sm">Spacer</p>
      </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
 
 
