'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Play, MapPin, Home, DollarSign, Search, ChevronDown } from 'lucide-react';

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

// Types `text` one character at a time. Shows everything at once if the user prefers reduced motion.
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

/* ---------- Small pieces ---------- */

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

  // Typewriter: heading first, then the paragraph
  const heading = useTypewriter(HEADING_FULL, { speed: 80, reduced });
  const paragraph = useTypewriter(PARAGRAPH, { speed: 18, start: heading.done, reduced });

  // Pause the background video for people who prefer reduced motion
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
    <section className="relative isolate flex min-h-[90vh] w-full items-center overflow-hidden bg-gray-900 pb-16 pt-24">
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

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b via-black/50 to-black/70" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="max-w-2xl space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-white">#1 Real Estate Platform</span>
          </div>

          {/* Heading with Typewriter Effect */}
          <h1 className="relative text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
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
          <p className="relative mx-auto max-w-lg text-base leading-relaxed text-gray-300 sm:text-lg lg:mx-0">
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
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
            <Link
              href="/properties"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 active:scale-95"
            >
              Discover Now
            </Link>

            <button
              type="button"
              className="group flex items-center gap-3 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 transition group-hover:border-white group-hover:bg-white group-hover:text-gray-900">
                <Play className="ml-0.5 h-4 w-4 fill-current" />
              </span>
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Search / Filter Bar */}
        <div className="relative z-20 mt-12 rounded-3xl border border-gray-100 bg-white/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
            {/* Location Selector */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3 md:col-span-3 md:border-b-0 md:border-r md:pb-0 md:pr-4">
              <div className="rounded-2xl bg-gray-50 p-2.5 text-gray-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="location-select"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  Location
                </label>
                <div className="relative mt-0.5 flex items-center">
                  <select
                    id="location-select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full cursor-pointer appearance-none truncate bg-transparent pr-6 text-sm font-bold text-gray-900 focus:outline-none"
                  >
                    <option value="Los Angeles, California">Los Angeles, CA</option>
                    <option value="Dhaka, Bangladesh">Dhaka, Bangladesh</option>
                    <option value="New York, USA">New York, USA</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Property Type Selector */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3 md:col-span-3 md:border-b-0 md:border-r md:pb-0 md:pr-4">
              <div className="rounded-2xl bg-gray-50 p-2.5 text-gray-600">
                <Home className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="property-type-select"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  Property Type
                </label>
                <div className="relative mt-0.5 flex items-center">
                  <select
                    id="property-type-select"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full cursor-pointer appearance-none truncate bg-transparent pr-6 text-sm font-bold text-gray-900 focus:outline-none"
                  >
                    <option value="Classic Apartment">Classic Apartment</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Studio Flat">Studio Flat</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Price Range Selector */}
            <div className="flex items-center gap-3 pb-3 md:col-span-4 md:pb-0">
              <div className="rounded-2xl bg-gray-50 p-2.5 text-gray-600">
                <DollarSign className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="price-range-select"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  Price Range
                </label>
                <div className="relative mt-0.5 flex items-center">
                  <select
                    id="price-range-select"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full cursor-pointer appearance-none truncate bg-transparent pr-6 text-sm font-bold text-gray-900 focus:outline-none"
                  >
                    <option value="1000-5000">\$1,000 - \$5,000 / mo</option>
                    <option value="6000-12000">\$6,000 - \$12,000 / mo</option>
                    <option value="12000+">\$12,000+ / mo</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end md:col-span-2">
              <button
                type="button"
                onClick={handleSearch}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-black text-white shadow-md transition hover:bg-gray-800 active:scale-95 md:rounded-full"
                aria-label="Search Properties"
              >
                <Search className="h-5 w-5" />
                <span className="text-sm font-semibold md:hidden">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}