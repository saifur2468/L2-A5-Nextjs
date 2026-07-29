'use client';

import { useState, useEffect } from 'react';
import { Building2, FileText, Loader2, MapPin, Tag } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  amenities: string[];
  isAvailable: boolean;
  landlord: {
    name: string;
    email: string;
  };
  category: {
    name: string;
  };
}

interface RentalRequest {
  id: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  tenant: {
    name: string;
    email: string;
  };
  property: {
    title: string;
    pricePerMonth: number;
  };
}

export default function ContentModerationPage() {
  const [activeTab, setActiveTab] = useState<'properties' | 'rentals'>('properties');
  const [properties, setProperties] = useState<Property[]>([]);
  const [rentals, setRentals] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const endpoint =
          activeTab === 'properties'
            ? 'http://localhost:5000/api/admin/properties'
            : 'http://localhost:5000/api/admin/rentals';

        const res = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const result = await res.json();
          if (result.success) {
            if (activeTab === 'properties') {
              setProperties(result.data || []);
            } else {
              setRentals(result.data || []);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Content Moderation</h1>
        <p className="text-sm text-slate-500">
          Inspect all property listings and rental requests platform-wide.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${
            activeTab === 'properties'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Building2 size={18} />
          Properties ({properties.length})
        </button>
        <button
          onClick={() => setActiveTab('rentals')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${
            activeTab === 'rentals'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <FileText size={18} />
          Rental Requests ({rentals.length})
        </button>
      </div>

      {/* Properties List */}
      {activeTab === 'properties' && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-12 text-center text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Loading properties...
            </div>
          ) : properties.length === 0 ? (
            <p className="col-span-full py-12 text-center text-slate-400">
              No properties found.
            </p>
          ) : (
            properties.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      <Tag size={12} /> {item.category?.name || 'Uncategorized'}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        item.isAvailable
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {item.isAvailable ? 'Available' : 'Rented'}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>

                  <div className="flex items-center gap-1 text-xs text-slate-400 pt-1">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.amenities?.map((amenity, idx) => (
                      <span key={idx} className="bg-indigo-50/60 text-indigo-600 text-[10px] px-2 py-0.5 rounded-md font-medium">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400">Landlord</p>
                    <p className="text-xs font-semibold text-slate-700">{item.landlord?.name}</p>
                  </div>
                  <span className="text-sm font-bold text-indigo-600">
                    ৳{item.pricePerMonth.toLocaleString()}/mo
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Rentals Table */}
      {activeTab === 'rentals' && (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400 border-b border-slate-100">
              <tr>
                <th className="p-4">Tenant</th>
                <th className="p-4">Property</th>
                <th className="p-4">Monthly Rent</th>
                <th className="p-4">Status</th>
                <th className="p-4">Requested On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      <span>Loading rental requests...</span>
                    </div>
                  </td>
                </tr>
              ) : rentals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No rental requests found.
                  </td>
                </tr>
              ) : (
                rentals.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">{req.tenant?.name}</p>
                      <p className="text-xs text-slate-400">{req.tenant?.email}</p>
                    </td>
                    <td className="p-4 font-medium text-slate-700">
                      {req.property?.title}
                    </td>
                    <td className="p-4 font-bold text-indigo-600">
                      ৳{req.property?.pricePerMonth?.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          req.status === 'APPROVED'
                            ? 'bg-emerald-50 text-emerald-600'
                            : req.status === 'REJECTED'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}