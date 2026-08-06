"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- 10 FAQ Questions & Answers ---
const faqData = [
  {
    id: 1,
    question: "What services do you provide?",
    answer:
      "We provide a wide range of services to help clients buy, sell, rent, or invest in properties. Our services include property listings, property valuations, buyer and seller representation, property management, real estate investment advice, marketing, relocation services.",
  },
  {
    id: 2,
    question: "How do I know how much my property is worth?",
    answer:
      "We conduct comparative market analyses (CMA) evaluating recent sales of similar properties, current market trends, and your property's unique features to determine an accurate market value.",
  },
  {
    id: 3,
    question: "How long does it take to sell a property?",
    answer:
      "Selling time depends on location, pricing, and market conditions. On average, properties listed with optimized marketing sell within 30 to 60 days.",
  },
  {
    id: 4,
    question: "Do you offer property management services?",
    answer:
      "Yes, we offer full property management services including tenant screening, rent collection, property maintenance, lease agreements, and regular inspections.",
  },
  {
    id: 5,
    question: "What is the process for buying a property?",
    answer:
      "The process includes initial consultation, budget planning & mortgage pre-approval, property search & visits, making an offer, negotiation, inspection, and closing.",
  },
  {
    id: 6,
    question: "How much do your services cost?",
    answer:
      "Our pricing is transparent and varies depending on the service. Commission fees for sales or management percentages are clearly discussed before signing any agreement.",
  },
  {
    id: 7,
    question: "Can you assist me with finding a new home to purchase?",
    answer:
      "Absolutely! Our expert agents guide you through available listings, arrange property visits, and negotiate the best price on your behalf.",
  },
  {
    id: 8,
    question: "What types of properties do you specialize in?",
    answer:
      "We specialize in residential apartments, luxury villas, commercial spaces, family homes, and long-term rental properties.",
  },
  {
    id: 9,
    question: "What is your commission rate?",
    answer:
      "Our standard commission rate ranges from 2% to 5% depending on property value and service scope, adhering strictly to local real estate standards.",
  },
  {
    id: 10,
    question: "Do you handle rental properties as well?",
    answer:
      "Yes, we manage both long-term and short-term residential and commercial rental properties, serving both landlords and tenants.",
  },
];

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(1); // First item open by default

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="bg-white py-20 px-4 md:px-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Header & Button */}
        <div className="lg:col-span-5 relative z-10 flex flex-col justify-between h-full pt-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3 block">
              POPULAR QUESTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900 leading-tight mb-2">
              We Hope You Find What
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
              You are Looking for
            </h3>

            {/* Pill Shaped CTA Button */}
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded-full border border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>

          {/* Background House Vector Image Place (Optional overlay line-art) */}
          <div className="hidden lg:block opacity-20 pointer-events-none mt-12 -ml-8">
             {/* You can place an architectural sketch SVG or PNG here */}
             <svg
               width="350"
               height="250"
               viewBox="0 0 200 150"
               fill="none"
               stroke="currentColor"
               className="text-gray-900 stroke-[0.5]"
             >
               <path d="M10 130 L100 30 L190 130 Z" />
               <path d="M30 130 L30 80 L170 80 L170 130" />
               <path d="M80 130 L80 100 L120 100 L120 130" />
             </svg>
          </div>
        </div>

        {/* Right Side: Accordion Items */}
        <div className="lg:col-span-7 divide-y divide-gray-300 border-t border-b border-gray-300">
          {faqData.map((faq) => {
            const isOpen = openFaq === faq.id;

            return (
              <div key={faq.id} className="py-5">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center text-left gap-4 group"
                >
                  <span className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-black transition-colors">
                    {faq.question}
                  </span>
                  <span className="text-2xl font-light text-gray-800 flex-shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Smooth Expand/Collapse Animation */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-3 pr-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}