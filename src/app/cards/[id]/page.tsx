"use client";

import React, { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDownload,
  FiCopy,
  FiEdit,
  FiLayers,
  FiUpload,
  FiToggleLeft,
  FiToggleRight,
  FiRefreshCw,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGlobe,
} from "react-icons/fi";
import {
  QrCode,
  Download,
  Share2,
  Copy,
  Check,
  Link as LinkIcon,
  BarChart3,
  TrendingUp,
  Users,
  Eye
} from "lucide-react";
import Link from "next/link";
import QRCode from "react-qr-code";

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


// ----------------- Card Preview -----------------
const CardPreview: React.FC<{ card: Card }> = ({ card }) => {
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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`w-[340px] max-w-sm ${gradientClasses.main} shadow-lg rounded-2xl overflow-hidden transition-all duration-300 relative`}
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

// ----------------- Main Card Details -----------------
const CardDetailsPage = () => {
  const params = useParams();
  const cardId = parseInt(params.id as string);
  const [activeTab, setActiveTab] = useState<"share" | "settings" | "analytics">("share");
  const [searchIndexing, setSearchIndexing] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState<'qr' | 'link'>('qr');
  const [showPreview, setShowPreview] = useState(false);
  
  const qrRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  ];

  const card = cards.find((c) => c.id === cardId);

  // Mock user data for QR sharing
  const mockUserData = {
    id: "user123",
    name: card?.name || "John Doe",
    title: card?.title || "Senior Software Engineer",
    company: card?.company || "Tech Solutions Inc.",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    website: "https://johndoe.dev",
    profileImage: card?.profileImage || "/api/placeholder/150/150",
    cardUrl: `https://credlink.app/card/${cardId}`
  };

  // QR Code generation function
  const generateQRCode = () => {
    const size = 200;
    const color = "#000000";
    const background = "#FFFFFF";
    
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${background}"/>
        <rect x="20" y="20" width="20" height="20" fill="${color}"/>
        <rect x="60" y="20" width="20" height="20" fill="${color}"/>
        <rect x="100" y="20" width="20" height="20" fill="${color}"/>
        <rect x="140" y="20" width="20" height="20" fill="${color}"/>
        <rect x="180" y="20" width="20" height="20" fill="${color}"/>
        <rect x="40" y="40" width="20" height="20" fill="${color}"/>
        <rect x="80" y="40" width="20" height="20" fill="${color}"/>
        <rect x="120" y="40" width="20" height="20" fill="${color}"/>
        <rect x="160" y="40" width="20" height="20" fill="${color}"/>
        <rect x="20" y="60" width="20" height="20" fill="${color}"/>
        <rect x="100" y="60" width="20" height="20" fill="${color}"/>
        <rect x="180" y="60" width="20" height="20" fill="${color}"/>
        <rect x="60" y="80" width="20" height="20" fill="${color}"/>
        <rect x="140" y="80" width="20" height="20" fill="${color}"/>
        <rect x="40" y="100" width="20" height="20" fill="${color}"/>
        <rect x="120" y="100" width="20" height="20" fill="${color}"/>
        <rect x="160" y="100" width="20" height="20" fill="${color}"/>
        <rect x="20" y="120" width="20" height="20" fill="${color}"/>
        <rect x="80" y="120" width="20" height="20" fill="${color}"/>
        <rect x="180" y="120" width="20" height="20" fill="${color}"/>
        <rect x="60" y="140" width="20" height="20" fill="${color}"/>
        <rect x="100" y="140" width="20" height="20" fill="${color}"/>
        <rect x="140" y="140" width="20" height="20" fill="${color}"/>
        <rect x="40" y="160" width="20" height="20" fill="${color}"/>
        <rect x="120" y="160" width="20" height="20" fill="${color}"/>
        <rect x="160" y="160" width="20" height="20" fill="${color}"/>
        <text x="50%" y="95%" text-anchor="middle" font-family="Arial" font-size="12" fill="${color}">
          ${mockUserData.name}
        </text>
      </svg>
    `)}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadQR = () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = 300;
      canvas.height = 300;
      
      const qrCodeSvg = generateQRCode();
      
      img.onload = () => {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${mockUserData.name.replace(/\s+/g, '_')}_QR_Code.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        }, 'image/png');
      };
      
      img.src = qrCodeSvg;
    } catch (error) {
      console.error('Error downloading QR code:', error);
      const link = document.createElement('a');
      link.href = generateQRCode();
      link.download = `${mockUserData.name.replace(/\s+/g, '_')}_QR_Code.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${mockUserData.name}'s Digital Card`,
          text: `Check out ${mockUserData.name}'s digital business card`,
          url: mockUserData.cardUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard(mockUserData.cardUrl);
    }
  };

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Card Not Found
          </h1>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6 pb-0">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-8 p-6">
        <div className="flex items-center justify-center">
          <CardPreview card={card} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
className="bg-white border border-gray-200 shadow-md rounded-2xl overflow-y-auto h-[calc(100vh-4rem)]"

        >
          <div className="h-6"></div>

          {/* Tabs + Action Buttons */}
          <div className="flex justify-between items-center border-b border-gray-200 flex-wrap gap-4 mx-8">
            <div className="flex gap-6 text-lg font-semibold">
              <button
                onClick={() => setActiveTab("share")}
                className={`relative transition-all ${
                  activeTab === "share"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Share
                {activeTab === "share" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`relative transition-all ${
                  activeTab === "settings"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Settings
                {activeTab === "settings" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`relative transition-all ${
                  activeTab === "analytics"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Analytics
                {activeTab === "analytics" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            </div>

            {/* Edit Card Button */}
            <div className="flex items-center">
              {/* Left spacer */}
              <div style={{ width: '12px', height: '1px', visibility: 'hidden' }}></div>
              
              <Link href="/dashboard/edit">
                <button
                  className="flex items-center justify-center gap-3 min-w-40 h-12 bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-all shadow-md hover:shadow-lg rounded-xl font-semibold"
                >
                  <FiEdit size={20} />
                  Edit Card
                </button>
              </Link>
              
              {/* Right spacer */}
              <div style={{ width: '16px', height: '1px', visibility: 'hidden' }}></div>
            </div>
            
            {/* Bottom spacer for Edit Card button */}
            <div style={{ width: '100%', height: '8px', visibility: 'hidden' }}></div>
          </div>

          <div className="h-6"></div>

          {/* -------- Content Section -------- */}
          <AnimatePresence mode="wait">
            {activeTab === "share" ? (
              <motion.div
                key="share"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mx-8 space-y-8"
              >
                <div className="h-4"></div>

                {/* Share Method Toggle */}
                <div className="flex justify-center">
                  <div className="flex bg-gray-100 rounded-full p-1 max-w-sm w-full">
                    <button
                      onClick={() => {
                        setShareMethod('qr');
                        setShowPreview(false);
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold transition-all ${
                        shareMethod === 'qr'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      QR Code
                    </button>
                    <button
                      onClick={() => setShareMethod('link')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold transition-all ${
                        shareMethod === 'link'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      <LinkIcon className="w-4 h-4" />
                      Direct Link
                    </button>
                  </div>
                </div>

                {/* Content Display */}
                <div className="flex justify-center">
                  {shareMethod === 'qr' ? (
                    <div className="text-center">
                      {!showPreview ? (
                        /* QR Code Display */
                        <motion.div 
                          initial={{ rotateY: 0 }}
                          animate={{ rotateY: showPreview ? 180 : 0 }}
                          transition={{ duration: 0.6 }}
                          className="inline-block cursor-pointer"
                          onClick={() => setShowPreview(true)}
                        >
                          <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all">
                            <img
                              src={generateQRCode()}
                              alt="QR Code"
                              width={280}
                              height={280}
                              className="block mx-auto"
                            />
                          </div>
                          <p className="text-sm mt-4 text-gray-500">
                            Click to preview card • Scan to connect
                          </p>
                        </motion.div>
                      ) : (
                        /* Card Preview */
                        <motion.div 
                          initial={{ rotateY: 180 }}
                          animate={{ rotateY: 0 }}
                          transition={{ duration: 0.6 }}
                          className="inline-block cursor-pointer"
                          onClick={() => setShowPreview(false)}
                        >
                          <div className="w-80 h-80 p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 shadow-xl relative overflow-hidden">
                            <div className="flex flex-col items-center justify-center h-full text-center">
                              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 bg-white/20 backdrop-blur-sm border-2 border-white/30">
                                {mockUserData.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <h3 className="text-xl font-bold mb-2 text-white">{mockUserData.name}</h3>
                              <p className="text-sm opacity-90 mb-2 text-white">{mockUserData.title}</p>
                              <p className="text-xs opacity-75 mb-6 text-white">{mockUserData.company}</p>
                              <div className="space-y-2 text-xs text-white">
                                <div className="flex items-center justify-center gap-2">
                                  <span>📧</span>
                                  <span className="truncate">{mockUserData.email}</span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                  <span>📱</span>
                                  <span>{mockUserData.phone}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm mt-4 text-gray-500">
                            Click to view QR code
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    /* Direct Link Display */
                    <div className="max-w-lg mx-auto">
                      <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-gradient-to-br from-purple-600 to-blue-600 shadow-md">
                          <LinkIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">
                          Direct Link Sharing
                        </h3>
                        <div className="p-4 rounded-xl mb-6 bg-blue-50 border-2 border-blue-100">
                          <p className="text-sm font-mono break-all text-blue-600 font-semibold">
                            {mockUserData.cardUrl}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => copyToClipboard(mockUserData.cardUrl)}
                    className="flex items-center justify-center gap-3 min-w-40 h-12 bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-all shadow-md hover:shadow-lg rounded-xl font-semibold"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>

                  {shareMethod === 'qr' && (
                    <button
                      onClick={downloadQR}
                      className="flex items-center justify-center gap-3 min-w-40 h-12 bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-all shadow-md hover:shadow-lg rounded-xl font-semibold"
                    >
                      <Download className="w-5 h-5" />
                      Download QR
                    </button>
                  )}

                  <button
                    onClick={shareProfile}
                    className="flex items-center justify-center gap-3 min-w-40 h-12 bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-all shadow-md hover:shadow-lg rounded-xl font-semibold"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Profile
                  </button>
                </div>

                <div className="h-8"></div>
              </motion.div>
            ) : activeTab === "analytics" ? (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mx-8 space-y-8"
              >
                <div className="h-4"></div>

                {/* Analytics Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Total Views", value: "10", icon: Eye, color: "blue" },
                    { label: "Total Saves", value: "5", icon: Users, color: "green" },
                    { label: "Total Contacts", value: "20", icon: TrendingUp, color: "purple" }
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className={`bg-gradient-to-br ${
                        stat.color === 'blue' ? 'from-blue-50 to-blue-100 border-blue-200' :
                        stat.color === 'green' ? 'from-green-50 to-green-100 border-green-200' :
                        'from-purple-50 to-purple-100 border-purple-200'
                      } rounded-2xl p-6 text-center border-2 shadow-lg hover:shadow-xl transition-all`}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                        stat.color === 'blue' ? 'bg-blue-600' :
                        stat.color === 'green' ? 'bg-green-600' :
                        'bg-purple-600'
                      } shadow-md`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</p>
                      <p className="text-sm font-semibold text-gray-600">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="h-4"></div>

                {/* Analytics Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                      Analytics Overview
                    </h3>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="h-64 bg-gradient-to-t from-gray-50 to-white rounded-xl border border-gray-200 flex items-end justify-center p-6">
                    <div className="flex items-end gap-4 h-full w-full max-w-md">
                      {[20, 45, 30, 60, 35, 80, 50].map((height, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg min-h-4 shadow-sm"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <div className="flex gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span>Card Views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span>Profile Saves</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                        <span>Contact Actions</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="h-8"></div>
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="px-6 md:px-12 py-6 space-y-6"
              >
                {/* Left side spacer */}
                <div style={{ position: 'absolute', left: '0', top: '0', width: '8px', height: '100%', visibility: 'hidden' }}></div>
                
                {/* Card Configuration Section */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        Card Configuration
                      </h3>
                      <div style={{ width: '12px', visibility: 'hidden' }}></div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Card Name */}
                      <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ flex: 1 }}>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800 mb-1">Card Name</h4>
                            <p className="text-sm text-gray-500">Change the name of this card.</p>
                          </div>
                          <div className="md:w-80">
                            <input
                              type="text"
                              defaultValue="Personal"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                          </div>
                        </div>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      </div>

                      {/* QR Code Logo */}
                      <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ flex: 1 }}>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800 mb-1">QR Code Logo</h4>
                            <p className="text-sm text-gray-500">Change the logo inside the QR code.</p>
                          </div>
                          <div className="md:w-80">
                            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-3 text-sm transition-all">
                              <FiUpload size={16} /> Upload Logo
                            </button>
                          </div>
                        </div>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      </div>

                      {/* Personalized Link */}
                      <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ flex: 1 }}>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800 mb-1">Personalized Link</h4>
                            <p className="text-sm text-gray-500">Create your own link to further your brand.</p>
                          </div>
                          <div className="md:w-80">
                            <input
                              type="text"
                              defaultValue="https://hihello.com/hi/XXXX"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                          </div>
                        </div>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacer after Card Configuration */}
                  <div style={{ width: '100%', height: '16px', visibility: 'hidden' }}></div>

                  {/* Privacy & Visibility Section */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        Privacy & Visibility
                      </h3>
                      <div style={{ width: '12px', visibility: 'hidden' }}></div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Search Engine Indexing */}
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                        <div className="flex items-center justify-between" style={{ flex: 1 }}>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800 mb-1">Search Engine Indexing</h4>
                            <p className="text-sm text-gray-500">Make this card visible on search engines.</p>
                          </div>
                          <button
                            onClick={() => setSearchIndexing(!searchIndexing)}
                            aria-label="Toggle"
                            className="ml-4"
                          >
                            {searchIndexing ? (
                              <FiToggleRight className="text-3xl text-blue-600" />
                            ) : (
                              <FiToggleLeft className="text-3xl text-gray-400" />
                            )}
                          </button>
                        </div>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      </div>

                      {/* Pause Card */}
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                        <div className="flex items-center justify-between" style={{ flex: 1 }}>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800 mb-1">Pause Card</h4>
                            <p className="text-sm text-gray-500">Disable this card temporarily.</p>
                          </div>
                          <button
                            onClick={() => setSearchIndexing(!searchIndexing)}
                            aria-label="Toggle"
                            className="ml-4"
                          >
                            {searchIndexing ? (
                              <FiToggleRight className="text-3xl text-blue-600" />
                            ) : (
                              <FiToggleLeft className="text-3xl text-gray-400" />
                            )}
                          </button>
                        </div>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacer after Privacy & Visibility */}
                  <div style={{ width: '100%', height: '16px', visibility: 'hidden' }}></div>

                  {/* Advanced Settings Section */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        Advanced Settings
                      </h3>
                      <div style={{ width: '12px', visibility: 'hidden' }}></div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Renew Link */}
                      <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ flex: 1 }}>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800 mb-1">Renew Link</h4>
                            <p className="text-sm text-gray-500">Renew the link to your card.</p>
                          </div>
                          <div className="md:w-80">
                            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-purple)] text-white shadow-md hover:shadow-lg rounded-lg px-4 py-3 text-sm transition-all">
                              <FiRefreshCw size={16} /> Renew
                            </button>
                          </div>
                        </div>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      </div>

                      {/* Tracking Code */}
                      <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ flex: 1 }}>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800 mb-1">Tracking Code</h4>
                            <p className="text-sm text-gray-500">Add a tracking code to this card.</p>
                          </div>
                          <div className="md:w-80">
                            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg px-4 py-3 text-sm transition-all">
                              + Add New
                            </button>
                          </div>
                        </div>
                        <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacer after Advanced Settings */}
                  <div style={{ width: '100%', height: '16px', visibility: 'hidden' }}></div>

                  {/* Danger Zone */}
                  <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      <h3 className="text-lg font-bold text-red-800 mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        Danger Zone
                      </h3>
                      <div style={{ width: '12px', visibility: 'hidden' }}></div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                      <div style={{ width: '12px', visibility: 'hidden' }}></div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ flex: 1 }}>
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-red-800 mb-1">Delete Card</h4>
                          <p className="text-sm text-red-600">Delete this card permanently. This action cannot be undone.</p>
                        </div>
                        <div className="md:w-80">
                          <button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-3 text-sm shadow-md hover:shadow-lg transition-all">
                            Delete Card
                          </button>
                        </div>
                      </div>
                      <div style={{ width: '12px', visibility: 'hidden' }}></div>
                    </div>
                  </div>
                  
                  {/* Spacer after Danger Zone */}
                  <div style={{ width: '100%', height: '20px', visibility: 'hidden' }}></div>
                </div>

                {/* Final bottom spacer for Settings */}
                <div style={{ width: '100%', height: '12px', visibility: 'hidden' }}></div>
                
                {/* Right side spacer */}
                <div style={{ position: 'absolute', right: '0', top: '0', width: '8px', height: '100%', visibility: 'hidden' }}></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
