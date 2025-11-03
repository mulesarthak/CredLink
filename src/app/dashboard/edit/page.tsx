'use client'
import React, { useState } from 'react';

const EditPage = () => {
  const [activeTab, setActiveTab] = useState('Display'); // Initialize with 'Display'
  const [selectedColor, setSelectedColor] = useState('#145dfd'); // New state for selected color
  const [firstName, setFirstName] = useState('Yaasnick');
  const [email, setEmail] = useState('yaasnick01@gmail.com');
  const [phone, setPhone] = useState('+91 75584 24907');
  const [emailLink, setEmailLink] = useState('');
  const [phoneLink, setPhoneLink] = useState('');
  const [selectedDesign, setSelectedDesign] = useState('Classic'); // New state for selected design
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
  const [selectedFont, setSelectedFont] = useState('Arial, sans-serif'); // New state for selected font
  const [cardName, setCardName] = useState(''); // New state for card name
  const [cardType, setCardType] = useState('Personal'); // New state for card type (Personal/Professional)
  const [bannerImage, setBannerImage] = useState<string | null>(null); // New state for banner image
  const [cardLocation, setCardLocation] = useState('California, USA'); // New state for card location
  const [cardDescription, setCardDescription] = useState('A modern digital visiting card for software designer showcasing professional details, social links, and portfolio'); // New state for card description

  // New state for RGB and Hex values
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

  const initialRgb = hexToRgb(selectedColor);
  const [rValue, setRValue] = useState(initialRgb.r);
  const [gValue, setGValue] = useState(initialRgb.g);
  const [bValue, setBValue] = useState(initialRgb.b);
  const [hexValue, setHexValue] = useState(selectedColor);

  // Effect to update RGB/Hex when selectedColor changes externally
  React.useEffect(() => {
    const newRgb = hexToRgb(selectedColor);
    setRValue(newRgb.r);
    setGValue(newRgb.g);
    setBValue(newRgb.b);
    setHexValue(selectedColor);
  }, [selectedColor]);

  // Handlers for individual color component changes
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
        {/* Design Section */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Design</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
            {['Classic', 'Flat', 'Modern', 'Sleek', 'Blend'].map((design, index) => (
              <div
                key={design}
                    onClick={() => setSelectedDesign(design)}
                style={{
                      border: design === selectedDesign ? `2px solid ${selectedColor}` : '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '10px',
                      width: 'clamp(80px, calc(50% - 10px), 100px)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: 'white'
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
                {/* Design thumbnail */}
                <div style={{
                  width: '80px',
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
                <span style={{ fontSize: '14px', color: '#555' }}>{design}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Banner Image Upload (Only for 'Classic' design if it's the new template) */}
        {selectedDesign === 'Classic' && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Banner Image <span style={{ backgroundColor: '#145dfd', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '5px', marginLeft: '10px' }}>PRO</span></h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="banner-image-upload"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
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
                  padding: '10px 20px',
                  fontSize: '16px',
                  color: '#555',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  outline: 'none'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                Add Banner Image
              </button>
            </div>
          </div>
        )}

        {/* Profile Photo Section */}
        <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Profile Photo <span style={{ backgroundColor: '#145dfd', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '5px', marginLeft: '10px' }}>PRO</span></h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
                <input
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                  id="profile-media-upload"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
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
              padding: '10px 20px',
              fontSize: '16px',
              color: '#555',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              outline: 'none'
                  }}
                >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              Add Photo or Video
            </button>
          </div>
        </div>

        {/* Color Section */}
        <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Color <span style={{ backgroundColor: '#145dfd', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '5px', marginLeft: '10px' }}>PRO</span></h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Native Color Picker */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="color"
                    value={hexValue}
                    onChange={handleColorInputChange}
                    style={{ width: '50px', height: '30px', border: 'none', padding: '0' }}
                  />
                  <span style={{ fontSize: '16px', color: '#555' }}>Select Color</span>
                </div>

                {/* RGB Inputs */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label style={{ fontSize: '16px', color: '#555' }}>R:</label>
                  <input
                    type="number"
                    value={rValue}
                    onChange={handleRChange}
                    min="0"
                    max="255"
                    style={{
                      width: '70px',
                      padding: '8px',
                      fontSize: '16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                  <label style={{ fontSize: '16px', color: '#555' }}>G:</label>
                  <input
                    type="number"
                    value={gValue}
                    onChange={handleGChange}
                    min="0"
                    max="255"
                    style={{
                      width: '70px',
                      padding: '8px',
                      fontSize: '16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                  <label style={{ fontSize: '16px', color: '#555' }}>B:</label>
                  <input
                    type="number"
                    value={bValue}
                    onChange={handleBChange}
                    min="0"
                    max="255"
                    style={{
                      width: '70px',
                      padding: '8px',
                      fontSize: '16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Hex Input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ fontSize: '16px', color: '#555' }}>Hex:</label>
                  <input
                    type="text"
                    value={hexValue}
                    onChange={handleHexChange}
                    maxLength={7}
                    style={{
                      width: '120px',
                      padding: '8px',
                      fontSize: '16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Font Section */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Font</h3>
              <div style={{ position: 'relative', width: '100%', maxWidth: '250px' }}>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px 15px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    appearance: 'none',
                  cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {[ 'Arial, sans-serif', 'Verdana, sans-serif', 'Tahoma, sans-serif', 'Georgia, serif', 'Times New Roman, serif', 'Courier New, monospace', 'Lucida Console, monospace', 'Garamond, serif', 'Palatino, serif', 'Impact, sans-serif' ].map(font => (
                    <option key={font} value={font}>{font.split(',')[0]}</option>
                  ))}
                </select>
                <span style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#555'
                }}>Default</span>
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
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Personal</h3>
            {/* Input Field: Prefix */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Prefix</label>
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: First Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  backgroundColor: '#f8f8f8',
                  color: '#555',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Middle Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Middle Name</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Last Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Suffix */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Suffix</label>
              <input
                type="text"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Accreditations */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Accreditations</label>
              <input
                type="text"
                value={accreditations}
                onChange={(e) => setAccreditations(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Preferred Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Preferred Name</label>
              <input
                type="text"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Maiden Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Maiden Name</label>
              <input
                type="text"
                value={maidenName}
                onChange={(e) => setMaidenName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Pronouns */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Pronouns</label>
              <input
                type="text"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Affiliation */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Affiliation</label>
              <input
                type="text"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Title */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Department */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Company */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Headline */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Location */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Location</label>
              <input
                type="text"
                value={cardLocation}
                onChange={(e) => setCardLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
            </div>

            {/* Input Field: Description */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Description</label>
              <textarea
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
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
            {/* Additional Fields Section */}
            <div style={{ marginBottom: '30px', border: '1px solid #eee', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', color: '#333' }}>Additional Fields <span style={{ fontSize: '14px', color: '#888', fontWeight: 'normal' }}>(?)</span></h3>
              </div>

              {/* Email Field */}
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '20px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ cursor: 'grab', color: '#aaa' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Email
                  </span>
                  <span style={{ cursor: 'pointer', color: '#888' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
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
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Phone Field */}
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ cursor: 'grab', color: '#aaa' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Phone
                  </span>
                  <span style={{ cursor: 'pointer', color: '#888' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', backgroundColor: '#f8f8f8', flexGrow: '1' }}>
                    <span style={{ marginRight: '8px' }}>🇮🇳</span>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '16px',
                        color: '#555',
                        flexGrow: '1'
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="# Extension"
                    value={phoneLink}
                    onChange={(e) => setPhoneLink(e.target.value)}
                    style={{
                      width: '120px',
                      minWidth: '80px',
                      padding: '10px',
                      fontSize: '16px',
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
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Fields Section */}
            <div style={{ marginBottom: '30px' }}>
              {/* Search Bar */}
              
              {/* Categories */}
              
              
              
            </div>

          </div>
        );
      case 'Card':
        return (
          <div>
            {/* Warning Message */}
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
              fontSize: '14px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              This field does not appear on the card.
            </div>

            {/* Name Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Name</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #145dfd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>

            {/* Card Type Dropdown */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Card Type</label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
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

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px', boxSizing: 'border-box' }}>
      {/* Left Card Display */}
      <div style={{
        flexBasis: 'min(100%, 350px)',
        flexGrow: '0',
        flexShrink: '1',
        maxWidth: '100%',
        height: 'clamp(450px, 90vh, 600px)', // Increased height to accommodate new content
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginRight: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Top purple wave section */}
        <div style={{
          width: '100%',
          height: '150px',
          backgroundColor: selectedDesign !== 'Classic' ? selectedColor : 'transparent',
          borderRadius: '10px 10px 0 0',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '0' // Remove bottom margin
        }}>
          {selectedDesign === 'Classic' && (
            <div style={{
              width: '100%',
              height: '120px', // Adjusted height to make more of the banner visible
              borderRadius: '10px',
              position: 'relative',
              // Conditionally set background properties
              ...(bannerImage ? {
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              } : {
                backgroundColor: selectedColor // Make the background color changeable
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
          {/* Profile Photo on Card - Positioned in the middle of the blue section */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: '#eee',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: selectedDesign === 'Classic' ? '80px' : '50%', // Adjusted to prevent cutting off
            left: '50%',
            transform: 'translate(-50%, -50%)', // Centering both horizontally and vertically relative to its container
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            border: `4px solid ${selectedColor}`,
            zIndex: 10,
          }}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            )}
          </div>
        </div>

        {/* User Info */}
        <div style={{
          width: '100%',
          textAlign: 'center',
          padding: '0 10px',
          marginTop: selectedDesign === 'Classic' ? '70px' : '40px', // Adjusted marginTop to prevent overlap
          color: '#333',
          fontFamily: selectedFont
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px', marginTop: '0', color: selectedColor, fontFamily: selectedFont }}>
            {cardName || `${prefix} ${firstName} ${middleName} ${lastName} ${suffix}`}
          </h2>
          {(cardType === 'Professional' && title && company) && (
            <p style={{ fontSize: '16px', color: selectedColor, marginBottom: '5px', fontFamily: selectedFont }}>
              {title} | {company}
            </p>
          )}
          {cardLocation && <p style={{ fontSize: '14px', color: selectedColor, marginBottom: '15px', fontFamily: selectedFont }}>{cardLocation}</p>}

          {/* Social Icons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ backgroundColor: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </span>
            <span style={{ backgroundColor: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </span>
            <span style={{ backgroundColor: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </span>
            <span style={{ backgroundColor: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={selectedColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </span>
          </div>

          {cardDescription && (
            <p style={{ fontSize: '14px', color: 'white', textAlign: 'center', marginBottom: '20px', padding: '0 10px', fontFamily: selectedFont }}>
              {cardDescription}
            </p>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', width: '100%', padding: '0 10px' }}>
            <button style={{
              backgroundColor: 'white',
              border: `1px solid ${selectedColor}`,
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: selectedColor,
              cursor: 'pointer',
              outline: 'none',
              flexBasis: 'calc(50% - 10px)', // Two buttons per row on larger screens
              maxWidth: '150px'
            }}>
              Services
            </button>
            <button style={{
              backgroundColor: 'white',
              border: `1px solid ${selectedColor}`,
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: selectedColor,
              cursor: 'pointer',
              outline: 'none',
              flexBasis: 'calc(50% - 10px)',
              maxWidth: '150px'
            }}>
              Portfolio
            </button>
            <button style={{
              backgroundColor: 'white',
              border: `1px solid ${selectedColor}`,
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: selectedColor,
              cursor: 'pointer',
              outline: 'none',
              flexBasis: 'calc(50% - 10px)',
              maxWidth: '150px'
            }}>
              Links
            </button>
            <button style={{
              backgroundColor: 'white',
              border: `1px solid ${selectedColor}`,
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: selectedColor,
              cursor: 'pointer',
              outline: 'none',
              flexBasis: 'calc(50% - 10px)',
              maxWidth: '150px'
            }}>
              Experience
            </button>
            <button style={{
              backgroundColor: 'white',
              border: `1px solid ${selectedColor}`,
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: selectedColor,
              cursor: 'pointer',
              outline: 'none',
              flexBasis: 'calc(50% - 10px)',
              maxWidth: '150px'
            }}>
              Review
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
          <button style={{
            backgroundColor: 'transparent',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px 25px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#555',
            cursor: 'pointer',
            outline: 'none'
          }}>
            Cancel
          </button>
          <button style={{
            backgroundColor: selectedColor,
            border: 'none',
            borderRadius: '8px',
            padding: '12px 25px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'white',
            cursor: 'pointer',
            outline: 'none'
          }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
