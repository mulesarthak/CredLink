'use client';

import React, { useState } from 'react';

const AccountSettingsPage = () => {
  const [accountPhoto, setAccountPhoto] = useState<string | null>(null);
  const [name, setName] = useState<string>('Yaasnick');
  const [email, setEmail] = useState<string>('yaasnick01@gmail.com');
  const [password, setPassword] = useState<string>('**********');

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
    // Implement actual email change logic here (e.g., open a modal, redirect to a new page)
  };

  const handleResetPasswordClick = () => {
    console.log('Reset Password clicked!');
    // Implement actual password reset logic here (e.g., open a modal, send a reset email)
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '30px' }}>Account</h1>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#6A1B9A',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '1.8em',
          fontWeight: 'bold',
          marginRight: '15px'
        }}>
          Y
        </div>
        <div>
          <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Yaasnick</div>
          <div style={{ color: '#555' }}>yaasnick01@gmail.com</div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ fontSize: '1.1em', fontWeight: 'bold', marginBottom: '10px' }}>Name</div>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          style={{
            width: '300px',
            padding: '10px',
            fontSize: '1em',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
          
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ fontSize: '1.1em', fontWeight: 'bold', marginBottom: '10px' }}>Account Photo</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '15px',
            fontSize: '2em',
            color: '#aaa',
            overflow: 'hidden'
          }}>
            {accountPhoto ? (
              <img src={accountPhoto} alt="Account" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              '&#128100;'
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
            padding: '10px 15px',
            fontSize: '1em',
            backgroundColor: '#e0e0e0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            + Add Photo
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ fontSize: '1.1em', fontWeight: 'bold', marginBottom: '10px' }}>Email</div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          style={{
            width: '300px',
            padding: '10px',
            fontSize: '1em',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px'
          }}
        />
        <button style={{
          padding: '10px 15px',
          fontSize: '1em',
          backgroundColor: '#e0e0e0',
          border: '1px solid #ccc',
          borderRadius: '5px',
          cursor: 'pointer'
        }} onClick={handleChangeEmailClick}>
          Change Email
        </button>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ fontSize: '1.1em', fontWeight: 'bold', marginBottom: '10px' }}>Password</div>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          style={{
            width: '300px',
            padding: '10px',
            fontSize: '1em',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px'
          }}
          
        />
        <button style={{
          padding: '10px 15px',
          fontSize: '1em',
          backgroundColor: '#e0e0e0',
          border: '1px solid #ccc',
          borderRadius: '5px',
          cursor: 'pointer'
        }} onClick={handleResetPasswordClick}>
          Reset Password
        </button>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ fontSize: '1.1em', fontWeight: 'bold', marginBottom: '10px' }}>Delete</div>
        <button style={{
          padding: '10px 15px',
          fontSize: '1em',
          backgroundColor: '#ffcccc',
          color: '#cc0000',
          border: '1px solid #cc0000',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Delete Account
        </button>
      </div>

    </div>
  );
};

export default AccountSettingsPage;
