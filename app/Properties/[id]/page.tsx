'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  User,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

interface Category {
  name: string;
}

interface Landlord {
  name: string;
  email: string;
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
  landlord?: Landlord;
}

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Property Details
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError('');

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          'http://localhost:5000/api';

        const res = await fetch(
          `${API_URL}/properties/${id}`,
          {
            method: 'GET',
            cache: 'no-store',
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch property');
        }

        const data = await res.json();

        if (data.success) {
          setProperty(data.data);
        } else {
          setError(
            data.message || 'Property not found'
          );
        }
      } catch (err) {
        console.error(
          'Property details error:',
          err
        );

        setError(
          'Failed to load property details.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  // Rental Request
  const handleRentalRequest = () => {
    if (!property?.isAvailable) {
      alert(
        'This property is currently unavailable.'
      );
      return;
    }

    const token =
      localStorage.getItem('token');

    const role =
      localStorage.getItem('role');

    if (!token) {
      alert(
        'Please login to submit a rental request.'
      );

      router.push(
        `/auth/login?redirect=/properties/${id}`
      );

      return;
    }

    if (role !== 'TENANT') {
      alert(
        'Only tenants can request to rent properties.'
      );

      return;
    }

    router.push(
      `/dashboard/tenant/requests/new?propertyId=${id}`
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto border-4 border-gray-200 border-t-black rounded-full animate-spin" />

          <p className="mt-4 text-gray-500">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-3xl border text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900">
            Property Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            {error ||
              'The property does not exist.'}
          </p>

          <button
            onClick={() =>
              router.push('/properties')
            }
            className="mt-6 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </button>

        {/* Main Image */}
        <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden shadow-lg mb-8 bg-gray-200">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200"
            alt={property.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Availability */}
          <div className="absolute top-5 left-5">
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold ${
                property.isAvailable
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {property.isAvailable
                ? 'Available'
                : 'Not Available'}
            </span>
          </div>

          {/* Category */}
          {property.category?.name && (
            <div className="absolute top-5 right-5">
              <span className="px-4 py-2 rounded-full bg-white/90 text-gray-800 text-sm font-semibold">
                {property.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                {property.title}
              </h1>

              <p className="text-gray-500 flex items-center gap-1 mt-3">
                <MapPin className="w-4 h-4 text-blue-600" />

                {property.location}
              </p>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Description
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {property.description ||
                  'No description available.'}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Amenities
              </h2>

              {property.amenities &&
              property.amenities.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {property.amenities.map(
                    (amenity) => (
                      <span
                        key={amenity}
                        className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-700"
                      >
                        {amenity}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p className="text-gray-500">
                  No amenities available.
                </p>
              )}
            </div>

            {/* Property Information */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Property Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-500">
                    Location
                  </p>

                  <p className="font-semibold mt-1">
                    {property.location}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-500">
                    Category
                  </p>

                  <p className="font-semibold mt-1">
                    {property.category?.name ||
                      'N/A'}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-500">
                    Status
                  </p>

                  <p
                    className={`font-semibold mt-1 ${
                      property.isAvailable
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {property.isAvailable
                      ? 'Available'
                      : 'Not Available'}
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">

            {/* Price Card */}
            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-xl space-y-5">

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Monthly Rent
                </span>

                <div className="text-3xl font-black text-gray-900 mt-1">
                  ৳
                  {property.pricePerMonth?.toLocaleString()}

                  <span className="text-sm font-normal text-gray-500">
                    {' '}
                    / month
                  </span>
                </div>
              </div>

              <button
                onClick={handleRentalRequest}
                disabled={!property.isAvailable}
                className={`w-full py-3.5 rounded-2xl font-semibold transition ${
                  property.isAvailable
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {property.isAvailable
                  ? 'Request to Rent'
                  : 'Property Unavailable'}
              </button>
            </div>

            {/* Landlord Info */}
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">

              <h3 className="font-bold text-gray-900 mb-4">
                Property Owner
              </h3>

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-gray-900 text-sm">
                      {property.landlord?.name ||
                        'Landlord'}
                    </h3>

                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>

                  <p className="text-xs text-gray-500">
                    {property.landlord?.email ||
                      'Verified Owner'}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}