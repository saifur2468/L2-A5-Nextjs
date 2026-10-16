"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  CreditCard,
  CheckCircle2,
  Calendar,
  Home,
  Receipt,
} from "lucide-react";

interface Payment {
  id: string;
  transactionId: string;
  amount: number;
  method: string;
  status: string;
  paidAt?: string;
  createdAt: string;

  rentalRequest?: {
    property?: {
      title?: string;
      location?: string;
    };
  };
}

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          return;
        }

        const response = await fetch(
          "https://prisma-project-tau-dun.vercel.app/api/payments/history",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("Payment History API:", data);

        if (!response.ok) {
          throw new Error(
            data?.message || "Failed to load payment history."
          );
        }

        if (data.success) {
          setPayments(data.data || []);
        } else {
          setError(
            data?.message || "Failed to load payment history."
          );
        }
      } catch (error: any) {
        console.error("Payment history error:", error);

        setError(
          error?.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);



  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Payment History
          </h1>

          <p className="mt-2 text-gray-500">
            View all your completed rental payments.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Empty */}
        {!error && payments.length === 0 && (
          <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
            <CreditCard className="mx-auto mb-4 h-12 w-12 text-gray-400" />

            <h2 className="text-xl font-semibold text-gray-800">
              No Payment History
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't completed any payments yet.
            </p>
          </div>
        )}

        {/* Desktop Table */}
        {payments.length > 0 && (
          <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-sm md:block">

            <table className="w-full">

              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Transaction
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Property
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t hover:bg-gray-50"
                  >

                    {/* Transaction */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                          <Receipt className="h-5 w-5 text-blue-600" />
                        </div>

                        <div>
                          <p className="max-w-[220px] truncate font-medium text-gray-900">
                            {payment.transactionId}
                          </p>

                          <p className="text-xs text-gray-400">
                            {payment.method}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Property */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-gray-400" />

                        <div>
                          <p className="font-medium text-gray-900">
                            {payment.rentalRequest?.property?.title ||
                              "N/A"}
                          </p>

                          <p className="text-sm text-gray-500">
                            {payment.rentalRequest?.property?.location ||
                              ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />

                        {payment.paidAt
                          ? new Date(
                            payment.paidAt
                          ).toLocaleDateString()
                          : new Date(
                            payment.createdAt
                          ).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-5">
                      <span className="font-bold text-gray-900">
                        {Number(payment.amount).toLocaleString()} BDT
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Completed
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {payments.length > 0 && (
          <div className="space-y-4 md:hidden">

            {payments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >

                <div className="mb-4 flex items-start justify-between">

                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Payment
                      </p>

                      <p className="text-xs text-gray-500">
                        {payment.method}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </span>

                </div>

                <div className="space-y-3">

                  <div>
                    <p className="text-xs text-gray-500">
                      Property
                    </p>

                    <p className="font-medium">
                      {payment.rentalRequest?.property?.title ||
                        "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Transaction ID
                    </p>

                    <p className="break-all text-sm">
                      {payment.transactionId}
                    </p>
                  </div>

                  <div className="flex justify-between">

                    <div>
                      <p className="text-xs text-gray-500">
                        Date
                      </p>

                      <p className="text-sm">
                        {payment.paidAt
                          ? new Date(
                            payment.paidAt
                          ).toLocaleDateString()
                          : new Date(
                            payment.createdAt
                          ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        Amount
                      </p>

                      <p className="font-bold">
                        {Number(payment.amount).toLocaleString()} BDT
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}