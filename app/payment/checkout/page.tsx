'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rentalId = searchParams.get('rentalId');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const handlePayment = async () => {
    if (!rentalId) {
      setError('Invalid rental ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      // 1. Create Payment Intent
      const createRes = await fetch(`${API_URL}/payments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rentalId }),
      });

      const createData = await createRes.json();

      if (!createRes.ok || !createData.success) {
        throw new Error(createData.message || 'Failed to create payment intent.');
      }

      const txId = createData.data.transactionId;

      // 2. Confirm Payment
      const confirmRes = await fetch(`${API_URL}/payments/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rentalId, transactionId: txId }),
      });

      const confirmData = await confirmRes.json();

      if (confirmRes.ok && confirmData.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        throw new Error(confirmData.message || 'Payment confirmation failed.');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Something went wrong during payment.');
    } finally {
      setLoading(false);
    }
  };

  if (!rentalId) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
          <h2 className="text-xl font-bold">Rental ID Missing</h2>
          <p className="text-gray-500 text-sm mt-1">No rental reference found in URL.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
          <CreditCard className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-black text-gray-900">Complete Payment</h1>
          <p className="text-gray-500 text-sm mt-1">Rental ID: {rentalId}</p>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>}
        
        {success ? (
          <div className="p-4 bg-green-50 text-green-700 text-sm rounded-xl flex items-center justify-center gap-2 font-bold">
            <CheckCircle2 className="w-5 h-5" /> Payment Verified & Rental Active!
          </div>
        ) : (
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-4 bg-black text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Pay Now'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}