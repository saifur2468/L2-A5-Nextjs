'use client';

import { useState, useEffect } from 'react';
import { Clock, CreditCard, Star, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function TenantOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [requestCount, setRequestCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token') as string;
        const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

        const reqRes = await fetch('https://prisma-project-tau-dun.vercel.app/api/rentals', { headers });
        const reqData = await reqRes.json();
        if (reqData.success) setRequestCount(reqData.data?.length || 0);

        const payRes = await fetch('https://prisma-project-tau-dun.vercel.app/api/payments/history', { headers }).catch(() => null);
        if (payRes) {
          const payData = await payRes.json();
          if (payData.success) setPaymentCount(payData.data?.length || 0);
        }

        const revRes = await fetch('https://prisma-project-tau-dun.vercel.app/api/reviews', { headers }).catch(() => null);
        if (revRes) {
          const revData = await revRes.json();
          if (revData.success) setReviewCount(revData.data?.length || 0);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Tenant Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/tenant/myRequest" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total Requests</span>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Clock size={20} /></div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mt-4">{requestCount}</h3>
        </Link>

        <Link href="/tenant/paymenthistory" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total Payments Done</span>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CreditCard size={20} /></div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mt-4">{paymentCount}</h3>
        </Link>

        <Link href="/tenant/reviews" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Reviews Given</span>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Star size={20} /></div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mt-4">{reviewCount}</h3>
        </Link>
      </div>
    </div>
  );
}