"use client";

import React from "react";
import { motion } from "framer-motion";

const MarqueeSection = () => {
  // Apartment & Rental Related Items
  const items = [
    "Verified Apartments",
    "Luxury Penthouses",
    "Affordable Rent",
    "Prime Locations",
    "Zero Brokerage",
    "Gated Community",
    "Fully Furnished",
    "24/7 Security",
    "Commercial Spaces",
  ];

  return (
    <section className="bg-white py-6 border-y border-gray-800 overflow-hidden  select-none">
      <div className="flex w-full">
        <motion.div
          className="flex gap-12 items-center flex-shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {/* Loop twice for smooth infinite marquee effect */}
          {[...items, ...items].map((text, i) => (
            <div key={i} className="flex items-center gap-12 flex-shrink-0">
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-black whitespace-nowrap">
                {text}
              </h2>
              {/* Decorative separator dot */}
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 inline-block" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeSection;