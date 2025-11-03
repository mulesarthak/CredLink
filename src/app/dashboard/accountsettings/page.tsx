'use client';

import React, { useState } from 'react';

const AccountSettingsPage = () => {
  const [accountPhoto, setAccountPhoto] = useState<string | null>(null);
  const [name, setName] = useState<string>('Yaasnick');
  const [email, setEmail] = useState<string>('yaasnick01@gmail.com');
  const [password, setPassword] = useState<string>('**********');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [phoneNumber, setPhoneNumber] = useState<string>('+1234567890');
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [deleteReasons, setDeleteReasons] = useState<string[]>([]);
  const [deletePassword, setDeletePassword] = useState<string>('');

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setAccountPhoto(e.target.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeEmailClick = () => {
    console.log('Change Email clicked!');
  };

  const handleResetPasswordClick = () => {
    console.log('Reset Password clicked!');
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(prev => !prev);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleChangePhoneNumberClick = () => {
    console.log('Change Phone Number clicked!');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    console.log('Logging out...');
    setShowLogoutModal(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleDeleteAccountClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteReasonToggle = (reason: string) => {
    setDeleteReasons(prev => {
      if (prev.includes(reason)) {
        return prev.filter(r => r !== reason);
      } else {
        return [...prev, reason];
      }
    });
  };

  const handleDeleteSubmit = () => {
    if (deleteReasons.length > 0) {
      setShowDeleteModal(false);
      setShowPasswordModal(true);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteReasons([]);
  };

  const handleFinalDelete = () => {
    console.log('Account deleted with reasons:', deleteReasons);
    console.log('Password verified:', deletePassword);
    // Implement actual account deletion logic here
    setShowPasswordModal(false);
    setDeletePassword('');
    setDeleteReasons([]);
  };

  const handleCancelPasswordModal = () => {
    setShowPasswordModal(false);
    setDeletePassword('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      padding: '40px 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(0, 87, 210, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 87, 210, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse'
      }} />

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-30px); }
          }
          input:focus, button:hover {
            transform: translateY(-2px);
            transition: all 0.3s ease;
          }
        `}
      </style>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontSize: '3em',
          fontWeight: '800',
          marginBottom: '50px',
          background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          Account Settings
        </h1>

        {/* Profile Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 8px 32px rgba(0, 87, 210, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative corner lines */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '60px',
            height: '60px',
            borderTop: '3px solid rgba(255, 255, 255, 0.4)',
            borderLeft: '3px solid rgba(255, 255, 255, 0.4)',
            borderTopLeftRadius: '20px'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '60px',
            height: '60px',
            borderBottom: '3px solid rgba(255, 255, 255, 0.4)',
            borderRight: '3px solid rgba(255, 255, 255, 0.4)',
            borderBottomRightRadius: '20px'
          }} />
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffffff 0%, #e6f2ff 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#0057d2',
            fontSize: '2.5em',
            fontWeight: 'bold',
            marginRight: '25px',
            boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
            border: '3px solid rgba(255, 255, 255, 0.3)'
          }}>
            Y
          </div>
          <div>
            <div style={{
              fontSize: '1.8em',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '5px'
            }}>Yaasnick</div>
            <div style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1em',
              letterSpacing: '0.5px'
            }}>yaasnick01@gmail.com</div>
          </div>
        </div>

        {/* Settings Grid */}
        <div style={{ display: 'grid', gap: '25px' }}>
          
          {/* Name Field */}
          <div style={{
            background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            padding: '25px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 87, 210, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative accent line */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
            }} />
            <div style={{
              fontSize: '0.9em',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}>Name</div>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              style={{
                width: '100%',
                padding: '15px 20px',
                fontSize: '1.1em',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          {/* Account Photo */}
          <div style={{
            background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            padding: '25px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 87, 210, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative accent line */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
            }} />
            <div style={{
              fontSize: '0.9em',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}>Account Photo</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                borderRadius: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '20px',
                fontSize: '3em',
                color: '#ffffff',
                overflow: 'hidden',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                {accountPhoto ? (
                  <img src={accountPhoto} alt="Account" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  '👤'
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
                id="account-photo-upload"
              />
              <label htmlFor="account-photo-upload" style={{
                padding: '15px 30px',
                fontSize: '1em',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '10px',
                cursor: 'pointer',
                color: 'white',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                backdropFilter: 'blur(10px)'
              }}>
                + Upload Photo
              </label>
            </div>
          </div>

          {/* Email Field */}
          <div style={{
            background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            padding: '25px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 87, 210, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative accent line */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
            }} />
            <div style={{
              fontSize: '0.9em',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}>Email Address</div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              style={{
                width: '100%',
                padding: '15px 20px',
                fontSize: '1.1em',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease',
                marginBottom: '15px'
              }}
            />
            <button style={{
              padding: '12px 25px',
              fontSize: '0.95em',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#ffffff',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }} onClick={handleChangeEmailClick}>
              Change Email
            </button>
          </div>

          {/* Password Field */}
          <div style={{
            background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            padding: '25px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 87, 210, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative accent line */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
            }} />
            <div style={{
              fontSize: '0.9em',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}>Password</div>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              style={{
                width: '100%',
                padding: '15px 20px',
                fontSize: '1.1em',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease',
                marginBottom: '15px'
              }}
            />
            <button style={{
              padding: '12px 25px',
              fontSize: '0.95em',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#ffffff',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }} onClick={handleResetPasswordClick}>
              Reset Password
            </button>
          </div>

          {/* Phone Number Field */}
          <div style={{
            background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            padding: '25px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 87, 210, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative accent line */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
            }} />
            <div style={{
              fontSize: '0.9em',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}>Phone Number</div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              style={{
                width: '100%',
                padding: '15px 20px',
                fontSize: '1.1em',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease',
                marginBottom: '15px'
              }}
            />
            <button style={{
              padding: '12px 25px',
              fontSize: '0.95em',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#ffffff',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }} onClick={handleChangePhoneNumberClick}>
              Change Phone Number
            </button>
          </div>

          {/* Notifications Toggle */}
          <div style={{
            background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            padding: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 87, 210, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative accent line */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
            }} />
            <div style={{
              fontSize: '1em',
              fontWeight: '600',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}>Notifications</div>
            <label style={{ position: 'relative', display: 'inline-block', width: '70px', height: '40px' }}>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={handleNotificationsToggle}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: notificationsEnabled 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : 'rgba(255, 255, 255, 0.1)',
                transition: '.4s',
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
                color: 'white',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <span style={{ opacity: notificationsEnabled ? 1 : 0, transition: 'opacity .4s' }}>ON</span>
                <span style={{ opacity: notificationsEnabled ? 0 : 1, transition: 'opacity .4s' }}>OFF</span>
              </span>
              <span style={{
                position: 'absolute',
                height: '32px',
                width: '32px',
                backgroundColor: 'white',
                transition: '.4s',
                borderRadius: '50%',
                top: '4px',
                left: notificationsEnabled ? 'calc(100% - 36px)' : '4px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              }} />
            </label>
          </div>

          {/* Delete Account */}
          <div style={{
            background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            padding: '25px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 87, 210, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative accent line */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)'
            }} />
            <button style={{
              padding: '12px 25px',
              fontSize: '0.95em',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }} onClick={handleDeleteAccountClick}>
              Delete Account
            </button>
          </div>

          {/* Logout Button */}
          <div style={{ marginTop: '20px' }}>
            <button style={{
              padding: '18px 40px',
              fontSize: '1.1em',
              background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '700',
              width: '100%',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(0, 87, 210, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }} onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 87, 210, 0.5)',
            textAlign: 'center',
            width: '400px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <p style={{
              fontSize: '1.5em',
              marginBottom: '30px',
              color: '#ffffff',
              fontWeight: '600',
              letterSpacing: '1px'
            }}>Logout from this account?</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '15px' }}>
              <button style={{
                padding: '15px 35px',
                fontSize: '1em',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '700',
                flex: 1,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }} onClick={handleConfirmLogout}>
                Yes
              </button>
              <button style={{
                padding: '15px 35px',
                fontSize: '1em',
                background: 'rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '700',
                flex: 1,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }} onClick={handleCancelLogout}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Reason Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease',
          overflowY: 'auto',
          padding: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 87, 210, 0.5)',
            width: '500px',
            maxWidth: '90%',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            margin: 'auto'
          }}>
            <h2 style={{
              fontSize: '1.5em',
              marginBottom: '25px',
              color: '#ffffff',
              fontWeight: '600',
              letterSpacing: '1px',
              textAlign: 'center'
            }}>Why do you want to delete this account?</h2>
            
            <div style={{ marginBottom: '25px', textAlign: 'left' }}>
              {[
                'I have a duplicate account',
                "I don't find the platform useful",
                "I'm concerned about privacy or data security",
                'I receive too many emails or notifications',
                "I'm switching to another platform",
                "I'm facing technical issues or bugs",
                'I created this account by mistake',
                'Other'
              ].map((reason, index) => (
                <label key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  marginBottom: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: deleteReasons.includes(reason) ? '2px solid rgba(255, 255, 255, 0.5)' : '2px solid transparent'
                }}>
                  <input
                    type="checkbox"
                    checked={deleteReasons.includes(reason)}
                    onChange={() => handleDeleteReasonToggle(reason)}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '12px',
                      cursor: 'pointer',
                      accentColor: '#ffffff'
                    }}
                  />
                  <span style={{
                    color: '#ffffff',
                    fontSize: '1em',
                    fontWeight: '500'
                  }}>{reason}</span>
                </label>
              ))}
            </div>

            {deleteReasons.length > 0 && (
              <button style={{
                padding: '15px 35px',
                fontSize: '1em',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '700',
                width: '100%',
                marginBottom: '15px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }} onClick={handleDeleteSubmit}>
                Submit
              </button>
            )}

            <button style={{
              padding: '15px 35px',
              fontSize: '1em',
              background: 'rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              width: '100%',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }} onClick={handleCancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Password Confirmation Modal */}
      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0057d2 0%, #003d99 100%)',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 87, 210, 0.5)',
            width: '400px',
            maxWidth: '90%',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{
              fontSize: '1.5em',
              marginBottom: '25px',
              color: '#ffffff',
              fontWeight: '600',
              letterSpacing: '1px',
              textAlign: 'center'
            }}>Enter your password</h2>
            
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Password"
              style={{
                width: '100%',
                padding: '15px 20px',
                fontSize: '1.1em',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                color: '#ffffff',
                outline: 'none',
                marginBottom: '25px',
                boxSizing: 'border-box'
              }}
            />

            <button style={{
              padding: '15px 35px',
              fontSize: '1em',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              width: '100%',
              marginBottom: '15px',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }} onClick={handleFinalDelete}>
              Delete the Account
            </button>

            <button style={{
              padding: '15px 35px',
              fontSize: '1em',
              background: 'rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              width: '100%',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }} onClick={handleCancelPasswordModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettingsPage;