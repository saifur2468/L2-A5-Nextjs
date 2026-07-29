'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

// API URL (আপনার প্রজেক্টের .env বা ডায়নামিক পোর্টে এডজাস্ট করুন)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  amenities: string[];
  isAvailable: boolean;
  categoryId: string;
  category?: { name: string };
}

interface Tenant {
  id: string;
  name: string;
  email: string;
}

interface RentalRequest {
  id: string;
  tenantId: string;
  propertyId: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE';
  tenant?: Tenant;
  property?: Property;
}

interface Category {
  id: string;
  name: string;
}

export default function LandlordDashboard() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // New Property Form State
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    location: '',
    pricePerMonth: '',
    amenities: '',
    categoryId: '',
  });

  // 1. Fetch Dashboard Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('You are not logged in!');
        router.push('/login');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      // Fetch Categories & Landlord Properties
      const [propRes, catRes] = await Promise.all([
        fetch(`${API_URL}/landlord/properties`, { headers }),
        fetch(`${API_URL}/categories`),
      ]);

      const propData = await propRes.json();
      const catData = await catRes.json();

      if (propData.success) setProperties(propData.data || []);
      if (catData.success) setCategories(catData.data || []);

      // Fetch Rental Requests
      const reqRes = await fetch(`${API_URL}/landlord/requests`, { headers });
      const reqData = await reqRes.json();

      if (reqData.success && Array.isArray(reqData.data)) {
        setRequests(reqData.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Handle Add Property
  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/landlord/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newProperty,
          pricePerMonth: Number(newProperty.pricePerMonth),
          amenities: newProperty.amenities.split(',').map((item) => item.trim()),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Property created successfully!');
        setNewProperty({
          title: '',
          description: '',
          location: '',
          pricePerMonth: '',
          amenities: '',
          categoryId: '',
        });
        fetchData(); // Refresh list
      } else {
        toast.error(data.message || 'Failed to create property');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  // 3. Handle Accept / Reject Rental Request
  const handleRequestStatus = async (requestId: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/landlord/requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Request ${status.toLowerCase()} successfully!`);
        fetchData(); // Refresh list
      } else {
        toast.error(data.message || 'Failed to update request');
      }
    } catch (err) {
      toast.error('Error updating request status');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg font-semibold text-gray-600">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Landlord Dashboard</h1>

        {/* --- Create Property Form --- */}
        <div className="mb-10 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Add New Property</h2>
          <form onSubmit={handleCreateProperty} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Title"
              value={newProperty.title}
              onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
              className="rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newProperty.location}
              onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
              className="rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Price per month"
              value={newProperty.pricePerMonth}
              onChange={(e) => setNewProperty({ ...newProperty, pricePerMonth: e.target.value })}
              className="rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={newProperty.categoryId}
              onChange={(e) => setNewProperty({ ...newProperty, categoryId: e.target.value })}
              className="rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Amenities (comma separated e.g. WiFi, AC, Smart Lock)"
              value={newProperty.amenities}
              onChange={(e) => setNewProperty({ ...newProperty, amenities: e.target.value })}
              className="col-span-1 rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              required
            />
            <textarea
              placeholder="Description"
              value={newProperty.description}
              onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
              className="col-span-1 rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
              rows={3}
              required
            />
            <button
              type="submit"
              className="col-span-1 rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 md:col-span-2"
            >
              Create Property
            </button>
          </form>
        </div>

        {/* --- Rental Requests Section --- */}
        <div className="mb-10 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Rental Requests</h2>
          {requests.length === 0 ? (
            <p className="text-gray-500">No rental requests found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                  <tr>
                    <th className="p-3">Property</th>
                    <th className="p-3">Tenant Info</th>
                    <th className="p-3">Dates</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-800">
                        {req.property?.title || req.propertyId}
                      </td>
                      <td className="p-3">
                        <div>{req.tenant?.name || 'N/A'}</div>
                        <div className="text-xs text-gray-400">{req.tenant?.email}</div>
                      </td>
                      <td className="p-3 text-xs">
                        {new Date(req.startDate).toLocaleDateString()} -{' '}
                        {new Date(req.endDate).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            req.status === 'APPROVED' || req.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-700'
                              : req.status === 'REJECTED'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {req.status === 'PENDING' ? (
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleRequestStatus(req.id, 'APPROVED')}
                              className="rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRequestStatus(req.id, 'REJECTED')}
                              className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs italic text-gray-400">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* --- My Properties Section --- */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">My Properties</h2>
          {properties.length === 0 ? (
            <p className="text-gray-500">No properties added yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((prop) => (
                <div key={prop.id} className="rounded-lg border p-4 shadow-sm hover:shadow-md">
                  <h3 className="text-lg font-bold text-gray-800">{prop.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{prop.location}</p>
                  <p className="text-sm text-gray-600 mb-3">{prop.description}</p>
                  <div className="flex justify-between items-center text-sm font-semibold text-blue-600">
                    <span>${prop.pricePerMonth} / month</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        prop.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {prop.isAvailable ? 'Available' : 'Rented'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}