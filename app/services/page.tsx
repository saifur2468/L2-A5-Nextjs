'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useSpring,
} from 'framer-motion';
import {
  Wifi, 
  Wine, 
  Bath, 
  Coffee, 
  Tv, 
  Wind, 
  Sun, 
  Car, 
  Microwave, 
  Shirt, 
  ShieldCheck, 
  Clock, 
  KeyRound, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

/* ---------- Animation variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const view = { once: true, amount: 0.1 } as const;

/* ---------- Room Services & Amenities Data ---------- */
const ROOM_SERVICES = [
  { id: '1', icon: Wifi, title: 'High-Speed WiFi', desc: 'Complimentary fiber internet available in all rooms and common areas.' },
  { id: '2', icon: Wine, title: 'Mini Bar', desc: 'Stocked with refreshing beverages, snacks, and treats upon arrival.' },
  { id: '3', icon: Bath, title: 'Luxury Jacuzzi', desc: 'Relax and unwind in a private heated jacuzzi after a long day.' },
  { id: '4', icon: Coffee, title: 'Coffee Maker', desc: 'Premium espresso machine and tea assortment ready for your mornings.' },
  { id: '5', icon: Tv, title: 'Widescreen Smart TV', desc: 'Equipped with Netflix, YouTube, and international satellite channels.' },
  { id: '6', icon: Wind, title: 'Climate Air Conditioner', desc: 'Individually controlled climate settings for optimal room temperature.' },
  { id: '7', icon: Sun, title: 'Private Balcony', desc: 'Scenic city or garden views with comfortable outdoor seating.' },
  { id: '8', icon: Car, title: 'Secure Parking', desc: '24/7 monitored underground parking space reserved for residents.' },
  { id: '9', icon: Microwave, title: 'Modern Kitchenette', desc: 'Includes microwave, refrigerator, and essential kitchen utilities.' },
  { id: '10', icon: Shirt, title: 'Laundry & Towels', desc: 'Fresh premium bath towels, linens, and in-building washing facilities.' },
  { id: '11', icon: ShieldCheck, title: '24/7 Security', desc: 'CCTV surveillance and biometric access control for complete peace of mind.' },
  { id: '12', icon: KeyRound, title: 'Smart Keyless Entry', desc: 'Secure digital passcode lock system for seamless and safe check-in.' },
];

const BOOKING_BENEFITS = [
  { icon: Clock, title: 'Instant Booking Confirmation', desc: 'Secure your apartment within minutes with our automated reservation system.' },
  { icon: ShieldCheck, title: 'Zero Hidden Fees', desc: 'Transparent pricing with no surprise service charges or broker commissions.' },
  { icon: Sparkles, title: 'Flexible Policies', desc: 'Easy rescheduling and transparent cancellation guidelines for your convenience.' },
];

export default function ServicesPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-white overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      

      {/* 1. Header Section (Matched with Screenshot Style) */}
      <section className="bg-white dark:bg-gray-900 border-b border-slate-100 dark:border-gray-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
              Rooms & Apartment Services
            </h1>
            {/* <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-900 dark:text-white font-semibold">Rooms Services</span>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* 2. Room Services Grid (Screenshot Style Cards) */}
      <section className="py-20 bg-slate-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden" whileInView="visible" viewport={view} variants={fadeUp}
          >
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">WORLD-CLASS AMENITIES</span>
            <h2 className="text-3xl font-extrabold mt-2">Everything You Need For Comfortable Living</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              Explore the premium services and in-room facilities included with your apartment booking.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={view} variants={stagger}
          >
            {ROOM_SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <motion.div
                  key={srv.id}
                  variants={fadeUp}
                  className="group bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-rose-500/50 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors mb-1">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

    </div>
  );
}