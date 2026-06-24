/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
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
    <Layout
      currentPage={currentPage}
      onPageChange={handlePageChange}
      voiceOpenSignal={voiceOpenSignal}
      appointmentBrief={voiceAppointmentBrief}
    >
      {renderActiveView()}
    </Layout>
  );
}
