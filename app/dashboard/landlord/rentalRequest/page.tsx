'use client';

import { useState, useEffect } from 'react';
import { RentalRequest } from '../types';

export default function RentalRequestPage() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://prisma-project-tau-dun.vercel.app/api/landlord/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        setRequests(result.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch rental requests', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId: string, action: 'APPROVE' | 'REJECT') => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`https://prisma-project-tau-dun.vercel.app/api/landlord/requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' }),
      });
      fetchRequests();
    } catch (err) {
      console.error('Action failed', err);
    }
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      {/* Header Banner */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-sm transition-colors">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white text-center">
          Rental Requests
        </h1>
        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1 text-center">
          Review and manage incoming tenant applications.
        </p>
      </div>

      {/* Requests Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-gray-300">
            <thead className="bg-slate-50 dark:bg-gray-800/60 text-xs font-semibold uppercase text-slate-400 dark:text-gray-400 border-b border-slate-100 dark:border-gray-800">
              <tr>
                <th className="p-4">Tenant Info</th>
                <th className="p-4">Property</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400 dark:text-gray-500">
                    Loading requests...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-400 dark:text-gray-500">
                    No incoming rental requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/40 transition">
                    <td className="p-4">
                      <p className="font-semibold text-slate-800 dark:text-gray-100">
                        {req.tenant?.name || 'Unknown Tenant'}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-gray-500">{req.tenant?.email}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-700 dark:text-gray-200">{req.property?.title}</p>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                        ৳{req.property?.pricePerMonth?.toLocaleString()}
                      </p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          req.status === 'APPROVED'
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                            : req.status === 'REJECTED'
                            ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {req.status === 'PENDING' ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleRequestAction(req.id, 'APPROVE')}
                            className="rounded-lg bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRequestAction(req.id, 'REJECT')}
                            className="rounded-lg bg-red-600 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-gray-500 font-medium">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}