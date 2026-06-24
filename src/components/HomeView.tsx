/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Shield, Award, Clock, Heart, ArrowRight, Star, Plus, Minus, CheckCircle, ChevronRight 
} from 'lucide-react';
import Button from './ui/Button';
import { SERVICES, DOCTORS, TESTIMONIALS, FAQS } from '../data';

interface HomeViewProps {
  onPageChange: (page: string) => void;
}

export default function HomeView({ onPageChange }: HomeViewProps) {
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const whyChooseUsData = [
    {
      icon: Shield,
      title: 'Safety First Care',
      desc: '100% ADA-compliant practices, strict sterilization chambers, and low-radiation digital imaging.'
    },
    {
      icon: Award,
      title: 'Expert Specialists',
      desc: 'Board-certified dentists and orthodontists trained in top-tier medical and dental academies.'
    },
    {
      icon: Clock,
      title: 'Convenient Hours',
      desc: 'Open on Saturdays, offering instant emergency support, and 24/7 AI-driven scheduling assistance.'
    },
    {
      icon: Heart,
      title: 'Comfort-Focused',
      desc: 'Anxiety-free treatments, optional sedation, cozy amenities, and extremely gentle clinicians.'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION WITH CTA */}
      <section className="relative overflow-hidden hero">
        {/* Abstract background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-cyan-100/30 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 kicker">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modern Dental Excellence in San Francisco</span>
              </div>
              <h1 className="font-display hero-title font-bold text-gray-900 tracking-tight">
                A Brighter, Healthier <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Smile Awaits You
                </span>
              </h1>
              <p className="lead mt-4">
                Welcome to Hussain AI, where world-class AI expertise meets a user-friendly, accessible interface. From intelligent automation to advanced analytics, we make technology integration a seamless pleasure.
              </p>
              
              {/* Dual Call-to-actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-6">
                <Button onClick={() => onPageChange('book')} variant="primary" size="lg" className="hero-cta flex items-center gap-2">
                  Book Appointment Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button onClick={() => onPageChange('services')} variant="secondary" size="lg" className="flex items-center gap-2">
                  Explore Services
                </Button>
              </div>

              {/* Badges/Social Proof */}
              <div className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0 border-t border-gray-100">
                <div>
                  <span className="block font-display text-2xl sm:text-3xl font-bold text-blue-600">4.9★</span>
                  <span className="text-xs text-gray-500">1,200+ Patient Reviews</span>
                </div>
                <div>
                  <span className="block font-display text-2xl sm:text-3xl font-bold text-gray-900">15+</span>
                  <span className="text-xs text-gray-500">Years of Practice</span>
                </div>
                <div>
                  <span className="block font-display text-2xl sm:text-3xl font-bold text-gray-900">100%</span>
                  <span className="text-xs text-gray-500">Painless Options</span>
                </div>
              </div>
            </div>

            {/* Right Interactive/Hero Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[380px] sm:max-w-[420px]">
                {/* Decorative backgrounds */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-3xl rotate-3 scale-102 shadow-xl opacity-20" />
                
                {/* Clinical Image Frame */}
                <div className="relative p-3 rounded-3xl border border-gray-100 overflow-hidden card">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
                    alt="BrightSmile Modern Office"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="w-full h-56 sm:h-72 md:h-[400px] object-cover rounded-2xl"
                  />
                  {/* Floating clinic stat bubble */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-gray-100 shadow-lg flex items-center gap-3">
                    <div className="bg-emerald-500 text-white p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-xs text-gray-900 leading-none">Accepting Patients</span>
                      <span className="text-[10px] text-gray-500">Schedule your same-day checkup online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl font-bold text-gray-900 tracking-tight">
              Why Clients Choose Hussain AI
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base">
            We are dedicated to redefining oral healthcare through state-of-the-art procedures, high compassion levels, and an unmatched focus on patient comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUsData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col space-y-4"
              >
                <div className="bg-blue-50 p-3.5 rounded-xl text-blue-600 w-max">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 text-base">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. OUR SERVICES (Featured previews) */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 tracking-tight">
                Our Signature Dental Services
              </h2>
              <p className="mt-2 text-gray-500 text-sm">
                From simple preventive maintenance to comprehensive aesthetic alignments.
              </p>
            </div>
            <button
              onClick={() => {
                onPageChange('services');
                window.scrollTo({ top: 0 });
              }}
              className="text-blue-600 font-semibold text-sm flex items-center space-x-1 hover:text-blue-700 transition cursor-pointer"
            >
              <span>View All 6 Services</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((svc) => (
              <div 
                key={svc.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-50/40 transition duration-300 flex flex-col h-full"
              >
                <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 text-white p-3 rounded-xl w-max mb-5 font-mono text-xs font-semibold">
                  {svc.title === 'Routine Cleaning' ? '✨ Clean' : svc.title === 'Dental Checkup' ? '🛡️ Prevent' : '💎 Bright'}
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-2">
                  {svc.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                  {svc.shortDescription}
                </p>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Duration: <strong className="text-gray-700">{svc.duration}</strong></span>
                  <button
                    onClick={() => {
                      onPageChange('services');
                      window.scrollTo({ top: 0 });
                    }}
                    className="text-blue-600 font-medium hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEET OUR DOCTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl font-bold text-gray-900 tracking-tight">
            Meet Our Award-Winning Doctors
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base">
            Our clinicians are active researchers, leaders, and teachers who provide customized treatments utilizing modern dental science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DOCTORS.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition duration-300"
            >
                <div className="h-56 sm:h-64 overflow-hidden relative">
                <img
                  src={doc.image}
                  alt={doc.name}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] uppercase tracking-wider font-bold font-mono px-2.5 py-1 rounded-lg">
                  {doc.specialty}
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900">{doc.name}</h3>
                  <p className="text-xs text-blue-600 font-semibold">{doc.role}</p>
                </div>
                <p className="text-gray-400 text-[11px] font-medium leading-tight">
                  🎓 {doc.education}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {doc.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              What Our Happy Patients Say
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              We have helped over 5,000+ patients look and feel their absolute best. Hear their genuine feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id}
                className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex space-x-1 text-amber-400 mb-4">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-6">
                    "{test.text}"
                  </p>
                </div>
                <div className="border-t border-slate-700/60 pt-4 flex justify-between items-center">
                  <div>
                    <span className="block text-white font-bold text-xs">{test.name}</span>
                    <span className="text-[10px] text-slate-400">{test.role}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{test.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            Everything you need to know about our clinics, insurances, and checkups.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-display font-semibold text-sm sm:text-base text-gray-900 hover:bg-gray-50 transition cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <Minus className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-6 pb-5 text-gray-500 text-xs sm:text-sm leading-relaxed bg-slate-50/50 border-t border-gray-50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-blue-100">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-2xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Transform Your Dental Health?
            </h2>
            <p className="text-cyan-100 text-sm sm:text-base leading-relaxed">
              Experience the future of dentistry today. Book an appointment online in under 60 seconds, or tap our voice receptionist in the bottom right corner of the screen for instant human-like speech support.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Button
                onClick={() => {
                  onPageChange('book');
                  window.scrollTo({ top: 0 });
                }}
                variant="secondary"
                size="md"
              >
                Book Online Now
              </Button>
              <Button
                onClick={() => {
                  onPageChange('contact');
                  window.scrollTo({ top: 0 });
                }}
                variant="ghost"
                size="md"
                className="text-white border-white/40"
              >
                Contact Clinic
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
