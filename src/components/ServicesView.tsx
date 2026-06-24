/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Sparkles, ShieldCheck, Zap, Activity, Flame, Heart, ArrowRight, CheckCircle 
} from 'lucide-react';
import { SERVICES } from '../data';

interface ServicesViewProps {
  onBookService: (serviceId: string) => void;
}

export default function ServicesView({ onBookService }: ServicesViewProps) {
  
  // Icon mapper helper
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'ShieldAlert':
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-blue-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-blue-600" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-blue-600" />;
      default:
        return <Heart className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Services Catalog
        </span>
        <h1 className="font-display text-4xl font-bold text-gray-900 tracking-tight">
          Comprehensive Clinical Services
        </h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          From preventive dental diagnostics to sophisticated cosmetic enhancements and urgent same-day treatments, we utilize advanced digital dentistry to deliver stunning results.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {SERVICES.map((svc) => (
          <div 
            key={svc.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-blue-50/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Header inside card */}
              <div className="flex justify-between items-start">
                <div className="bg-blue-50 p-4 rounded-2xl w-max">
                  {renderIcon(svc.iconName)}
                </div>
                
                {/* Meta details */}
                <div className="flex space-x-2 text-right">
                  <span className="bg-slate-50 text-slate-600 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-100">
                    ⏱️ {svc.duration}
                  </span>
                  <span className="bg-blue-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm">
                    {svc.priceEstimate}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-gray-900">
                  {svc.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {svc.longDescription}
                </p>
              </div>

              {/* Key Benefits List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
                  Service Benefits:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {svc.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => onBookService(svc.id)}
                className="w-full py-3.5 px-4 bg-gray-50 border border-gray-100 hover:bg-blue-600 hover:border-blue-600 hover:text-white rounded-xl text-gray-800 text-sm font-semibold transition-all duration-200 cursor-pointer flex justify-center items-center gap-2 group"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Banner */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1.5 max-w-xl text-center md:text-left">
          <h3 className="font-display font-bold text-lg text-gray-900">
            Unsure which dental service is right for you?
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm">
            Schedule a General Checkup, or use our floating voice receptionist in the bottom right corner of your screen to talk to Olivia, who can guide you on the best treatment.
          </p>
        </div>
        <button
          onClick={() => onBookService('dental-checkup')}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
        >
          Schedule Checkup Now
        </button>
      </div>

    </div>
  );
}
