"use client";

import { use, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "../../components/CheckoutForm";

const stripeKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  throw new Error(
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing"
  );
}

const stripePromise = loadStripe(stripeKey);

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{
    rentalRequestId?: string;
    rentalId?: string;
  }>;
}) {
  const params = use(searchParams);

  const rentalRequestId =
    params?.rentalRequestId ||
    params?.rentalId ||
    "";

  const [clientSecret, setClientSecret] =
    useState("");

  const [transactionId, setTransactionId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!rentalRequestId) {
      console.error(
        "Rental Request ID is missing"
      );

      setError(
        "Rental Request ID is missing."
      );

      setLoading(false);

      return;
    }

    const createPaymentIntent =
      async () => {
        try {
          const token =
            localStorage.getItem("token");

          if (!token) {
            setError(
              "Please login before making payment."
            );

            setLoading(false);

            return;
          }

          const res = await axios.post(
            "https://prisma-project-tau-dun.vercel.app/payments/create",
            {
              rentalRequestId:
                rentalRequestId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(
            "Create Payment Response:",
            res.data
          );

          const secret =
            res.data?.data?.clientSecret;

          const transaction =
            res.data?.data?.transactionId;

          if (!secret) {
            throw new Error(
              "Client secret was not returned from server."
            );
          }

          if (!transaction) {
            throw new Error(
              "Transaction ID was not returned from server."
            );
          }

          setClientSecret(secret);

          setTransactionId(transaction);
        } catch (error: unknown) {
          console.error(
            "Payment Intent Error:",
            error
          );

          if (
            axios.isAxiosError(error)
          ) {
            console.error(
              "Status:",
              error.response?.status
            );

            console.error(
              "Response:",
              error.response?.data
            );

            setError(
              error.response?.data
                ?.message ||
              "Failed to create payment."
            );
          } else if (
            error instanceof Error
          ) {
            setError(error.message);
          } else {
            setError(
              "Failed to initialize payment."
            );
          }
        } finally {
          setLoading(false);
        }
      };

    createPaymentIntent();
  }, [rentalRequestId]);



  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg font-medium">
          Loading Payment Gateway...
        </p>
      </div>
    );
  }



  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Payment Error
          </h2>

          <p className="mt-2 text-red-500">
            {error}
          </p>
        </div>
      </div>
    );
  }



  if (
    !clientSecret ||
    !transactionId
  ) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-500">
          Failed to initialize payment.
        </p>
      </div>
    );
  }

  // ==============================
  // Stripe Checkout
  // ==============================

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Complete Payment
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your payment details below.
        </p>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
        }}
      >
        <CheckoutForm
          rentalRequestId={
            rentalRequestId
          }
          transactionId={
            transactionId
          }
        />
      </Elements>
    </div>
  );
}