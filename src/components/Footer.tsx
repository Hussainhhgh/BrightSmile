/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (page: string) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo & Info */}
          <div className="space-y-4">
            <div 
              onClick={() => handleLinkClick('home')} 
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="p-2 rounded-xl text-white" style={{background: 'linear-gradient(90deg, rgb(var(--brand-600)), rgb(var(--brand-500)))'}}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white tracking-tight">
                  BrightSmile
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-blue-400 font-semibold font-mono leading-none">
                  Dental Clinic
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Providing premium, state-of-the-art dental care for your whole family. Experience pain-free treatments, personalized cosmetic care, and modern clinical expertise.
            </p>
            <div className="flex items-center space-x-2 text-xs text-blue-400 font-medium bg-blue-500/10 px-3 py-1.5 rounded-lg w-max border border-blue-500/20">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>ADA Certified Clinic</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wider uppercase text-xs mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')}
                  className="hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                >
                  Dental Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                >
                  About Our Doctors
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                >
                  Contact & Hours
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('book')}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 cursor-pointer"
                >
                  Book Online Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wider uppercase text-xs mb-4">
              Contact & Location
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  100 Dental Plaza, Suite 400<br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-white font-medium">(415) 555-0198</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>support@hussainai.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wider uppercase text-xs mb-4">
              Clinic Office Hours
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Monday - Friday</span>
                <span className="text-white font-medium">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Saturday</span>
                <span className="text-white font-medium">9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between pb-1.5">
                <span>Sunday</span>
                <span className="text-amber-400 font-semibold">Emergency Only</span>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-blue-950/40 border border-blue-900/30 text-xs text-blue-300 leading-relaxed card">
              <span className="font-bold text-white block mb-0.5">💬 24/7 Voice Receptionist</span>
              Click the floating microphone at the bottom right to talk directly with our assistant!
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <span>© {currentYear} Hussain AI. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for maximum comfort and dental wellness.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
