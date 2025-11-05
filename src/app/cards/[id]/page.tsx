"use client";

import "./CardDetail.css";
import React, { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDownload,
  FiCopy,
  FiEdit,
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
  Users,
  Eye,
} from "lucide-react";
import Link from "next/link";
import QRCode from "react-qr-code";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

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
  const getGradientClasses = (theme: "blue" | "purple" | "teal") => {
    switch (theme) {
      case "purple":
        return {
          main: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
          header: "bg-gradient-to-br from-purple-400 to-purple-600",
        };
      case "teal":
        return {
          main: "bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700",
          header: "bg-gradient-to-br from-teal-400 to-teal-600",
        };
      default:
        return {
          main: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
          header: "bg-gradient-to-br from-blue-400 to-blue-600",
        };
    }
  };

  const gradientClasses = getGradientClasses(card.gradientTheme);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`w-full max-w-[300px] md:max-w-[340px] ${gradientClasses.main} shadow-lg rounded-2xl overflow-hidden relative mx-auto`}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className={`relative h-32 ${gradientClasses.header} flex items-center justify-center`}>
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

      <div className="p-6 text-white relative z-10">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-1 text-white">{card.name}</h3>
          <p className="text-white/90 text-sm font-medium mb-1">{card.title}</p>
          <p className="text-white/80 text-xs">{card.company}</p>
          <p className="text-white/80 text-xs mt-1">{card.location}</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {[FiMail, FiPhone, FiLinkedin, FiGlobe].map((Icon, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors border border-white/30"
            >
              <Icon className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>

        <p className="text-center text-white/90 text-xs leading-relaxed mb-6">
          A modern digital visiting card for {card.title.toLowerCase()} showcasing professional
          details, social links, and portfolio
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4 px-2">
          {["Services", "Portfolio", "Links"].map((b) => (
            <button
              key={b}
              className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-2 rounded-lg transition-colors font-medium border border-white/30"
            >
              {b}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 px-8">
          {["Experience", "Review"].map((b) => (
            <button
              key={b}
              className="bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-2 rounded-lg transition-colors font-medium border border-white/30"
            >
              {b}
            </button>
          ))}
        </div>
        <div style={{ height: "16px", visibility: "hidden" }}></div>
      </div>
    </motion.div>
  );
};

// ----------------- Main Page -----------------
const CardDetailsPage = () => {
  const params = useParams();
  const cardId = parseInt(params.id as string);
  const [activeTab, setActiveTab] = useState<"share" | "settings" | "analytics">("share");
  const [searchIndexing, setSearchIndexing] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState<"qr" | "link">("qr");

  const qrRef = useRef<HTMLDivElement>(null);

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
    },
  ];
  const card = cards.find((c) => c.id === cardId);

  const mockUserData = {
    cardUrl: `https://credlink.app/card/${cardId}`,
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadQR = () => {
    const svg = document.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "card_qr.png";
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const shareProfile = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My Digital Card",
        text: "Check out my digital business card!",
        url: mockUserData.cardUrl,
      });
    } else {
      copyToClipboard(mockUserData.cardUrl);
      alert("Link copied to clipboard!");
    }
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Views",
        data: [40, 70, 60, 90, 50, 80, 65],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  if (!card)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Card Not Found</h1>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="h-6"></div>
      <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_2fr] gap-4 md:gap-8 p-4 md:p-6">
        <div className="flex items-center justify-center order-2 lg:order-1">
          <CardPreview card={card} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white border border-gray-200 shadow-md rounded-2xl overflow-y-auto order-1 lg:order-2 p-4 md:p-6"
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          {/* Tabs */}
          <div className="flex flex-wrap md:flex-row md:justify-between md:items-center border-b border-gray-200 gap-3 pb-3">
            <div className="flex-1 flex justify-start gap-5 text-base font-semibold overflow-x-auto">
              {["share", "settings", "analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`relative transition-all capitalize ${
                    activeTab === tab
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
            <Link href="/dashboard/edit">
              <button className="edit-card-btn flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-lg text-sm font-semibold shadow-sm hover:shadow-md">
                <FiEdit size={16} />
                Edit
              </button>
            </Link>
          </div>

          {/* Tab Contents */}
          <AnimatePresence mode="wait">
            {/* Share Section */}
            {activeTab === "share" && (
              <motion.div
                key="share"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 space-y-6 md:space-y-8"
              >
            <div className="flex justify-center mt-8 mb-2">
  <div className="flex bg-gray-100 rounded-full p-1 max-w-sm w-full shadow-sm">

                    <button
                      onClick={() => setShareMethod("qr")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold transition-all ${
                        shareMethod === "qr"
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      QR Code
                    </button>
                    <button
                      onClick={() => setShareMethod("link")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold transition-all ${
                        shareMethod === "link"
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      <LinkIcon className="w-4 h-4" />
                      Direct Link
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                 {shareMethod === "link" ? (
  <div className="max-w-lg mx-auto text-center space-y-4 direct-link-box">
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <p className="font-mono text-blue-600 text-sm break-all">
        {mockUserData.cardUrl}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="qr-wrapper">
                      <div className="qr-box">
                        <QRCode value={mockUserData.cardUrl} size={180} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Gap added here */}
                <div style={{ height: "16px" }}></div>

                <div className="action-buttons">
                  <button onClick={() => copyToClipboard(mockUserData.cardUrl)} className="action-btn">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                  <button onClick={downloadQR} className="action-btn">
                    <Download className="w-4 h-4" /> Download QR
                  </button>
                  <button onClick={shareProfile} className="action-btn">
                    <Share2 className="w-4 h-4" /> Share Profile
                  </button>
                </div>
              </motion.div>
            )}

            {/* Analytics Section */}
      {activeTab === "analytics" && (
  <motion.div
    key="analytics"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="mt-8"
  >
    {/* Wrapper with fixed soft side padding */}
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 space-y-8 analytics-wrapper">
      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-blue-600" /> Analytics Overview
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[{ label: "Total Views", value: "1,230", icon: Eye },
          { label: "Shares", value: "540", icon: Share2 },
          { label: "Contacts", value: "312", icon: Users }].map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 p-5 rounded-xl text-center shadow-sm">
            <div className="flex justify-center mb-3">
              <s.icon className="text-blue-600 w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="analytics-card mt-6 mb-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Engagement Trends</h4>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  </motion.div>
)}


            {/* ✅ Full Settings Section */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 px-4 md:px-8 space-y-6 md:space-y-8"
              >
                {/* Card Configuration */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-6">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div> Card Configuration
                  </h3>
                  {/* Card Name */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                  {/* QR Code Logo */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                  {/* Personalized Link */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                </div>

                {/* Privacy & Visibility */}
{/* Privacy & Visibility */}
<div className="bg-gray-50 rounded-2xl border border-gray-200 px-6 pt-5 pb-6 mt-5 privacy-card">

  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
    Privacy & Visibility
  </h3>

  {/* Properly aligned content */}
  <div className="flex items-center justify-between gap-4 pl-[0.25rem] pr-[0.25rem]">
    <div className="flex flex-col flex-1">
      <h4 className="text-base font-semibold text-gray-800 leading-snug">
        Pause Card
      </h4>
      <p className="text-sm text-gray-500 mt-[2px]">
        Disable this card temporarily.
      </p>
    </div>

    {/* Toggle aligned visually to middle of text */}
    <button
      onClick={() => setSearchIndexing(!searchIndexing)}
      className="ml-3 translate-y-[2px]"
    >
      {searchIndexing ? (
        <FiToggleRight className="text-3xl text-green-500" />
      ) : (
        <FiToggleLeft className="text-3xl text-gray-400" />
      )}
    </button>
  </div>
</div>

{/* Advanced Settings */}
<div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-6 mt-4">
  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
    <div className="w-2 h-2 bg-purple-600 rounded-full"></div> Advanced Settings
  </h3>

  {/* Renew Link only */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
    <div className="flex-1">
      <h4 className="text-base font-semibold text-gray-800 mb-1">Renew Link</h4>
      <p className="text-sm text-gray-500">Renew the link to your card.</p>
    </div>
    <div className="md:w-80">
      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg rounded-lg px-4 py-3 text-sm transition-all">
        <FiRefreshCw size={16} /> Renew
      </button>
    </div>
  </div>
</div>


                {/* Danger Zone */}
                <div className="bg-red-50 rounded-2xl p-6 border border-red-200 space-y-6">
                  <h3 className="text-lg font-bold text-red-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div> Danger Zone
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-red-800 mb-1">Delete Card</h4>
                      <p className="text-sm text-red-600">
                        Delete this card permanently. This action cannot be undone.
                      </p>
                    </div>
                    <div className="md:w-80">
                      <button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-3 text-sm shadow-md hover:shadow-lg transition-all">
                        Delete Card
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
