/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import BookAppointmentView from './components/BookAppointmentView';
import VapiVoiceAssistant from './components/VapiVoiceAssistant';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [voiceOpenSignal, setVoiceOpenSignal] = useState(0);
  const [voiceAppointmentBrief, setVoiceAppointmentBrief] = useState<string | null>(null);

  // Auto-scroll to top upon changing page tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentPage]);

  // Handle direct service booking CTA
  const handleBookService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('book');
  };

  const handleRequestVoiceScheduler = (brief: string) => {
    setVoiceAppointmentBrief(brief);
    setVoiceOpenSignal((signal) => signal + 1);
  };

  const handlePageChange = (page: string) => {
    // If navigating to booking directly (not from a specific service CTA), reset chosen service
    if (page !== 'book') {
      setSelectedServiceId(null);
    }
    setCurrentPage(page);
  };

  const renderActiveView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView onPageChange={handlePageChange} />;
      case 'services':
        return <ServicesView onBookService={handleBookService} />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'book':
        return (
          <BookAppointmentView 
            preSelectedServiceId={selectedServiceId} 
            onRequestVoiceScheduling={handleRequestVoiceScheduler}
            onNavigateHome={() => handlePageChange('home')}
          />
        );
      default:
        return <HomeView onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-800 font-sans">
      
      {/* Skip link for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only focus:block p-2 bg-white fixed top-4 left-4 z-50 rounded-md border border-gray-200">Skip to content</a>

      {/* Top Sticky Navigation */}
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Primary Page Content Wrapper */}
      <main id="main" className="flex-1">
        {renderActiveView()}
      </main>

      {/* Floating Interactive Vapi AI Voice Assistant */}
      <VapiVoiceAssistant
        openSignal={voiceOpenSignal}
        appointmentBrief={voiceAppointmentBrief}
      />

      {/* Universal Footer */}
      <Footer onPageChange={handlePageChange} />

    </div>
  );
}
