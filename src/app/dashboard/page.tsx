"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiPlus, FiMail, FiPhone, FiLinkedin, FiGlobe } from "react-icons/fi";
import { useAuth } from "@/lib/hooks/use-auth";
import { toast } from "react-hot-toast";
import { Filter } from "lucide-react";

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
  type: "Personal" | "Business" | "Work";
}

// ----------------- Card Component -----------------
const CardItem: React.FC<{ card: Card }> = ({ card }) => {
  const getGradientClasses = (theme: "blue" | "purple" | "teal") => {
    switch (theme) {
      case "purple":
        return {
          main: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
          header: "bg-gradient-to-br from-purple-400 to-purple-600",
          shadow:
            "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(147, 51, 234, 0.2)",
        };
      case "teal":
        return {
          main: "bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700",
          header: "bg-gradient-to-br from-teal-400 to-teal-600",
          shadow:
            "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(20, 184, 166, 0.2)",
        };
      case "blue":
      default:
        return {
          main: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
          header: "bg-gradient-to-br from-blue-400 to-blue-600",
          shadow:
            "0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(59, 130, 246, 0.2)",
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
        boxShadow: gradientClasses.shadow,
      }}
      className={`w-[340px] max-w-sm ${gradientClasses.main} shadow-lg rounded-2xl overflow-hidden transition-all duration-300 relative cursor-pointer`}
    >
      {/* Card Type Tag */}
      <div className="absolute top-3 left-3 z-20">
        <span className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-lg text-xs text-white font-medium">
          {card.type}
        </span>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Header */}
      <div
        className={`relative h-32 ${gradientClasses.header} flex items-center justify-center overflow-hidden`}
      >
        <div className={`absolute inset-0 ${gradientClasses.header}`}></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url(${card.backgroundImage})`,
            filter: "blur(0.5px)",
          }}
        ></div>

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
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-1">{card.name}</h3>
          <p className="text-white/90 text-sm font-medium mb-1">
            {card.title}
          </p>
          <p className="text-white/80 text-xs">{card.company}</p>
          <p className="text-white/80 text-xs mt-1">{card.location}</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {[FiMail, FiPhone, FiLinkedin, FiGlobe].map((Icon, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30"
            >
              <Icon className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>

        <p className="text-center text-white/90 text-xs leading-relaxed mb-6">
          A modern digital visiting card for{" "}
          {card.title.toLowerCase()} showcasing professional details,
          social links, and portfolio
        </p>

        {/* Services / Portfolio / Links */}
        <div className="grid grid-cols-3 gap-2 mb-6 px-2">
          {["Services", "Portfolio", "Links"].map((btn, i) => (
            <button
              key={i}
              className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-2 rounded-lg transition-colors font-medium border border-white/30"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Small gap container */}
        <div className="h-3"></div>

        {/* Experience / Review */}
        <div className="grid grid-cols-2 gap-2 mb-4 px-8">
          {["Experience", "Review"].map((btn, i) => (
            <button
              key={i}
              className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-2 rounded-lg transition-colors font-medium border border-white/30"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Small empty container for spacing */}
        <div className="h-4"></div>
      </div>
    </motion.div>
  );
};

// ----------------- Main Dashboard -----------------
const Dashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [searchResults, setSearchResults] = useState<Card[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<"none" | "review" | "verified">("none");

  const cards: Card[] = [
    {
      id: 1,
      name: "Josh Hazelwood",
      title: "Software Designer",
      company: "BoostNow LLP",
      location: "California, USA",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      backgroundImage:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop",
      gradientTheme: "blue",
      views: "234",
      boost: "Active",
      type: "Work",
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "UX Designer",
      company: "Design Studio",
      location: "New York, USA",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      backgroundImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
      gradientTheme: "purple",
      views: "180",
      boost: "Inactive",
      type: "Personal",
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      title: "Product Manager",
      company: "Tech Innovations",
      location: "San Francisco, USA",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      backgroundImage:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop",
      gradientTheme: "teal",
      views: "302",
      boost: "Active",
      type: "Business",
    },
  ];

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

  return (
    <div className="min-h-screen bg-[var(--background)] px-8 sm:px-14 py-8 lg:ml-64 transition-all duration-300">
      {/* Create New Card Button */}
      <div className="flex justify-center my-6">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 20px 40px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.3)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/dashboard/create")}
          className="relative flex items-center justify-center gap-3 px-12 py-5 text-lg font-medium text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group min-w-[280px]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
          <FiPlus className="text-xl relative z-10" />
          <span className="relative z-10">Create New Card</span>
        </motion.button>
      </div>

      {/* Invisible container for vertical spacing */}
      <div className="h-10"></div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 justify-items-center mt-4">
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
