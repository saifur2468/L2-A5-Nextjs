"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MarqueeSection = () => {
  // Apartment & Rental Items along with specific property thumbnail images
  const items = [
    {
      title: "Family apartment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&auto=format&fit=crop&q=60",
    },
    {
      title: "Studio flat",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&auto=format&fit=crop&q=60",
    },
    {
      title: "Bachelor & sublet",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100&auto=format&fit=crop&q=60",
    },
    {
      title: "Penthouse",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&auto=format&fit=crop&q=60",
    },
    {
      title: "Duplex & villa",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&auto=format&fit=crop&q=60",
    },
    {
      title: "Office space",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&auto=format&fit=crop&q=60",
    },
    {
      title: "Shop & showroom",
      image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=100&auto=format&fit=crop&q=60",
    },
    {
      title: "Warehouse",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-6 border-y border-gray-200 dark:border-gray-800 overflow-hidden select-none">
      <div className="flex w-full">
        <motion.div
          className="flex gap-10 items-center flex-shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {/* Loop twice for smooth infinite marquee effect */}
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-6 flex-shrink-0 bg-gray-50 dark:bg-gray-800/60 px-5 py-2.5 rounded-full border border-gray-100 dark:border-gray-700">
              
              {/* Property Type Thumbnail Image */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-900 dark:text-white whitespace-nowrap">
                {item.title}
              </h2>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeSection;