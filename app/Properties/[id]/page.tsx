'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

import {
  MapPin,
  User,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
  Calendar,
  CreditCard,
  Clock,
  Loader2,
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
  landlord?: Landlord | string;
  category?: Category | string;
}

interface RentalRequest {
  id: string;
  propertyId?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}



export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;



  const [property, setProperty] =
    useState<Property | null>(null);

  const [existingRental, setExistingRental] =
    useState<RentalRequest | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // Form
  const [startDate, setStartDate] =
    useState('');

  const [endDate, setEndDate] =
    useState('');

  const [submitting, setSubmitting] =
    useState(false);

  // Messages
  const [successMsg, setSuccessMsg] =
    useState('');

  const [reqError, setReqError] =
    useState('');

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://prisma-project-tau-dun.vercel.app/api';

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError('');

        const token =
          localStorage.getItem('token');

        const API_URL = 'https://prisma-project-tau-dun.vercel.app/api';


        const propertyRes = await fetch(
          `${API_URL}/properties/${id}`,
          {
            method: 'GET',
            cache: 'no-store',
          }
        );

        if (!propertyRes.ok) {
          throw new Error('Failed to fetch property details');
        }

        const propertyResult = await propertyRes.json();

        if (propertyResult.success && propertyResult.data) {
          setProperty(propertyResult.data);
        } else {
          setError('Property not found');
        }
        if (token) {
          try {
            const rentalsRes =
              await fetch(
                `${API_URL}/rentals`,
                {
                  method: 'GET',
                  headers: {
                    Authorization:
                      `Bearer ${token}`,
                    'Content-Type':
                      'application/json',
                  },
                }
              );

            if (rentalsRes.ok) {
              const rentalsData =
                await rentalsRes.json();

              if (
                rentalsData.success &&
                Array.isArray(
                  rentalsData.data
                )
              ) {
                const currentRequest =
                  rentalsData.data.find(
                    (
                      rental: RentalRequest
                    ) =>
                      rental.propertyId === id
                  );

                if (currentRequest) {
                  setExistingRental(
                    currentRequest
                  );
                } else {
                  setExistingRental(null);
                }
              }
            } else {
              console.error(
                'Failed to fetch my rentals:',
                rentalsRes.status
              );
            }
          } catch (rentalError) {
            console.error(
              'Rental status fetch error:',
              rentalError
            );
          }
        }
      } catch (err) {
        console.error(
          'Property fetch error:',
          err
        );

        setError(
          'Failed to load property details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, API_URL]);


  const handleRentalRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setReqError('Please select both Start Date and End Date.');
      return;
    }

    setSubmitting(true);
    setReqError('');
    setSuccessMsg('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://prisma-project-tau-dun.vercel.app/api';
      const token = localStorage.getItem('token');

      if (!token) {
        setReqError('You must be logged in as TENANT to submit a request.');
        setSubmitting(false);
        return;
      }
      const res = await fetch(`${API_URL}/rentals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        } as Record<string, string>,
        body: JSON.stringify({
          propertyId: id,
          startDate: startDate,
          endDate: endDate
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Rental request submitted successfully!');

        setExistingRental({
          id: data.data.id,
          status: 'PENDING',
        });

        setStartDate('');
        setEndDate('');
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMsg('');
        }, 1500);
      } else {
        setReqError(data.message || 'Failed to submit rental request.');
      }
    } catch (err) {
      console.error('Request submission error:', err);
      setReqError('Connection error! Check if server is running.');
    } finally {
      setSubmitting(false);
    }
  };
  const handlePaymentRedirect = () => {
    if (!existingRental?.id) {
      return;
    }

    router.push(
      `/payment/checkout?rentalId=${existingRental.id}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            className="w-8 h-8 animate-spin text-blue-600"
          />

          <p className="text-gray-500">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }
  if (error || !property) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-red-100 rounded-3xl shadow-sm p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-7 h-7 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Property Not Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error ||
              'The property you are looking for does not exist.'}
          </p>

          <button
            onClick={() =>
              router.back()
            }
            className="mt-6 px-5 py-3 rounded-xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="relative w-full md:w-2/5 h-72 md:h-auto md:min-h-[520px] shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200"
            alt={property.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
        <div className="flex-1 p-6 md:p-8 flex flex-col">

          {/* Title + Price */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {property.title}
              </h1>

              <p className="text-gray-500 flex items-start gap-1.5 mt-2">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-gray-400" />

                {property.location}
              </p>
            </div>

            <p className="text-2xl font-bold text-green-600 whitespace-nowrap">
              ৳
              {property.pricePerMonth?.toLocaleString(
                'en-US'
              )}

              <span className="text-sm font-normal text-gray-500">
                {' '}
                / month
              </span>
            </p>
          </div>

          {/* Info grid (Type / Vendor / Status) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mt-6">

            <div>
              <p className="text-xs text-gray-400">
                Category
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {typeof property.category ===
                  'string'
                  ? property.category
                  : property.category?.name ||
                  'Rent'}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Owner
              </p>

              <p className="mt-1 font-semibold text-gray-900 flex items-center gap-1">
                {typeof property.landlord ===
                  'string'
                  ? property.landlord
                  : property.landlord?.name ||
                  'Landlord'}

                <CheckCircle2 className="w-4 h-4 text-blue-500" />
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Availability
              </p>

              <p
                className={`mt-1 font-semibold ${property.isAvailable
                  ? 'text-green-600'
                  : 'text-red-500'
                  }`}
              >
                {property.isAvailable
                  ? 'Available'
                  : 'Not Available'}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Contact
              </p>

              <p className="mt-1 font-semibold text-gray-900 break-all text-sm">
                {typeof property.landlord ===
                  'object'
                  ? property.landlord?.email ||
                  'landlord@test.com'
                  : 'landlord@test.com'}
              </p>
            </div>
          </div>

          {/* Dashed divider */}
          <div className="border-t border-dashed border-gray-300 my-6" />

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              Description
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Dashed divider */}
          <div className="border-t border-dashed border-gray-300 my-6" />

          {/* Amenities (icon row like screenshot) */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Amenities
            </h3>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {property.amenities?.map(
                (amenity, index) => (
                  <span
                    key={`${amenity}-${index}`}
                    className="flex items-center gap-1.5 text-sm text-gray-500"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gray-400" />

                    {amenity}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Dashed divider */}
          <div className="border-t border-dashed border-gray-300 my-6" />
          <div className="mt-auto">

            {/* PENDING */}
            {existingRental?.status ===
              'PENDING' ? (
              <button
                disabled
                className="w-full md:w-auto md:min-w-[260px] px-8 py-4 rounded-xl font-bold text-white bg-amber-500 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-not-allowed"
              >
                <Clock className="w-5 h-5 animate-pulse" />

                Request Pending
              </button>
            ) : existingRental?.status ===
              'APPROVED' ? (

              /* APPROVED */

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                <div className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />

                  Request Approved!
                </div>

                <button
                  onClick={
                    handlePaymentRedirect
                  }
                  className="w-full sm:w-auto sm:min-w-[260px] px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <CreditCard className="w-5 h-5" />

                  Pay Now
                </button>
              </div>

            ) : (

              <button
                onClick={() => {
                  setReqError('');
                  setSuccessMsg('');
                  setIsModalOpen(true);
                }}
                disabled={
                  !property.isAvailable
                }
                className={`w-full md:w-auto md:min-w-[260px] px-8 py-4 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 ${property.isAvailable
                  ? 'bg-black hover:bg-gray-800 cursor-pointer shadow-lg'
                  : 'bg-gray-400 cursor-not-allowed'
                  }`}
              >
                {property.isAvailable
                  ? existingRental?.status ===
                    'REJECTED'
                    ? 'Request Again'
                    : 'Request to Rent'
                  : 'Not Available'}
              </button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">

            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">

              <h3 className="font-bold text-lg text-gray-900">
                Request to Rent
              </h3>

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setReqError('');
                  setSuccessMsg('');
                }}
                className="text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={
                handleRentalRequest
              }
              className="p-6 space-y-4"
            >

              {/* Success */}
              {successMsg && (
                <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />

                  {successMsg}
                </div>
              )}

              {/* Error */}
              {reqError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />

                  {reqError}
                </div>
              )}

              {/* Start Date */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />

                    Start Date
                  </span>
                </label>

                <input
                  type="date"
                  required
                  min={
                    new Date()
                      .toISOString()
                      .split('T')[0]
                  }
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(
                      e.target.value
                    )
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />

                    End Date
                  </span>
                </label>

                <input
                  type="date"
                  required
                  min={
                    startDate ||
                    new Date()
                      .toISOString()
                      .split('T')[0]
                  }
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(
                      e.target.value
                    )
                  }
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setReqError('');
                    setSuccessMsg('');
                  }}
                  className="w-1/2 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition text-sm cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 py-3 rounded-xl font-bold text-white bg-black hover:bg-gray-800 transition text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Confirm Request
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
























