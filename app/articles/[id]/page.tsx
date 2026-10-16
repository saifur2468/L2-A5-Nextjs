'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, MessageSquare, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';


const ARTICLES_DATA = [
  {
    id: '1',
    title: 'The Ultimate Cheat Sheet On Real Estate',
    category: 'NEWS',
    date: 'October 15, 2023',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
    content: 'To mark the first UK show of artist Henri Barande, graphic designer Logan Cee and German studio Schultzschultz have created The Lodge Wooden. Today most people get on average 4 hours of real estate insights daily, but mastering the fundamentals requires a complete cheat sheet covering market trends, financing, and property valuation.'
  },
  {
    id: '2',
    title: '5 Tools Everyone In The Real Estate Industry Should Be Using',
    category: 'NEWS',
    date: 'October 15, 2023',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    content: 'Technology is reshaping modern property management. From CRM software like Salesforce to valuation tools and virtual staging apps, these 5 tools will supercharge your real estate business efficiency.'
  },
  {
    id: '3',
    title: '15 Best Blogs To Follow About Real Estate',
    category: 'NEWS',
    date: 'October 15, 2023',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
    content: 'Staying updated with market shifts is crucial. Here are the top 15 real estate blogs providing expert commentary, legal updates, housing market forecasts, and investment strategies.'
  },
  {
    id: '4',
    title: '10 Quick Tips About Real Estate Investment',
    category: 'NEWS',
    date: 'October 15, 2023',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80',
    content: 'Investing in rental properties can build generational wealth. Discover 10 actionable tips ranging from location analysis to calculating cash flow and managing tenant relationships.'
  },
  {
    id: '5',
    title: 'How To Scale Your Property Portfolio in 2026',
    category: 'GUIDE',
    date: 'January 10, 2026',
    author: 'Vanqui Nguyen',
    comments: 2,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
    content: 'Scaling a real estate portfolio requires strategic leverage, reinvesting rental income, and partnering with reliable property managers to handle day-to-day operations seamlessly.'
  },
  {
    id: '6',
    title: 'Understanding Mortgage Rates and Housing Trends',
    category: 'FINANCE',
    date: 'February 18, 2026',
    author: 'Vanqui Nguyen',
    comments: 5,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80',
    content: 'Interest rates directly affect your monthly mortgage payments. Learn how economic indicators influence lending rates and how to lock in the best deal for your apartment.'
  },
  {
    id: '7',
    title: 'Top Interior Design Trends for Modern Apartments',
    category: 'DESIGN',
    date: 'March 02, 2026',
    author: 'Vanqui Nguyen',
    comments: 1,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80',
    content: 'Minimalist layouts, smart home automation, and sustainable materials are taking over modern apartment interiors. Here is how to upgrade your living space.'
  },
  {
    id: '8',
    title: 'A Beginners Guide to Commercial Real Estate',
    category: 'BUSINESS',
    date: 'March 15, 2026',
    author: 'Vanqui Nguyen',
    comments: 4,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    content: 'Commercial real estate offers higher yields than residential spaces. Dive into office spaces, retail storefronts, and warehouse leasing fundamentals.'
  },
  {
    id: '9',
    title: 'Tenant Rights and Lease Agreements Explained',
    category: 'LEGAL',
    date: 'April 05, 2026',
    author: 'Vanqui Nguyen',
    comments: 0,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    content: 'Knowing your legal rights as a tenant or landlord prevents disputes. We break down standard lease clauses, security deposit laws, and eviction policies.'
  },
  {
    id: '10',
    title: 'Why Sustainable Eco-Friendly Homes are the Future',
    category: 'LIFESTYLE',
    date: 'April 20, 2026',
    author: 'Vanqui Nguyen',
    comments: 3,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    content: 'Solar panels, energy-efficient insulation, and rainwater harvesting systems are no longer luxury add-ons—they are essential for eco-friendly future living.'
  }
];

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params?.id;

  const article = ARTICLES_DATA.find((item) => item.id === articleId) || ARTICLES_DATA[0];

  // 100% Working handleShare function
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Article link copied to clipboard!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Category & Date */}
        <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-3">
          <span>{article.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-gray-400 font-normal">
            <Calendar className="w-3.5 h-3.5" /> {article.date}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          {article.title}
        </h1>

        {/* Author & Meta */}
        <div className="flex items-center justify-between border-y border-gray-100 dark:border-gray-800 py-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
              {article.author[0]}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-gray-400" /> {article.author}
              </h4>
              <p className="text-xs text-gray-400">Real Estate Contributor</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-xs">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> {article.comments} comments
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden mb-10 shadow-lg">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Article Content */}
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg space-y-6">
          <p>{article.content}</p>
          <p>
            Understanding market cycles and investment avenues in real estate ensures stable passive income. RentNest simplifies apartment booking and property management for landlords and tenants alike.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Key Takeaways & Market Analysis</h3>
          <p>
            Analyzing area demographics, average rent rates, and long-term appreciation is crucial before making property reservation commitments.
          </p>
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Share this article:</span>
          
          <button 
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 transition active:scale-95"
          >
            <Share2 className="w-4 h-4" /> Share Link
          </button>
        </div>

      </div>
    </div>
  );
}