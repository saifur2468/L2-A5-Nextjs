'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MessageSquare, User, ArrowUpRight } from 'lucide-react';

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
    summary: 'To mark the first UK show of artist Henri Barande, graphic designer Logan Cee and German studio Schultzschultz have created The Lodge Wooden...'
  },
  {
    id: '3',
    title: '15 Best Blogs To Follow About Real Estate',
    category: 'NEWS',
    date: 'October 15, 2023',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    summary: 'To mark the first UK show of artist Henri Barande, graphic designer Logan Cee and German studio Schultzschultz have created The Lodge Wooden...'
  },
  {
    id: '4',
    title: '10 Quick Tips About Real Estate',
    category: 'NEWS',
    date: 'October 15, 2023',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80',
    summary: 'Add a summary of the post to appear on your home page or blog.'
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
  },
  {
    id: '9',
    title: 'Tenant Rights and Lease Agreements Explained',
    category: 'LEGAL',
    date: 'April 05, 2026',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80',
    summary: 'Know your legal rights as a tenant or landlord to prevent disputes and understand standard lease clauses.'
  },
  {
    id: '10',
    title: 'Why Sustainable Eco-Friendly Homes are the Future',
    category: 'LIFESTYLE',
    date: 'April 20, 2026',
    author: 'Vanqui Nguyen',
    comments: 3,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    summary: 'Solar panels and energy-efficient insulation are no longer luxury add-ons—they are essential.'
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

  return (
    <section className="py-16 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-baseline gap-6">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              News & Consult
            </h2>
            {/* <Link 
              href="/articles" 
              className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"
            >
              See All Articles <ArrowUpRight className="w-4 h-4" />
            </Link> */}
          </div>

          {/* Slider Buttons (< & >) */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-500/20"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-[480px] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Article Image */}
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Date */}
                  <div className="flex items-center gap-2 text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                    <span>{article.category}</span>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span className="text-gray-400 font-normal">{article.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> {article.comments} comments
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}