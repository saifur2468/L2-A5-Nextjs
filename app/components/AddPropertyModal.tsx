'use client';

import { useState } from 'react';
import { Loader2, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { Category } from '../dashborad/landlord/types';

interface AddPropertyModalProps {
  categories?: Category[];
  onClose: () => void;
  onSuccess: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function AddPropertyModal({ categories = [], onClose, onSuccess, showToast }: AddPropertyModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    pricePerMonth: '',
    categoryId: '',
    amenities: 'WiFi, AC, Parking',
    imageUrl: '',
    isAvailable: true,
  });


  const fallbackCategories = [
    { id: '1', name: 'White House' },
    { id: '2', name: 'borak place' },
    { id: '3', name: 'No House name' },
  ];

  const categoryList = categories.length > 0 ? categories : fallbackCategories;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token') as string;
      const payload = {
        ...formData,
        pricePerMonth: Number(formData.pricePerMonth),
        amenities: formData.amenities.split(',').map((item) => item.trim()),
      };

      const res = await fetch('https://prisma-project-tau-dun.vercel.app/landlord/properties', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        showToast('Property listed successfully!');
        onSuccess();
        onClose();
      } else {
        showToast(result.message || 'Failed to list property', 'error');
      }
    } catch (err) {
      showToast('Something went wrong!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-800">Create New Property Listing</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Property Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Modern Luxury Apartment"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:border-indigo-600 text-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600">Price Per Month (BDT)</label>
              <input
                type="number"
                required
                value={formData.pricePerMonth}
                onChange={(e) => setFormData({ ...formData, pricePerMonth: e.target.value })}
                placeholder="25000"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:border-indigo-600 text-slate-700"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Category</label>
              <div className="relative mt-1">
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:border-indigo-600 bg-white appearance-none cursor-pointer text-slate-700"
                >
                  <option value="" disabled className="text-slate-400">Select Category</option>
                  {categoryList.map((cat: any) => (
                    <option key={cat.id || cat._id} value={cat.id || cat._id} className="py-2 text-slate-700 bg-white">
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Gulshan, Dhaka"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:border-indigo-600 text-slate-700"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Image URL</label>
            <div className="mt-1 flex items-center gap-2">
              <ImageIcon size={18} className="text-slate-400 shrink-0" />
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:border-indigo-600 text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Amenities (Comma separated)</label>
            <input
              type="text"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              placeholder="WiFi, AC, Lift, Parking"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:border-indigo-600 text-slate-700"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the property..."
              className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:border-indigo-600 text-slate-700"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isAvailableToggle"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="isAvailableToggle" className="text-sm font-medium text-slate-700 cursor-pointer">
              Mark as Available Immediately
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              Save Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}