# BrightSmile Dental Clinic Website

A modern, premium, and fully-responsive healthcare application for **BrightSmile Dental Clinic**. Built using React, TypeScript, and Tailwind CSS, this website features complete administrative flows, an online appointment reservation system, and a live AI Voice Receptionist widget.

## 🚀 Key Features

1. **Comprehensive Pages**:
   - **Home Dashboard**: Features a premium Hero, "Why Choose Us" core values, "Featured Treatments", physician profiles, live patient testimonials, and expandable dental FAQs.
   - **Services Catalog**: Displays 6 main procedures (Routine Cleaning, Dental Checkup, Teeth Whitening, Fillings, Emergency Consultation, General Dentistry) alongside estimated cost tags, duration metrics, and specific medical benefits.
   - **About Us**: Profiles our senior physicians with education histories, clinical values, and highlight modules on modern diagnostic equipment.
   - **Contact & Location Info**: Houses operating schedules, direct phone/email links, custom schematic physical maps, and a digital message inquiry portal.
   - **Appointment Booking Portal**: Validates patient details, formats combined DateTime parameters, and sends live reservation requests.

2. **AI Voice Receptionist (Olivia)**:
   - Nested floating microphone widget in the bottom-right corner of all pages.
   - Integrates the **Vapi Web SDK** for real-time speech-to-text and text-to-speech dialogs.
   - Shows active call statuses, waveform audio volume meters, and a detailed speech transcription log.
   - Offers an in-app credential settings tab to test your custom assistants easily in preview modes.

3. **n8n CRM Integration**:
   - Compiles patient reservations and shoots structured POST payloads directly to your active n8n webhook:
     ```json
     {
       "callerName": "Robert Hastings",
       "callerPhone": "(415) 555-0198",
       "callerEmail": "robert@example.com",
       "requestedTime": "2026-06-25T10:00:00",
       "action": "Book",
       "reason": "Teeth Whitening",
       "eventId": ""
     }
     ```
   - Includes real-time connection checks, error fallbacks, and a sleek printable success voucher.

---

## 🛠️ Configuration & Environment Setup

To deploy this application to production (e.g., Vercel, Netlify, Cloud Run), configure the following environment variables. If these are omitted, the application will run in a fully functional high-fidelity simulated sandbox mode for evaluation.

```env
# Vapi AI Voice Assistant Credentials
NEXT_PUBLIC_VAPI_PUBLIC_KEY="your-vapi-public-key"
NEXT_PUBLIC_VAPI_ASSISTANT_ID="your-vapi-assistant-id"
VITE_VAPI_PUBLIC_KEY="your-vapi-public-key"
VITE_VAPI_ASSISTANT_ID="your-vapi-assistant-id"

# n8n Webhook Endpoint
NEXT_PUBLIC_N8N_WEBHOOK_URL="https://your-n8n-instance.com/webhook/..."
VITE_N8N_WEBHOOK_URL="https://your-n8n-instance.com/webhook/..."
```

---

## 💻 Local Development

Follow these simple steps to run the clinic locally:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Boot Development Server**:
   ```bash
   npm run dev
   ```

3. **Generate Production Bundles**:
   ```bash
   npm run build
   ```

---

## 🧑‍⚕️ Clinical Code Quality

- Fully typed with TypeScript interfaces for safety.
- Utilizes **Tailwind CSS v4** for clean utility-first responsive layouts.
- Powered by **Framer Motion** (via `motion/react`) for ambient micro-interactions and transitions.
- Fully accessible with generous text-to-background color contrasts and intuitive click targets.
