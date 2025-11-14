'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import '../app/globals.css';


// Smooth scroll function without changing URL
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  return (
    <>
      <style jsx global>{`
        .mobile-fixed-header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100vw !important;
          min-height: 80px !important;
          height: auto !important;
          z-index: 999999 !important;
          transform: translate3d(0, 0, 0) !important;
          -webkit-transform: translate3d(0, 0, 0) !important;
          will-change: transform !important;
          backface-visibility: hidden !important;
          -webkit-backface-visibility: hidden !important;
          overflow: visible !important;
        }
        
        @supports (-webkit-touch-callout: none) {
          .mobile-fixed-header {
            position: absolute !important;
            top: 0 !important;
          }
        }
        
        @media screen and (max-width: 768px) {
          html {
            position: relative !important;
            overflow-x: hidden !important;
          }
          
          body {
            position: relative !important;
            -webkit-overflow-scrolling: touch !important;
            overflow-scrolling: touch !important;
            min-height: 100vh !important;
          }
          
          .mobile-fixed-header {
            position: fixed !important;
            top: env(safe-area-inset-top, 0) !important;
            transform: translateZ(0) !important;
            -webkit-transform: translateZ(0) !important;
          }
        }
      `}</style>
      <header 
        className="bg-white/95 backdrop-blur-xl border-b border-blue-100/50 shadow-sm mobile-fixed-header" 
        style={{ 
          position: 'fixed',
          top: '0px',
          left: '0px',
          right: '0px',
          width: '100%',
          maxWidth: '100vw',
          minHeight: '80px',
          height: 'auto',
          zIndex: 99999,
          transform: 'translate3d(0px, 0px, 0px)',
          WebkitTransform: 'translate3d(0px, 0px, 0px)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          overflow: 'visible',
          contain: 'layout style paint',
          isolation: 'isolate'
        }}
      >
      <nav className="max-w-7xl mx-auto px-8" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/assets/finalogo.png"
              alt="Logo"
              width={144}
              height={144}
              className="w-36 h-36 object-cover transition-all duration-300 group-hover:scale-105"
              priority
              unoptimized
              onError={(e) => {
                console.log('Image failed to load:', e);
                e.currentTarget.style.display = 'none';
                const svg = e.currentTarget.nextElementSibling as HTMLElement;
                if (svg) svg.style.display = 'block';
              }}
              onLoad={() => {
                console.log('Image loaded successfully');
              }}
            />
            <svg className="w-6 h-6 text-blue-600 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{display: 'none'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </Link>

          {/* Desktop Menu and Actions - Right Side */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              <Link href="/" className="px-3 py-2 text-[15px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Home
              </Link>
              <button 
                onClick={() => scrollToSection('find-digital-card')}
                className="px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/50 bg-transparent border-none cursor-pointer"
              >
                Search
              </button>
              <button 
                onClick={() => scrollToSection('what-is-digital-card')}
                className="px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/50 bg-transparent border-none cursor-pointer"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('build-credibility')}
                className="px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/50 bg-transparent border-none cursor-pointer"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/50 bg-transparent border-none cursor-pointer"
              >
                How It Works
              </button>
              
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {!session ? (
                <>
                  <a href="/auth/login" className="px-5 py-2.5 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/50" style={{ textDecoration: 'none' }}>
                    Login
                  </a>
                  <a href="/auth/signup" className="relative px-12 py-2.5 text-[15px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 overflow-hidden group text-center" style={{ minWidth: '120px', minHeight: '40px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="relative z-10 flex items-center justify-center">
                      Create Card
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </a>
                </>
              ) : (
                <Link href="/dashboard" className="relative px-6 py-2.5 text-[15px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Dashboard
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-blue-50/50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pt-6 border-t border-blue-100/50 animate-in fade-in slide-in-from-top-2 duration-300" style={{ paddingBottom: '0rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => {
                  setActiveSection('home');
                  window.location.href = '/';
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 text-[15px] font-semibold rounded-xl w-full text-left border-none cursor-pointer transition-colors ${
                  activeSection === 'home' 
                    ? 'text-blue-600 bg-blue-50/50' 
                    : 'text-gray-700 hover:bg-blue-50/50 hover:text-blue-600'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  activeSection === 'home' ? 'bg-blue-600' : 'bg-transparent'
                }`}></span>
                Home
              </button>
              <button 
                onClick={() => {
                  setActiveSection('find-digital-card');
                  scrollToSection('find-digital-card');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 text-[15px] font-medium rounded-xl w-full text-left border-none cursor-pointer transition-colors ${
                  activeSection === 'find-digital-card' 
                    ? 'text-blue-600 bg-blue-50/50 font-semibold' 
                    : 'text-gray-700 hover:bg-blue-50/50 hover:text-blue-600'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  activeSection === 'find-digital-card' ? 'bg-blue-600' : 'bg-transparent'
                }`}></span>
                Search
              </button>
              <button 
                onClick={() => {
                  setActiveSection('what-is-digital-card');
                  scrollToSection('what-is-digital-card');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 text-[15px] font-medium rounded-xl w-full text-left border-none cursor-pointer transition-colors ${
                  activeSection === 'what-is-digital-card' 
                    ? 'text-blue-600 bg-blue-50/50 font-semibold' 
                    : 'text-gray-700 hover:bg-blue-50/50 hover:text-blue-600'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  activeSection === 'what-is-digital-card' ? 'bg-blue-600' : 'bg-transparent'
                }`}></span>
                About
              </button>
              <button 
                onClick={() => {
                  setActiveSection('build-credibility');
                  scrollToSection('build-credibility');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 text-[15px] font-medium rounded-xl w-full text-left border-none cursor-pointer transition-colors ${
                  activeSection === 'build-credibility' 
                    ? 'text-blue-600 bg-blue-50/50 font-semibold' 
                    : 'text-gray-700 hover:bg-blue-50/50 hover:text-blue-600'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  activeSection === 'build-credibility' ? 'bg-blue-600' : 'bg-transparent'
                }`}></span>
                Features
              </button>
              <button 
                onClick={() => {
                  setActiveSection('how-it-works');
                  scrollToSection('how-it-works');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 text-[15px] font-medium rounded-xl w-full text-left border-none cursor-pointer transition-colors ${
                  activeSection === 'how-it-works' 
                    ? 'text-blue-600 bg-blue-50/50 font-semibold' 
                    : 'text-gray-700 hover:bg-blue-50/50 hover:text-blue-600'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  activeSection === 'how-it-works' ? 'bg-blue-600' : 'bg-transparent'
                }`}></span>
                How It Works
              </button>
              
            </div>
            <div className="pt-6 mt-6 border-t border-blue-100/50">
              {!session ? (
                <div className="flex justify-center gap-4" style={{ marginBottom: '3rem', paddingTop: '1rem' }}>
                  <button 
                    onClick={() => {
                      console.log('Mobile Login clicked');
                      window.location.href = '/auth/login';
                    }}
                    className="relative text-center px-6 py-4 text-[15px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/30 overflow-hidden group border-none cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                    style={{ width: '120px', height: '40px' }}
                  >
                    <span className="relative z-10" style={{ pointerEvents: 'none' }}>Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Mobile Create Card clicked');
                      window.location.href = '/auth/signup';
                    }}
                    className="relative text-center px-6 py-4 text-[15px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/30 overflow-hidden group border-none cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                    style={{ width: '120px', height: '40px' }}
                  >
                    <span className="relative z-10" style={{ pointerEvents: 'none' }}>Create Card</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                </div>
              ) : (
                <Link href="/dashboard" className="relative block text-center px-6 py-3 text-[15px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/30 overflow-hidden group">
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  );
}