"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Building2, 
  Tag, 
  MapPin, 
  BadgePercent, 
  Lock, 
  Sofa, 
  ShieldAlert, 
  Briefcase 
} from "lucide-react";

const MarqueeSection = () => {
  // Apartment & Rental Related Items with Icons
  const items = [
    { text: "Verified Apartments", icon: ShieldCheck },
    { text: "Luxury Penthouses", icon: Building2 },
    { text: "Affordable Rent", icon: Tag },
    { text: "Prime Locations", icon: MapPin },
    { text: "Zero Brokerage", icon: BadgePercent },
    { text: "Gated Community", icon: Lock },
    { text: "Fully Furnished", icon: Sofa },
    { text: "24/7 Security", icon: ShieldAlert },
    { text: "Commercial Spaces", icon: Briefcase },
  ];

  // Loop items 2 times for smooth seamless animation
  const marqueeList = [...items, ...items];

  return (
    <section className="bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-5 border-y border-gray-200/80 dark:border-gray-800 overflow-hidden select-none relative group">
      
      {/* Side Fade Gradient Overlays for smooth professional transition */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <div className="flex w-full">
        <motion.div
          className="flex gap-10 sm:gap-14 items-center flex-shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
          // Pause marquee animation on hover for better user experience
          whileHover={{ animationPlayState: "paused" }}
        >
          {marqueeList.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className="flex items-center gap-10 sm:gap-14 flex-shrink-0">
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800/80 px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-700/60 shadow-sm transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-900">
                  {/* Item Icon */}
                  <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  
                  {/* Item Text */}
                  <h2 className="text-sm sm:text-base font-semibold tracking-wide text-gray-800 dark:text-gray-100 whitespace-nowrap">
                    {item.text}
                  </h2>
                </div>

                {/* Modern Decorative Separator */}
                <div className="flex items-center gap-1.5 opacity-40">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeSection;