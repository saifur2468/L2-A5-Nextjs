'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Database, 
  Share2, 
  Cookie, 
  Mail, 
  ChevronRight, 
  FileText,
  Calendar
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: '1. Introduction', icon: FileText },
    { id: 'information-collect', title: '2. Information We Collect', icon: Database },
    { id: 'how-we-use', title: '3. How We Use Your Data', icon: UserCheck },
    { id: 'booking-security', title: '4. Apartment & Payment Security', icon: Lock },
    { id: 'data-sharing', title: '5. Information Sharing', icon: Share2 },
    { id: 'cookies', title: '6. Cookies & Tracking', icon: Cookie },
    { id: 'contact', title: '7. Contact Us', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" /> Legal & Compliance
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Privacy & <span className="text-blue-600 dark:text-blue-400">Policy</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            At <span className="font-semibold text-gray-900 dark:text-white">RentNest</span>, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal and apartment booking data.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400 dark:text-gray-500">
            <Calendar className="w-4 h-4" /> Last updated: October 16, 2026
          </div>
        </motion.div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Sticky Navigation (Table of Contents) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block lg:col-span-1 sticky top-28 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-3">
              Table of Contents
            </h3>
            <nav className="space-y-1">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                    <span className="truncate">{sec.title}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>

          {/* Right Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 space-y-8"
          >
            
            {/* Section 1 */}
            <div id="introduction" className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">1</span>
                Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Welcome to RentNest. We operate an apartment booking and property rental management platform that connects tenants with property landlords and administrators. 
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                By accessing or using our website, mobile apps, and services, you agree to the collection and use of information in accordance with this Privacy Policy. If you disagree with any part of this policy, please refrain from using RentNest.
              </p>
            </div>

            {/* Section 2 */}
            <div id="information-collect" className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">2</span>
                Information We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                To provide a seamless apartment reservation experience, we collect several types of information from our users:
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong className="text-gray-900 dark:text-white">Personal Identification Data:</strong> Full name, email address, phone number, and profile role (Tenant, Landlord, Admin) during registration.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong className="text-gray-900 dark:text-white">Booking & Transaction Records:</strong> Selected apartments, reservation dates, payment histories, and Stripe billing logs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong className="text-gray-900 dark:text-white">Technical Data:</strong> IP address, browser type, device information, and session tokens for secure authentication.</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="how-we-use" className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">3</span>
                How We Use Your Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Your data enables us to run RentNest securely and efficiently. Primary use cases include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Processing Reservations</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Confirming apartment leases and managing landlord-tenant dashboards.</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Account Security</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Verifying JWT authentication and preventing unauthorized login attempts.</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Customer Support</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Responding to inquiries, booking disputes, and technical support requests.</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Platform Updates</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Sending notifications regarding booking confirmations or policy changes.</p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div id="booking-security" className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">4</span>
                Apartment & Payment Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We implement industry-standard encryption protocols (SSL/TLS) to secure data transmission. All financial transactions and online rent payments are securely processed through PCI-DSS compliant gateways like Stripe. RentNest never stores your full credit card or banking credentials on our local servers.
              </p>
            </div>

            {/* Section 5 */}
            <div id="data-sharing" className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">5</span>
                Information Sharing
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. Information is only shared under specific circumstances:
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong className="text-gray-900 dark:text-white">With Property Landlords:</strong> When you book an apartment, necessary contact and booking details are shared with the respective landlord to facilitate your stay.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong className="text-gray-900 dark:text-white">Legal Obligations:</strong> If required by law enforcement, court orders, or government regulations to protect our legal rights.</span>
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div id="cookies" className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">6</span>
                Cookies & Tracking
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                RentNest uses cookies and similar storage tokens to remember your login session, preferences, and theme settings (such as dark mode). You can choose to disable cookies through your browser settings, though certain features like booking management and dashboard access may require cookies to function correctly.
              </p>
            </div>

            {/* Section 7 */}
            <div id="contact" className="bg-blue-600 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                <Mail className="w-7 h-7" />
                7. Have Questions Regarding Your Privacy?
              </h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or your data stored on RentNest, feel free to reach out to our support team.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/contact" 
                  className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition shadow-md"
                >
                  Contact Support
                </a>
                <a 
                  href="mailto:saifdevweb@gmail.com" 
                  className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition border border-blue-500"
                >
                  Email Us Directly
                </a>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}