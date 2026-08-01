'use client';

import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReviewsPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyId, setPropertyId] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetch('https://prisma-project-tau-dun.vercel.app/properties')
      .then((res) => res.json())
      .then((data) => {

        if (data.success && Array.isArray(data.data)) {
          setProperties(data.data);
        } else if (Array.isArray(data)) {
          setProperties(data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch properties:', err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!propertyId) {
      toast.error('Please select a property');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://prisma-project-tau-dun.vercel.app/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyId,
          rating: Number(rating),
          comment
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Review submitted successfully!');
        setPropertyId('');
        setComment('');
        setRating('5');
      } else {
        toast.error(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Property Reviews</h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 max-w-xl">
        <h2 className="font-bold text-slate-800 text-base">Leave a New Property Review</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Property Selection Dropdown */}
          <div>
            <label className="text-xs font-semibold text-slate-600">Select Property</label>
            <select
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm bg-white focus:outline-none focus:border-indigo-600"
            >
              <option value="">-- Choose a Property --</option>
              {properties.map((property) => (
                <option key={property.id || property._id} value={property.id || property._id}>
                  {property.title || property.name} ({property.location || 'Location not specified'})
                </option>
              ))}
            </select>
          </div>

          {/* Rating Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-600">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm bg-white focus:outline-none focus:border-indigo-600"
            >
              <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
              <option value="4">⭐⭐⭐⭐ (4 - Good)</option>
              <option value="3">⭐⭐⭐ (3 - Average)</option>
              <option value="2">⭐⭐ (2 - Poor)</option>
              <option value="1">⭐ (1 - Terrible)</option>
            </select>
          </div>

          {/* Comment / Feedback */}
          <div>
            <label className="text-xs font-semibold text-slate-600">Feedback</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Outstanding place! Highly recommended."
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:border-indigo-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}