'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-lg backdrop-blur-sm border-b border-purple-500/20 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {/* Mystical Logo */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
              <div className="text-white font-bold text-lg">✨</div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 animate-pulse"></div>
          </div>

          {/* Brand Name */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              NumeroBaby
            </h1>
            <p className="text-xs text-purple-200 hidden sm:block">
              Destiny • Names • Numbers
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          {/* Navigation Links */}
          <div className="hidden md:flex gap-6">
            <a
              href="/calculator"
              className="text-purple-200 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium"
            >
              Calculator
            </a>
            <a
              href="/numerology-table"
              className="text-purple-200 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium"
            >
              Multi Name Calculator
            </a>
            <a
              href="/guide"
              className="text-purple-200 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium"
            >
              Guide
            </a>
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/GaneshKathar/baby-name-and-matcher"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 text-white text-sm font-medium backdrop-blur-sm border border-white/20"
            title="View on GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-b border-purple-500/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <a
              href="/calculator"
              className="block text-purple-200 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calculator
            </a>
            <a
              href="/numerology-table"
              className="block text-purple-200 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Multi Name Calculator
            </a>
            <a
              href="#about"
              className="block text-purple-200 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="/guide"
              className="block text-purple-200 hover:text-yellow-300 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Guide
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
