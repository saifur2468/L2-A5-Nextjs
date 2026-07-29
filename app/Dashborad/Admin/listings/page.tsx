'use client';

import { useEffect, useState } from 'react';
import {
  Building2,
  FileText,
  Loader2,
  MapPin,
  Tag,
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  amenities: string[];
  isAvailable: boolean;
  landlord:
    | {
        name: string;
        email: string;
      }
    | string;
  category:
    | {
        name: string;
      }
    | string;
}

interface RentalRequest {
  id: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  tenant:
    | {
        name: string;
        email: string;
      }
    | string;
  property:
    | {
        title: string;
        pricePerMonth: number;
      }
    | string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function ContentModerationPage() {
  const [activeTab, setActiveTab] = useState<'properties' | 'rentals'>(
    'properties'
  );

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
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const result: ApiResponse<
          Property[] | RentalRequest[]
        > = await res.json();

        if (result.success) {
          if (activeTab === 'properties') {
            setProperties(result.data as Property[]);
          } else {
            setRentals(result.data as RentalRequest[]);
          }
        } else {
          console.error(result.message || 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Content Moderation
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Inspect all property listings and rental requests platform-wide.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('properties')}
          className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
            activeTab === 'properties'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Building2 size={18} />
          Properties ({properties.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rentals')}
          className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
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
            <div className="col-span-full flex items-center justify-center gap-2 py-12 text-slate-400">
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
                className="flex flex-col justify-between space-y-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="space-y-2">
                  {/* Category + Availability */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      <Tag size={12} />

                      {typeof item.category === 'string'
                        ? item.category
                        : item.category?.name || 'Uncategorized'}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.isAvailable
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {item.isAvailable ? 'Available' : 'Rented'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-800">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-2 text-xs text-slate-500">
                    {item.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-1 pt-1 text-xs text-slate-400">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.amenities?.map((amenity, idx) => (
                      <span
                        key={`${amenity}-${idx}`}
                        className="rounded-md bg-indigo-50/60 px-2 py-0.5 text-[10px] font-medium text-indigo-600"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-[11px] text-slate-400">
                      Landlord
                    </p>

                    <p className="text-xs font-semibold text-slate-700">
                      {typeof item.landlord === 'string'
                        ? item.landlord
                        : item.landlord?.name || 'Unknown'}
                    </p>
                  </div>

                  <span className="text-sm font-bold text-indigo-600">
                    ৳{item.pricePerMonth?.toLocaleString('en-US') || 0}/mo
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Rental Requests Table */}
      {activeTab === 'rentals' && (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase text-slate-400">
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
                    <td
                      colSpan={5}
                      className="p-8 text-center text-slate-400"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Loader2
                          className="animate-spin"
                          size={18}
                        />
                        <span>Loading rental requests...</span>
                      </div>
                    </td>
                  </tr>
                ) : rentals.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-slate-400"
                    >
                      No rental requests found.
                    </td>
                  </tr>
                ) : (
                  rentals.map((req) => (
                    <tr
                      key={req.id}
                      className="transition hover:bg-slate-50/50"
                    >
                      {/* Tenant */}
                      <td className="p-4">
                        <p className="font-semibold text-slate-800">
                          {typeof req.tenant === 'string'
                            ? req.tenant
                            : req.tenant?.name || 'N/A'}
                        </p>

                        <p className="text-xs text-slate-400">
                          {typeof req.tenant === 'object'
                            ? req.tenant?.email
                            : ''}
                        </p>
                      </td>

                      {/* Property */}
                      <td className="p-4 font-medium text-slate-700">
                        {typeof req.property === 'string'
                          ? req.property
                          : req.property?.title || 'N/A'}
                      </td>

                      {/* Monthly Rent */}
                      <td className="p-4 font-bold text-indigo-600">
                        ৳
                        {typeof req.property === 'object'
                          ? req.property?.pricePerMonth?.toLocaleString(
                              'en-US'
                            )
                          : '0'}
                      </td>

                      {/* Status */}
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

                      {/* Requested Date */}
                      <td className="p-4 text-xs text-slate-500">
                        {req.createdAt
                          ? new Date(
                              req.createdAt
                            ).toLocaleDateString('en-US')
                          : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}