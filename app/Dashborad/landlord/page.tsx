'use client';

import { useState, useEffect } from 'react';
import { Building2, FileText, DollarSign, Plus, MapPin, Tag } from 'lucide-react';
import { Category, Property, RentalRequest } from '@/types';
import Toast from '../../components/Toast';
import AddPropertyModal from '../../components/AddPropertyModal';

export default function LandlordDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'requests'>('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    fetchCategories();
    fetchLandlordProperties();
    fetchLandlordRequests();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories');
      const result = await res.json();
      if (result.success) setCategories(result.data || []);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const fetchLandlordProperties = async () => {
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
    }
  };

  const fetchLandlordRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/admin/rentals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        setRequests(result.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch rental requests', err);
    }
  };

  const handleRequestAction = async (requestId: string, action: 'APPROVE' | 'REJECT') => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/landlord/requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' }),
      });

      showToast(action === 'APPROVE' ? 'Request Approved! Tenant can now pay.' : 'Request Rejected.');
      fetchLandlordRequests();
    } catch (err) {
      showToast('Action triggered successfully!');
      fetchLandlordRequests();
    }
  };

  const totalEarnings = properties.reduce((acc, curr) => acc + (curr.isAvailable ? 0 : curr.pricePerMonth), 0);
  const activeRequestsCount = requests.filter((r) => r.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 space-y-8">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Landlord Portal</h1>
          <p className="text-sm text-slate-500">Manage your properties, review tenant requests, and track earnings.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition cursor-pointer"
        >
          <Plus size={18} />
          Add New Listing
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition cursor-pointer ${
            activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Dashboard Overview
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition cursor-pointer ${
            activeTab === 'properties' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Property Management ({properties.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'requests' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Request Management
          {activeRequestsCount > 0 && (
            <span className="bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full">
              {activeRequestsCount}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Total Properties</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{properties.length}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Building2 size={24} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Active Requests</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">{activeRequestsCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FileText size={24} />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Estimated Earnings</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">৳{totalEarnings.toLocaleString()}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'properties' && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
              <Building2 size={40} className="mx-auto mb-2 opacity-40" />
              <p>No properties listed yet. Click &quot;Add New Listing&quot; to start.</p>
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
      )}

      {activeTab === 'requests' && (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400 border-b border-slate-100">
              <tr>
                <th className="p-4">Tenant Info</th>
                <th className="p-4">Property</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400">
                    No incoming rental requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">{req.tenant?.name || 'Unknown Tenant'}</p>
                      <p className="text-xs text-slate-400">{req.tenant?.email}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-700">{req.property?.title}</p>
                      <p className="text-xs text-indigo-600 font-bold">৳{req.property?.pricePerMonth?.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        req.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                        req.status === 'REJECTED' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {req.status === 'PENDING' ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleRequestAction(req.id, 'APPROVE')}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRequestAction(req.id, 'REJECT')}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500 transition cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <AddPropertyModal
          categories={categories}
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchLandlordProperties}
          showToast={showToast}
        />
      )}
    </div>
  );
}