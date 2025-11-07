"use client";

import styles from "./carddetail.module.css";
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
          main: styles["gradient-purple-main"],
          header: styles["gradient-purple-header"],
        };
      case "teal":
        return {
          main: styles["gradient-teal-main"],
          header: styles["gradient-teal-header"],
        };
      default:
        return {
          main: styles["gradient-blue-main"],
          header: styles["gradient-blue-header"],
        };
    }
  };

  const gradientClasses = getGradientClasses(card.gradientTheme);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`${styles.cardPreview} ${gradientClasses.main}`}
    >
      {/* Absolute positioning circles (optional, kept them simple) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className={`${styles.headerImage} ${gradientClasses.header}`}>
        <div className={`absolute inset-0 ${gradientClasses.header}`}></div>
        <div
          className={styles.headerImage}
          style={{
            backgroundImage: `url(${card.backgroundImage})`,
          }}
        ></div>

        <div className={styles.profileImageWrapper}>
          <img
            src={card.profileImage}
            alt={card.name}
            className={styles.profileImage}
          />
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className="text-center mb-4">
          <h3 className={styles.cardName}>{card.name}</h3>
          <p className={styles.cardTitle}>{card.title}</p>
          <p className={styles.cardCompanyLocation}>{card.company}</p>
          <p className={`${styles.cardCompanyLocation} mt-1`}>{card.location}</p>
        </div>

        <div className={styles.socialIcons}>
          {[FiMail, FiPhone, FiLinkedin, FiGlobe].map((Icon, i) => (
            <div key={i} className={styles.socialIconBtn}>
              <Icon className={styles.socialIcon} />
            </div>
          ))}
        </div>

        <p className={styles.description}>
          A modern digital visiting card for {card.title.toLowerCase()} showcasing professional
          details, social links, and portfolio
        </p>

        <div className={styles.buttonGrid3}>
          {["Services", "Portfolio", "Links"].map((b) => (
            <button key={b} className={styles.cardButton}>
              {b}
            </button>
          ))}
        </div>

        <div className={styles.buttonGrid2}>
          {["Experience", "Review"].map((b) => (
            <button key={b} className={styles.cardButton}>
              {b}
            </button>
          ))}
        </div>
        {/* Placeholder for visual bottom spacing */}
        <div style={{ height: "16px", visibility: "hidden" }}></div>
      </div>
    </motion.div>
  );
};

// ----------------- Main Page -----------------
const CardDetailsPage = () => {
  const params = useParams();
  const cardId = parseInt(params.id as string);
  const [activeTab, setActiveTab] = useState<"share" | "settings" | "analytics">("settings"); // Set to 'settings' to match the image
  const [searchIndexing, setSearchIndexing] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState<"qr" | "link">("link"); // Set to 'link' to match the settings image context

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
    cardUrl: `https://credlink.com/hi/XXXX`,
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
    console.log('Navigator share available:', !!navigator.share);
    if (navigator.share) {
      await navigator.share({
        title: "My Digital Card",
        text: "Check out my digital business card!",
        url: mockUserData.cardUrl,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
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

  const [file, setFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('qrLogoUpload')?.click();
  };

  if (!card)
    return (
      <div className={`${styles.pageContainer} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Card Not Found</h1>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.cardPreviewArea}>
          <CardPreview card={card} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={styles.settingsPanel}
        >
          {/* Edit Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <Link href="/dashboard/edit">
              <button className={styles.editCardBtn}>
                <FiEdit size={16} />
                Edit Card
              </button>
            </Link>
          </div>

          {/* Tabs */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabsList}>
              {["share", "settings", "analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`${styles.tabButton} ${
                    activeTab === tab ? styles.tabButtonActive : ""
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
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
                className={styles.tabContent}
              >
                <div className={styles.shareToggleWrapper}>
                  <div className={styles.shareToggle}>
                    <button
                      onClick={() => setShareMethod("qr")}
                      className={`${styles.shareToggleButton} ${
                        shareMethod === "qr" ? styles.shareToggleButtonActive : ""
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      QR Code
                    </button>
                    <button
                      onClick={() => setShareMethod("link")}
                      className={`${styles.shareToggleButton} ${
                        shareMethod === "link" ? styles.shareToggleButtonActive : ""
                      }`}
                    >
                      <LinkIcon className="w-4 h-4" />
                      Direct Link
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  {shareMethod === "link" ? (
                    <div className={styles.directLinkBox}>
                      <div className={styles.linkDisplay}>
                        <p className={styles.linkText}>
                          {mockUserData.cardUrl}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.qrWrapper}>
                      <div className={styles.qrBox}>
                        <QRCode value={mockUserData.cardUrl} size={180} />
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ height: "16px" }}></div>

                <div className={styles.actionButtons}>
                  <button onClick={() => copyToClipboard(mockUserData.cardUrl)} className={styles.actionBtn}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                  <button onClick={downloadQR} className={styles.actionBtn}>
                    <Download className="w-4 h-4" /> Download QR
                  </button>
                  <button onClick={shareProfile} className={styles.actionBtn}>
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
                className={`${styles.tabContent} ${styles.analyticsWrapper}`}
              >
                <h3 className={styles.analyticsTitle}>
                  <BarChart3 className="w-5 h-5" /> Analytics Overview
                </h3>

                <div className={styles.statsGrid}>
                  {[{ label: "Total Views", value: "1,230", icon: Eye },
                  { label: "Shares", value: "540", icon: Share2 },
                  { label: "Contacts", value: "312", icon: Users }].map((s, i) => (
                    <div key={i} className={styles.statCard}>
                      <div className={styles.statIcon}>
                        <s.icon className="w-6 h-6" />
                      </div>
                      <p className={styles.statValue}>{s.value}</p>
                      <p className={styles.statLabel}>{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.analyticsCard}>
                  <h4>Engagement Trends</h4>
                  <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '20px 0' }}>
                    {lineData.datasets[0].data.map((value, index) => (
                      <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(value / 100) * 100}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          style={{
                            width: '100%',
                            backgroundColor: '#2563eb',
                            borderRadius: '4px 4px 0 0',
                            minHeight: '10px'
                          }}
                        />
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>{lineData.labels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}


            {/* Full Settings Section */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${styles.tabContent} ${styles.settingsContent}`}
              >
                {/* Card Configuration */}
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>
                    <div className={`${styles.dot}`} style={{ backgroundColor: 'var(--color-primary-light)' }}></div> Card Configuration
                  </h3>
                  
                  {/* Card Name */}
                  <div className={styles.settingsItem}>
                    <div className={styles.settingsInfo}>
                      <h4 className={styles.settingsLabel}>Card Name</h4>
                      <p className={styles.settingsDescription}>Change the name of this card.</p>
                    </div>
                    <div className={styles.settingsControl}>
                      <input
                        type="text"
                        defaultValue="Personal"
                        className={styles.settingsInput}
                      />
                    </div>
                  </div>
                  
                  {/* QR Code Logo */}
                  <div className={styles.settingsItem}>
                    <div className={styles.settingsInfo}>
                      <h4 className={styles.settingsLabel}>QR Code Logo</h4>
                      <p className={styles.settingsDescription}>Change the logo inside the QR code.</p>
                    </div>
                    <div className={styles.settingsControl}>
                      <input
                        type="file"
                        id="qrLogoUpload"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <button 
                        className={styles.settingsButton}
                        onClick={triggerFileInput}
                      >
                        <FiUpload size={16} /> Upload Logo
                      </button>
                      {logoPreview && (
                        <div style={{ marginTop: '0.5rem' }}>
                          <img 
                            src={logoPreview} 
                            alt="Logo preview" 
                            style={{ width: '50px', height: '50px', borderRadius: '4px' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Personalized Link */}
                  <div className={styles.settingsItem}>
                    <div className={styles.settingsInfo}>
                      <h4 className={styles.settingsLabel}>Personalized Link</h4>
                      <p className={styles.settingsDescription}>Create your own link to further your brand.</p>
                    </div>
                    <div className={styles.settingsControl}>
                      <input
                        type="text"
                        defaultValue="https://credlink.com/hi/XXXX"
                        className={styles.settingsInput}
                      />
                    </div>
                  </div>
                </div>

                {/* Privacy & Visibility */}
                <div className={`${styles.settingsCard} ${styles.privacyCard}`}>
                  <h3 className={styles.settingsCardTitle} style={{ marginBottom: '1rem' }}>
                    <div className={`${styles.dot}`} style={{ backgroundColor: 'var(--color-success)' }}></div> Privacy & Visibility
                  </h3>
                  
                  {/* Pause Card */}
                  <div className={styles.settingsItem}>
                    <div className={styles.settingsInfo}>
                      <h4 className={styles.settingsLabel}>Pause Card</h4>
                      <p className={styles.settingsDescription}>Disable this card temporarily.</p>
                    </div>
                    <div className={styles.settingsControl}>
                      <button
                        onClick={() => setSearchIndexing(!searchIndexing)}
                        className={styles.toggleBtn}
                      >
                        {searchIndexing ? (
                          <FiToggleRight className={`${styles.toggleIcon} ${styles.active}`} />
                        ) : (
                          <FiToggleLeft className={`${styles.toggleIcon} ${styles.inactive}`} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className={styles.settingsCard}>
                  <h3 className={styles.settingsCardTitle}>
                    <div className={`${styles.dot}`} style={{ backgroundColor: 'var(--color-purple-600)' }}></div> Advanced Settings
                  </h3>

                  {/* Renew Link only */}
                  <div className={styles.settingsItem}>
                    <div className={styles.settingsInfo}>
                      <h4 className={styles.settingsLabel}>Renew Link</h4>
                      <p className={styles.settingsDescription}>Renew the link to your card.</p>
                    </div>
                    <div className={styles.settingsControl}>
                      <button className={`${styles.settingsButton} ${styles.renewButton}`}>
                        <FiRefreshCw size={16} /> Renew
                      </button>
                    </div>
                  </div>
                </div>


                {/* Danger Zone */}
                <div className={`${styles.settingsCard} ${styles.dangerCard}`}>
                  <h3 className={`${styles.settingsCardTitle} ${styles.dangerCardTitle}`}>
                    <div className={`${styles.dot}`}></div> Danger Zone
                  </h3>
                  <div className={`${styles.settingsItem} ${styles.dangerItem}`}>
                    <div className={styles.settingsInfo}>
                      <h4 className={styles.settingsLabel}>Delete Card</h4>
                      <p className={styles.settingsDescription}>
                        Delete this card permanently. This action cannot be undone.
                      </p>
                    </div>
                    <div className={styles.settingsControl}>
                      <button className={`${styles.settingsButton} ${styles.deleteButton}`}>
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