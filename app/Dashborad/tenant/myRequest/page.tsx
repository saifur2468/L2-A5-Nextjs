'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, ShieldCheck, Loader2 } from 'lucide-react';

export default function MyRequestPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://prisma-project-tau-dun.vercel.app/rentals', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => { if (data.success) setRequests(data.data || []); })
      .finally(() => setLoading(false));
  }, []);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">Pending</span>;
      case 'APPROVED': return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">Approved</span>;
      case 'ACTIVE': return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">Active</span>;
      case 'REJECTED': return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">Rejected</span>;
      default: return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">{status}</span>;
    }
  };

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">My Rental Requests</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase">
              <th className="p-4">Property</th>
              <th className="p-4">Start Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50/50">
                <td className="p-4 font-medium text-slate-800">{req.property?.title || 'N/A'}</td>
                <td className="p-4 text-slate-600">{new Date(req.startDate).toLocaleDateString()}</td>
                <td className="p-4 text-slate-600">{req.property?.pricePerMonth} BDT</td>
                <td className="p-4">{renderStatusBadge(req.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}