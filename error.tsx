'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    
    console.error('Root Error Boundary caught an error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-4 shadow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
        Something went wrong!
      </h2>

      <p className="text-gray-600 text-sm max-w-md mb-8">
        An unexpected error occurred in the application. Please try refreshing or go back to the homepage.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}