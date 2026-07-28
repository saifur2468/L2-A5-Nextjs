'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/types';

export default function NewPropertyPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    pricePerMonth: 0,
    amenities: 'WiFi, AC',
    categoryId: '',
  });

  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      ...formData,
      pricePerMonth: Number(formData.pricePerMonth),
      amenities: formData.amenities.split(',').map((item) => item.trim()),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlord/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('Property listed successfully!');
      router.push('/dashboard/landlord');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-4">List New Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Property Title"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location (e.g., Gulshan, Dhaka)"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price Per Month"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setFormData({ ...formData, pricePerMonth: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Amenities (comma separated: WiFi, AC, Lift)"
          className="w-full border p-2 rounded"
          value={formData.amenities}
          onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
        />
        <select
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-medium">
          Create Property
        </button>
      </form>
    </div>
  );
}