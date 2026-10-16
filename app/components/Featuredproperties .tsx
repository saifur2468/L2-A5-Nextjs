'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ShieldCheck, 
  CreditCard, 
  LayoutDashboard, 
  Video, 
  Wrench, 
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

export default function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: 'Smart Search & Filters',
      description: 'Easily discover your ideal apartment using advanced filters for price range, location, and desired room count.',
      color: 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Listings & Owners',
      description: 'Enjoy 100% genuine properties and background-checked landlords to ensure safety and transparency.',
      color: 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: CreditCard,
      title: 'Secure Online Payments',
      description: 'Pay your rent and booking deposits safely using integrated, PCI-compliant payment gateways like Stripe.',
      color: 'bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
    },
    {
      icon: LayoutDashboard,
      title: 'Role-Based Dashboards',
      description: 'Dedicated and intuitive portals for tenants, landlords, and administrators to manage leases effortlessly.',
      color: 'bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
    },
    {
      icon: Video,
      title: 'Virtual Tours & Reels',
      description: 'Explore high-definition property video reels and photos before scheduling an in-person visit.',
      color: 'bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400',
    },
    {
      icon: Wrench,
      title: 'Maintenance Requests',
      description: 'Raise maintenance or repair issues directly through your tenant dashboard with real-time tracking.',
      color: 'bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors relative overflow-hidden">
      
      {/* Background Decorative Gradient Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            Why Choose RentNest
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4"
          >
            Everything You Need for <span className="text-blue-600 dark:text-blue-400">Seamless Living</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg"
          >
            We simplify apartment searching, secure bookings, and property management so you can focus on finding your dream home.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900 transition-all group"
              >
                {/* Icon Box */}
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Explore Link */}
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform"
                >
                  Explore more <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}