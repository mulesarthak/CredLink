'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Instagram, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import '../app/globals.css';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2025); // Default to a reasonable year

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer style={{
      marginTop: 'auto',
      background: 'linear-gradient(180deg, rgba(0, 102, 255, 0.02) 0%, rgba(0, 102, 255, 0.08) 100%)',
      borderTop: '1px solid rgba(0, 102, 255, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: 'radial-gradient(circle at 2px 2px, #0066FF 1px, transparent 0)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1.5rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Top Section - Brand & CTA */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '3rem',
          marginBottom: '3rem',
          borderBottom: '1px solid rgba(0, 102, 255, 0.2)',
          flexWrap: 'wrap',
          gap: '3rem',
          textAlign: 'center'
        }}>
          {/* Brand Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #0066FF 0%, #00D2FF 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(0, 102, 255, 0.3)'
            }}>
              <Sparkles style={{ width: '28px', height: '28px', color: 'white' }} strokeWidth={2.5} />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #0066FF 0%, #00D2FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.25rem',
                letterSpacing: '-0.02em',
                margin: 0
              }}>
               CredLink
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#9CA3AF',
                margin: 0
              }}>
                Your Digital Identity Platform
              </p>
            </div>
          </div>
          {/* CTA Button */}
          <Link
            href="/auth/signup"
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontWeight: '700',
              color: 'white',
              background: 'linear-gradient(135deg, #0066FF 0%, #00D2FF 100%)',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(0, 102, 255, 0.3)',
              transition: 'all 0.3s ease',
              border: 'none',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 102, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 102, 255, 0.3)';
            }}
          >
            Start Building Your Profile
          </Link>
        </div>
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          {/* Quick Links Column */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '32px',
                height: '2px',
                background: 'linear-gradient(90deg, #0066FF 0%, transparent 100%)'
              }} />
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#2C3E50',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: 0
              }}>
                Quick Links
              </h4>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {[{"name": "Home", "path": "/"}, {"name": "Features", "path": "/features"}, {"name": "Pricing", "path": "/pricing"}, {"name": "About Us", "path": "/about"}]
                .map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    style={{
                      color: '#6B7280',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#0066FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#6B7280';
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
            </div>
          </div>
          {/* Support Column */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '32px',
                height: '2px',
                background: 'linear-gradient(90deg, #0066FF 0%, transparent 100%)'
              }} />
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#2C3E50',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: 0
              }}>
                Support
              </h4>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {[{"name": "Help Center", "path": "/help"}, {"name": "FAQ", "path": "/faq"}, {"name": "Terms of Service", "path": "/terms"}, {"name": "Privacy Policy", "path": "/privacy"}]
                .map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    style={{
                      color: '#6B7280',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#0066FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#6B7280';
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
            </div>
          </div>
          {/* Contact Column */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '32px',
                height: '2px',
                background: 'linear-gradient(90deg, #0066FF 0%, transparent 100%)'
              }} />
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#2C3E50',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: 0
              }}>
                Contact
              </h4>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {[{"Icon": Mail, "text": "hello@credlink.com", "href": "mailto:hello@mykard.com"}, {"Icon": Phone, "text": "+1 (555) 123-4567", "href": "tel:+15551234567"}, {"Icon": MapPin, "text": "San Francisco, CA", "href": "#"}]
                .map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    style={{
                      color: '#6B7280',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0066FF'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                  >
                    <item.Icon size={18} style={{ flexShrink: 0 }} />
                    {item.text}
                  </a>
                ))}
            </div>
          </div>
          {/* Social & Newsletter Column */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '32px',
                height: '2px',
                background: 'linear-gradient(90deg, #0066FF 0%, transparent 100%)'
              }} />
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#2C3E50',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: 0
              }}>
                Connect
              </h4>
            </div>
            
            {/* Social Icons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              {[{"Icon": Linkedin, "label": "LinkedIn", "url": "https://linkedin.com"}, {"Icon": Twitter, "label": "Twitter", "url": "https://twitter.com"}, {"Icon": Instagram, "label": "Instagram", "url": "https://instagram.com"}]
                .map(({
                  Icon,
                  label,
                  url
                }, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'rgba(0, 102, 255, 0.1)',
                      color: '#0066FF',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      border: '1px solid rgba(0, 102, 255, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #0066FF 0%, #00D2FF 100%)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'translateY(-3px) rotate(5deg)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 102, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 102, 255, 0.1)';
                      e.currentTarget.style.color = '#0066FF';
                      e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
            </div>
            {/* Newsletter */}
           
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              maxWidth: '100%'
            }}>
              
              
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(0, 102, 255, 0.2)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.95rem',
            color: '#6B7280',
            margin: 0
          }}>
            © {currentYear}{" "}
            <span style={{
              fontWeight: '700',
              background: 'linear-gradient(135deg, #0066FF 0%, #00D2FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              CredLink
            </span>
            . All rights reserved.
          </p>
          
          
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </footer>
  );
}
