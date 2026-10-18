'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Play, MapPin, Home, DollarSign, Search, ChevronDown, ArrowDown } from 'lucide-react';
import AISearchBar from '../components/AISearchBar'; 

const HEADING_LINE_1 = 'Find Your Dream Property ';
const HEADING_LINE_2 = 'Without the Hassle.';
const HEADING_FULL = HEADING_LINE_1 + HEADING_LINE_2;

const PARAGRAPH =
  'Discover a curated collection of dream homes at your fingertips, simplified, verified, and personalized for your lifestyle.';

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
  const [aiResult, setAiResult] = useState(null);

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
  <section className="relative isolate flex min-h-[80vh] w-full items-center overflow-hidden bg-gray-900 py-16 sm:py-20 lg:py-24">
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
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
      {/* Single aligned column */}
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center lg:mx-0 lg:items-start lg:text-left">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-white">
            #1 Real Estate Platform powered by AI
          </span>
        </div>

        {/* Heading */}
        <h1 className="relative w-full text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
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
        <p className="relative w-full max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
          <span className="sr-only">{PARAGRAPH}</span>
          <span aria-hidden="true" className="invisible block">
            {PARAGRAPH}
          </span>
          <span aria-hidden="true" className="absolute inset-0 block">
            {paragraph.typed}
            {heading.done && !paragraph.done && <Cursor />}
          </span>
        </p>

        {/* AI Search Bar */}
        <div className="w-full max-w-2xl">
          <AISearchBar onSearchResults={(result) => setAiResult(result)} />
        </div>

        {/* AI Search Results */}
        {aiResult && (
          <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-black/75 p-5 text-left text-white shadow-2xl backdrop-blur-md sm:p-6">
            <h3 className="mb-3 text-sm font-bold text-rose-400">
              ✨ AI Search Recommendations:
            </h3>
            <p className="whitespace-pre-wrap text-xs leading-relaxed text-gray-200 sm:text-sm">
              {aiResult}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:justify-start">
          <Link
            href="/properties"
            className="rounded-full bg-white px-8 py-3.5 text-xs font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 active:scale-95"
          >
            Discover All Properties
          </Link>

          <button
            type="button"
            className="group flex cursor-pointer items-center gap-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 transition group-hover:border-white group-hover:bg-white group-hover:text-gray-900">
              <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
            </span>
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-6 flex items-center gap-2 rounded-full bg-black/30 px-4 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-sm lg:mt-10">
          <span>Explore Properties Below</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </div>
      </div>
    </div>
  </section>
);
 
}