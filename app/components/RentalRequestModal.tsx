'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { rentalRequestSchema, RentalRequestInput } from '@/app/lib/validations';
import { toast } from 'react-toastify';
import { X, Calendar, Clock, MessageSquare } from 'lucide-react';

interface Props {
  propertyId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RentalRequestModal({ propertyId, isOpen, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RentalRequestInput>({
    resolver: zodResolver(rentalRequestSchema),
    defaultValues: {
      durationMonths: 1,
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: RentalRequestInput) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://prisma-project-tau-dun.vercel.app/api'}/api/rental-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, propertyId }),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || 'Failed to submit request');

      toast.success('Rental request submitted successfully!');
      reset();
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Error submitting request');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-black transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-1">Submit Rental Request</h3>
        <p className="text-sm text-gray-500 mb-6">Send your request details to the landlord for review.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Move-in Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="date"
                {...register('moveInDate')}
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black bg-gray-50/50"
              />
            </div>
            {errors.moveInDate && <p className="text-xs text-red-500 mt-1">{errors.moveInDate.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Duration (Months)</label>
            <div className="relative">
              <Clock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="number"
                min="1"
                {...register('durationMonths', { valueAsNumber: true })}
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black bg-gray-50/50"
              />
            </div>
            {errors.durationMonths && <p className="text-xs text-red-500 mt-1">{errors.durationMonths.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message for Landlord</label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
              <textarea
                rows={3}
                {...register('message')}
                placeholder="Introduce yourself and share relevant details..."
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black bg-gray-50/50"
              />
            </div>
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition disabled:opacity-50 mt-4"
          >
            {isSubmitting ? 'Submitting...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  );
}