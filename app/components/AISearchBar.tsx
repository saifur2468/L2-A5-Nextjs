'use client';

import { useState } from 'react';
import { Sparkles, Search, Loader2 } from 'lucide-react';

export default function AISearchBar({ onSearchResults }: { onSearchResults?: (data: any) => void }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);

    try {
      const res = await fetch('https://prisma-project-tau-dun.vercel.app/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (data.success && onSearchResults) {
        onSearchResults(data.result);
      }
    } catch (err) {
      console.error('AI Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="absolute left-4 text-rose-500">
          <Sparkles size={20} className="animate-pulse" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI: e.g. 2 bedroom family flat in Mirpur under 15000 BDT..."
          className="w-full py-4 pl-12 pr-28 rounded-2xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          <span>{loading ? 'Searching...' : 'AI Search'}</span>
        </button>
      </form>
    </div>
  );
}