'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Play, MapPin, Home, DollarSign, Search, ChevronDown, ArrowDown } from 'lucide-react';

const HEADING_LINE_1 = 'Find Your Dream Property ';
const HEADING_LINE_2 = 'Without the Hassle.';
const HEADING_FULL = HEADING_LINE_1 + HEADING_LINE_2;

const PARAGRAPH =
  'Discover a curated collection of dream homes at your fingertips, simplified, verified, and personalized for your lifestyle.';

/* ---------- Hooks ---------- */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function useTypewriter(text, { speed = 60, start = true, reduced = false } = {}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setCount(text.length);
      return;
    }
    if (count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(id);
  }, [start, reduced, count, text, speed]);

  return { typed: text.slice(0, count), done: count >= text.length };
}

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-pulse bg-white"
    />
  );
}

export default function HeroSection() {
  const router = useRouter();
  const videoRef = useRef(null);
  const reduced = useReducedMotion();

  // Search Filter States
  const [location, setLocation] = useState('Los Angeles, California');
  const [propertyType, setPropertyType] = useState('Classic Apartment');
  const [priceRange, setPriceRange] = useState('6000-12000');

  const heading = useTypewriter(HEADING_FULL, { speed: 80, reduced });
  const paragraph = useTypewriter(PARAGRAPH, { speed: 18, start: heading.done, reduced });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduced) v.pause();
    else v.play().catch(() => {});
  }, [reduced]);

  const handleSearch = () => {
    const query = new URLSearchParams({
      location,
      type: propertyType,
      price: priceRange,
    }).toString();

    router.push(`/properties?${query}`);
  };

  return (
    <section className="relative isolate flex min-h-[60vh] max-h-[75vh] w-full items-center overflow-hidden bg-gray-900 py-12 lg:py-16">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/20538354-uhd_3840_2160_30fps.mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b via-black/60 to-black/80" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="max-w-2xl space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-white">#1 Real Estate Platform</span>
          </div>

          {/* Heading */}
          <h1 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            <span className="sr-only">{HEADING_FULL}</span>
            <span aria-hidden="true" className="invisible block">
              {HEADING_FULL}
            </span>
            <span aria-hidden="true" className="absolute inset-0 block">
              {heading.typed}
              {!heading.done && <Cursor />}
            </span>
          </h1>

          {/* Paragraph */}
          <p className="relative mx-auto max-w-lg text-sm leading-relaxed text-gray-300 sm:text-base lg:mx-0">
            <span className="sr-only">{PARAGRAPH}</span>
            <span aria-hidden="true" className="invisible block">
              {PARAGRAPH}
            </span>
            <span aria-hidden="true" className="absolute inset-0 block">
              {paragraph.typed}
              {heading.done && !paragraph.done && <Cursor />}
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 lg:justify-start">
            <Link
              href="/properties"
              className="rounded-full bg-white px-7 py-3 text-xs font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 active:scale-95"
            >
              Discover Now
            </Link>

            <button
              type="button"
              className="group flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition group-hover:border-white group-hover:bg-white group-hover:text-gray-900">
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              </span>
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Search / Filter Bar */}
        <div className="relative z-20 mt-8 rounded-2xl border border-white/10 bg-white/95 p-3 shadow-2xl backdrop-blur-xl sm:p-4">
          <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
            {/* Location Selector */}
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2.5 md:col-span-3 md:border-b-0 md:border-r md:pb-0 md:pr-3">
              <div className="rounded-xl bg-gray-100 p-2 text-gray-600">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="location-select"
                  className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400"
                >
                  Location
                </label>
                <div className="relative mt-0.5 flex items-center">
                  <select
                    id="location-select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full cursor-pointer appearance-none truncate bg-transparent pr-5 text-xs font-bold text-gray-900 focus:outline-none"
                  >
                    <option value="Los Angeles, California">Los Angeles, CA</option>
                    <option value="Dhaka, Bangladesh">Dhaka, Bangladesh</option>
                    <option value="New York, USA">New York, USA</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Property Type Selector */}
            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-2.5 md:col-span-3 md:border-b-0 md:border-r md:pb-0 md:pr-3">
              <div className="rounded-xl bg-gray-100 p-2 text-gray-600">
                <Home className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="property-type-select"
                  className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400"
                >
                  Property Type
                </label>
                <div className="relative mt-0.5 flex items-center">
                  <select
                    id="property-type-select"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full cursor-pointer appearance-none truncate bg-transparent pr-5 text-xs font-bold text-gray-900 focus:outline-none"
                  >
                    <option value="Classic Apartment">Classic Apartment</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Studio Flat">Studio Flat</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Price Range Selector */}
            <div className="flex items-center gap-2.5 pb-2.5 md:col-span-4 md:pb-0">
              <div className="rounded-xl bg-gray-100 p-2 text-gray-600">
                <DollarSign className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="price-range-select"
                  className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400"
                >
                  Price Range
                </label>
                <div className="relative mt-0.5 flex items-center">
                  <select
                    id="price-range-select"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full cursor-pointer appearance-none truncate bg-transparent pr-5 text-xs font-bold text-gray-900 focus:outline-none"
                  >
                    <option value="1000-5000">\$1,000 - \$5,000 / mo</option>
                    <option value="6000-12000">\$6,000 - \$12,000 / mo</option>
                    <option value="12000+">\$12,000+ / mo</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end md:col-span-2">
              <button
                type="button"
                onClick={handleSearch}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-black text-white shadow-md transition hover:bg-gray-800 active:scale-95 md:rounded-full"
                aria-label="Search Properties"
              >
                <Search className="h-4 w-4" />
                <span className="text-xs font-semibold md:hidden">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clear Visual Flow Indicator to Next Section */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
            <span>Explore Properties Below</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}