/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Phone, Mail, User, BookOpen, CheckCircle, AlertTriangle, ArrowLeft, Printer, ShieldCheck 
} from 'lucide-react';
import { SERVICES } from '../data';
import { AppointmentFormData } from '../types';

interface BookAppointmentViewProps {
  preSelectedServiceId: string | null;
  onNavigateHome: () => void;
}

export default function BookAppointmentView({ 
  preSelectedServiceId, 
  onNavigateHome 
}: BookAppointmentViewProps) {
  
  // Resolve pre-selected service
  const initialService = SERVICES.find(s => s.id === preSelectedServiceId)?.title || 'Routine Cleaning';

  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    serviceType: initialService,
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingTicketId, setBookingTicketId] = useState('');

  // Extract webhook URL from available configurations
  const n8nWebhookUrl = (
    (import.meta.env.VITE_N8N_WEBHOOK_URL as string) ||
    (import.meta.env.NEXT_PUBLIC_N8N_WEBHOOK_URL as string) ||
    ''
  );

  // Auto-generate a dummy ticket ID upon success
  const generateTicketId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'BS-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.date || !formData.time) {
      setError('Please fill in all required scheduling fields.');
      return;
    }

    setLoading(true);

    const payload = {
      callerName: formData.fullName,
      callerPhone: formData.phone,
      callerEmail: formData.email,
      requestedTime: `${formData.date}T${formData.time}:00`,
      action: 'Book',
      reason: formData.serviceType,
      eventId: ''
    };

    try {
      if (!n8nWebhookUrl) {
        // If webhook URL is missing, we log it and proceed with high-fidelity simulated reservation
        console.warn('n8n Webhook URL is not configured. Simulating successful appointment booking...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setBookingTicketId(generateTicketId());
        setSuccess(true);
      } else {
        // Perform real POST query to n8n webhook
        const response = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Server returned status code: ${response.status}`);
        }

        setBookingTicketId(generateTicketId());
        setSuccess(true);
      }
    } catch (err: any) {
      console.error('Booking submission error:', err);
      setError(
        err?.message || 'We could not connect to our booking system. Please check your network or try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // List of professional available standard slots
  const timeSlots = [
    '08:30', '09:15', '10:00', '10:45', '11:30',
    '13:00', '13:45', '14:30', '15:15', '16:00', '16:45'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {success ? (
        /* APPOINTMENT SUCCESS PAGE / CONFIRMATION UI */
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-fade-in print:border-0 print:shadow-none">
          {/* Top banner */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-center text-white space-y-3 print:bg-none print:text-gray-900 print:p-4">
            <div className="bg-white/20 p-3 rounded-full w-max mx-auto print:hidden">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">Appointment Confirmed!</h1>
            <p className="text-cyan-100 text-xs sm:text-sm print:text-gray-500">
              Your dental session has been reserved and synchronized.
            </p>
          </div>

          {/* Ticket Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Warning if n8n not configured */}
            {!n8nWebhookUrl && (
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 flex items-start space-x-2 print:hidden">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Simulated Offline Booking:</span> NEXT_PUBLIC_N8N_WEBHOOK_URL was not set. We generated a local ticket. To connect to your real n8n dental assistant CRM, declare the variable in your secrets setup.
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 print:bg-transparent print:border-gray-200">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Patient Name</span>
                <p className="font-bold text-gray-900 text-base">{formData.fullName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Booking Reference</span>
                <p className="font-mono font-bold text-blue-600 text-base">{bookingTicketId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Appointment Date</span>
                <p className="font-semibold text-gray-800 text-sm">🗓️ {formData.date}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Session Time Slot</span>
                <p className="font-semibold text-gray-800 text-sm">⏱️ {formData.time} (EST)</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Procedure Category</span>
                <p className="font-semibold text-gray-800 text-sm">✨ {formData.serviceType}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Contact Number</span>
                <p className="font-semibold text-gray-800 text-sm">📞 {formData.phone}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block">Additional Patient Notes:</span>
              <p className="text-gray-600 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 italic leading-relaxed">
                {formData.notes || 'No special recovery requirements or notes provided.'}
              </p>
            </div>

            {/* Preparation Checklists */}
            <div className="space-y-3 pt-2">
              <h4 className="font-semibold text-sm text-gray-900">Before Your Appointment Check:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500">
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Arrive 10 minutes prior to complete health history sheets.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Bring a valid government-issued ID & insurance card.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Avoid heavy caffeine intake 2 hours before sedation.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Brush and floss thoroughly prior to dental scaling.</span>
                </li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-100 gap-3 print:hidden">
              <button
                onClick={onNavigateHome}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 font-semibold text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home Dashboard</span>
              </button>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrint}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Ticket
                </button>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      date: '',
                      time: '',
                      serviceType: 'Routine Cleaning',
                      notes: ''
                    });
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                  Book Another Slot
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* BOOKING FORM VIEW */
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left panel */}
          <div className="md:col-span-4 bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest bg-white/20 px-2.5 py-1 rounded-md uppercase font-bold">
                Online Portal
              </span>
              <h2 className="font-display text-2xl font-bold tracking-tight">Schedule Treatment</h2>
              <p className="text-cyan-100 text-xs leading-relaxed">
                Choose your desired clinical service, coordinate calendar slots, and specify custom requirements in real-time.
              </p>
            </div>

            <div className="space-y-4 pt-8 text-xs text-cyan-100">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Easy Calendar Alignment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Synchronized Slot Checking</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Data Ingress</span>
              </div>
            </div>

            <div className="border-t border-white/20 pt-4 mt-6 text-[10px] text-cyan-200">
              Need immediate support? Feel free to call us or speak to Olivia, our AI voice assistant.
            </div>
          </div>

          {/* Right panel: actual inputs */}
          <form onSubmit={handleFormSubmit} className="md:col-span-8 p-6 sm:p-8 space-y-6">
            
            {/* Error Indicator */}
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Informative credentials status */}
            {!n8nWebhookUrl && (
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-700 leading-relaxed">
                🛠️ <span className="font-bold">Developer Notice:</span> No n8n webhook URL is set in environment secrets. The system will handle your scheduling securely in high-fidelity sandbox mode.
              </div>
            )}

            <div className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Full Patient Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Robert Hastings"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. (415) 555-0198"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800 bg-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. robert@example.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800 bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Requested Dental Procedure *</label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800 bg-white cursor-pointer"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Appointment Date *</label>
                  <input
                    type="date"
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Session Start Time *</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800 bg-white cursor-pointer"
                    required
                  >
                    <option value="" disabled>Select a Time Slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot} AM/PM</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Additional Treatment / Patient Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Specify any special dental history, allergies, or anxiety triggers..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800 bg-white resize-none"
                />
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm rounded-xl hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-100 hover:shadow-xl transition transform hover:-translate-y-0.5 disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Aligning Calendar & Reserving Slot...</span>
                </>
              ) : (
                <span>Confirm My Dental Appointment</span>
              )}
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
