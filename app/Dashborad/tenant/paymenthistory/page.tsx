'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/payments/history', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => { if (data.success) setPayments(data.data || []); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Payment History</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Property</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((pay) => (
              <tr key={pay.id} className="hover:bg-slate-50/50">
                <td className="p-4 font-mono text-xs text-indigo-600">{pay.transactionId}</td>
                <td className="p-4 text-slate-800">{pay.property?.title || 'N/A'}</td>
                <td className="p-4 text-slate-600">{new Date(pay.createdAt).toLocaleDateString()}</td>
                <td className="p-4 font-semibold text-emerald-600">{pay.amount} BDT</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}