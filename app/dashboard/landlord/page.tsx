'use client';

import { useState, useEffect } from 'react';
import { Building2, FileText, DollarSign, Plus, TrendingUp } from 'lucide-react';
import { Property, RentalRequest } from './types';
import Toast from '../../components/Toast';
import AddPropertyModal from '../../components/AddPropertyModal';

export default function LandlordOverview() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    fetchLandlordData();
  }, []);

  const fetchLandlordData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch Properties
      const propRes = await fetch('https://prisma-project-tau-dun.vercel.app/api/landlord/properties', { headers });
      const propResult = await propRes.json();
      if (propResult.success) {
        const data = Array.isArray(propResult.data) ? propResult.data : [propResult.data];
        setProperties(data.filter(Boolean));
      }

      // Fetch Requests
      const reqRes = await fetch('https://prisma-project-tau-dun.vercel.app/api/landlord/requests', { headers });
      const reqResult = await reqRes.json();
      if (reqResult.success) {
        setRequests(reqResult.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch landlord dashboard data', err);
    }
  };

  const totalEarnings = properties.reduce((acc, curr) => acc + (curr.isAvailable ? 0 : curr.pricePerMonth), 0);
  const activeRequestsCount = requests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length;
  const rejectedCount = requests.filter((r) => r.status === 'REJECTED').length;

  return (
    <div className="space-y-8 transition-colors duration-300">
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-sm transition-colors">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Landlord Overview</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Monitor your property performance, earnings, and tenant requests.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 dark:bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition cursor-pointer"
        >
          <Plus size={18} />
          Add Property
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* Total Properties */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-slate-100 dark:border-gray-800 flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-semibold text-slate-400 dark:text-gray-400 uppercase">Total Properties</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{properties.length}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <TrendingUp size={14} /> Active listings
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <Building2 size={24} />
          </div>
        </div>

        {/* Active Requests */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-slate-100 dark:border-gray-800 flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-semibold text-slate-400 dark:text-gray-400 uppercase">Active Requests</p>
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2">{activeRequestsCount}</p>
            <p className="text-xs text-amber-500 dark:text-amber-400 font-medium mt-1">Requires your attention</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
            <FileText size={24} />
          </div>
        </div>

        {/* Estimated Earnings */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-slate-100 dark:border-gray-800 flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-semibold text-slate-400 dark:text-gray-400 uppercase">Estimated Earnings</p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">৳{totalEarnings.toLocaleString()}</p>
            <p className="text-xs text-slate-400 dark:text-gray-400 font-medium mt-1">Monthly recurring revenue</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
            <DollarSign size={24} />
          </div>
        </div>
      </div>

      {/* Analytics & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Trend Visual Representation */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-slate-100 dark:border-gray-800 space-y-4 transition-colors">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">Revenue Growth</h3>
              <p className="text-xs text-slate-400 dark:text-gray-400">Monthly estimated rental generation</p>
            </div>
            <span className="text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full">2026 Analytics</span>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4 bg-slate-50/50 dark:bg-gray-800/40 rounded-xl border border-dashed border-slate-200 dark:border-gray-700">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full bg-indigo-600/80 dark:bg-indigo-500/80 rounded-t-lg transition-all hover:bg-indigo-600 dark:hover:bg-indigo-400"
                  style={{ height: `${Math.max(20, (idx + 1) * 15)}%` }}
                ></div>
                <span className="text-xs font-medium text-slate-500 dark:text-gray-400">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Request Status Breakdown */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-slate-100 dark:border-gray-800 space-y-4 transition-colors">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white text-lg">Request Status</h3>
            <p className="text-xs text-slate-400 dark:text-gray-400">Overview of tenant application states</p>
          </div>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Pending</span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-300">{activeRequestsCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Approved</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-300">{approvedCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50">
              <span className="text-xs font-semibold text-red-700 dark:text-red-400">Rejected</span>
              <span className="text-sm font-bold text-red-600 dark:text-red-300">{rejectedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddPropertyModal
          categories={[]}
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchLandlordData}
          showToast={showToast}
        />
      )}
    </div>
  );
}