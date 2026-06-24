/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle 
} from 'lucide-react';
import TextInput from './ui/TextInput';
import Select from './ui/Select';
import TextArea from './ui/TextArea';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);
    // Send to server booking endpoint which will forward to configured webhook
    fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callerName: formData.name,
        callerEmail: formData.email,
        subject: formData.subject,
        message: formData.message,
        source: 'contact_form'
      })
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || 'Server failed to accept the request');
        }
        return res.json();
      })
      .then(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      })
      .catch((err) => setError(err?.message || 'Submission failed'))
      .finally(() => setLoading(false));
  };

  const contactDetails = [
    {
      icon: Phone,
      title: 'Call Us Directly',
      desc: 'Immediate phone support during clinic hours.',
      value: '(415) 555-0198',
      link: 'tel:+14155550198'
    },
    {
      icon: Mail,
      title: 'Email Communications',
      desc: 'We respond to inquiries within 1 business day.',
      value: 'support@hussainai.com',
      link: 'mailto:support@hussainai.com'
    },
    {
      icon: MapPin,
      title: 'Clinic Location',
      desc: 'Located in the downtown Medical Plaza.',
      value: '100 Dental Plaza, Suite 400, San Francisco',
      link: 'https://maps.google.com'
    }
  ];

  const officeHours = [
    { days: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { days: 'Saturday', hours: '9:00 AM - 4:00 PM' },
    { days: 'Sunday', hours: 'Emergency Support Only' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="font-display text-4xl font-bold text-gray-900 tracking-tight">
          We are Always Here to Help
        </h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          Have questions about insurance, procedure pricing, or recovering from a treatment? Fill out the contact form below or call us for real-time support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Details & Office Hours */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Details list */}
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-gray-900">
              Clinic Contact Channels
            </h2>
            <div className="space-y-4">
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon;
                return (
                  <a
                    key={idx}
                    href={detail.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition duration-200 group"
                  >
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600 shrink-0 mr-4 group-hover:bg-blue-100 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-gray-400 uppercase tracking-wider font-mono">
                        {detail.title}
                      </h4>
                      <p className="text-gray-900 font-bold text-sm sm:text-base mt-0.5">
                        {detail.value}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {detail.desc}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Office Hours Card */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl shadow-slate-100 border border-slate-800">
            <h3 className="font-display text-lg font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Office Operating Hours
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Appointments outside standard clinic hours are reserved for pediatric surgeries, orthodontic adjustments, or severe acute emergencies.
            </p>
            <div className="space-y-2.5 pt-2 text-sm text-slate-300">
              {officeHours.map((oh, idx) => (
                <div key={idx} className="flex justify-between border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                  <span>{oh.days}</span>
                  <span className={`${oh.hours === 'Emergency Support Only' ? 'text-amber-400 font-bold' : 'text-white font-medium'}`}>
                    {oh.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Contact Inquiry Form & Interactive Location Map */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Inquiry Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-display text-xl font-bold text-gray-900">
              Send Us a Quick Message
            </h2>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-emerald-800 text-base">Inquiry Submitted Successfully!</h3>
                <p className="text-xs text-emerald-600 max-w-md mx-auto">
                  Thank you for reaching out to Hussain AI. One of our team members will contact you via email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white font-semibold text-xs rounded-lg hover:bg-emerald-700 transition cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextInput
                    label="Your Full Name *"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Robert Hastings"
                    required
                  />
                  <TextInput
                    label="Your Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. robert@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Subject of Message</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800 bg-white cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Billing & Insurance">Billing & Insurance</option>
                    <option value="Cosmetic Consultation">Cosmetic Consultation</option>
                    <option value="Emergency Follow-up">Emergency Follow-up</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Your Message *</label>
                  <Select
                    label="Subject of Message"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Billing & Insurance">Billing & Insurance</option>
                    <option value="Cosmetic Consultation">Cosmetic Consultation</option>
                    <option value="Emergency Follow-up">Emergency Follow-up</option>
                  </Select>
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  <TextArea
                    label="Your Message *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, symptoms, or requested dental procedures..."
                    rows={4}
                    required
                  />
                </button>
              </form>
            )}
          </div>

          {/* Interactive Illustrative Map Frame */}
          <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-bold text-gray-900 font-display">Hussain AI Headquarters</span>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                Open in Maps App
              </a>
            </div>
            
            {/* Custom vector schematic representing streets map */}
            <div className="relative rounded-2xl h-56 bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
              {/* Fake Street lines grids */}
              <svg className="absolute inset-0 w-full h-full text-slate-200/60" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="40" x2="100%" y2="40" stroke="currentColor" strokeWidth="4" />
                <line x1="0" y1="110" x2="100%" y2="110" stroke="currentColor" strokeWidth="6" />
                <line x1="0" y1="180" x2="100%" y2="180" stroke="currentColor" strokeWidth="4" />
                
                <line x1="80" y1="0" x2="80" y2="100%" stroke="currentColor" strokeWidth="6" />
                <line x1="220" y1="0" x2="220" y2="100%" stroke="currentColor" strokeWidth="4" />
                <line x1="380" y1="0" x2="380" y2="100%" stroke="currentColor" strokeWidth="8" />
              </svg>

              {/* Park patch */}
              <div className="absolute top-12 left-24 w-28 h-12 bg-emerald-100/60 rounded-xl border border-emerald-200/40 flex items-center justify-center">
                <span className="text-[9px] text-emerald-600 font-mono">Civic Square Park</span>
              </div>

              {/* Pinpoint Indicator */}
              <div className="absolute top-20 left-48 flex flex-col items-center select-none z-10 animate-bounce">
                <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 text-white p-2 rounded-full shadow-lg border border-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="bg-white px-2 py-0.5 rounded shadow text-[9px] font-bold text-gray-800 border border-gray-100 mt-1">
                  Hussain AI HQ
                </div>
              </div>

              {/* Surrounding landmarks */}
              <div className="absolute bottom-8 right-16 text-[9px] text-gray-400 font-mono bg-white/40 px-2 py-0.5 rounded border border-gray-200/20">
                Downtown Plaza Parking
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
