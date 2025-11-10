 "use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "@/lib/hooks/use-auth";
import { toast } from "react-hot-toast";
import DigitalCardPreview, { DigitalCardProps } from "@/components/cards/DigitalCardPreview";

// ----------------- Card Type Definition -----------------
interface Card {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  about: string;
  skills: string;
  portfolio: string;
  experience: string;
  photo: string;
  cover: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
}

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
      about: "Crafting innovative software solutions and user experiences with modern design principles",
      skills: "React, TypeScript, UI/UX Design, Figma, Node.js",
      portfolio: "Mobile App Redesign, E-commerce Platform, Design System",
      experience: "Senior Software Designer @ BoostNow LLP (2022-Present), UI Designer @ TechCorp (2020-2022)",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      cover: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop",
      email: "josh.hazelwood@boostnow.com",
      phone: "+1-555-0123",
      linkedin: "https://linkedin.com/in/joshhazelwood",
      website: "https://joshhazelwood.dev",
    },
    {
      id: 2,
      name: "Sarah Chen",
      title: "UX Designer",
      company: "Design Studio",
      location: "New York, USA",
      about: "Passionate about creating intuitive user experiences that solve real-world problems",
      skills: "User Research, Prototyping, Wireframing, Adobe Creative Suite, Sketch",
      portfolio: "Banking App UX, Healthcare Dashboard, Mobile Game Interface",
      experience: "Lead UX Designer @ Design Studio (2021-Present), UX Researcher @ StartupXYZ (2019-2021)",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
      email: "sarah.chen@designstudio.com",
      phone: "+1-555-0456",
      linkedin: "https://linkedin.com/in/sarahchen",
      website: "https://sarahchen.design",
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      title: "Product Manager",
      company: "Tech Innovations",
      location: "San Francisco, USA",
      about: "Driving product strategy and innovation to deliver exceptional user value and business growth",
      skills: "Product Strategy, Agile, Analytics, Market Research, Roadmapping",
      portfolio: "SaaS Platform Launch, Mobile App Growth, B2B Product Suite",
      experience: "Senior Product Manager @ Tech Innovations (2023-Present), Product Analyst @ BigTech (2021-2023)",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      cover: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop",
      email: "alex.rodriguez@techinnovations.com",
      phone: "+1-555-0789",
      linkedin: "https://linkedin.com/in/alexrodriguez",
      website: "https://alexrodriguez.pm",
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
          style={{
            background: 'linear-gradient(to bottom right, #1e3a8a, #2563eb)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: '500',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FiPlus size={16} />
          Create New Card
        </motion.button>
      </div>

      {/* Invisible container for vertical spacing */}
      <div className="h-10"></div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 justify-items-center mt-4">
        {cards.map((card) => (
          <Link key={card.id} href={`/cards/${card.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: card.id * 0.1 }}
              whileHover={{
                scale: 1.02,
                y: -4,
              }}
              className="transition-all duration-300 cursor-pointer"
            >
              <DigitalCardPreview
                name={card.name}
                title={card.title}
                company={card.company}
                location={card.location}
                about={card.about}
                skills={card.skills}
                portfolio={card.portfolio}
                experience={card.experience}
                photo={card.photo}
                cover={card.cover}
                email={card.email}
                phone={card.phone}
                linkedin={card.linkedin}
                website={card.website}
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
