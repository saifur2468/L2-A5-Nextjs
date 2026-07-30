'use client';

import { useState, useEffect } from 'react';
import { Building2, MapPin, Tag } from 'lucide-react';
import { Property } from '@/types';

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/landlord/properties', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        const data = Array.isArray(result.data) ? result.data : [result.data];
        setProperties(data.filter(Boolean));
      }
    } catch (err) {
      console.error('Failed to fetch properties', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 text-center">My Properties</h1>
        <p className="text-sm text-slate-500 mt-1 text-center">Manage and view all your listed properties.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-slate-400">Loading properties...</p>
        ) : properties.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
            <Building2 size={40} className="mx-auto mb-2 opacity-40" />
            <p>No properties found.</p>
          </div>
        ) : (
          properties.map((property) => (
            <div key={property.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                {property.imageUrl && (
                  <img src={property.imageUrl} alt={property.title} className="w-full h-40 object-cover rounded-xl mb-3" />
                )}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    <Tag size={12} /> {property.category?.name || 'General'}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    property.isAvailable ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {property.isAvailable ? 'Available' : 'Rented'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-base">{property.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{property.description}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400 pt-1">
                  <MapPin size={14} />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-indigo-600">
                  ৳{property.pricePerMonth?.toLocaleString()}/mo
                </span>
                <span className="text-xs font-medium text-slate-400">ID: {property.id.slice(0, 6)}...</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}