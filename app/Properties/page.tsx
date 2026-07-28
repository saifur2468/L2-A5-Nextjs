'use client';
import { useEffect, useState } from 'react';
import { Property, Category } from '@/types';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch Categories
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []));
  }, []);

  // Fetch Properties
  const fetchProperties = async (location = '') => {
    setLoading(true);
    const url = location
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/properties?location=${location}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/properties`;

    const res = await fetch(url);
    const data = await res.json();
    setProperties(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Browse Properties</h1>

      {/* Filter Section */}
      <div className="flex gap-4 bg-white p-4 rounded-lg border">
        <input
          type="text"
          placeholder="Search by location (e.g. Dhanmondi)..."
          className="border p-2 rounded w-full"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <button
          onClick={() => fetchProperties(searchLocation)}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Property Grid */}
      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-5 bg-white shadow-sm space-y-3">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {property.category?.name || 'Apartment'}
              </span>
              <h2 className="text-xl font-bold">{property.title}</h2>
              <p className="text-gray-600 text-sm">{property.description}</p>
              <p className="text-gray-500 font-medium">📍 {property.location}</p>

              <div className="flex gap-2 flex-wrap">
                {property.amenities.map((item, idx) => (
                  <span key={idx} className="bg-gray-100 text-xs px-2 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  🎒 {property.pricePerMonth} BDT/mo
                </span>
                <a
                  href={`/properties/${property.id}`}
                  className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}