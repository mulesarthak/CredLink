'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import '../app/globals.css';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-blue-100/50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-8" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105 overflow-hidden">
              <Image
                src="/assets/headerlogo.jpeg"
                alt="MyKard Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover scale-120 pl-2.5"
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
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/0 to-blue-600/0 group-hover:from-blue-400/10 group-hover:to-blue-600/10 transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">MyKard</span>
              {/* <span className="text-[10px] font-medium text-blue-600/60 -mt-1 tracking-wider uppercase">Smart Finance</span> */}
            </div>
          </Link>

          {/* Desktop Menu and Actions - Right Side */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              <Link href="/" className="px-3 py-2 text-[15px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Home
              </Link>
              <Link href="#find-digital-card" className="px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/50">
                Search
              </Link>
              <Link href="#what-is-digital-card" className="px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/50">
                About
              </Link>
              <Link href="#build-credibility" className="px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/50">
                Features
              </Link>
              <Link href="#how-it-works" className="px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/50">
                How It Works
              </Link>
              
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {!session ? (
                <>
                  <a href="/auth/login" className="px-5 py-2.5 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50/50" style={{ textDecoration: 'none' }}>
                    Login
                  </a>
                  <a href="/auth/signup" className="relative px-12 py-2.5 text-[15px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 overflow-hidden group text-center" style={{ minWidth: '120px', textDecoration: 'none', display: 'block' }}>
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
          <div className="lg:hidden py-6 border-t border-blue-100/50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-1">
              <Link href="/" className="flex items-center gap-3 px-4 py-3 text-[15px] font-semibold text-blue-600 bg-blue-50/50 rounded-xl">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Home
              </Link>
              <Link href="#find-digital-card" className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-gray-700 hover:bg-blue-50/50 rounded-xl transition-colors">
                <span className="w-1.5 h-1.5 bg-transparent"></span>
                Search
              </Link>
              <Link href="#what-is-digital-card" className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-gray-700 hover:bg-blue-50/50 rounded-xl transition-colors">
                <span className="w-1.5 h-1.5 bg-transparent"></span>
                About
              </Link>
              <Link href="#build-credibility" className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-gray-700 hover:bg-blue-50/50 rounded-xl transition-colors">
                <span className="w-1.5 h-1.5 bg-transparent"></span>
                Features
              </Link>
              <Link href="#how-it-works" className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-gray-700 hover:bg-blue-50/50 rounded-xl transition-colors">
                <span className="w-1.5 h-1.5 bg-transparent"></span>
                How It Works
              </Link>
              
            </div>
            <div className="pt-6 mt-6 border-t border-blue-100/50 space-y-3">
              {!session ? (
                <>
                  <button 
                    onClick={() => {
                      console.log('Mobile Login clicked');
                      window.location.href = '/auth/login';
                    }}
                    className="block w-full text-center px-6 py-3 text-[15px] font-medium text-gray-700 bg-blue-50/50 rounded-xl hover:bg-blue-100/50 transition-colors border-none cursor-pointer"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Mobile Create Card clicked');
                      window.location.href = '/auth/signup';
                    }}
                    className="relative block w-full text-center px-6 py-3 text-[15px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/30 overflow-hidden group border-none cursor-pointer"
                  >
                    <span className="relative z-10" style={{ pointerEvents: 'none' }}>Create Card</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                </>
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
  );
}