"use client";

import React, { useState, useEffect } from "react";

/* -------------------------------------------------
   COLORS & STYLES
   ------------------------------------------------- */
const colors = {
  primary: "#3B82F6",
  darkBlue: "#1E40AF",
  lightBlue: "#60A5FA",
  orange: "#FB923C",
  purple: "#8B5CF6",
  white: "#FFFFFF",
  lightGray: "#F3F4F6",
  mint: "#D1FAE5",
  textGray: "#4B5563",
  textLight: "#6B7280",
};

/* -------------------------------------------------
   DIGITAL CARD PREVIEW COMPONENT
   ------------------------------------------------- */
interface DigitalCardProps {
  name: string;
  title: string;
  location: string;
  about: string;
  skills: string;
  portfolio: string;
  experience: string;
  photo?: string;
}

const DigitalCardPreview: React.FC<DigitalCardProps> = ({
  name = "John Doe",
  title = "Digital Marketer & Creator",
  location = "Mumbai",
  about = "Crafting engaging content & SEO strategies",
  skills = "SEO, Content Creation, Analytics, Social Media",
  portfolio = "[Link] Latest Campaigns",
  experience = "Lead SEO Specialist @ TechCorp (2021-Present)",
  photo = "",
}) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "J";
  return (
    <div
      style={{
        width: "360px",
        background: colors.white,
        borderRadius: "28px",
        overflow: "hidden",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* Header - Blue Gradient */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.darkBlue} 100%)`,
          padding: "24px 20px",
          color: colors.white,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glossy overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative", zIndex: 1 }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid rgba(255,255,255,0.3)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: photo ? "transparent" : "#60A5FA",
            }}
          >
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ fontSize: "28px", fontWeight: "700", color: "white" }}>
                {firstLetter}
              </span>
            )}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>{name}</h3>
            <p style={{ margin: "4px 0 0", fontSize: "14px", opacity: 0.9 }}>{title}</p>
            <p style={{ margin: "2px 0 0", fontSize: "13px", opacity: 0.8 }}>Location: {location}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px" }}>
        {/* About */}
        <div style={{ marginBottom: "16px" }}>
          <strong style={{ fontSize: "14px", color: colors.textGray }}>About</strong>
          <div
            style={{
              marginTop: "6px",
              padding: "10px 12px",
              background: colors.mint,
              borderRadius: "12px",
              fontSize: "13px",
              color: "#065F46",
              lineHeight: "1.5",
            }}
          >
            {about}
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: "16px" }}>
          <strong style={{ fontSize: "14px", color: colors.textGray }}>Skills</strong>
          <div
            style={{
              marginTop: "6px",
              padding: "10px 12px",
              background: "#ECFEFF",
              borderRadius: "12px",
              fontSize: "13px",
              color: "#0C4A6E",
            }}
          >
            {skills}
          </div>
        </div>

        {/* Portfolio */}
        <div style={{ marginBottom: "16px" }}>
          <strong style={{ fontSize: "14px", color: colors.textGray }}>Portfolio</strong>
          <div
            style={{
              marginTop: "6px",
              padding: "10px 12px",
              background: "#F0FDF4",
              borderRadius: "12px",
              fontSize: "13px",
              color: "#166534",
            }}
          >
            {portfolio}
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: "20px" }}>
          <strong style={{ fontSize: "14px", color: colors.textGray }}>Experience</strong>
          <div
            style={{
              marginTop: "6px",
              padding: "10px 12px",
              background: "#FEF3C7",
              borderRadius: "12px",
              fontSize: "13px",
              color: "#92400E",
            }}
          >
            {experience}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          <button
            style={{
              padding: "8px 16px",
              background: colors.primary,
              color: colors.white,
              border: "none",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(59, 130, 246, 0.3)",
            }}
          >
            Connect
          </button>
          <button
            style={{
              padding: "8px 16px",
              background: colors.purple,
              color: colors.white,
              border: "none",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(139, 92, 246, 0.3)",
            }}
          >
            Follow
          </button>
          <button
            style={{
              padding: "8px 16px",
              background: colors.lightBlue,
              color: colors.white,
              border: "none",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(96, 165, 250, 0.3)",
            }}
          >
            Call
          </button>
          <button
            style={{
              padding: "8px 16px",
              background: colors.orange,
              color: colors.white,
              border: "none",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(251, 146, 60, 0.3)",
            }}
          >
            Website
          </button>
        </div>

        {/* Share */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "13px", color: colors.textLight }}>Share:</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "16px" }}>WhatsApp</span>
            </div>
            <div style={{ width: "28px", height: "28px", background: "#0077B5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "16px" }}>LinkedIn</span>
            </div>
            <div style={{ width: "28px", height: "28px", background: "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "16px" }}>Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------
   MAIN ONBOARDING PAGE
   ------------------------------------------------- */
const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    photo: "",
    name: "",
    title: "",
    location: "",
    about: "",
    skills: "",
    portfolio: "",
    experience: "",
  });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleContinue = () => {
    if (step === 1 && !formData.name.trim()) {
      alert('Please enter your name to continue.');
      return;
    }
    if (step === 2 && !formData.title.trim()) {
      alert('Please enter your professional title to continue.');
      return;
    }
    if (step === 3 && !formData.location.trim()) {
      alert('Please enter your location to continue.');
      return;
    }
    if (step === 5 && !formData.about.trim()) {
      alert('Please enter information about yourself to continue.');
      return;
    }
    if (step === 6 && !formData.skills.trim()) {
      alert('Please enter your skills to continue.');
      return;
    }

    if (step < 9) setStep(step + 1);
    else alert('Card Created! Ready to share.');
  };

  /* -------------------------------------------------
     RESPONSIVE STYLES
     ------------------------------------------------- */
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isLargeScreen ? 'row' : 'column',
    minHeight: '100vh',
    background: '#f8fafc',
  };

  const leftPanelStyle: React.CSSProperties = {
    flex: 1,
    display: isLargeScreen ? 'flex' : 'none', // HIDDEN ON MOBILE
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: '0',
    background: '#E5E7EB',
    position: 'relative',
    overflow: 'hidden',
  };

  const rightPanelStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    background: '#ffffff',
    width: isLargeScreen ? 'auto' : '100%',
  };

  const fullImageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    position: 'relative',
    zIndex: 10,
  };

  const inputStyle = (id: string) => ({
    width: '100%',
    border: 'none',
    borderBottom: '2px solid #D1D5DB',
    outline: 'none',
    fontSize: '18px',
    padding: '8px 0',
    marginBottom: '24px',
    background: 'transparent',
    transition: 'border-color 200ms',
    color: '#1F2937',
    ...(focusedInput === id ? { borderBottom: `2px solid ${colors.primary}` } : {}),
  });

  /* -------------------------------------------------
     STEP 0: WELCOME SCREEN
     ------------------------------------------------- */
  if (step === 0) {
    return (
      <div style={containerStyle}>
        {/* LEFT – FULL SCREEN IMAGE */}
        <div style={leftPanelStyle}>
          <img
            src="/assests/Welcome0.png"
            alt="Collection of Digital Cards"
            style={fullImageStyle}
          />
        </div>

        {/* RIGHT – GET STARTED */}
        <div style={rightPanelStyle}>
          <div style={{ maxWidth: '448px', textAlign: 'center' }}>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: '700',
                color: '#1F2937',
              }}
            >
              Welcome to{' '}
              <span
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                CredLink
              </span>
            </h1>
            <p
              style={{
                color: colors.textLight,
                margin: '16px 0 32px',
              }}
            >
              Build connections in your own unique way.
            </p>
            <button
              onClick={() => setStep(1)}
              style={{
                padding: '14px 36px',
                background: `linear-gradient(135deg, ${colors.orange} 0%, #F97316 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------
     STEPS 1–9: FORM + LIVE PREVIEW
     ------------------------------------------------- */
  return (
    <div style={containerStyle}>
      {/* LEFT: Digital Card Preview + Floating Shapes (Hidden on Mobile) */}
      <div style={leftPanelStyle}>
        {/* Floating 3D Shapes */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
            borderRadius: '20px',
            transform: 'rotate(-15deg)',
            boxShadow:
              '0 20px 60px rgba(59, 130, 246, 0.4), inset -5px -5px 20px rgba(0, 0, 0, 0.1), inset 5px 5px 20px rgba(255, 255, 255, 0.3)',
          }}
        ></div>

        <div
          style={{
            position: 'absolute',
            top: '40%',
            right: '15%',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
            borderRadius: '18px',
            transform: 'rotate(25deg)',
            boxShadow:
              '0 20px 60px rgba(168, 85, 247, 0.4), inset -5px -5px 20px rgba(0, 0, 0, 0.1), inset 5px 5px 20px rgba(255, 255, 255, 0.3)',
          }}
        ></div>

        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '8%',
            width: '110px',
            height: '110px',
            background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
            borderRadius: '18px',
            transform: 'rotate(10deg)',
            boxShadow:
              '0 20px 60px rgba(34, 211, 238, 0.4), inset -5px -5px 20px rgba(0, 0, 0, 0.1), inset 5px 5px 20px rgba(255, 255, 255, 0.3)',
          }}
        ></div>

        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            right: '5%',
            width: '130px',
            height: '130px',
            background: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
            borderRadius: '20px',
            transform: 'rotate(-20deg)',
            boxShadow:
              '0 20px 60px rgba(251, 146, 60, 0.4), inset -5px -5px 20px rgba(0, 0, 0, 0.1), inset 5px 5px 20px rgba(255, 255, 255, 0.3)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              width: '20px',
              height: '20px',
              color: 'white',
              fontSize: '20px',
              opacity: 0.9,
            }}
          >
            Sparkle
          </div>
        </div>

        {/* Card Preview */}
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          boxSizing: 'border-box',
        }}>
          <DigitalCardPreview
            name={formData.name || 'John Doe'}
            title={formData.title || 'Digital Marketer & Creator'}
            location={formData.location || 'Mumbai'}
            about={formData.about || 'Crafting engaging content & SEO strategies'}
            skills={formData.skills || 'SEO, Content Creation, Analytics, Social Media'}
            portfolio={formData.portfolio || '[Link] Latest Campaigns'}
            experience={formData.experience || 'Lead SEO Specialist @ TechCorp (2021-Present)'}
            photo={formData.photo}
          />
        </div>
      </div>

      {/* RIGHT: Form (Always Visible) */}
      <div style={rightPanelStyle}>
        <div style={{ maxWidth: '448px', width: '100%' }}>
          <h1
            style={{
              fontSize: '30px',
              fontWeight: '700',
              marginBottom: '24px',
              background: `linear-gradient(135deg, ${colors.darkBlue}, ${colors.primary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {step === 1 && 'Your Name'}
            {step === 2 && 'Professional Title'}
            {step === 3 && 'Location'}
            {step === 4 && 'Profile Photo'}
            {step === 5 && 'About You'}
            {step === 6 && 'Skills'}
            {step === 7 && 'Portfolio'}
            {step === 8 && 'Experience'}
            {step === 9 && 'Review & Create'}
          </h1>

          {/* Form Fields */}
          {step === 1 && (
            <input
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              style={inputStyle('name')}
            />
          )}
          {step === 2 && (
            <input
              placeholder="Digital Marketer & Creator"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              onFocus={() => setFocusedInput('title')}
              onBlur={() => setFocusedInput(null)}
              style={inputStyle('title')}
            />
          )}
          {step === 3 && (
            <input
              placeholder="Mumbai"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              onFocus={() => setFocusedInput('location')}
              onBlur={() => setFocusedInput(null)}
              style={inputStyle('location')}
            />
          )}
          {step === 4 && (
            <div style={{ textAlign: 'center' }}>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({ ...formData, photo: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ display: 'none' }}
              />
              <label
                htmlFor="photo-upload"
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '3px dashed #D1D5DB',
                  cursor: 'pointer',
                  background: formData.photo ? 'transparent' : '#F3F4F6',
                  transition: 'all 200ms',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span
                      style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#9CA3AF',
                      }}
                    >
                      Upload Photo
                    </span>
                  </>
                )}
              </label>
            </div>
          )}
          {step === 5 && (
            <textarea
              placeholder="Crafting engaging content & SEO strategies"
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              onFocus={() => setFocusedInput('about')}
              onBlur={() => setFocusedInput(null)}
              style={{ ...inputStyle('about'), height: '80px', resize: 'none' }}
            />
          )}
          {step === 6 && (
            <input
              placeholder="SEO, Content Creation, Analytics, Social Media"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              onFocus={() => setFocusedInput('skills')}
              onBlur={() => setFocusedInput(null)}
              style={inputStyle('skills')}
            />
          )}
          {step === 7 && (
            <input
              placeholder="[Link] Latest Campaigns"
              value={formData.portfolio}
              onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
              onFocus={() => setFocusedInput('portfolio')}
              onBlur={() => setFocusedInput(null)}
              style={inputStyle('portfolio')}
            />
          )}
          {step === 8 && (
            <input
              placeholder="Lead SEO Specialist @ TechCorp (2021-Present)"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              onFocus={() => setFocusedInput('experience')}
              onBlur={() => setFocusedInput(null)}
              style={inputStyle('experience')}
            />
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {(step === 4 || step === 7 || step === 8) && (
              <button
                onClick={() => setStep(step + 1)}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  background: '#E5E7EB',
                  color: '#6B7280',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Skip
              </button>
            )}
            <button
              onClick={handleContinue}
              disabled={
                (step === 1 && !formData.name.trim()) ||
                (step === 2 && !formData.title.trim()) ||
                (step === 3 && !formData.location.trim()) ||
                (step === 5 && !formData.about.trim()) ||
                (step === 6 && !formData.skills.trim())
              }
              style={{
                flex: (step === 4 || step === 7 || step === 8) ? 1 : 'auto',
                width: (step === 4 || step === 7 || step === 8) ? 'auto' : '100%',
                padding: '14px 0',
                background: (
                  (step === 1 && !formData.name.trim()) ||
                  (step === 2 && !formData.title.trim()) ||
                  (step === 3 && !formData.location.trim()) ||
                  (step === 5 && !formData.about.trim()) ||
                  (step === 6 && !formData.skills.trim())
                )
                  ? '#D1D5DB'
                  : `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: (
                  (step === 1 && !formData.name.trim()) ||
                  (step === 2 && !formData.title.trim()) ||
                  (step === 3 && !formData.location.trim()) ||
                  (step === 5 && !formData.about.trim()) ||
                  (step === 6 && !formData.skills.trim())
                )
                  ? 'not-allowed'
                  : 'pointer',
                opacity: (
                  (step === 1 && !formData.name.trim()) ||
                  (step === 2 && !formData.title.trim()) ||
                  (step === 3 && !formData.location.trim()) ||
                  (step === 5 && !formData.about.trim()) ||
                  (step === 6 && !formData.skills.trim())
                )
                  ? 0.6
                  : 1,
              }}
            >
              {step < 9 ? 'Continue' : 'Create Card'}
            </button>
          </div>

          {/* Progress Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "32px" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div
                key={i}
                style={{
                  width: "40px",
                  height: "4px",
                  borderRadius: "9999px",
                  backgroundColor: i <= step ? colors.primary : "#E5E7EB",
                  transition: "all 300ms",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;