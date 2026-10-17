'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MessageSquare, User, ArrowUpRight, Clock, BookOpen } from 'lucide-react';

const ARTICLES = [
  {
    id: '1',
    title: 'The Ultimate Cheat Sheet On Real Estate',
    category: 'NEWS',
    date: 'October 15, 2023',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    summary: 'To mark the first UK show of artist Henri Barande, graphic designer Logan Cee and German studio Schultzschultz have created The Lodge Wooden...'
  },
  {
    id: '2',
    title: '5 Tools Everyone In The Real Estate Industry Should Be Using',
    category: 'NEWS',
    date: 'October 15, 2023',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    summary: 'Discover key real estate management tools that simplify property estimation, lead tracking, and client communication for agents.'
  },
  {
    id: '3',
    title: '15 Best Blogs To Follow About Real Estate',
    category: 'NEWS',
    date: 'October 15, 2023',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    summary: 'Stay updated with architectural insights, market statistics, and investment advice from global industry leaders.'
  },
  {
    id: '4',
    title: '10 Quick Tips About Real Estate Investments',
    category: 'NEWS',
    date: 'October 15, 2023',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80',
    summary: 'Quick actionable advice to analyze cash flows, location growth parameters, and property value appreciation.'
  },
  {
    id: '5',
    title: 'How To Scale Your Property Portfolio in 2026',
    category: 'GUIDE',
    date: 'January 10, 2026',
    author: 'Vanqui Nguyen',
    comments: 2,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    summary: 'Discover key strategies on how to leverage and reinvest rental income to scale your portfolio successfully.'
  },
  {
    id: '6',
    title: 'Understanding Mortgage Rates and Housing Trends',
    category: 'FINANCE',
    date: 'February 18, 2026',
    author: 'Vanqui Nguyen',
    comments: 5,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80',
    summary: 'Interest rates affect your monthly payments. Learn how economic indicators influence lending rates.'
  },
  {
    id: '7',
    title: 'Top Interior Design Trends for Modern Apartments',
    category: 'DESIGN',
    date: 'March 02, 2026',
    author: 'Vanqui Nguyen',
    comments: 1,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80',
    summary: 'Explore minimalist layouts, smart automation, and sustainable materials for your apartment.'
  },
  {
    id: '8',
    title: 'A Beginners Guide to Commercial Real Estate',
    category: 'BUSINESS',
    date: 'March 15, 2026',
    author: 'Vanqui Nguyen',
    comments: 4,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    summary: 'Commercial real estate offers higher yields. Dive into office spaces and storefront leasing fundamentals.'
  }
];

export default function NewsConsultSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(ARTICLES.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? (totalPages - 1) * itemsPerPage : prev - itemsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= ARTICLES.length ? 0 : prev + itemsPerPage));
  };

  const visibleArticles = ARTICLES.slice(currentIndex, currentIndex + itemsPerPage);
  const featuredArticle = visibleArticles[0];
  const sideArticles = visibleArticles.slice(1);

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" /> Insights & News
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              News & Consultation
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-400 mr-2">
              Page {Math.floor(currentIndex / itemsPerPage) + 1} of {totalPages}
            </span>
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Magazine Style Article Grid */}
        {featuredArticle && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Main Featured Article */}
            <div className="lg:col-span-7 flex">
              <Link
                href={`/articles/${featuredArticle.id}`}
                className="group relative w-full rounded-2xl overflow-hidden flex flex-col justify-end p-6 sm:p-8 min-h-[420px] lg:min-h-[500px]"
              >
                {/* Background Image */}
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  unoptimized
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-md uppercase tracking-wider">
                      {featuredArticle.category}
                    </span>
                    <span className="text-xs text-gray-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {featuredArticle.date}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3 group-hover:text-blue-300 transition-colors">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-sm text-gray-300 line-clamp-2 mb-4 max-w-xl leading-relaxed">
                    {featuredArticle.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-gray-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5" /> {featuredArticle.author}
                    </span>
                    <span className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform font-semibold">
                      Read Article <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Side Articles List */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {sideArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="group p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 hover:border-blue-500/30 hover:shadow-lg transition-all duration-300 flex gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 h-24 sm:w-32 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                      <span>{article.category}</span>
                      <span className="text-gray-300 dark:text-gray-700">•</span>
                      <span className="text-gray-400 font-normal">{article.date}</span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                      {article.title}
                    </h4>

                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">
                      {article.summary}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> {article.comments}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}