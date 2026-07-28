'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Home as HomeIcon,
  Search,
  Filter,
} from 'lucide-react';

interface Category {
  name: string;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  amenities: string[];
  isAvailable: boolean;
  landlordId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');


  const [maxPrice, setMaxPrice] = useState(100000);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();

      if (location.trim()) {
        params.append('location', location.trim());
      }


      if (maxPrice) {
        params.append('maxPrice', maxPrice.toString());
      }

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        'http://localhost:5000/api';

      const response = await fetch(
        `${API_URL}/properties?${params.toString()}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const result = await response.json();

      if (result.success) {
        setProperties(result.data || []);
      } else {
        setProperties([]);
        setError(
          result.message || 'Failed to load properties'
        );
      }
    } catch (error) {
      console.error('Property fetch error:', error);

      setError(
        'Something went wrong while loading properties.'
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProperties();
  }, [location, maxPrice]);


  const filteredProperties = properties.filter((property) => {
    const searchText = search.toLowerCase();

    return (
      property.title.toLowerCase().includes(searchText) ||
      property.location.toLowerCase().includes(searchText) ||
      property.category?.name
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Properties
          </h1>

          <p className="text-gray-500 mt-2">
            Find your perfect rental property.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <aside className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit space-y-6">

            {/* Filter Header */}
            <div className="flex items-center gap-2 border-b pb-4">
              <Filter className="w-5 h-5 text-gray-700" />

              <h2 className="font-bold text-gray-900">
                Filters
              </h2>
            </div>

            {/* Search */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Search
              </label>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search property..."
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Dhanmondi, Gulshan..."
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Max Price */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-600 uppercase">
                  Max Rent
                </label>

                <span className="text-xs font-bold text-blue-600">
                  ৳{maxPrice.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
                className="w-full accent-black cursor-pointer"
              />
            </div>
            {/* Property Type Dropdown Example */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Property Type</label>
              <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Studio">Studio</option>
                <option value="House">House</option>
              </select>
            </div>
            {/* Reset */}
            <button
              onClick={() => {
                setSearch('');
                setLocation('');
                setMaxPrice(100000);
              }}
              className="w-full py-2.5 text-xs font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition"
            >
              Reset Filters
            </button>

          </aside>


          <main className="lg:col-span-3">

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-3xl h-80 animate-pulse border border-gray-100"
                  />
                ))}

              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="text-center py-16 bg-white rounded-3xl border">
                <p className="text-red-500 font-medium">
                  {error}
                </p>

                <button
                  onClick={fetchProperties}
                  className="mt-4 px-5 py-2 bg-black text-white rounded-xl text-sm"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* No Data */}
            {!loading &&
              !error &&
              filteredProperties.length === 0 && (
                <div className="text-center py-16 bg-white rounded-3xl border">
                  <HomeIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />

                  <p className="text-gray-500 font-medium">
                    No properties match your filter.
                  </p>
                </div>
              )}

            {/* Properties */}
            {!loading &&
              !error &&
              filteredProperties.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {filteredProperties.map((property) => (

                    <Link
                      key={property.id}
                      href={`/properties/${property.id}`}
                      className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                    >

                      {/* Property Image */}
                      <div className="relative h-52 w-full bg-gray-100 overflow-hidden">

                        <Image
                          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800"
                          alt={property.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Availability */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${property.isAvailable
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                              }`}
                          >
                            {property.isAvailable
                              ? 'Available'
                              : 'Not Available'}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-black/80 text-white px-3 py-1.5 rounded-xl text-sm font-bold">
                            ৳
                            {property.pricePerMonth.toLocaleString()}
                            /mo
                          </span>
                        </div>

                      </div>

                      {/* Property Details */}
                      <div className="p-5 flex flex-col flex-1">

                        {/* Category */}
                        {property.category?.name && (
                          <span className="text-xs font-semibold text-blue-600 mb-1">
                            {property.category.name}
                          </span>
                        )}

                        {/* Title */}
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition line-clamp-1">
                          {property.title}
                        </h3>

                        {/* Location */}
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                          <MapPin className="w-4 h-4" />

                          {property.location}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                          {property.description}
                        </p>
                        <button className='flex justify-center items-center text-xl border-1 font-serif bg-green-600 text-white rounded-xl mt-2'>Request to Rent</button>

                        {/* Amenities */}
                        <div className="mt-auto pt-4">

                          <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-2">

                            {property.amenities
                              ?.slice(0, 3)
                              .map((amenity) => (

                                <span
                                  key={amenity}
                                  className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg"
                                >
                                  {amenity}
                                </span>

                              ))}

                          </div>

                        </div>

                      </div>

                    </Link>

                  ))}

                </div>
              )}

          </main>

        </div>
      </div>
    </div>
  );
}