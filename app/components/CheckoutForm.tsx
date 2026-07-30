"use client";
import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CheckoutForm({ rentalRequestId, transactionId }: { rentalRequestId: string, transactionId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg('');

    try {
      // ১. স্ট্রাইপে পেমেন্ট কনফার্ম করা এবং রিডাইরেক্ট হ্যান্ডেল করা
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/tenant/dashboard?payment_success=true&txId=${transactionId}`,
        },
        redirect: "if_required", // যদি রিডাইরেক্ট ছাড়াই পেমেন্ট শেষ করতে চায়
      });

      if (result.error) {
        setErrorMsg(result.error.message || "Payment failed");
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        
        // ২. পেমেন্ট সফল হলে ব্যাকএন্ডের confirmPayment কল করা
        await axios.post('/api/payments/confirm-payment', { transactionId }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        alert("Payment Successful & Rental is now Active!");
        router.push('/tenant/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-xl shadow-md max-w-md mx-auto w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Complete Payment</h3>
      
      {/* মডার্ন পেমেন্ট এলিমেন্ট (কার্ড নাম্বার, এক্সপায়ারি, সিভিসি একসাথে সুন্দরভাবে দেখাবে) */}
      <PaymentElement />

      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition mt-4"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}