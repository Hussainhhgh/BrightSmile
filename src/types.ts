/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  role: string;
  education: string;
  bio: string;
  image: string;
  specialty: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  priceEstimate: string;
  duration: string;
  benefits: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'services' | 'insurance' | 'booking';
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  serviceType: string;
  notes: string;
}

export interface VapiMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
}
