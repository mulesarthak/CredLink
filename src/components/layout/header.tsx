"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ChevronDown, User, LogOut } from "lucide-react"
import { useAuth } from "@/lib/hooks/use-auth"
import { toast } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Get page title from pathname
  const getPageTitle = () => {
    const path = pathname.split('/').filter(Boolean)
    if (path.length === 0) return 'Home'
    
    const pageName = path[path.length - 1]
    return pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      router.push('/auth/login')
      setIsDropdownOpen(false)
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  if (!isAuthenticated) {
    return null // Don't show header if not authenticated
  }

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Spacer */}
            <div style={{ width: '20px', visibility: 'hidden' }}></div>
            
            {/* Page Title */}
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                {getPageTitle()}
              </h1>
            </div>

            {/* Profile Box */}
            <div className="relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(147, 197, 253, 0.5)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Fixed Avatar */}
                <div 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    border: '2px solid white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <User style={{ width: '16px', height: '16px', color: 'white' }} />
                </div>
                
                {/* User Info */}
                <div 
                  className="hidden sm:block"
                  style={{
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <div 
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      lineHeight: '1.2',
                      marginBottom: '2px'
                    }}
                  >
                    {user?.fullName || 'User'}
                  </div>
                  <div 
                    style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      lineHeight: '1.2'
                    }}
                  >
                    {user?.email}
                  </div>
                </div>
                
                {/* Dropdown Arrow */}
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ flexShrink: 0 }}
                >
                  <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      position: 'absolute',
                      right: '0',
                      marginTop: '8px',
                      width: '220px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(229, 231, 235, 0.5)',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      zIndex: 50
                    }}
                  >
                    <Link 
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        margin: '6px 0',
                        fontSize: '14px',
                        color: '#374151',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        borderRadius: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#eff6ff';
                        e.currentTarget.style.color = '#1d4ed8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#374151';
                      }}
                    >
                      <User style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                      <span>Account</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        margin: '6px 0',
                        fontSize: '14px',
                        color: '#dc2626',
                        backgroundColor: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        borderRadius: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fef2f2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <LogOut style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                      <span>Logout</span>
                    </button>
                    
                    {/* Bottom Spacer */}
                    <div style={{ height: '10px', visibility: 'hidden' }}></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>
      
      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  )
}

