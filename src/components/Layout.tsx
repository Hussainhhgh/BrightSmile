import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import VapiVoiceAssistant from './VapiVoiceAssistant';

interface LayoutProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  children: React.ReactNode;
  voiceOpenSignal: number;
  appointmentBrief: string | null;
}

export default function Layout({ currentPage, onPageChange, children, voiceOpenSignal, appointmentBrief }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-800 font-sans">
      <a href="#main" className="sr-only focus:not-sr-only focus:block p-2 bg-white fixed top-4 left-4 z-50 rounded-md border border-gray-200">Skip to content</a>
      <Navbar currentPage={currentPage} onPageChange={onPageChange} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <VapiVoiceAssistant openSignal={voiceOpenSignal} appointmentBrief={appointmentBrief} />
      <Footer onPageChange={onPageChange} />
    </div>
  );
}
