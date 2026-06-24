/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, ServiceItem, Testimonial, FAQItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'routine-cleaning',
    title: 'Routine Cleaning',
    shortDescription: 'Professional plaque removal and polishing for optimal gum and dental health.',
    longDescription: 'Our routine cleaning service includes a thorough scaling process to remove calculus, dental plaque, and surface stains, followed by a professional flossing and polishing. This treatment is crucial for preventing cavities, gingivitis, and periodontal disease.',
    iconName: 'Sparkles',
    priceEstimate: '$90 - $150',
    duration: '45 mins',
    benefits: [
      'Removes stubborn plaque and calculus (tartar)',
      'Prevents gum disease and tooth decay',
      'Freshens breath instantly',
      'Includes oral hygiene counseling'
    ]
  },
  {
    id: 'dental-checkup',
    title: 'Dental Checkup',
    shortDescription: 'Comprehensive examination including digital X-rays and early disease screening.',
    longDescription: 'A complete dental checkup is the foundation of preventive dental care. Our experts will examine your teeth, gums, and mouth tissues, take precision digital X-rays to check for unseen issues, perform a screening for oral cancer, and assess your jaw joint (TMJ).',
    iconName: 'ShieldAlert',
    priceEstimate: '$120 - $200',
    duration: '60 mins',
    benefits: [
      'Early detection of tooth decay and gum issues',
      'Advanced digital X-rays with low radiation',
      'Oral cancer screening included',
      'Comprehensive bite and jaw inspection'
    ]
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    shortDescription: 'Safe, professional-grade cosmetic bleaching to brighten your smile up to 8 shades.',
    longDescription: 'Get a dazzling, brilliant smile with our state-of-the-art professional teeth whitening system. We use safe, high-potency bleaching agents activated by specialized cold light technology to deliver spectacular results in just one session, far outperforming over-the-counter options.',
    iconName: 'Zap',
    priceEstimate: '$250 - $450',
    duration: '75 mins',
    benefits: [
      'Brightens teeth up to 8 shades in a single visit',
      'Safe, enamel-friendly customized gel formula',
      'Professional supervision to minimize sensitivity',
      'Long-lasting brilliance with home care'
    ]
  },
  {
    id: 'fillings',
    title: 'Dental Fillings',
    shortDescription: 'Restoring teeth decayed by cavities using high-quality composite resins.',
    longDescription: 'We offer mercury-free, tooth-colored composite resin fillings that blend perfectly with your natural teeth. Our dentists meticulously remove the decayed portion of the tooth and restore its structural integrity, leaving you with a durable, beautiful, and invisible restoration.',
    iconName: 'Activity',
    priceEstimate: '$150 - $300',
    duration: '45 mins',
    benefits: [
      'Tooth-colored composite material matches natural enamel',
      'Strong, durable, and chemically bonded to the tooth',
      'Preserves more of the natural tooth structure',
      'Completely mercury-free and bio-compatible'
    ]
  },
  {
    id: 'emergency-consultation',
    title: 'Emergency Consultation',
    shortDescription: 'Urgent care for sudden toothaches, broken teeth, swellings, or lost fillings.',
    longDescription: 'Dental emergencies can be incredibly painful and stressful. We provide same-day urgent care appointments for intense toothaches, broken or knocked-out teeth, facial swelling, or severe gum bleeding. We prioritize pain relief and immediate stabilization.',
    iconName: 'Flame',
    priceEstimate: '$100 - $180',
    duration: '30 mins',
    benefits: [
      'Same-day guaranteed emergency appointments',
      'Immediate pain relief and medication administration',
      'Stabilization of fractured, chipped, or displaced teeth',
      'Expert advice for continuous recovery'
    ]
  },
  {
    id: 'general-dentistry',
    title: 'General Dentistry',
    shortDescription: 'Comprehensive oral healthcare including extractions, crowns, and root canals.',
    longDescription: 'Our general dentistry services cover a wide spectrum of essential restorations. From root canal therapy that saves severely infected teeth, to custom-crafted crowns and bridges, we utilize cutting-edge dental equipment to rebuild your smile to maximum strength, health, and visual beauty.',
    iconName: 'Heart',
    priceEstimate: 'Varies by procedure',
    duration: '60+ mins',
    benefits: [
      'Tailored comprehensive oral health treatment plans',
      'High-quality custom crowns, bridges, and veneers',
      'Gentle, state-of-the-art root canal procedures',
      'Nitrous oxide (laughing gas) available for high anxiety'
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-sarah-jenkins',
    name: 'Dr. Sarah Jenkins, DDS',
    role: 'Lead General Dentist & Partner',
    education: 'Doctor of Dental Surgery — Northwestern University',
    bio: 'With over 12 years of experience in restorative and preventive dentistry, Dr. Sarah Jenkins is passionate about creating a stress-free environment for patients of all ages. She is an active member of the American Dental Association and specializes in bio-mimetic restoration techniques.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    specialty: 'Preventive & Restorative Dentistry'
  },
  {
    id: 'dr-marcus-vance',
    name: 'Dr. Marcus Vance, DMD',
    role: 'Cosmetic Specialist & Orthodontist',
    education: 'Doctor of Dental Medicine — Harvard School of Dental Medicine',
    bio: 'Dr. Marcus Vance has dedicated his career to the art and science of cosmetic smile makeovers, porcelain veneers, and modern aligner therapies. He believes a beautiful smile is a perfect blend of high-precision medicine and creative artistry.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    specialty: 'Cosmetic Dentistry & Clear Aligners'
  },
  {
    id: 'dr-elena-rostova',
    name: 'Dr. Elena Rostova, DDS',
    role: 'Pediatric & Sedation Specialist',
    education: 'Specialty Certificate in Pediatrics — NYU College of Dentistry',
    bio: 'Dr. Rostova specializes in making dental visits exciting and fear-free for children. She is certified in advanced pediatric conscious sedation and has extensive experience treating patients with special healthcare needs.',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600',
    specialty: 'Pediatric Dentistry & Sedation'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Arthur Pendelton',
    role: 'Patient since 2023',
    rating: 5,
    text: 'I used to dread the dentist due to severe anxiety, but Dr. Jenkins and her staff completely changed that. They explained everything step-by-step and checked in on me constantly during my cleaning. The clinic is pristine, modern, and incredibly calming.',
    date: 'May 12, 2026'
  },
  {
    id: 't2',
    name: 'Clara Montgomerie',
    role: 'Cosmetic Smile Makeover Patient',
    rating: 5,
    text: 'Dr. Vance literally gave me my confidence back. My teeth whitening and minor contouring were handled with such professional artistry. I cannot stop smiling! The Vapi virtual receptionist also helped me schedule my follow-up session over voice in seconds.',
    date: 'June 3, 2026'
  },
  {
    id: 't3',
    name: 'Robert Hastings',
    role: 'Emergency Patient',
    rating: 5,
    text: 'I woke up on a Saturday with a excruciating toothache. I called their emergency line, and they got me in by 11 AM the same morning. Dr. Rostova performed a painless filling restoration, and the pricing was extremely transparent. Truly life-saving service.',
    date: 'April 20, 2026'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How often should I visit BrightSmile Dental Clinic for a checkup?',
    answer: 'For most children and adults, we recommend a routine checkup and professional cleaning twice a year (every 6 months) to catch potential issues early and maintain excellent oral health.',
    category: 'general'
  },
  {
    id: 'faq2',
    question: 'Do you accept major dental insurance plans?',
    answer: 'Yes, we accept most major PPO dental insurance providers. We will gladly process and submit all insurance claims on your behalf to help maximize your benefits. Please call us to verify your specific coverage.',
    category: 'insurance'
  },
  {
    id: 'faq3',
    question: 'What should I do in case of a dental emergency after hours?',
    answer: 'If you have a severe toothache, bleeding, or a knocked-out tooth after regular office hours, call our main number. Our automated voice assistant or on-call staff will direct you immediately on how to receive emergency treatment.',
    category: 'booking'
  },
  {
    id: 'faq4',
    question: 'What is the teeth whitening procedure, and is it safe for my enamel?',
    answer: 'Our professional whitening uses an enamel-safe hydrogen peroxide gel activated by a cool LED light. Under dentist supervision, this is completely safe, does not damage your enamel, and includes anti-sensitivity buffers.',
    category: 'services'
  },
  {
    id: 'faq5',
    question: 'Can I reschedule or cancel my booked appointment?',
    answer: 'Absolutely. We kindly ask for at least 24 hours notice for any cancellations or rescheduling to allow other patients in need to use that slot. You can reschedule by calling our office or using the booking portal.',
    category: 'booking'
  }
];
