'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import '../app/globals.css';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" style={{ paddingLeft: '1rem' }}>
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">CredLink</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            <Link href="/" className="text-[15px] font-medium text-gray-900 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/search" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Search
            </Link>
            <Link href="/features" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="/how-it-works" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {!session ? (
              <>
                <Link href="/auth/login" className="text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors px-4">
                  Login
                </Link>
                <Link href="/create-card" className="px-7 py-3 text-[15px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-md hover:shadow-lg" style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', fontSize: '16px' }}>
                  Get Started
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="px-7 py-3 text-[15px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-md hover:shadow-lg" style={{ paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', fontSize: '16px' }}>
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
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
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-1">
              <Link href="/" className="block px-4 py-3 text-[15px] font-medium text-gray-900 hover:bg-gray-50 rounded-lg">Home</Link>
              <Link href="/search" className="block px-4 py-3 text-[15px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Search</Link>
              <Link href="/features" className="block px-4 py-3 text-[15px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Features</Link>
              <Link href="/how-it-works" className="block px-4 py-3 text-[15px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg">How It Works</Link>
              <Link href="/pricing" className="block px-4 py-3 text-[15px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Pricing</Link>
              <Link href="/contact" className="block px-4 py-3 text-[15px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Contact</Link>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
              {!session ? (
                <>
                  <Link href="/auth/login" className="block text-center px-6 py-3 text-[15px] font-medium text-gray-700 bg-gray-100 rounded-full">Login</Link>
                  <Link href="/create-card" className="block text-center px-6 py-3 text-[15px] font-semibold text-white bg-blue-600 rounded-full">Get Started</Link>
                </>
              ) : (
                <Link href="/dashboard" className="block text-center px-6 py-3 text-[15px] font-semibold text-white bg-blue-600 rounded-full">Dashboard</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
