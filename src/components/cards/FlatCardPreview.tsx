"use client";

import React, { useState, useEffect } from "react";
import { DigitalCardProps } from "./DigitalCardPreview";

const FlatCardPreview: React.FC<DigitalCardProps & { themeColor1?: string; themeColor2?: string }> = ({
  name = "",
  title = "",
  company = "",
  location = "",
  about = "",
  skills = "",
  portfolio = "",
  experience = "",
  services = "",
  review = "",
  photo = "",
  cover = "",
  email = "",
  phone = "",
  linkedin = "",
  website = "",
  themeColor1 = "#3b82f6",
  themeColor2 = "#60a5fa",
}) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "J";
  
  type Section = 'Services' | 'Portfolio' | 'Skills' | 'Experience' | 'Review';
  const [activePanel, setActivePanel] = useState<Section | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Parse data into lists
  const skillsList = skills.split(',').map((s) => s.trim()).filter(Boolean);
  const portfolioList = portfolio.split(',').map((s) => s.trim()).filter(Boolean);
  const experienceList = experience.split(',').map((s) => s.trim()).filter(Boolean);
  const servicesList = services.split(',').map((s) => s.trim()).filter(Boolean);
  const reviewList = review.split(',').map((s) => s.trim()).filter(Boolean);

  const renderItem = (title: string, subtitle?: string) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderRadius: 12, padding: '12px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: themeColor1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>★</div>
        <div>
          <div style={{ fontWeight: 700, color: '#111827' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: '#6B7280' }}>{subtitle}</div>}
        </div>
      </div>
    </div>
  );

  const renderPortfolioItem = (item: string) => {
    const isUrl = item.startsWith('http://') || item.startsWith('https://') || item.includes('.');
    
    if (isUrl) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderRadius: 12, padding: '12px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: themeColor1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>🔗</div>
            <div>
              <div style={{ fontWeight: 700, color: '#111827' }}>Portfolio Link</div>
              <a href={item.startsWith('http') ? item : `https://${item}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: themeColor1, textDecoration: 'none' }}>
                {item}
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return renderItem(item);
    }
  };

  const renderPanelContent = (section: Section) => {
    if (section === 'Skills') {
      const items = skillsList;
      return (
        <div style={{ padding: isMobile ? 12 : 16 }}>
          {items.map((it, idx) => <div key={idx}>{renderItem(it)}</div>)}
        </div>
      );
    }
    if (section === 'Services') {
      const items = servicesList;
      return <div style={{ padding: isMobile ? 12 : 16 }}>{items.map((it, idx) => <div key={idx}>{renderItem(it)}</div>)}</div>;
    }
    if (section === 'Portfolio') {
      const items = portfolioList;
      return <div style={{ padding: isMobile ? 12 : 16 }}>{items.map((it, idx) => <div key={idx}>{renderPortfolioItem(it)}</div>)}</div>;
    }
    if (section === 'Experience') {
      const items = experienceList;
      return <div style={{ padding: isMobile ? 12 : 16 }}>{items.map((it, idx) => <div key={idx}>{renderItem(it)}</div>)}</div>;
    }
    if (section === 'Review') {
      const items = reviewList;
      return <div style={{ padding: isMobile ? 12 : 16 }}>{items.map((it, idx) => <div key={idx}>{renderItem(it)}</div>)}</div>;
    }
    return null;
  };

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: "360px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        background: `linear-gradient(135deg, ${themeColor1} 0%, ${themeColor2} 100%)`,
        border: `3px solid ${themeColor1}`,
      }}>
        {/* Cover Image Section - Exact copy from edit page */}
        <div style={{
          width: "100%", 
          height: "120px", 
          overflow: "hidden",
          backgroundImage: cover ? "none" : `linear-gradient(135deg, ${themeColor1}, ${themeColor2})`,
          backgroundSize: cover ? "cover" : "auto",
          backgroundPosition: cover ? "center" : "initial",
          backgroundColor: cover ? "transparent" : "transparent"
        }}>
          {cover && (
            <img src={cover} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          )}
        </div>
        
        {/* Main Content Section - Exact copy from edit page */}
        <div style={{ padding: "24px", textAlign: "center" }}>
          <div style={{
            width: "80px", 
            height: "80px", 
            borderRadius: "12px", 
            overflow: "hidden",
            margin: "0 auto 16px", 
            background: photo ? "transparent" : themeColor1,
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
          }}>
            {photo ? (
              <img src={photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "32px", fontWeight: 700, color: "white" }}>{firstLetter}</span>
            )}
          </div>
          {name && <h3 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: 700, color: "#FFFFFF" }}>{name}</h3>}
          {title && <p style={{ margin: "0 0 4px", fontSize: "16px", color: "#FFFFFF", fontWeight: 600, opacity: 0.95 }}>{title}</p>}
          {company && <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#FFFFFF" }}>{company}</p>}
          {location && <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#FFFFFF" }}>{location}</p>}
          <p style={{ fontSize: "13px", lineHeight: 1.5, color: "#FFFFFF", margin: "0 0 20px", opacity: 0.9 }}>{about}</p>
          
          {/* Social Icons - Only show when data exists */}
          {(email || phone || linkedin || website) && (
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              {email && (
                <a href={`mailto:${email}`} onClick={(e) => e.stopPropagation()} style={{
                  width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
                  border: "1px solid rgba(255, 255, 255, 0.4)"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <rect x="4" y="6" width="16" height="12" rx="2" ry="2"/>
                    <path d="M4 8l8 5 8-5"/>
                  </svg>
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} onClick={(e) => e.stopPropagation()} style={{
                  width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
                  border: "1px solid rgba(255, 255, 255, 0.4)"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.63A2 2 0 01 3.08 2h3a2 2 0 01 2 1.72 12.84 12.84 0 00 .7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 00 6 6l1.27-1.27a2 2 0 01 2.11-.45 12.84 12.84 0 00 2.81.7A2 2 0 01 22 16.92z"/>
                  </svg>
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{
                  width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
                  border: "1px solid rgba(255, 255, 255, 0.4)"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4zM8.5 8.5h3.8v1.98h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.3c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.34V23h-4z"/>
                  </svg>
                </a>
              )}
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{
                  width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
                  border: "1px solid rgba(255, 255, 255, 0.4)"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
          
          {/* Section Buttons - Only show when data exists */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginTop: "16px" }}>
            {[
              { text: "Services", value: services },
              { text: "Portfolio", value: portfolio },
              { text: "Skills", value: skills },
              { text: "Experience", value: experience },
              { text: "Review", value: review },
            ]
            .filter(b => b.value && b.value.trim() !== '')
            .map((b) => (
              <button
                key={b.text}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePanel(b.text as Section);
                }}
                style={{
                  padding: "8px 14px",
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                }}
              >
                {b.text}
              </button>
            ))}
          </div>
        </div>
        
        {activePanel && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }} onClick={() => setActivePanel(null)}>
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ width: isMobile ? '100%' : 'calc(100% - 24px)', maxWidth: 520, height: isMobile ? '100%' : 'auto', maxHeight: isMobile ? '100%' : '80%', background: '#fff', borderRadius: isMobile ? 0 : 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative' }}
            >
              <div style={{ background: `linear-gradient(135deg, ${themeColor1} 0%, ${themeColor2} 100%)`, color: '#fff', padding: isMobile ? '16px' : '18px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{activePanel}</div>
              </div>
              <button onClick={() => setActivePanel(null)} aria-label="Close" style={{ position: 'absolute', top: 10, right: 10, width: 36, height: 36, borderRadius: 9999, border: 'none', background: 'rgba(0,0,0,0.6)', color: '#fff', cursor: 'pointer', zIndex: 10 }}>×</button>
              <div style={{ padding: 16, background: isMobile ? '#f3f4f6' : '#fff', overflowY: 'auto', height: isMobile ? 'calc(100% - 72px)' : 'auto' }}>
                {renderPanelContent(activePanel)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlatCardPreview;
