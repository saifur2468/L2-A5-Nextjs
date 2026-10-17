'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pricePerMonth: '',
    location: '',
    categoryId: '',
    imageUrl: '',
    amenities: '',
    isAvailable: true,
  });

  // 1. Fetch Dynamic Categories from Database API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://prisma-project-tau-dun.vercel.app/api/categories');
        const result = await res.json();
        if (result.success) {
          setCategories(result.data || []);
        }
        console.log('Fetched categories:', result.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // 2. Submit Property with correct database mapping
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://prisma-project-tau-dun.vercel.app/api/landlord/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          pricePerMonth: Number(formData.pricePerMonth),
          categoryId: formData.categoryId, // Pass Category ID for Prisma Relation
          amenities: formData.amenities ? formData.amenities.split(',').map((item) => item.trim()) : [],
          images: formData.imageUrl ? [formData.imageUrl] : [],
          isAvailable: formData.isAvailable,
        }),
      });

      const result = await res.json();
      if (result.success) {
        router.push('/dashboard/landlord/myproperties');
      } else {
        alert(result.message || 'Failed to create property');
      }
    } catch (err) {
      console.error('Error creating property:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <Link href="/dashboard/landlord" className="p-2 rounded-xl bg-slate-50 dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 transition">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Create New Property Listing</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-0.5">Fill in the details to list a new rental property.</p>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-sm space-y-5 transition-colors duration-300">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-gray-400 mb-2">Property Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Modern Luxury Apartment"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-slate-700 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-gray-400 mb-2">Price Per Month (BDT)</label>
            <input
              type="number"
              required
              placeholder="25000"
              value={formData.pricePerMonth}
              onChange={(e) => setFormData({ ...formData, pricePerMonth: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-slate-700 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-gray-400 mb-2">Category</label>
            <div className="relative">
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-gray-700 px-4 py-3 text-sm text-slate-700 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer transition-all"
              >
                <option value="" disabled>
                  {fetchingCategories ? 'Loading categories...' : 'Select Category'}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-gray-500">
                {fetchingCategories ? <Loader2 size={18} className="animate-spin" /> : <ChevronDown size={18} />}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-gray-400 mb-2">Location</label>
          <input
            type="text"
            required
            placeholder="e.g. Gulshan, Dhaka"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-slate-700 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-gray-400 mb-2">Image URL</label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-slate-700 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-gray-400 mb-2">Amenities (Comma separated)</label>
          <input
            type="text"
            placeholder="WiFi, AC, Parking"
            value={formData.amenities}
            onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-slate-700 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-gray-400 mb-2">Description</label>
          <textarea
            rows={4}
            required
            placeholder="Detailed description of the property..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-slate-700 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          ></textarea>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="isAvailable"
            checked={formData.isAvailable}
            onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer bg-white dark:bg-gray-800"
          />
          <label htmlFor="isAvailable" className="text-sm font-medium text-slate-700 dark:text-gray-300 cursor-pointer">
            Mark as Available Immediately
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link
            href="/dashboard/landlord"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Publish Property'}
          </button>
        </div>
      </form>
    </div>
  );
}