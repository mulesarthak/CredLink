'use client'
import React, { useState, useEffect } from 'react';

// ====================================================================
// START: DigitalCardPreview Component (Modified to accept theme)
// ====================================================================

interface DigitalCardProps {
  name: string;
  title: string;
  company?: string;
  location: string;
  about: string;
  skills: string;
  portfolio: string;
  experience: string;
  services: string; // Added prop
  review: string; // Added prop
  photo?: string | null;
  cover?: string | null;
  email?: string;
  phone?: string;
  linkedin?: string;
  website?: string;
  themeColor1: string; // Changed to themeColor1
  themeColor2: string; // New prop for second color
  fontFamily: string; 
}

const DigitalCardPreview: React.FC<DigitalCardProps> = ({
  name = "",
  title = "",
  company = "",
  location = "",
  about = "Crafting engaging content & SEO strategies",
  skills = "SEO, Content Creation, Analytics, Social Media",
  portfolio = "[Link] Latest Campaigns",
  experience = "Lead SEO Specialist @ TechCorp (2021-Present)",
  services = "SEO Audits, Slogan Content Campaigns", // Added
  review = "John transformed our online presence!, Happy Client", // Added
  photo = "",
  cover = "",
  email = "",
  phone = "",
  linkedin = "",
  website = "",
  themeColor1, 
  themeColor2, 
  fontFamily, 
}) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "J";
  const parsedCompany = (() => {
    const atIndex = experience.indexOf('@');
    if (atIndex !== -1) {
      const afterAt = experience.slice(atIndex + 1).trim();
      const end = afterAt.indexOf('(');
      return (end !== -1 ? afterAt.slice(0, end) : afterAt).trim();
    }
    return '';
  })();
  const companyFinal = company && company.trim().length > 0 ? company : parsedCompany;

  type Section = 'Services' | 'Portfolio' | 'Skills' | 'Experience' | 'Review';
  const [activePanel, setActivePanel] = useState<Section | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Updated to use props
  const skillsList = skills.split(',').map((s) => s.trim()).filter(Boolean);
  const portfolioList = portfolio.split(',').map((s) => s.trim()).filter(Boolean);
  const experienceList = experience.split(',').map((s) => s.trim()).filter(Boolean);
  const servicesList = services.split(',').map((s) => s.trim()).filter(Boolean);
  const reviewList = review.split(',').map((s) => s.trim()).filter(Boolean);

  const renderItem = (title: string, subtitle?: string, key?: number) => (
    <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderRadius: 12, padding: '12px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: themeColor1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>★</div>
        <div>
          <div style={{ fontWeight: 700, color: '#111827' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: '#6B7280' }}>{subtitle}</div>}
        </div>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  );

  const renderPanelContent = (section: Section) => {
    if (section === 'Skills') {
      const items = skillsList.length ? skillsList : ['SEO Optimization (Advanced)', 'Content Strategy (Expert)', 'Analytics & Reporting'];
      return (
        <div style={{ padding: isMobile ? 12 : 16 }}>
          {items.map((it, idx) => renderItem(it, undefined, idx))}
        </div>
      );
    }
    if (section === 'Services') {
      // Changed to use prop
      const items = servicesList.length ? servicesList : ['SEO Audits', 'Slogan Content Campaigns'];
      return <div style={{ padding: isMobile ? 12 : 16 }}>{items.map((it, idx) => renderItem(it, undefined, idx))}</div>;
    }
    if (section === 'Portfolio') {
      const items = portfolioList.length ? portfolioList : ['Case Study 1', 'Project X', 'Client Y'];
      return <div style={{ padding: isMobile ? 12 : 16 }}>{items.map((it, idx) => renderItem(it, undefined, idx))}</div>;
    }
    if (section === 'Experience') {
      const items = experienceList.length ? experienceList : ['Senior Marketer (Present)', 'Marketing Executive'];
      return <div style={{ padding: isMobile ? 12 : 16 }}>{items.map((it, idx) => renderItem(it, undefined, idx))}</div>;
    }
    if (section === 'Review') {
      // Changed to use prop
      const items = reviewList.length ? reviewList : ['John transformed our online presence!', 'Happy Client'];
      return <div style={{ padding: isMobile ? 12 : 16 }}>{items.map((it, idx) => renderItem(it, undefined, idx))}</div>;
    }
    return null;
  };

  return (
    <div style={{
      width: "360px",
      borderRadius: "28px",
      overflow: "hidden",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      fontFamily: fontFamily, 
      position: "relative",
      background: `linear-gradient(135deg, ${themeColor1} 0%, ${themeColor2} 100%)`,
    }}>
      {/* Header */}
      <div style={{
        padding: "22px",
        color: "white",
        position: "relative",
      }}>
        <div style={{
          width: "100%",
          height: "92px",
          borderRadius: "14px",
          background: cover ? "transparent" : "rgba(255,255,255,0.15)",
          border: "2px solid rgba(255,255,255,0.7)",
          overflow: "hidden",
        }}>
          {cover && (
            <img src={cover} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "-44px" }}>
          <div style={{
            width: "104px",
            height: "104px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "5px solid #ffffff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            background: photo ? "transparent" : "#60A5FA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {photo ? (
              <img src={photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: "36px", fontWeight: 800, color: "white" }}>{firstLetter}</span>
            )}
          </div>

          {name && <h3 style={{ margin: "14px 0 8px", fontSize: "26px", fontWeight: 800, color: "#FFFFFF" }}>{name}</h3>}
          {(title || companyFinal) && (
            <div style={{ display: "flex", gap: "12px", alignItems: "center", color: "#ffffff", opacity: 0.95 }}>
              {title && <span style={{ fontSize: "14px", fontWeight: 700 }}>{title}</span>}
              {title && companyFinal && <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.8)" }} />}
              {companyFinal && <span style={{ fontSize: "14px", fontWeight: 700 }}>{companyFinal}</span>}
            </div>
          )}
          {location && <p style={{ margin: "10px 0 0", fontSize: "14px", color: "#FFFFFF" }}>{location}</p>}

          {/* Social Row */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}> 
            {/* Mail */}
            <div
              onClick={() => {
                if (email) window.location.href = `mailto:${email}`;
                else window.location.href = 'mailto:example@credlink.com';
              }}
              style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", cursor: "pointer" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4z" opacity="0"/>
                <path d="M4 8l8 5 8-5"/>
                <rect x="4" y="6" width="16" height="12" rx="2" ry="2"/>
              </svg>
            </div>
            {/* Phone */}
            <div
              onClick={() => {
                if (phone) window.location.href = `tel:${phone}`;
                else window.location.href = 'tel:+911234567890';
              }}
              style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", cursor: "pointer" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            {/* LinkedIn */}
            <div
              onClick={() => window.open(linkedin || 'https://linkedin.com', '_blank', 'noopener noreferrer')}
              style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", cursor: "pointer" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4zM8.5 8.5h3.8v1.98h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V23h-4v-6.3c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.34V23h-4z"/></svg>
            </div>
            {/* Globe */}
            <div
              onClick={() => window.open(website || 'https://credlink.com', '_blank', 'noopener noreferrer')}
              style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", cursor: "pointer" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 010 20a15.3 15.3 0 010-20z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 20px 16px", color: "#FFFFFF", textAlign: "center" }}>
        <p style={{ fontSize: "13px", lineHeight: 1.6, margin: 0, color: "#FFFFFF", opacity: 1 }}>
          {about}
        </p>

        {/* Pills */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginTop: "16px" }}>
          {[
            { text: "Services" },
            { text: "Portfolio" },
            { text: "Skills" },
            { text: "Experience" },
            { text: "Review" },
          ].map((b) => (
            <button
              key={b.text}
              onClick={() => setActivePanel(b.text as Section)}
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setActivePanel(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: isMobile ? '100%' : 520, height: isMobile ? '100%' : 'auto', maxHeight: isMobile ? '100%' : '80vh', background: '#fff', borderRadius: isMobile ? 0 : 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative' }}
          >
            <div style={{ background: `linear-gradient(135deg, ${themeColor1} 0%, ${themeColor2} 100%)`, color: '#fff', padding: isMobile ? '16px' : '18px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{activePanel}</div>
            </div>
            <button onClick={() => setActivePanel(null)} aria-label="Close" style={{ position: 'absolute', top: 10, right: 10, width: 36, height: 36, borderRadius: 9999, border: 'none', background: 'rgba(0,0,0,0.6)', color: '#fff', cursor: 'pointer', zIndex: 10 }}>×</button>
            <div style={{ padding: 16, background: isMobile ? '#f3f4f6' : '#fff', overflowY: 'auto', height: isMobile ? 'calc(100% - 72px)' : 'auto', maxHeight: 'calc(80vh - 72px)' }}>
              {renderPanelContent(activePanel)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ====================================================================
// START: EditPage Component
// ====================================================================

// Define interface for the new fields
interface ExtraField {
  id: number;
  name: string;
  link: string;
}

const EditPage = () => {
  const [activeTab, setActiveTab] = useState('Display');
  const [selectedColor, setSelectedColor] = useState('#145dfd');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailLink, setEmailLink] = useState('');
  const [phoneLink, setPhoneLink] = useState('');
  const [selectedDesign, setSelectedDesign] = useState('Classic');
  const [prefix, setPrefix] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [accreditations, setAccreditations] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [maidenName, setMaidenName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [company, setCompany] = useState('');
  const [headline, setHeadline] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [selectedFont, setSelectedFont] = useState('Arial, sans-serif');
  const [cardName, setCardName] = useState('');
  const [cardType, setCardType] = useState('Personal');
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [cardLocation, setCardLocation] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [displayTypes, setDisplayTypes] = useState<string[]>(['Classic']);
  const [existingCardId, setExistingCardId] = useState<string | null>(null); // Track if user has a card

  // Fetch profile data and existing card on component mount
  useEffect(() => {
    getProfile();
    getExistingCard();
  }, []);

  // Fetch existing card
  const getExistingCard = async () => {
    try {
      const response = await fetch('/api/card', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.cards && data.cards.length > 0) {
          // Get the first/most recent card
          const card = data.cards[0];
          setExistingCardId(card.id);
          console.log('Found existing card:', card.id);
        }
      }
    } catch (error) {
      console.error('Error fetching existing card:', error);
    }
  };

  // Fetch profile data
  const getProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched profile:', data);
        const user = data.user;

        // Populate all fields with fetched data or keep empty
        setFirstName(user.firstName || '');
        setMiddleName(user.middleName || '');
        setLastName(user.lastName || '');
        setPrefix(user.prefix || '');
        setSuffix(user.suffix || '');
        setPreferredName(user.preferredName || '');
        setMaidenName(user.maidenName || '');
        setPronouns(user.pronouns || '');
        setTitle(user.title || '');
        setCompany(user.company || '');
        setDepartment(user.department || '');
        setAffiliation(user.affiliation || '');
        setHeadline(user.headline || '');
        setAccreditations(user.accreditations || '');
        setEmail(user.email || '');
        setPhone(user.phone || '');
        setEmailLink(user.emailLink || '');
        setPhoneLink(user.phoneLink || '');
        setCardLocation(user.location || '');
        setCardName(user.cardName || '');
        setCardType(user.cardType || 'Personal');
        setSelectedDesign(user.selectedDesign || 'Classic');
        setSelectedColor(user.selectedColor || '#145dfd');
        setSelectedFont(user.selectedFont || 'Arial, sans-serif');
        setProfileImage(user.profileImage || null);
        setBannerImage(user.bannerImage || null);
        setCardDescription(user.bio || '');
        
        // Parse displayTypes if it exists
        if (user.displayTypes) {
          try {
            const parsed = JSON.parse(user.displayTypes);
            setDisplayTypes(Array.isArray(parsed) ? parsed : ['Classic']);
          } catch (e) {
            setDisplayTypes(['Classic']);
          }
        }
      } else {
        console.error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save profile data
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Step 1: Update profile data (without images) to User model
      const cookieStore = document.cookie;
      const token = cookieStore.split('; ').find(row => row.startsWith('user_token='))?.split('=')[1];

      const profileResponse = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          prefix,
          suffix,
          preferredName,
          maidenName,
          pronouns,
          title,
          company,
          department,
          affiliation,
          headline,
          accreditations,
          email,
          phone,
          emailLink,
          phoneLink,
          location: cardLocation,
          cardName,
          cardType,
          selectedDesign,
          selectedColor,
          selectedFont,
          displayTypes,
          bio: cardDescription,
          // Note: profileImage and bannerImage are NOT sent here
        }),
      });

      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        console.error('Failed to save profile:', errorData);
        alert(`Failed to save profile: ${errorData.error || 'Unknown error'}`);
        return;
      }

      // Step 2: Create/update card with images
      const formData = new FormData();
      
      // Add all card fields
      formData.append('fullName', `${firstName || ''} ${middleName || ''} ${lastName || ''}`.trim() || 'Unnamed');
      if (firstName) formData.append('firstName', firstName);
      if (middleName) formData.append('middleName', middleName);
      if (lastName) formData.append('lastName', lastName);
      if (prefix) formData.append('prefix', prefix);
      if (suffix) formData.append('suffix', suffix);
      if (preferredName) formData.append('preferredName', preferredName);
      if (maidenName) formData.append('maidenName', maidenName);
      if (pronouns) formData.append('pronouns', pronouns);
      if (title) formData.append('title', title);
      if (company) formData.append('company', company);
      if (department) formData.append('department', department);
      if (affiliation) formData.append('affiliation', affiliation);
      if (headline) formData.append('headline', headline);
      if (accreditations) formData.append('accreditations', accreditations);
      if (email) formData.append('email', email);
      if (phone) formData.append('phone', phone);
      if (emailLink) formData.append('emailLink', emailLink);
      if (phoneLink) formData.append('phoneLink', phoneLink);
      if (cardLocation) formData.append('location', cardLocation);
      if (cardName) formData.append('cardName', cardName);
      if (cardType) formData.append('cardType', cardType);
      if (selectedDesign) formData.append('selectedDesign', selectedDesign);
      if (selectedColor) formData.append('selectedColor', selectedColor);
      if (selectedFont) formData.append('selectedFont', selectedFont);
      if (cardDescription) formData.append('bio', cardDescription);
      formData.append('status', 'active');

      // Add images only if files are selected (these go to card, not user profile)
      if (profileImageFile) {
        formData.append('profileImage', profileImageFile);
      }
      if (bannerImageFile) {
        formData.append('bannerImage', bannerImageFile);
      }

      // Create or update card based on whether one exists
      const cardEndpoint = existingCardId 
        ? `/api/card/update/${existingCardId}` 
        : '/api/card/create';
      const cardMethod = existingCardId ? 'PATCH' : 'POST';

      const cardResponse = await fetch(cardEndpoint, {
        method: cardMethod,
        credentials: 'include',
        body: formData,
      });

      if (cardResponse.ok) {
        const cardData = await cardResponse.json();
        alert('Profile and Card saved successfully!');
        console.log('Saved card:', cardData);
        
        // If we just created a card, save its ID for future updates
        if (!existingCardId && cardData.card?.id) {
          setExistingCardId(cardData.card.id);
        }
      } else {
        const errorData = await cardResponse.json();
        console.error('Failed to save card:', errorData);
        alert(`Profile saved, but card failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error saving:', err);
      alert('Error saving. Please check your connection.');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper function to convert file to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const [rValue, setRValue] = useState(20);
  const [gValue, setGValue] = useState(93);
  const [bValue, setBValue] = useState(253);
  const [hexValue, setHexValue] = useState('#145dfd');

  // Update RGB values when selectedColor changes
  React.useEffect(() => {
    const newRgb = hexToRgb(selectedColor);
    setRValue(newRgb.r);
    setGValue(newRgb.g);
    setBValue(newRgb.b);
    setHexValue(selectedColor);
  }, [selectedColor]);

  const handleRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const r = Number(e.target.value);
    if (!isNaN(r) && r >= 0 && r <= 255) {
      setRValue(r);
      const newHex = rgbToHex(r, gValue, bValue);
      setHexValue(newHex);
      setSelectedColor(newHex);
    }
  };

  const handleGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const g = Number(e.target.value);
    if (!isNaN(g) && g >= 0 && g <= 255) {
      setGValue(g);
      const newHex = rgbToHex(rValue, g, bValue);
      setHexValue(newHex);
      setSelectedColor(newHex);
    }
  };

  const handleBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const b = Number(e.target.value);
    if (!isNaN(b) && b >= 0 && b <= 255) {
      setBValue(b);
      const newHex = rgbToHex(rValue, gValue, b);
      setHexValue(newHex);
      setSelectedColor(newHex);
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value.toUpperCase();
    if (/^#([0-9A-F]{3}){1,2}$/.test(hex)) {
      setHexValue(hex);
      const newRgb = hexToRgb(hex);
      setRValue(newRgb.r);
      setGValue(newRgb.g);
      setBValue(newRgb.b);
      setSelectedColor(hex);
    }
  };

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value.toUpperCase();
    setHexValue(hex);
    const newRgb = hexToRgb(hex);
    setRValue(newRgb.r);
    setGValue(newRgb.g);
    setBValue(newRgb.b);
    setSelectedColor(hex);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Display':
        return (
          <>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Design</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                {['Classic', 'Flat', 'Modern', 'Sleek', 'Blend'].map((design, index) => (
                  <div
                    key={design}
                    onClick={() => {
                      setSelectedDesign(design);
                      // Add to displayTypes array if not already present
                      if (!displayTypes.includes(design)) {
                        setDisplayTypes([...displayTypes, design]);
                      }
                    }}
                    style={{
                      border: design === selectedDesign ? `2px solid ${selectedColor}` : '1px solid #ddd',
                      borderRadius: '10px',
                      padding: '10px',
                      width: 'calc(50% - 5px)',
                      minWidth: '80px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: displayTypes.includes(design) ? '#f0f9ff' : 'white'
                    }}
                  >
                    {index > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        backgroundColor: '#145dfd',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        borderRadius: '5px'
                      }}>
                        PRO
                      </span>
                    )}
                    <div style={{
                      width: '100%',
                      maxWidth: '80px',
                      height: '50px',
                      backgroundColor: index === 0 ? selectedColor : '#dcdcdc',
                      borderRadius: '5px',
                      marginBottom: '10px',
                      margin: '0 auto 10px auto',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {design === 'Classic' && (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: `url(${bannerImage || 'https://via.placeholder.com/80x50.png?text=Banner'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '5px 5px 0 0',
                          position: 'relative',
                        }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: '#eee',
                            position: 'absolute',
                            bottom: '-15px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            border: '2px solid white',
                            boxSizing: 'border-box',
                          }}></div>
                        </div>
                      )}
                      {design === 'Flat' && (
                        <div style={{ width: '100%', height: '100%', backgroundColor: selectedColor }}></div>
                      )}
                      {design === 'Modern' && (
                        <>
                          <div style={{ width: '100%', height: '60%', backgroundColor: selectedColor, borderRadius: '5px 5px 0 0' }}></div>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)' }}></div>
                        </>
                      )}
                      {design === 'Sleek' && (
                        <>
                          <div style={{ width: '100%', height: '70%', backgroundColor: selectedColor, borderRadius: '5px 5px 0 0' }}></div>
                          <div style={{ width: '60%', height: '10px', backgroundColor: 'white', position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', borderRadius: '5px' }}></div>
                        </>
                      )}
                      {design === 'Blend' && (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(to right bottom, ${selectedColor} 50%, #dcdcdc 50%)`,
                          borderRadius: '5px'
                        }}></div>
                      )}
                    </div>
                    <span style={{ fontSize: '12px', color: '#555' }}>{design}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedDesign === 'Classic' && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
                  Banner Image <span style={{ backgroundColor: '#145dfd', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '3px 6px', borderRadius: '5px', marginLeft: '8px' }}>PRO</span>
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="banner-image-upload"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setBannerImageFile(file);
                        setBannerImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <button
                    onClick={() => document.getElementById('banner-image-upload')?.click()}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '10px 15px',
                      fontSize: '14px',
                      color: '#555',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      outline: 'none',
                      width: '100%',
                      justifyContent: 'center'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    Add Banner Image
                  </button>
                </div>
              </div>
            )}

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
                Profile Photo <span style={{ backgroundColor: '#145dfd', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '3px 6px', borderRadius: '5px', marginLeft: '8px' }}>PRO</span>
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <input
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  id="profile-media-upload"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setProfileImageFile(file);
                      setProfileImage(URL.createObjectURL(file));
                    }
                  }}
                />
                <button
                  onClick={() => document.getElementById('profile-media-upload')?.click()}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '10px 15px',
                    fontSize: '14px',
                    color: '#555',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    outline: 'none',
                    flex: '1',
                    minWidth: '150px',
                    justifyContent: 'center'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  Add Photo or Video
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
                Color <span style={{ backgroundColor: '#145dfd', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '3px 6px', borderRadius: '5px', marginLeft: '8px' }}>PRO</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="color"
                    value={hexValue}
                    onChange={handleColorInputChange}
                    style={{ width: '50px', height: '30px', border: 'none', padding: '0' }}
                  />
                  <span style={{ fontSize: '14px', color: '#555' }}>Select Color</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: '1', minWidth: '60px' }}>
                    <label style={{ fontSize: '14px', color: '#555' }}>R:</label>
                    <input
                      type="number"
                      value={rValue}
                      onChange={handleRChange}
                      min="0"
                      max="255"
                      style={{
                        width: '100%',
                        padding: '6px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: '1', minWidth: '60px' }}>
                    <label style={{ fontSize: '14px', color: '#555' }}>G:</label>
                    <input
                      type="number"
                      value={gValue}
                      onChange={handleGChange}
                      min="0"
                      max="255"
                      style={{
                        width: '100%',
                        padding: '6px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: '1', minWidth: '60px' }}>
                    <label style={{ fontSize: '14px', color: '#555' }}>B:</label>
                    <input
                      type="number"
                      value={bValue}
                      onChange={handleBChange}
                      min="0"
                      max="255"
                      style={{
                        width: '100%',
                        padding: '6px',
                        fontSize: '14px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ fontSize: '14px', color: '#555' }}>Hex:</label>
                  <input
                    type="text"
                    value={hexValue}
                    onChange={handleHexChange}
                    maxLength={7}
                    style={{
                      flex: '1',
                      padding: '8px',
                      fontSize: '14px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>Font</h3>
              <div style={{ position: 'relative', width: '100%' }}>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    appearance: 'none',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {['Arial, sans-serif', 'Verdana, sans-serif', 'Tahoma, sans-serif', 'Georgia, serif', 'Times New Roman, serif', 'Courier New, monospace', 'Lucida Console, monospace', 'Garamond, serif', 'Palatino, serif', 'Impact, sans-serif'].map(font => (
                    <option key={font} value={font}>{font.split(',')[0]}</option>
                  ))}
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: selectedColor
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </>
        );
      case 'Information':
        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Personal</h3>
            {[
              { label: 'Prefix', value: prefix, setter: setPrefix },
              { label: 'First Name', value: firstName, setter: setFirstName },
              { label: 'Middle Name', value: middleName, setter: setMiddleName },
              { label: 'Last Name', value: lastName, setter: setLastName },
              { label: 'Suffix', value: suffix, setter: setSuffix },
              { label: 'Accreditations', value: accreditations, setter: setAccreditations },
              { label: 'Preferred Name', value: preferredName, setter: setPreferredName },
              { label: 'Maiden Name', value: maidenName, setter: setMaidenName },
              { label: 'Pronouns', value: pronouns, setter: setPronouns },
              { label: 'Affiliation', value: affiliation, setter: setAffiliation },
              { label: 'Title', value: title, setter: setTitle },
              { label: 'Department', value: department, setter: setDepartment },
              { label: 'Company', value: company, setter: setCompany },
              { label: 'Headline', value: headline, setter: setHeadline },
              { label: 'Location', value: cardLocation, setter: setCardLocation }
            ].map(field => (
              <div key={field.label} style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '5px' }}>{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    backgroundColor: field.label === 'First Name' ? '#f8f8f8' : 'white',
                    color: '#555',
                    outline: 'none'
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '5px' }}>Description</label>
              <textarea
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        );
      case 'Fields':
        return (
          <div>
            <div style={{ marginBottom: '30px', border: '1px solid #eee', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0', color: '#333' }}>Additional Fields <span style={{ fontSize: '14px', color: '#888', fontWeight: 'normal' }}>(?)</span></h3>
              </div>

              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '15px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ cursor: 'grab', color: '#aaa' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Email
                  </span>
                  <span style={{ cursor: 'pointer', color: '#888' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    backgroundColor: '#f8f8f8',
                    color: '#555',
                    outline: 'none',
                    marginBottom: '10px'
                  }}
                />
                <input
                  type="text"
                  placeholder="Link Box"
                  value={emailLink}
                  onChange={(e) => setEmailLink(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ cursor: 'grab', color: '#aaa' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Phone
                  </span>
                  <span style={{ cursor: 'pointer', color: '#888' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', backgroundColor: '#f8f8f8', flex: '1', minWidth: '150px' }}>
                    <span style={{ marginRight: '8px' }}>🇮🇳</span>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '14px',
                        color: '#555',
                        flex: '1',
                        width: '100%'
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="# Extension"
                    value={phoneLink}
                    onChange={(e) => setPhoneLink(e.target.value)}
                    style={{
                      width: '100px',
                      minWidth: '80px',
                      padding: '10px',
                      fontSize: '14px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Link Box"
                  value={phoneLink}
                  onChange={(e) => setPhoneLink(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        );
      case 'Card':
        return (
          <div>
            <div style={{
              backgroundColor: '#e0f7fa',
              border: '1px solid #b2ebf2',
              borderRadius: '8px',
              padding: '10px 15px',
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#00796b',
              fontSize: '13px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              This field does not appear on the card.
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '5px' }}>Name</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #145dfd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '5px' }}>Card Type</label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none',
                  backgroundColor: 'white',
                  appearance: 'none',
                }}
              >
                <option value="Personal">Personal</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f0f2f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #145dfd',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666', fontSize: '16px' }}>Loading your profile...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh', 
      backgroundColor: '#f0f2f5', 
      padding: '10px', 
      boxSizing: 'border-box',
      gap: '15px'
    }}>
      <style>{`
        @media (min-width: 768px) {
          .container {
            flex-direction: row !important;
            align-items: flex-start !important;
          }
          .card-preview {
            position: sticky !important;
            top: 20px !important;
            max-width: 350px !important;
          }
        }
      `}</style>

      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div className="card-preview" style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            width: '100%',
            height: '150px',
            backgroundColor: selectedDesign !== 'Classic' ? selectedColor : 'transparent',
            borderRadius: '10px 10px 0 0',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '0'
          }}>
            {selectedDesign === 'Classic' && (
              <div style={{
                width: '100%',
                height: '120px',
                borderRadius: '10px',
                position: 'relative',
                ...(bannerImage ? {
                  backgroundImage: `url(${bannerImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } : {
                  backgroundColor: selectedColor
                })
              }}></div>
            )}
            {selectedDesign === 'Flat' && (
              <div style={{ width: '100%', height: '100%', backgroundColor: selectedColor }}></div>
            )}
            {selectedDesign === 'Modern' && (
              <>
                <div style={{ width: '100%', height: '60%', backgroundColor: selectedColor, borderRadius: '10px 10px 0 0' }}></div>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', border: '5px solid #f0f2f5' }}></div>
              </>
            )}
            {selectedDesign === 'Sleek' && (
              <>
                <div style={{ width: '100%', height: '70%', backgroundColor: selectedColor, borderRadius: '10px 10px 0 0' }}></div>
                <div style={{ width: '80%', height: '20px', backgroundColor: 'white', position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', borderRadius: '5px' }}></div>
              </>
            )}
            {selectedDesign === 'Blend' && (
              <div style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(to right bottom, ${selectedColor} 50%, #dcdcdc 50%)`,
                borderRadius: '10px 10px 0 0'
              }}></div>
            )}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#eee',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: selectedDesign === 'Classic' ? '80px' : '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              border: `4px solid ${selectedColor}`,
              zIndex: 10,
            }}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              )}
            </div>
          </div>

          <div style={{
            width: '100%',
            textAlign: 'center',
            padding: '0 10px',
            marginTop: selectedDesign === 'Classic' ? '70px' : '40px',
            color: '#333',
            fontFamily: selectedFont
          }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: '5px', marginTop: '0', color: selectedColor, fontFamily: selectedFont }}>
              {cardName || `${prefix} ${firstName} ${middleName} ${lastName} ${suffix}`}
            </h2>
            {(cardType === 'Professional' && title && company) && (
              <p style={{ fontSize: 'clamp(14px, 4vw, 16px)', color: selectedColor, marginBottom: '5px', fontFamily: selectedFont }}>
                {title} | {company}
              </p>
            )}
            {cardLocation && <p style={{ fontSize: 'clamp(12px, 3.5vw, 14px)', color: selectedColor, marginBottom: '15px', fontFamily: selectedFont }}>{cardLocation}</p>}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4].map(i => (
                <span key={i} style={{ backgroundColor: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                  {i === 1 && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
                  {i === 2 && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>}
                  {i === 3 && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>}
                  {i === 4 && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>}
                </span>
              ))}
            </div>

            {cardDescription && (
              <p style={{ fontSize: 'clamp(12px, 3.5vw, 14px)', color: '#666', textAlign: 'center', marginBottom: '20px', padding: '0 10px', fontFamily: selectedFont }}>
                {cardDescription}
              </p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', width: '100%', padding: '0 10px' }}>
              {['Services', 'Portfolio', 'Links', 'Experience', 'Review'].map(btn => (
                <button key={btn} style={{
                  backgroundColor: 'white',
                  border: `1px solid ${selectedColor}`,
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: 'clamp(11px, 3vw, 14px)',
                  fontWeight: 'bold',
                  color: selectedColor,
                  cursor: 'pointer',
                  outline: 'none',
                  flexBasis: 'calc(50% - 4px)',
                  minWidth: '100px',
                  maxWidth: '150px'
                }}>
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: '20px', overflowX: 'auto' }}>
            {['Display', 'Information', 'Fields', 'Card'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 15px',
                  fontSize: 'clamp(13px, 3.5vw, 16px)',
                  fontWeight: 'bold',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? `2px solid ${selectedColor}` : 'none',
                  color: activeTab === tab ? selectedColor : '#777',
                  outline: 'none',
                  marginRight: '10px',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {renderContent()}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
            <button style={{
              backgroundColor: 'transparent',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: 'clamp(13px, 3.5vw, 16px)',
              fontWeight: 'bold',
              color: '#555',
              cursor: 'pointer',
              outline: 'none',
              flex: '1',
              minWidth: '100px'
            }}>
              Cancel
            </button>
            <button style={{
              backgroundColor: selectedColor,
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: 'clamp(13px, 3.5vw, 16px)',
              fontWeight: 'bold',
              color: 'white',
              cursor: 'pointer',
              outline: 'none',
              flex: '1',
              minWidth: '100px'
            }}>
              Save
            </button>
          </div>

        </div>

      </div>

      {/* Right Content Area */}
      <div style={{
        flexGrow: '1',
        flexBasis: 'min(700px, 100%)',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: '30px' }}>
          {['Display', 'Information', 'Fields', 'Card'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? `2px solid ${selectedColor}` : 'none',
                color: activeTab === tab ? selectedColor : '#777',
                outline: 'none',
                marginRight: '15px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Conditional Content Rendering */}
        {renderContent()}

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
          <button 
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '12px 25px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#555',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            style={{
              backgroundColor: isSaving ? '#ccc' : selectedColor,
              border: 'none',
              borderRadius: '8px',
              padding: '12px 25px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white',
              cursor: isSaving ? 'not-allowed' : 'pointer',
              outline: 'none'
            }}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;