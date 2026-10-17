'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

// 1. Data Type Definition
export interface PopularLocation {
  id: string;
  name: string;
  city: string;
  propertiesCount: number;
  image: string;
  slug: string;
}

// 2. Popular Locations Mock Data
export const popularLocations: PopularLocation[] = [
  {
    id: '1',
    name: 'Gulshan & Banani',
    city: 'Dhaka',
    propertiesCount: 142,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800',
    slug: 'Gulshan',
  },
  {
    id: '2',
    name: 'Dhanmondi',
    city: 'Dhaka',
    propertiesCount: 98,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
    slug: 'Dhanmondi',
  },
  {
    id: '3',
    name: 'Uttara',
    city: 'Dhaka',
    propertiesCount: 115,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
    slug: 'Uttara',
  },
  {
    id: '4',
    name: 'Agrabad',
    city: 'Chittagong',
    propertiesCount: 64,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    slug: 'Chittagong',
  },
  {
    id: '5',
    name: 'Zindabazar',
    city: 'Sylhet',
    propertiesCount: 45,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800',
    slug: 'Sylhet',
  },
  {
    id: '6',
    name: 'Mirpur',
    city: 'Dhaka',
    propertiesCount: 88,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
    slug: 'Mirpur',
  },
];

// 3. Main Popular Locations Component
export default function PopularLocations() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Manual Scroll Handlers
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5" /> Explore Cities
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Popular Locations
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-base max-w-xl">
              Find your dream apartment in Bangladesh’s most sought-after neighborhoods and thriving hubs.
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => handleScroll('left')}
              className="p-2.5 rounded-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 shadow-sm transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2.5 rounded-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 shadow-sm transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <Link
              href="/properties"
              className="ml-2 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
            >
              View All
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Animated Horizontal Slider */}
        <div
          ref={scrollRef}
          className="flex items-center gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 px-1 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {popularLocations.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-[360px] flex-shrink-0"
            >
              <Link
                href={`/properties?search=${encodeURIComponent(loc.slug)}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-sm dark:shadow-gray-900/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 block border border-slate-200/60 dark:border-gray-800"
              >
                {/* Background Image */}
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  sizes="(max-width: 640px) 280px, 360px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent transition-opacity group-hover:from-slate-950/95" />

                {/* City Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md text-white text-xs font-medium border border-white/30">
                    {loc.city}
                  </span>
                </div>

                {/* Card Footer Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">
                      {loc.propertiesCount} Available Rentals
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}