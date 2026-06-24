/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Heart, Sparkles, ShieldCheck, Cpu, Flame, GraduationCap, Award 
} from 'lucide-react';
import { DOCTORS } from '../data';

export default function AboutView() {
  
  const values = [
    {
      icon: Heart,
      title: 'Empathy & Patient Comfort',
      desc: 'We treat people, not just teeth. We design our treatments around dental anxiety triggers to provide relaxing sessions.'
    },
    {
      icon: Cpu,
      title: 'Modern Clinical Science',
      desc: 'We continually update our equipment to use the lowest radiation, most biological, and fastest procedures available.'
    },
    {
      icon: ShieldCheck,
      title: 'Absolute Transparency',
      desc: 'No hidden bills, clear diagnostic photographs showing you what we see, and honest pricing guidelines.'
    }
  ];

  const technologies = [
    {
      title: 'Ultra-low Radiation Digital X-Rays',
      desc: 'Saves time, provides instant high-resolution imaging, and uses up to 80% less radiation than conventional films.'
    },
    {
      title: 'Intraoral 3D HD Scanning Cameras',
      desc: 'Allows us to project clear, live photos of your teeth on screen so you are fully informed of your oral state.'
    },
    {
      title: 'Laser Dentistry Whitening Amplifiers',
      desc: 'Enables quick, sensitivity-free professional cosmetic bleaching and swift soft-tissue recovery.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Narrative Intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Our Story & Mission
          </span>
          <h1 className="font-display text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Pioneering a Stress-Free <br />
            Dental Experience
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Founded in 2012, Hussain AI was built on a simple premise: providing AI-driven solutions that are restorative, educational, and absolutely user-friendly. Over the past decade, we have established one of the leading AI innovation hubs, serving over 5,000 clients with a combination of elite technical expertise and genuine human-centered design.
          </p>
          <blockquote className="border-l-4 border-blue-600 pl-4 text-gray-500 italic text-sm">
            "Your oral health is a vital gateway to overall physical wellness. Our mission is to make sure that gateway is guarded with state-of-the-art diagnostics and highly compassionate experts."
            <span className="block text-gray-800 font-bold text-xs mt-2 not-italic">— Dr. Sarah Jenkins, DDS</span>
          </blockquote>
        </div>

        {/* Story Illustration Frame */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-[360px]">
            <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-2 opacity-10" />
            <img 
              src="https://images.unsplash.com/photo-1579684389782-64d84b5e9053?auto=format&fit=crop&q=80&w=600" 
              alt="Dental Consultation" 
              className="relative rounded-2xl shadow-xl border border-gray-100 object-cover h-[350px] w-full"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-gray-900 tracking-tight">Our Care Pillars</h2>
          <p className="mt-2 text-gray-500 text-xs sm:text-sm">These core values govern every diagnostic decision, clinical action, and customer support gesture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div className="bg-blue-50 p-3.5 rounded-xl text-blue-600 w-max">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 text-base">{v.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Meet Our Doctors (Republished with detailed CV formatting) */}
      <section className="space-y-12 bg-slate-50 p-8 sm:p-12 rounded-3xl border border-gray-100">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-gray-900 tracking-tight">Our Dental Specialists</h2>
          <p className="mt-2 text-gray-500 text-xs sm:text-sm">Learn more about the credentials, backgrounds, and specialties of our lead physicians.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <img src={doc.image} alt={doc.name} className="w-full h-56 object-cover" />
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-gray-900">{doc.name}</h3>
                    <p className="text-xs text-blue-600 font-semibold">{doc.role}</p>
                  </div>
                  
                  {/* Education details badge style */}
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-start space-x-2.5">
                    <GraduationCap className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-gray-500 font-medium leading-tight">
                      {doc.education}
                    </span>
                  </div>

                  <p className="text-gray-600 text-xs leading-relaxed">
                    {doc.bio}
                  </p>
                </div>
              </div>

              {/* Specialization footer inside doctor card */}
              <div className="px-6 pb-6 pt-3 border-t border-gray-50 flex items-center space-x-2 text-xs text-gray-400">
                <Award className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Specialized in <strong className="text-gray-700">{doc.specialty}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Clinical Technology */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 order-last lg:order-first">
          <div className="relative mx-auto max-w-[360px]">
            <div className="absolute inset-0 bg-cyan-600 rounded-3xl -rotate-2 opacity-10" />
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600" 
              alt="High Tech Dental Chair" 
              className="relative rounded-2xl shadow-xl border border-gray-100 object-cover h-[350px] w-full"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
            Clinic Infrastructure
          </span>
          <h2 className="font-display text-3xl font-bold text-gray-900 tracking-tight">
            Our Advanced Dental Technology
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            We believe that better technology translates directly to faster recovery, lower sensitivity, and higher cosmetic precision. Here are the core digital tools we employ in our daily practice.
          </p>
          <div className="space-y-4">
            {technologies.map((t, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1">
                <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
                  {t.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed pl-6">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
