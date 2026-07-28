'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Payment Successful!</h2>
        <p className="text-gray-500 text-sm mt-2 mb-6">
          Your payment was processed smoothly. Your rental status is now active.
        </p>
        <Link
          href="/dashboard/tenant"
          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-black text-white text-sm font-semibold rounded-2xl hover:bg-gray-800 transition"
        >
          <span>Go to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}