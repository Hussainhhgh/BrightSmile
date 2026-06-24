/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: 'home' },
    { label: 'Services', value: 'services' },
    { label: 'About Us', value: 'about' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    onPageChange(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2 rounded-xl text-white shadow-md shadow-blue-200 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-950 bg-clip-text text-transparent">
                BrightSmile
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-blue-600 font-semibold font-mono leading-none">
                Dental Clinic
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`relative py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('book')}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm text-white shadow-lg cursor-pointer transform hover:-translate-y-0.5 transition-all duration-200 ${
                currentPage === 'book'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-100'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-100 hover:shadow-xl hover:shadow-blue-100'
              }`}
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white/95 backdrop-blur-md animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 px-4">
              <button
                onClick={() => handleNavClick('book')}
                className="w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-base shadow-lg shadow-blue-100 hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
