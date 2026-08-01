// 'use client';

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { reviewSchema, ReviewInput } from '@/app/lib/validations';
// import { toast } from 'react-toastify';
// import { CreditCard, Star, Clock, CheckCircle, XCircle, Home, Send } from 'lucide-react';

// interface RentalRequest {
//   id: string;
//   propertyTitle: string;
//   amount: number;
//   status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE';
//   moveInDate: string;
// }

// interface Payment {
//   id: string;
//   propertyTitle: string;
//   amount: number;
//   date: string;
//   transactionId: string;
// }

// export default function TenantDashboard() {
//   const [requests, setRequests] = useState<RentalRequest[]>([]);
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');

//   const {
//     register: registerReview,
//     handleSubmit: handleReviewSubmit,
//     reset: resetReview,
//     setValue: setRatingValue,
//     watch,
//     formState: { errors: reviewErrors, isSubmitting: reviewSubmitting },
//   } = useForm<ReviewInput>({
//     resolver: zodResolver(reviewSchema),
//     defaultValues: { rating: 5 },
//   });

//   const rating = watch('rating');

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://prisma-project-tau-dun.vercel.app'}/api/tenant/dashboard`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success) {
//         setRequests(data.data.requests || []);
//         setPayments(data.data.payments || []);
//       }
//     } catch (error) {
//       toast.error('Failed to load dashboard data');
//     }
//   };

//   const handlePayment = async (requestId: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://prisma-project-tau-dun.vercel.app'}/api/payments/create-checkout`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ requestId }),
//       });
//       const data = await res.json();
//       if (data.url) {
//         window.location.href = data.url; 
//       } else {
//         toast.error('Could not initiate payment');
//       }
//     } catch (err) {
//       toast.error('Payment redirect failed');
//     }
//   };

//   const onSubmitReview = async (data: ReviewInput) => {
//     if (!selectedPropertyId) {
//       toast.error('Please select a property to review');
//       return;
//     }
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://prisma-project-tau-dun.vercel.app'}/api/reviews`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ...data, propertyId: selectedPropertyId }),
//       });
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.message);

//       toast.success('Review submitted successfully!');
//       resetReview();
//       setSelectedPropertyId('');
//     } catch (err: any) {
//       toast.error(err.message || 'Failed to submit review');
//     }
//   };

//   const getStatusBadge = (status: RentalRequest['status']) => {
//     switch (status) {
//       case 'APPROVED':
//         return <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 font-bold rounded-full text-xs"><CheckCircle className="w-3.5 h-3.5"/> Approved</span>;
//       case 'PENDING':
//         return <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 font-bold rounded-full text-xs"><Clock className="w-3.5 h-3.5"/> Pending</span>;
//       case 'REJECTED':
//         return <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 font-bold rounded-full text-xs"><XCircle className="w-3.5 h-3.5"/> Rejected</span>;
//       case 'ACTIVE':
//         return <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-full text-xs"><Home className="w-3.5 h-3.5"/> Active</span>;
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
//       <h1 className="text-3xl font-black text-gray-900">Tenant Dashboard</h1>

//       {/* 1. Rental Request History */}
//       <section className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
//         <h2 className="text-xl font-bold text-gray-900 mb-4">My Rental Requests</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
//                 <th className="py-3 px-4">Property</th>
//                 <th className="py-3 px-4">Move-in Date</th>
//                 <th className="py-3 px-4">Amount</th>
//                 <th className="py-3 px-4">Status</th>
//                 <th className="py-3 px-4 text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 text-sm">
//               {requests.map((req) => (
//                 <tr key={req.id}>
//                   <td className="py-4 px-4 font-semibold text-gray-900">{req.propertyTitle}</td>
//                   <td className="py-4 px-4 text-gray-500">{req.moveInDate}</td>
//                   <td className="py-4 px-4 font-bold text-gray-900">${req.amount}</td>
//                   <td className="py-4 px-4">{getStatusBadge(req.status)}</td>
//                   <td className="py-4 px-4 text-right">
//                     {req.status === 'APPROVED' && (
//                       <button
//                         onClick={() => handlePayment(req.id)}
//                         className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition"
//                       >
//                         <CreditCard className="w-3.5 h-3.5" />
//                         Proceed to Payment
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* 2. Payment History Table */}
//       <section className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
//         <h2 className="text-xl font-bold text-gray-900 mb-4">Payment History</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
//                 <th className="py-3 px-4">Transaction ID</th>
//                 <th className="py-3 px-4">Property</th>
//                 <th className="py-3 px-4">Date</th>
//                 <th className="py-3 px-4">Amount</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 text-sm">
//               {payments.map((p) => (
//                 <tr key={p.id}>
//                   <td className="py-4 px-4 font-mono text-xs text-gray-500">{p.transactionId}</td>
//                   <td className="py-4 px-4 font-medium text-gray-900">{p.propertyTitle}</td>
//                   <td className="py-4 px-4 text-gray-500">{p.date}</td>
//                   <td className="py-4 px-4 font-bold text-green-600">${p.amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* 3. Leave a Review Form */}
//       <section className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
//         <h2 className="text-xl font-bold text-gray-900 mb-2">Leave a Property Review</h2>
//         <p className="text-sm text-gray-500 mb-6">Share your living experience to help other prospective tenants.</p>

//         <form onSubmit={handleReviewSubmit(onSubmitReview)} className="max-w-xl space-y-4">
//           <div>
//             <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Select Property</label>
//             <select
//               value={selectedPropertyId}
//               onChange={(e) => setSelectedPropertyId(e.target.value)}
//               className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black bg-gray-50/50"
//             >
//               <option value="">Select a completed rental...</option>
//               {requests
//                 .filter((r) => r.status === 'ACTIVE')
//                 .map((r) => (
//                   <option key={r.id} value={r.id}>
//                     {r.propertyTitle}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Rating</label>
//             <div className="flex gap-2">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onClick={() => setRatingValue('rating', star)}
//                   className="p-1 text-yellow-400 hover:scale-110 transition"
//                 >
//                   <Star className={`w-6 h-6 ${star <= rating ? 'fill-yellow-400' : 'text-gray-300'}`} />
//                 </button>
//               ))}
//             </div>
//             {reviewErrors.rating && <p className="text-xs text-red-500 mt-1">{reviewErrors.rating.message}</p>}
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Review Details</label>
//             <textarea
//               rows={3}
//               {...registerReview('comment')}
//               placeholder="What did you like or dislike about staying here?"
//               className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black bg-gray-50/50"
//             />
//             {reviewErrors.comment && <p className="text-xs text-red-500 mt-1">{reviewErrors.comment.message}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={reviewSubmitting}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
//           >
//             <Send className="w-4 h-4" />
//             <span>Submit Review</span>
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }












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