'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building, MapPin, DollarSign, ListPlus, CheckCircle2, AlertCircle } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

export default function AddPropertyPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [amenitiesInput, setAmenitiesInput] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://prisma-project-tau-dun.vercel.app/api';
        const res = await fetch(`${API_URL}/categories`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://prisma-project-tau-dun.vercel.app/api';
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You must be logged in as LANDLORD.');
        setSubmitting(false);
        return;
      }

      const amenities = amenitiesInput.split(',').map((item) => item.trim()).filter(Boolean);

      const res = await fetch(`${API_URL}/landlord/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          location,
          pricePerMonth: Number(pricePerMonth),
          amenities,
          categoryId
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess('Property added successfully!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setError(data.message || 'Failed to add property.');
      }
    } catch (err) {
      console.error('Add property error:', err);
      setError('Connection error! Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6 transition-colors duration-300">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Building className="w-6 h-6 text-black dark:text-white" /> Add New Property
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Fill up the details to list a new rental property.
          </p>
        </div>

        {success && (
          <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-4 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-4 rounded-xl text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2">
              Property Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Premium Bento Grid Studio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2">
              Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Location
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Gulshan, Dhaka"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Monthly Rent (BDT)
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 35000"
                value={pricePerMonth}
                onChange={(e) => setPricePerMonth(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2">
                Category
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition cursor-pointer"
              >
                <option value="" className="bg-white dark:bg-gray-800">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-white dark:bg-gray-800">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase mb-2">
                Amenities (Comma separated)
              </label>
              <input
                type="text"
                placeholder="WiFi, AC, Smart Lock"
                value={amenitiesInput}
                onChange={(e) => setAmenitiesInput(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 mt-4 rounded-xl font-bold text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 transition text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Publishing...' : 'Publish Property'}
            <ListPlus className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}