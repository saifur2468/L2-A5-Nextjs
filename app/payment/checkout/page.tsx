"use client";

import { use, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "../../components/CheckoutForm";

// Stripe Publishable Key
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

if (!stripeKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing");
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
    params?.rentalRequestId || params?.rentalId || "";

  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rentalRequestId) {
      console.error("Rental Request ID is missing");
      setLoading(false);
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.post(
          "http://localhost:5000/api/payments/create",
          {
            rentalRequestId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setClientSecret(res.data.data.clientSecret);
        setTransactionId(res.data.data.transactionId);
      } catch (error: any) {
        console.error(
          "Payment Intent Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [rentalRequestId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Payment Gateway...
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to initialize payment.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-10">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm
          clientSecret={clientSecret}
          transactionId={transactionId}
        />
      </Elements>
    </div>
  );
}