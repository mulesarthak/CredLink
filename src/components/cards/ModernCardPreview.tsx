"use client";

import React from "react";
import { DigitalCardProps } from "./DigitalCardPreview";
import styles from './cardType.module.css';

const ModernCardPreview: React.FC<DigitalCardProps & { themeColor1?: string; themeColor2?: string }> = ({
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
  cardType = "",
}) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "J";

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: "360px", 
        borderRadius: "20px", 
        overflow: "hidden",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)", 
        fontFamily: "system-ui, sans-serif",
        background: `linear-gradient(135deg, ${themeColor1} 0%, ${themeColor2} 100%)`,
        border: "1px solid rgba(255,255,255,0.2)", 
        backdropFilter: "blur(10px)", 
        position: 'relative'
      }}>
        {/* Card Type Pill */}
        {cardType && cardType.trim() !== "" && (
          <div 
            className={styles.cardTypePill}
            style={{ 
              '--pill-bg': themeColor1 || '#2563eb'
            } as React.CSSProperties}
          >
            {cardType}
          </div>
        )}
        {/* Cover Image Section - Exact copy from edit page */}
        <div style={{
          width: "100%", 
          height: "140px", 
          overflow: "hidden",
          backgroundImage: cover ? "none" : `linear-gradient(135deg, ${themeColor1}, ${themeColor2})`,
          backgroundSize: cover ? "cover" : "auto",
          backgroundPosition: cover ? "center" : "initial",
          backgroundColor: cover ? "transparent" : "transparent",
          borderRadius: "20px 20px 0 0"
        }}>
          {cover && (
            <img src={cover} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          )}
        </div>
        
        {/* Main Content Section - Exact copy from edit page */}
        <div style={{ padding: "28px", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{
              width: "64px", 
              height: "64px", 
              borderRadius: "50%", 
              overflow: "hidden",
              background: photo ? "transparent" : `linear-gradient(135deg, ${themeColor1}, ${themeColor2})`,
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              border: `2px solid ${themeColor1}40`
            }}>
              {photo ? (
                <img src={photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: "24px", fontWeight: 700, color: "white" }}>{firstLetter}</span>
              )}
            </div>
            <div>
              {name && <h3 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: 700, color: "#FFFFFF" }}>{name}</h3>}
              {title && <p style={{ margin: "0 0 2px", fontSize: "14px", color: "#FFFFFF", fontWeight: 600, opacity: 0.95 }}>{title}</p>}
              {company && <p style={{ margin: "0", fontSize: "13px", color: "#FFFFFF" }}>{company}</p>}
            </div>
          </div>
          
          {location && <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={themeColor1} strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {location}
          </p>}
          
          <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#FFFFFF", margin: "0 0 24px", opacity: 0.9 }}>{about}</p>
          
          {/* Social Icons Grid - Only show when data exists */}
          {(email || phone || linkedin || website) && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {email && (
                <a href={`mailto:${email}`} style={{
                  padding: "12px", borderRadius: "12px", background: `${themeColor1}10`,
                  border: `1px solid ${themeColor1}30`, textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "8px", color: "#FFFFFF", fontSize: "12px", fontWeight: 600
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="6" width="16" height="12" rx="2" ry="2"/>
                    <path d="M4 8l8 5 8-5"/>
                  </svg>
                  Email
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} style={{
                  padding: "12px", borderRadius: "12px", background: `${themeColor1}10`,
                  border: `1px solid ${themeColor1}30`, textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "8px", color: "#FFFFFF", fontSize: "12px", fontWeight: 600
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ marginRight: 2 }}>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  Call
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{
                  padding: "12px", borderRadius: "12px", background: `${themeColor1}10`,
                  border: `1px solid ${themeColor1}30`, textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "8px", color: "#FFFFFF", fontSize: "12px", fontWeight: 600
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" style={{ marginRight: 2 }}>
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4zM8.5 8.5h3.8v1.98h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.3c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.34V23h-4z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" style={{
                  padding: "12px", borderRadius: "12px", background: `${themeColor1}10`,
                  border: `1px solid ${themeColor1}30`, textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "8px", color: "#FFFFFF", fontSize: "12px", fontWeight: 600
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 010 20a15.3 15.3 0 010-20z"/>
                  </svg>
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernCardPreview;
