"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CheckoutFormProps {
  rentalRequestId: string;
  transactionId: string;
}

export default function CheckoutForm({
  rentalRequestId,
  transactionId,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not ready. Please wait.");
      return;
    }

    setLoading(true);

    try {


      const { error: submitError } = await elements.submit();

      if (submitError) {
        toast.error(
          submitError.message ||
          "Please check your payment details."
        );
        return;
      }


      const { error, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          redirect: "if_required",
        });

      // Stripe error
      if (error) {
        console.error("Stripe Error:", error);

        toast.error(
          error.message ||
          "Payment failed. Please check your card details."
        );

        return;
      }

      // No PaymentIntent
      if (!paymentIntent) {
        toast.error("Payment could not be processed.");
        return;
      }

      console.log("Payment Intent:", paymentIntent);



      if (paymentIntent.status !== "succeeded") {
        toast.error(
          `Payment was not completed. Status: ${paymentIntent.status}`
        );
        return;
      }


      const token = localStorage.getItem("token");

      console.log("JWT Token:", token);

      if (!token) {
        toast.error(
          "Login session expired. Please login again."
        );

        router.push("/login");
        return;
      }



      const response = await axios.post(
        `https://prisma-project-tau-dun.vercel.app/api/payments/confirm/${transactionId}`,
        {
          transactionId: paymentIntent.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(
        "Backend confirmation:",
        response.data
      );


      toast.success("Payment successful!");

      setTimeout(() => {
        router.push(
          `/payment/success?transactionId=${paymentIntent.id}&rentalRequestId=${rentalRequestId}`
        );
      }, 1500);
    } catch (error: unknown) {
      console.error(
        "Payment processing error:",
        error
      );

      if (axios.isAxiosError(error)) {
        console.error(
          "Status:",
          error.response?.status
        );

        console.error(
          "Backend error:",
          error.response?.data
        );

        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Payment confirmation failed.";

        toast.error(message);
      } else {
        toast.error(
          "A processing error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Stripe Payment Element */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <PaymentElement />
      </div>

      {/* Pay Button */}

      <button
        type="submit"
        disabled={
          !stripe ||
          !elements ||
          loading
        }
        className={`w-full rounded-xl py-4 text-lg font-semibold text-white transition ${loading ||
          !stripe ||
          !elements
          ? "cursor-not-allowed bg-gray-400"
          : "bg-black hover:bg-gray-800"
          }`}
      >
        {loading
          ? "Processing Payment..."
          : "Pay Now"}
      </button>
    </form>
  );
}