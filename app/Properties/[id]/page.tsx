'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin, User, CheckCircle2, AlertCircle, X, Send, Calendar, CreditCard, Clock } from 'lucide-react';

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
  landlord?: Landlord;
  category?: Category;
}

interface RentalRequest {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [existingRental, setExistingRental] = useState<RentalRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [reqError, setReqError] = useState('');

  // Fetch Property & Rental Status Details
  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const token = localStorage.getItem('token');

        // 1. Fetch Property Details
        const res = await fetch(`${API_URL}/properties?id=${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch property details');
        const result = await res.json();

        if (result.success && result.data.length > 0) {
          const foundProp = Array.isArray(result.data) 
            ? result.data.find((p: Property) => p.id === id) || result.data[0] 
            : result.data;
          setProperty(foundProp);
        } else {
          setError('Property not found');
        }

        // 2. Fetch User's Existing Rental Requests to check Status (if logged in)
        if (token) {
          const rentalsRes = await fetch(`${API_URL}/admin/rentals`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (rentalsRes.ok) {
            const rentalsData = await rentalsRes.json();
            if (rentalsData.success && Array.isArray(rentalsData.data)) {
              // Find request matching this property
              const currentReq = rentalsData.data.find((r: any) => r.propertyId === id);
              if (currentReq) {
                setExistingRental(currentReq);
              }
            }
          }
        }

      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('Failed to load property details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Handle Rental Request Submit
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
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId: id,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Rental request submitted successfully!');
        
        // Update local state to PENDING immediately
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

  // Redirect to Payment Page
  const handlePaymentRedirect = () => {
    if (existingRental) {
      // Payment route dynamic navigational setup
      router.push(`/checkout?rentalId=${existingRental.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-800">Error</h2>
          <p className="text-gray-500 mt-2">{error || 'Property not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Banner Image */}
        <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200"
            alt={property.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <p className="text-gray-500 flex items-center gap-1 mt-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                {property.location}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities?.map((amenity, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & CTA Button Dynamic Handlers */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Monthly Rent
                </span>
                <p className="text-3xl font-black text-gray-900">
                  ৳{property.pricePerMonth?.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ month</span>
                </p>
              </div>

         
              {existingRental?.status === 'PENDING' ? (
                
                <button
                  disabled
                  className="w-full py-4 rounded-xl font-bold text-white bg-amber-500 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-not-allowed"
                >
                  <Clock className="w-5 h-5 animate-pulse" />
                  Request Pending
                </button>
              ) : existingRental?.status === 'APPROVED' ? (
              
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Request Approved!
                  </div>
                  <button
                    onClick={handlePaymentRedirect}
                    className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    <CreditCard className="w-5 h-5" />
                    Pay Now
                  </button>
                </div>
              ) : (
               
                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={!property.isAvailable}
                  className={`w-full py-4 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 ${
                    property.isAvailable
                      ? 'bg-black hover:bg-gray-800 cursor-pointer shadow-lg hover:shadow-none'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {property.isAvailable ? 'Request to Rent' : 'Not Available'}
                </button>
              )}
            </div>

            {/* Landlord Info */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Property Owner</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 flex items-center gap-1">
                    {property.landlord?.name || 'Landlord'}
                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />
                  </p>
                  <p className="text-xs text-gray-500">{property.landlord?.email || 'landlord@test.com'}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- RENTAL REQUEST MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="font-bold text-lg text-gray-900">Request to Rent</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRentalRequest} className="p-6 space-y-4">
              {successMsg && (
                <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {successMsg}
                </div>
              )}

              {reqError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {reqError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Start Date
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> End Date
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 py-3 rounded-xl font-bold text-white bg-black hover:bg-gray-800 transition text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? 'Sending...' : 'Confirm Request'}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}