'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import '../app/globals.css';

export default function Homepage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background-white)' }}>
      {/* Hero Section */}
      <section className="section flex items-center" style={{ 
        background: 'linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 50%, #e1f5fe 100%)',
        minHeight: '100vh',
        paddingTop: '8rem',
        paddingBottom: '6rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Large Organic Blob Background - Left */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '60%',
          height: '120%',
          background: 'linear-gradient(135deg, rgba(108, 93, 184, 0.12) 0%, rgba(103, 58, 183, 0.08) 100%)',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          filter: 'blur(80px)',
          animation: 'float 15s ease-in-out infinite',
          transform: 'rotate(-10deg)'
        }}></div>

        {/* Large Organic Blob Background - Right */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-15%',
          width: '55%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(103, 58, 183, 0.08) 100%)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          filter: 'blur(80px)',
          animation: 'float 20s ease-in-out infinite reverse',
          transform: 'rotate(15deg)'
        }}></div>

        {/* Subtle gradient orbs */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(108, 93, 184, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'pulse 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '25%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(33, 150, 243, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'pulse 10s ease-in-out infinite reverse'
        }}></div>

        <div className="container mx-auto w-full" style={{ position: 'relative', zIndex: 10 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div style={{ 
              animation: 'fadeInUp 1s ease-out',
              position: 'relative'
            }}>
              <h1 className="heading-1" style={{ 
                color: '#1a1a2e'
              }}>
                The Future of Business Cards – <span className="gradient-text">Digital & Free</span>
              </h1>
              
              <p className="body-large" style={{ 
                color: '#5e35b1',
                maxWidth: '540px'
              }}>
                Your all-in-one solution to create, customize, and share digital business cards with ease.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/auth/signup" className="text-white rounded-full transition-all" style={{ 
                  paddingLeft: '2.5rem',
                  paddingRight: '2.5rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  border: 'none'
                }}>
                  <span>Get Started</span>
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/how-it-works" className="rounded-full transition-all" style={{ 
                  paddingLeft: '2.5rem',
                  paddingRight: '2.5rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  fontWeight: '600',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#6c5db8',
                  border: '2px solid rgba(108, 93, 184, 0.3)',
                  boxShadow: '0 4px 15px rgba(108, 93, 184, 0.1)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none'
                }}>
                  <span>Learn More</span>
                </Link>
              </div>
            </div>

            {/* Right Side - Blank Space */}
            <div className="relative flex justify-center items-center lg:justify-end" style={{ minHeight: '400px' }}>
              <div style={{ minHeight: '500px' }}>
                {/* Blank space for future content */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="section px-6 lg:px-12" style={{ background: '#6c5db8', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container mx-auto max-w-4xl">
          <div className="card card-elevated" style={{ 
            background: 'linear-gradient(135deg, #E0E7FF 0%, #EDE9FE 100%)',
            padding: '3rem 2rem',
            borderRadius: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
          }}>
            <div className="text-center" style={{ marginBottom: '2.5rem' }}>
              <h2 className="heading-3" style={{ 
                color: '#1e40af', 
                fontSize: '2rem', 
                fontWeight: '700',
                marginBottom: '0.75rem',
                lineHeight: '1.2'
              }}>
                Find Your Digital Card
              </h2>
              <p className="body-text" style={{ 
                color: '#64748B',
                fontSize: '1.05rem',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Search for professionals by name, company, or industry
              </p>
            </div>
            <div className="relative" style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div className="relative flex items-center">
                <svg 
                  className="absolute w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ 
                    left: '1.5rem',
                    color: '#94A3B8',
                    pointerEvents: 'none'
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, company, or industry..."
                  className="w-full rounded-full border-2 border-transparent focus:border-blue-500 focus:outline-none transition-all"
                  style={{ 
                    background: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    paddingLeft: '3.5rem',
                    paddingRight: '10rem',
                    paddingTop: '1.1rem',
                    paddingBottom: '1.1rem',
                    fontSize: '1rem',
                    color: '#6c5db8'
                  }}
                />
                <button 
                  className="absolute text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all"
                  style={{ 
                    right: '0.4rem',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    fontSize: '15px',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  Search
                </button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center" style={{ marginTop: '1.75rem', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: '#64748B',
                  fontWeight: '500',
                  marginRight: '0.25rem'
                }}>
                  Popular:
                </span>
                {['Marketing', 'Technology', 'Finance', 'Healthcare'].map((tag) => (
                  <button
                    key={tag}
                    className="bg-white hover:bg-blue-50 rounded-full transition-all"
                    style={{ 
                      paddingLeft: '1.25rem',
                      paddingRight: '1.25rem',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#2563EB',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                      border: '1px solid rgba(37, 99, 235, 0.1)',
                      cursor: 'pointer'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Digital Business Card */}
      <section className="section px-6 lg:px-12" style={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%)',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle background decoration */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(108, 93, 184, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(33, 150, 243, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>

        <div className="container mx-auto" style={{ position: 'relative', zIndex: 10 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="heading-2" style={{ 
                color: '#5e35b1',
                marginBottom: '1.5rem'
              }}>
                What is a <span style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Digital Business Card?</span>
              </h2>
              <p className="body-large" style={{ 
                color: '#64748B',
                marginBottom: '1.5rem'
              }}>
                A digital business card lets you share your contact info, social links, and professional details instantly — all in one tap or scan.
              </p>
              <p className="body-text" style={{ 
                color: '#94A3B8',
                marginBottom: '2rem'
              }}>
                Say goodbye to paper cards — connect smartly and sustainably.
              </p>
              <Link href="/auth/signup" className="text-white rounded-full transition-all" style={{ 
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                border: 'none'
              }}>
                <span>Get Started Free</span>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Right Side - Stats Cards */}
            <div className="grid grid-cols-1 gap-5">
              {[
                { stat: '100%', label: 'Growth Oriented', color: '#667eea' },
                { stat: '42%', label: 'Increase in Professional Connections', color: '#764ba2' },
                { stat: '70%', label: 'Better Follow-ups', color: '#5e35b1' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  borderRadius: '1.5rem',
                  padding: '2rem 2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  {/* Gradient accent line */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${item.color} 0%, transparent 100%)`
                  }}></div>

                  {/* Subtle glow effect */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-20%',
                    width: '200px',
                    height: '200px',
                    background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
                    borderRadius: '50%',
                    filter: 'blur(40px)'
                  }}></div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{
                      fontSize: '3rem',
                      fontWeight: '800',
                      background: `linear-gradient(135deg, ${item.color} 0%, #a78bfa 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.02em'
                    }}>
                      {item.stat}
                    </h3>
                    <p style={{
                      color: '#cbd5e1',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      margin: 0
                    }}>
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Build Credibility That Converts */}
      <section className="section px-6 lg:px-12" style={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 12s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 15s ease-in-out infinite reverse'
        }}></div>

        {/* Grid pattern overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.5
        }}></div>

        <div className="container mx-auto text-center" style={{ position: 'relative', zIndex: 10 }}>
          <h2 className="heading-2" style={{ 
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Build Credibility That <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Converts</span>
          </h2>
          <p className="body-large" style={{ 
            color: '#cbd5e1',
            maxWidth: '42rem',
            margin: '0 auto 3rem auto'
          }}>
            Showcase your expertise and build trust with powerful credibility features
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
                title: 'Verified badges',
                color: '#667eea'
              },
              { 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
                title: 'Add your reviews link (Google / LinkedIn / Certificates)',
                color: '#764ba2'
              },
              { 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />,
                title: 'Custom profile themes',
                color: '#8b5cf6'
              },
              { 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
                title: 'Smart analytics',
                color: '#a78bfa'
              }
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                padding: '2rem 1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}40`;
                e.currentTarget.style.borderColor = `${feature.color}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}>
                {/* Top accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${feature.color} 0%, transparent 100%)`
                }}></div>

                {/* Icon container */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 1.5rem auto',
                  borderRadius: '1rem',
                  background: `linear-gradient(135deg, ${feature.color}30 0%, ${feature.color}10 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${feature.color}40`,
                  position: 'relative'
                }}>
                  {/* Glow effect */}
                  <div style={{
                    position: 'absolute',
                    inset: '-10px',
                    background: `radial-gradient(circle, ${feature.color}20 0%, transparent 70%)`,
                    borderRadius: '1rem',
                    filter: 'blur(15px)',
                    zIndex: -1
                  }}></div>
                  
                  <svg style={{ 
                    width: '32px', 
                    height: '32px',
                    color: feature.color
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>

                {/* Title */}
                <h3 style={{
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  lineHeight: '1.5',
                  minHeight: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  {feature.title}
                </h3>

                {/* Checkmark */}
                <div style={{
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <svg style={{ width: '20px', height: '20px', color: feature.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: '500' }}>Included</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Every Professional Needs */}
      <section className="section py-20 px-6 lg:px-12" style={{
        background: 'linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 50%, #e1f5fe 100%)', // Light, futuristic gradient similar to hero
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1
      }}>
        {/* Subtle glowing orb background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          animation: 'float 12s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 15s ease-in-out infinite reverse'
        }}></div>

        <div className="container mx-auto" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="heading-2 text-center mb-16" style={{ color: '#000000', textShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>Why Every Professional Needs a <span className="gradient-text">Digital Business Card</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
                title: 'Control Every Detail — From Branding to Job Titles',
                desc: 'Manage your design, colors, and details anytime.'
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />,
                title: 'Share Your Digital Card Anywhere',
                desc: 'QR code, WhatsApp, email, or link — share it anywhere instantly.'
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />,
                title: 'Integrate Your Card With Popular Apps',
                desc: 'Connect seamlessly with your CRM or contact manager.'
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
                title: 'Designed for Privacy and Security',
                desc: 'Enterprise-grade data protection and easy admin control.'
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="card p-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out"
                style={{
                  background: 'linear-gradient(145deg, rgba(28, 28, 40, 0.9) 0%, rgba(15, 12, 41, 0.9) 100%)', // Darker card background
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                  transform: 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
                  e.currentTarget.style.border = '1px solid rgba(99, 102, 241, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.border = '1px solid rgba(99, 102, 241, 0.2)';
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #6366F1 0%, #9333EA 100%)', // Vibrant gradient for icon background
                    boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.3), 0 0 20px rgba(99, 102, 241, 0.6)',
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                  {/* Pulsing light effect */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    opacity: 0,
                    animation: 'iconPulse 2s infinite ease-out',
                    animationDelay: `${idx * 0.2}s`
                  }}></div>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#E0E7FF' }}>{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Watch Your Card Come to Life */}
      <section className="section px-6 lg:px-12" style={{ 
        background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Circles */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: 'rgba(59, 130, 246, 0.15)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '350px',
          height: '350px',
          background: 'rgba(139, 92, 246, 0.15)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        <div className="container mx-auto text-center" style={{ position: 'relative', zIndex: 10 }}>
          <h2 className="heading-2" style={{ 
            color: '#ffffff',
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Watch Your Card <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Come to Life</span>
          </h2>
          <p className="body-large" style={{ 
            color: '#cbd5e1',
            fontSize: '1.15rem',
            marginBottom: '3rem',
            maxWidth: '650px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.7'
          }}>
            Scan with your phone, customize your card, and share it instantly. Simple, interactive, and personalized.
          </p>
          
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(224, 231, 255, 0.95) 0%, rgba(237, 233, 254, 0.95) 100%)',
            padding: '4rem 3rem',
            borderRadius: '2rem',
            marginBottom: '2.5rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative corner elements */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '60px',
              height: '60px',
              border: '3px solid rgba(99, 102, 241, 0.3)',
              borderRight: 'none',
              borderBottom: 'none',
              borderRadius: '12px 0 0 0'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '60px',
              height: '60px',
              border: '3px solid rgba(139, 92, 246, 0.3)',
              borderLeft: 'none',
              borderTop: 'none',
              borderRadius: '0 0 12px 0'
            }}></div>

            <div style={{ 
              width: '200px',
              height: '200px',
              margin: '0 auto',
              borderRadius: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4), 0 0 0 8px rgba(255, 255, 255, 0.5)',
              position: 'relative',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ 
                width: '120px',
                height: '120px',
                color: '#ffffff',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1" />
              </svg>
              
              {/* Scanning animation line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                animation: 'scan 2s linear infinite'
              }}></div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/signup" className="text-white rounded-full transition-all" style={{ 
              paddingLeft: '2.5rem',
              paddingRight: '2.5rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              fontSize: '16px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
              cursor: 'pointer',
              display: 'inline-block',
              textDecoration: 'none'
            }}>
              Get Started
            </Link>
            <Link href="/customize" className="rounded-full transition-all" style={{ 
              paddingLeft: '2.5rem',
              paddingRight: '2.5rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              fontSize: '16px',
              fontWeight: '600',
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              display: 'inline-block',
              textDecoration: 'none'
            }}>
              Customize Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section py-20 px-6 lg:px-12" style={{ background: 'var(--background-white)' }}>
        <div className="container mx-auto">
          <h2 className="heading-2 text-center mb-16">What People Are <span className="gradient-text">Saying About Us</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Marketing Director', text: 'A super-easy way to connect with clients and colleagues — we switched from paper to digital in minutes!' },
              { name: 'Michael Chen', role: 'Sales Manager', text: 'The analytics feature helps us track our networking ROI. Game changer for our team!' },
              { name: 'Emily Rodriguez', role: 'Entrepreneur', text: 'Love how professional and modern my digital card looks. Gets compliments every time!' }
            ].map((testimonial, idx) => (
              <div key={idx} className="card card-elevated p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" style={{ color: 'var(--accent-yellow)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="body-text mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold" style={{ color: '#6c5db8' }}>{testimonial.name}</p>
                  <p className="description-small">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Digital Cards for Professionals */}
      <section className="section px-6 lg:px-12" style={{ 
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          opacity: '0.05',
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="container mx-auto" style={{ position: 'relative', zIndex: 10 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-2" style={{
                color: '#ffffff',
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}>
                Personalized Digital Cards for <span style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Professionals</span>
              </h2>
              <p className="body-large" style={{
                color: '#cbd5e1',
                fontSize: '1.1rem',
                marginBottom: '2rem',
                lineHeight: '1.7'
              }}>
                Build your identity online — share your card, track interactions, and stand out in your network.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Smart, shareable digital profile',
                  'Real-time updates anytime',
                  'Link all your socials & portfolio',
                  'Built for individuals and creators'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#ffffff', width: '16px', height: '16px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span style={{
                      color: '#e2e8f0',
                      fontSize: '1.05rem',
                      fontWeight: '500'
                    }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '2.5rem',
              borderRadius: '1.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 style={{
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>Get Your Free Digital Card</h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full rounded-lg" 
                  style={{
                    padding: '0.875rem 1.25rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                />
                <input 
                  type="text" 
                  placeholder="Company" 
                  className="w-full rounded-lg" 
                  style={{
                    padding: '0.875rem 1.25rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                />
                <input 
                  type="email" 
                  placeholder="Work Email" 
                  className="w-full rounded-lg" 
                  style={{
                    padding: '0.875rem 1.25rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                />
                <select 
                  className="w-full rounded-lg" 
                  style={{
                    padding: '0.875rem 1.25rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontSize: '1rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option style={{ background: '#2c3e50', color: '#ffffff' }}>Number of Employees</option>
                  <option style={{ background: '#2c3e50', color: '#ffffff' }}>1-10</option>
                  <option style={{ background: '#2c3e50', color: '#ffffff' }}>11-50</option>
                  <option style={{ background: '#2c3e50', color: '#ffffff' }}>51-200</option>
                  <option style={{ background: '#2c3e50', color: '#ffffff' }}>200+</option>
                </select>
                <button 
                  type="submit" 
                  className="w-full rounded-full" 
                  style={{
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#ffffff',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s',
                    textAlign: 'center'
                  }}
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section py-20 px-6 lg:px-12" style={{ background: '#eef1f9' }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="heading-2 text-center mb-16" style={{ color: '#1A1A2E' }}>How It <span className="gradient-text">Works</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.0 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 13a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                title: 'Create Your Profile',
                description: 'Sign up and enter your professional details.'
              },
              {
                icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
                title: 'Customize Your Digital Card',
                description: 'Design your card with themes, colors, and logos.'
              },
              {
                icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>,
                title: 'Share It Anywhere',
                description: 'Use a link or QR code to share your card instantly.'
              },
              {
                icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                title: 'Track Views & Leads',
                description: 'Monitor who views your card and generates leads.'
              }
            ].map((card, idx) => (
              <div key={idx} className="card p-6 text-center" style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #A855F7 0%, #D946EF 100%)', color: '#fff' }}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#334155' }}>{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section py-20 px-6 lg:px-12" style={{ background: 'linear-gradient(135deg, #6c5db8 0%, #8b7ac7 100%)' }}>
        <div className="container mx-auto text-center text-white flex flex-col items-center">
          <h2 className="heading-2 mb-6">Ready to Go Digital?</h2>
          <p className="body-large mb-8 max-w-2xl mx-auto">
            Join millions of professionals who have already made the switch to digital business cards.
          </p>
          <Link href="/auth/signup" className="btn btn-large px-12 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all" style={{ background: 'var(--background-white)', color: 'var(--primary-blue)' }}>
            Create Your Free Card Now
          </Link>
        </div>
      </section>

    </div>
  );
}