'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Play, MapPin, Home, DollarSign, Search, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();

  // Search Filter States
  const [location, setLocation] = useState('Los Angeles, California');
  const [propertyType, setPropertyType] = useState('Classic Apartment');
  const [priceRange, setPriceRange] = useState('6000-12000');

  const handleSearch = () => {
    // Redirect to properties page with query parameters
    const query = new URLSearchParams({
      location,
      type: propertyType,
      price: priceRange,
    }).toString();

    router.push(`/properties?${query}`);
  };

  return (
    <section className="relative w-full min-h-[85vh] bg-gradient-to-b from-gray-50/50 to-white overflow-hidden flex items-center pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Grid: Content & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-6 z-10 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-black/5 px-3.5 py-1.5 rounded-full border border-black/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-700">#1 Real Estate Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]">
              Gateway to <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
                Dream Homes
              </span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Discover a curated collection of dream homes at your fingertips, 
              simplified, verified, and personalized for your lifestyle.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/properties"
                className="bg-black text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-lg shadow-black/10 hover:bg-gray-800 hover:shadow-xl transition-all active:scale-95"
              >
                Discover Now
              </Link>

              <button
                type="button"
                className="group flex items-center gap-3 px-5 py-3 text-gray-900 font-semibold text-sm hover:opacity-80 transition"
              >
                <span className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Column: House Image */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] aspect-square sm:aspect-[4/3] lg:aspect-[1/1] hover:scale-[1.01] transition duration-500">
              <Image
                src="/istockphoto-1987630154-612x612.jpg"
                alt="3D Modern House"
                fill
                priority
                className="object-contain drop-shadow-2xl "
              />
            </div>
          </div>

        </div>

        {/* Floating Search / Filter Bar */}
        <div className="relative z-20 mt-10 lg:-mt-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-4 sm:p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Location Selector */}
            <div className="md:col-span-3 flex items-center gap-3 border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-4">
              <div className="p-2.5 bg-gray-50 rounded-2xl text-gray-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <label htmlFor="location-select" className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Location
                </label>
                <div className="relative flex items-center mt-0.5">
                  <select
                    id="location-select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none cursor-pointer appearance-none pr-6 truncate"
                  >
                    <option value="Los Angeles, California">Los Angeles, CA</option>
                    <option value="Dhaka, Bangladesh">Dhaka, Bangladesh</option>
                    <option value="New York, USA">New York, USA</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-0 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Property Type Selector */}
            <div className="md:col-span-3 flex items-center gap-3 border-b md:border-b-0 md:border-r border-gray-100 pb-3 md:pb-0 md:pr-4">
              <div className="p-2.5 bg-gray-50 rounded-2xl text-gray-600">
                <Home className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <label htmlFor="property-type-select" className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Property Type
                </label>
                <div className="relative flex items-center mt-0.5">
                  <select
                    id="property-type-select"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none cursor-pointer appearance-none pr-6 truncate"
                  >
                    <option value="Classic Apartment">Classic Apartment</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Studio Flat">Studio Flat</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-0 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Price Range Selector */}
            <div className="md:col-span-4 flex items-center gap-3 pb-3 md:pb-0">
              <div className="p-2.5 bg-gray-50 rounded-2xl text-gray-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <label htmlFor="price-range-select" className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Price Range
                </label>
                <div className="relative flex items-center mt-0.5">
                  <select
                    id="price-range-select"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none cursor-pointer appearance-none pr-6 truncate"
                  >
                    <option value="1000-5000">$1,000 - $5,000 / mo</option>
                    <option value="6000-12000">$6,000 - $12,000 / mo</option>
                    <option value="12000+">$12,000+ / mo</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-0 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full h-12 bg-black text-white rounded-2xl md:rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition active:scale-95 shadow-md"
                aria-label="Search Properties"
              >
                <Search className="w-5 h-5" />
                <span className="md:hidden font-semibold text-sm">Search</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}