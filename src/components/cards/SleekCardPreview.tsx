"use client";

import React from "react";
import { DigitalCardProps } from "./DigitalCardPreview";

const SleekCardPreview: React.FC<DigitalCardProps & { themeColor1?: string; themeColor2?: string }> = ({
  name = "",
  title = "",
  company = "",
  location = "",
  about = "Crafting engaging content & SEO strategies",
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

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: "360px", 
        borderRadius: "4px", 
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", 
        fontFamily: "system-ui, sans-serif",
        background: `linear-gradient(135deg, ${themeColor1} 0%, ${themeColor2} 100%)`, 
        border: `1px solid #e5e5e5`, 
        position: 'relative'
      }}>
        {/* Header Section with Cover and Profile - Exact copy from edit page */}
        <div style={{
          height: "120px", 
          background: cover ? `url(${cover})` : `linear-gradient(135deg, ${themeColor1}, ${themeColor2})`,
          backgroundSize: cover ? "cover" : "auto",
          backgroundPosition: cover ? "center" : "initial",
          position: "relative", 
          display: "flex", 
          alignItems: "flex-end", 
          padding: "20px"
        }}>
          {/* Overlay for better text readability when cover image is present */}
          {cover && (
            <div style={{
              position: "absolute", 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              background: "rgba(0,0,0,0.3)"
            }}></div>
          )}
          <div style={{
            width: "60px", 
            height: "60px", 
            borderRadius: "2px", 
            overflow: "hidden",
            background: photo ? "transparent" : "rgba(255,255,255,0.2)",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            border: "2px solid rgba(255,255,255,0.3)", 
            position: "relative", 
            zIndex: 2
          }}>
            {photo ? (
              <img src={photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>{firstLetter}</span>
            )}
          </div>
          <div style={{ marginLeft: "16px", color: "white", position: "relative", zIndex: 2 }}>
            {name && <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 600, color: "#FFFFFF" }}>{name}</h3>}
            {title && <p style={{ margin: "0", fontSize: "13px", opacity: 0.9, color: "#FFFFFF" }}>{title}</p>}
          </div>
        </div>
        
        {/* Main Content Section - Exact copy from edit page */}
        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: "16px" }}>
            {company && <p style={{ margin: "0 0 4px", fontSize: "14px", color: "#FFFFFF", fontWeight: 500 }}>{company}</p>}
            {location && <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#FFFFFF" }}>{location}</p>}
            <p style={{ fontSize: "12px", lineHeight: 1.5, color: "#FFFFFF", margin: "0", opacity: 0.9 }}>{about}</p>
          </div>
          
          {/* Social Links Section - Exact copy from edit page with flex layout */}
          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
            <div style={{ display: "flex", gap: "1px" }}>
              <a href={`mailto:${email}`} style={{
                flex: 1, padding: "10px", background: themeColor1, textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 600
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginRight: 6 }}>
                  <rect x="4" y="6" width="16" height="12" rx="2" ry="2"/>
                  <path d="M4 8l8 5 8-5"/>
                </svg>
              </a>
              <a href={`tel:${phone}`} style={{
                flex: 1, padding: "10px", background: themeColor1, textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 600
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginRight: 6 }}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.63A2 2 0 013.08 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
              <a href={linkedin} style={{
                flex: 1, padding: "10px", background: themeColor1, textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 600
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" style={{ marginRight: 6 }}>
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4zM8.5 8.5h3.8v1.98h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.3c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.34V23h-4z"/>
                </svg>
              </a>
              <a href={website} style={{
                flex: 1, padding: "10px", background: themeColor1, textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 600
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginRight: 6 }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 010 20a15.3 15.3 0 010-20z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleekCardPreview;
