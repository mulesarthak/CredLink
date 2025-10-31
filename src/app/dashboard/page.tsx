"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiEdit, FiBarChart2, FiZap, FiUser, FiPlus } from "react-icons/fi";

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
          >
            <FiEdit size={16} /> Edit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 px-3 py-3 text-sm rounded-xl bg-[var(--primary-green-dark)] text-white font-medium hover:bg-[var(--primary-green)] transition-all"
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
          >
            <FiZap size={16} /> {card.boost === "Active" ? "Manage" : "Boost"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 px-3 py-3 text-sm rounded-xl bg-background-mint text-primary-green-dark font-medium hover:bg-[var(--primary-green-light)] transition-all"
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
      {/* Top Create Button with generous space */}
      <div className="flex justify-center my-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/dashboard/create")}
          className="relative flex items-center justify-center gap-3 btn btn-large btn-primary shadow-xl hover:shadow-colored transition-all text-xl font-bold px-14 py-6"
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
