"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiEdit, FiBarChart2, FiZap, FiUser, FiPlus, FiLogOut, FiMail, FiPhone, FiLinkedin, FiGlobe } from "react-icons/fi";
import { useAuth } from "@/lib/hooks/use-auth";
import { toast } from "react-hot-toast";

// ----------------- Card Type Definition -----------------
interface Card {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  profileImage: string;
  backgroundImage: string;
  gradientTheme: "blue" | "purple" | "teal";
  views: string;
  boost: "Active" | "Inactive";
}


// ----------------- Card Component -----------------
const CardItem: React.FC<{ card: Card }> = ({ card }) => {
  // Dynamic gradient classes based on theme
  const getGradientClasses = (theme: "blue" | "purple" | "teal") => {
    switch (theme) {
      case "purple":
        return {
          main: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
          header: "bg-gradient-to-br from-purple-400 to-purple-600",
          shadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(147, 51, 234, 0.2)"
        };
      case "teal":
        return {
          main: "bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700",
          header: "bg-gradient-to-br from-teal-400 to-teal-600",
          shadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(20, 184, 166, 0.2)"
        };
      case "blue":
      default:
        return {
          main: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
          header: "bg-gradient-to-br from-blue-400 to-blue-600",
          shadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(59, 130, 246, 0.2)"
        };
    }
  };

  const gradientClasses = getGradientClasses(card.gradientTheme);

  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ 
        scale: 1.02, 
        y: -4, 
        boxShadow: gradientClasses.shadow
      }}
      className={`w-[340px] max-w-sm ${gradientClasses.main} shadow-lg rounded-2xl overflow-hidden transition-all duration-300 relative cursor-pointer`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Header with Background Image */}
      <div className={`relative h-32 ${gradientClasses.header} flex items-center justify-center overflow-hidden`}>
        {/* Gradient Background (Behind Image) */}
        <div className={`absolute inset-0 ${gradientClasses.header}`}></div>
        
        {/* Soft Background Image (Over Gradient) */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url(${card.backgroundImage})`,
            filter: 'blur(0.5px)'
          }}
        ></div>
        
        {/* Profile Image with Glassmorphism */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <img 
            src={card.profileImage} 
            alt={card.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-white relative z-10">
        {/* Name and Title */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-1 text-white">
            {card.name}
          </h3>
          <p className="text-white/90 text-sm font-medium mb-1">
            {card.title}
          </p>
          <p className="text-white/80 text-xs">
            {card.company}
          </p>
          <p className="text-white/80 text-xs mt-1">
            {card.location}
          </p>
        </div>

        {/* Contact Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30">
            <FiMail className="w-4 h-4 text-white" />
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30">
            <FiPhone className="w-4 h-4 text-white" />
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30">
            <FiLinkedin className="w-4 h-4 text-white" />
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30">
            <FiGlobe className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-white/90 text-xs leading-relaxed mb-6">
          A modern digital visiting card for {card.title.toLowerCase()} showcasing professional details, social links, and portfolio
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-4 px-2">
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-2 rounded-lg transition-colors font-medium border border-white/30">
            Services
          </button>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-2 rounded-lg transition-colors font-medium border border-white/30">
            Portfolio
          </button>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-2 rounded-lg transition-colors font-medium border border-white/30">
            Links
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4 px-8">
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-2 rounded-lg transition-colors font-medium border border-white/30">
            Experience
          </button>
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-2 rounded-lg transition-colors font-medium border border-white/30">
            Review
          </button>
        </div>
        
        {/* Enhanced Breathing Space */}
        <div style={{ height: '16px', visibility: 'hidden' }}></div>
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
      name: "Josh Hazelwood",
      title: "Software Designer",
      company: "BoostNow LLP",
      location: "California, USA",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      backgroundImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop",
      gradientTheme: "blue",
      views: "234",
      boost: "Active",
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "UX Designer",
      company: "Design Studio",
      location: "New York, USA",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
      gradientTheme: "purple",
      views: "180",
      boost: "Inactive",
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      title: "Product Manager",
      company: "Tech Innovations",
      location: "San Francisco, USA",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      backgroundImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop",
      gradientTheme: "teal",
      views: "302",
      boost: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] px-8 sm:px-14 py-14 lg:ml-64 transition-all duration-300">
      {/* Top Spacing */}
      <div style={{ height: '60px', visibility: 'hidden' }}></div>
      
      {/* Top Create Button with generous space */}
      <div className="flex justify-center my-20">
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/dashboard/create")}
          className="relative flex items-center justify-center gap-3 px-12 py-5 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group min-w-[280px]"
          suppressHydrationWarning
        >
          {/* Glossy highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
          
          <FiPlus className="text-xl relative z-10" /> 
          <span className="relative z-10">Create New Card</span>
        </motion.button>
      </div>
      
      {/* Professional spacing */}
      <div className="h-8"></div>

      {/* Cards Grid with wide spacing and room from header/sidebar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 justify-items-center mt-12">
        {cards.map((card) => (
          <Link key={card.id} href={`/cards/${card.id}`}>
            <CardItem card={card} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
