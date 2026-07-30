'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pricePerMonth: '',
    location: '',
    category: '',
    imageUrl: '',
  });


  const categoryList = [
    'Apartment',
    'Family House',
    'Sublet',
    'Hostel / Mess',
    'Studio Apartment',
    'Commercial Space',
    'Duplex',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/landlord/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify({
          ...formData,
          pricePerMonth: Number(formData.pricePerMonth),
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
      <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <Link href="/dashboard/landlord" className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add New Property</h1>
          <p className="text-sm text-slate-500 mt-0.5">Fill in the details to list a new rental property.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Property Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Modern Apartment in Gulshan"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Price Per Month (৳)</label>
            <input
              type="number"
              required
              placeholder="e.g. 25000"
              value={formData.pricePerMonth}
              onChange={(e) => setFormData({ ...formData, pricePerMonth: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Location</label>
            <input
              type="text"
              required
              placeholder="e.g. Road 11, Banani, Dhaka"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Category</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="">Select Category</option>
              {categoryList.map((catName, index) => (
                <option key={index} value={catName}>
                  {catName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Description</label>
          <textarea
            rows={4}
            required
            placeholder="Write details about the property..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link
            href="/dashboard/landlord"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Publish Property'}
          </button>
        </div>
      </form>
    </div>
  );
}