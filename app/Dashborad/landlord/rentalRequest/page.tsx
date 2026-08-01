'use client';

import { useState, useEffect } from 'react';
import { RentalRequest } from '@/types';

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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 text-center">Rental Requests</h1>
        <p className="text-sm text-slate-500 mt-1 text-center">Review and manage incoming tenant applications.</p>
      </div>

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
            {loading ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-slate-400">Loading requests...</td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-slate-400">No incoming rental requests found.</td>
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
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${req.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
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
    </div>
  );
}