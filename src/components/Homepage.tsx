'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import '../app/globals.css';

export default function Homepage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ 
      background: 'linear-gradient(135deg, var(--background-light-blue) 0%, var(--background-purple-light) 50%, var(--background) 100%)'
    }}>
      {/* Hero Section */}
      <section className="section flex items-center px-4 sm:px-6 lg:px-12" style={{ 
        background: 'transparent',
        minHeight: '100vh',
        paddingTop: '2rem',
        paddingBottom: '2rem',
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div style={{ 
              animation: 'fadeInUp 1s ease-out',
              position: 'relative'
            }}>
              <h1 className="heading-1" style={{ 
                color: 'var(--foreground)'
              }}>
                The Future of Business Cards – <span className="gradient-text">Digital & Free</span>
              </h1>
              
              <p className="body-large" style={{ 
                color: 'var(--text-primary)',
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
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-colored)',
                  cursor: 'pointer',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}>
                  Get Started
                </Link>
                <Link href="/how-it-works" className="rounded-full transition-all" style={{ 
                  paddingLeft: '2.5rem',
                  paddingRight: '2.5rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                  fontWeight: '600',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: 'var(--primary-purple)',
                  border: '2px solid rgba(108, 93, 184, 0.3)',
                  backdropFilter: 'blur(10px)',
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

            {/* Right Side - Enhanced Digital Cards Showcase */}
            <div className="relative flex justify-center items-center order-1 lg:order-2" style={{ minHeight: '400px', overflow: 'hidden' }}>
              <div className="relative" style={{ maxWidth: '500px', width: '100%' }}>
                {/* Background Glow Effects */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '10%',
                    right: '20%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    animation: 'pulse 4s ease-in-out infinite'
                  }}
                ></div>
                
                {/* Modern Digital Cards Showcase */}
                <div 
                  style={{
                    width: '100%',
                    height: '500px',
                    position: 'relative',
                    animation: 'fadeInUp 1.2s ease-out 0.3s both'
                  }}
                >
                  {/* Central Phone Mockup */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '180px',
                      height: '360px',
                      background: 'linear-gradient(145deg, #1f2937 0%, #111827 100%)',
                      borderRadius: '25px',
                      padding: '8px',
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                      zIndex: 5,
                      animation: 'float 6s ease-in-out infinite'
                    }}
                  >
                    {/* Phone Screen */}
                    <div 
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '18px',
                        padding: '20px 15px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Profile Circle */}
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        background: 'rgba(255,255,255,0.9)', 
                        borderRadius: '50%', 
                        margin: '0 auto 15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#667eea'
                      }}>JS</div>
                      
                      {/* Name and Title */}
                      <div style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>John Smith</div>
                        <div style={{ fontSize: '10px', opacity: 0.8 }}>Senior Designer</div>
                      </div>
                      
                      {/* Contact Buttons */}
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
                        <div style={{ flex: 1, height: '25px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}></div>
                        <div style={{ flex: 1, height: '25px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}></div>
                      </div>
                      
                      {/* Social Icons */}
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        {[1,2,3,4].map(i => (
                          <div key={i} style={{ 
                            width: '20px', 
                            height: '20px', 
                            background: 'rgba(255,255,255,0.3)', 
                            borderRadius: '50%' 
                          }}></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating Card 1 - Top Left */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      width: '140px',
                      height: '90px',
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      borderRadius: '12px',
                      boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)',
                      transform: 'rotate(-8deg)',
                      animation: 'float 8s ease-in-out infinite',
                      zIndex: 3,
                      padding: '12px'
                    }}
                  >
                    <div style={{ color: 'white' }}>
                      <div style={{ width: '25px', height: '25px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', marginBottom: '8px' }}></div>
                      <div style={{ fontSize: '11px', fontWeight: 'bold' }}>Alex Chen</div>
                      <div style={{ fontSize: '9px', opacity: 0.8 }}>Product Manager</div>
                    </div>
                  </div>

                  {/* Floating Card 2 - Top Right */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '60px',
                      right: '10px',
                      width: '140px',
                      height: '90px',
                      background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                      borderRadius: '12px',
                      boxShadow: '0 20px 40px rgba(78, 205, 196, 0.3)',
                      transform: 'rotate(12deg)',
                      animation: 'float 8s ease-in-out infinite 2s',
                      zIndex: 2,
                      padding: '12px'
                    }}
                  >
                    <div style={{ color: 'white' }}>
                      <div style={{ width: '25px', height: '25px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', marginBottom: '8px' }}></div>
                      <div style={{ fontSize: '11px', fontWeight: 'bold' }}>Sarah Wilson</div>
                      <div style={{ fontSize: '9px', opacity: 0.8 }}>Marketing Lead</div>
                    </div>
                  </div>

                  {/* Floating Card 3 - Bottom */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '40px',
                      left: '60px',
                      width: '140px',
                      height: '90px',
                      background: 'linear-gradient(135deg, #a8e6cf 0%, #88d8a3 100%)',
                      borderRadius: '12px',
                      boxShadow: '0 20px 40px rgba(168, 230, 207, 0.3)',
                      transform: 'rotate(-5deg)',
                      animation: 'float 8s ease-in-out infinite 4s',
                      zIndex: 1,
                      padding: '12px'
                    }}
                  >
                    <div style={{ color: '#2d5a3d' }}>
                      <div style={{ width: '25px', height: '25px', background: 'rgba(45,90,61,0.2)', borderRadius: '50%', marginBottom: '8px' }}></div>
                      <div style={{ fontSize: '11px', fontWeight: 'bold' }}>Mike Johnson</div>
                      <div style={{ fontSize: '9px', opacity: 0.8 }}>Developer</div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50px',
                      right: '200px',
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '50%',
                      animation: 'pulse 3s ease-in-out infinite',
                      opacity: 0.7
                    }}
                  ></div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '100px',
                      left: '20px',
                      width: '25px',
                      height: '25px',
                      background: 'linear-gradient(135deg, #a8e6cf 0%, #88d8a3 100%)',
                      borderRadius: '50%',
                      animation: 'pulse 3s ease-in-out infinite 1s',
                      opacity: 0.6
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section id="search" className="section px-4 sm:px-6 lg:px-12 py-12 lg:py-20" style={{ background: 'transparent' }}>
        <div className="container mx-auto max-w-4xl">
          <div className="card card-elevated" style={{ 
            background: 'var(--gradient-light)',
            padding: '3rem 2rem',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div className="text-center" style={{ marginBottom: '2.5rem' }}>
              <h2 className="heading-3" style={{ 
                color: 'var(--primary-blue)', 
                fontSize: '2rem', 
                fontWeight: '700',
                marginBottom: '0.75rem',
                lineHeight: '1.2'
              }}>
                Find Your Digital Card
              </h2>
              <p className="body-text" style={{ 
                color: 'var(--text-secondary)',
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
                    color: 'var(--primary-purple)'
                  }}
                />
                <button 
                  className="absolute text-white rounded-full transition-all"
                  style={{ 
                    right: '0.4rem',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    fontSize: '15px',
                    fontWeight: '600',
                    background: 'var(--gradient-primary)',
                    boxShadow: 'var(--shadow-colored)',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  Search
                </button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center" style={{ marginTop: '1.75rem', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--text-secondary)',
                  fontWeight: '500',
                  marginRight: '0.25rem'
                }}>
                  Popular:
                </span>
                {['Marketing', 'Technology', 'Finance', 'Healthcare'].map((tag) => (
                  <button
                    key={tag}
                    className="rounded-full transition-all"
                    style={{ 
                      paddingLeft: '1.25rem',
                      paddingRight: '1.25rem',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: 'var(--primary-blue)',
                      background: 'var(--background-white)',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--background-light-blue)',
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
        background: 'transparent',
        paddingTop: '5rem',
        paddingBottom: '5rem'
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
                color: '#110032ff',
                marginBottom: '1.5rem'
              }}>
                What is a <span style={{
                  background: 'var(--gradient-primary)',
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
                color: '#647488 ',
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
                background: 'var(--gradient-primary)',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                border: 'none'
              }}>
                <span>Get Started Free</span>
                
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
                  background: 'linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)',
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
      <section id="features" className="section px-6 lg:px-12" style={{ 
        background: 'transparent',
        paddingTop: '5rem',
        paddingBottom: '5rem'
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
            color: '#0c0000ff',
            marginBottom: '1rem'
          }}>
            Build Credibility That <span style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Converts</span>
          </h2>
          <p className="body-large" style={{ 
            color: '#1c2e44ff',
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
                color: '#a78bfa'
              },
              { 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
                title: 'Add your reviews link (Google / LinkedIn / Certificates)',
                color: '#a78bfa'
              },
              { 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />,
                title: 'Custom profile themes',
                color: '#a78bfa'
              },
              { 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
                title: 'Smart analytics',
                color: '#a78bfa'
              }
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: 'white',
                borderRadius: '1.5rem',
                padding: '2rem 1.5rem',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}40`;
                e.currentTarget.style.borderColor = `${feature.color}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
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
                  background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
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
                    color: 'white'
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>

                {/* Title */}
                <h3 style={{
                  color: '#334155',
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
      <section id="features" className="section py-12 lg:py-20 px-4 sm:px-6 lg:px-12" style={{ background: 'transparent' }}>
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
                  background: 'white', // Darker card background
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
                    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', // Blue gradient for icon background
                    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.6)',
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
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#334155' }}>{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ color: 'grey' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* FAQ Section */}
      <section id="how-it-works" className="section py-12 lg:py-20 px-4 sm:px-6 lg:px-12" style={{ background: 'var(--background-purple-light)' }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16" style={{ color: '#1A1A2E' }}>How It <span className="gradient-text">Works</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', color: '#fff' }}>
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
      <section className="section py-12 lg:py-20 px-4 sm:px-6 lg:px-12" style={{ background: 'transparent' }}>
        <div className="container mx-auto text-center flex flex-col items-center">
          <h2 className="heading-2 mb-6" style={{ color: 'var(--foreground)' }}>Ready to Go Digital?</h2>
          <p className="body-large mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-primary)' }}>
            Join millions of professionals who have already made the switch to digital business cards.
          </p>
          <Link href="/auth/signup" className="btn btn-large px-12 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
            Create Your Free Card Now
          </Link>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="section py-16 lg:py-24 px-4 sm:px-6 lg:px-12" style={{ 
        background: 'linear-gradient(135deg, var(--background-light-blue) 0%, var(--background-purple-light) 100%)'
      }}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6" style={{ 
              color: 'var(--foreground)',
              fontSize: '3rem',
              fontWeight: '800'
            }}>
              Get In <span style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Touch</span>
            </h2>
            
          </div>

          
          <div 
            className="card p-10"
            style={{
              background: 'white',
              borderRadius: '2rem',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative background element */}
            <div 
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                borderRadius: '50%',
                zIndex: 0
              }}
            ></div>
            <form className="space-y-6 lg:space-y-8 relative z-10">
              

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    placeholder="Enter full name"
                    style={{
                      fontSize: '16px',
                      background: '#fafafa',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                    }}
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    placeholder="Email Id"
                    style={{
                      fontSize: '16px',
                      background: '#fafafa',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label 
                    htmlFor="company" 
                    className="block text-sm font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    placeholder="Company name"
                    style={{
                      fontSize: '16px',
                      background: '#fafafa',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                    }}
                  />
                </div>
                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    style={{
                      fontSize: '16px',
                      background: '#fafafa',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="enterprise">Enterprise Solutions</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label 
                  htmlFor="message" 
                  className="block text-sm font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 resize-vertical"
                  placeholder="Tell us more about your inquiry, goals, or how we can help you..."
                  style={{
                    fontSize: '16px',
                    background: '#fafafa',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                  }}
                ></textarea>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="px-12 py-5 text-white font-bold rounded-sm transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
                  style={{
                    background: 'var(--gradient-primary)',
                    boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    letterSpacing: '0.5px'
                  }}
                >
                  Send Message
                  
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}