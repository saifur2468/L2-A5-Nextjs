"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";

// --- Animated Counter Component ---
const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.floor(value) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

// --- FAQ Data ---
const faqData = [
  {
    id: 1,
    question: "What services do you provide?",
    answer:
      "These agents work with clients to understand their needs and preferences and then help them find properties.",
  },
  {
    id: 2,
    question: "How do I know how much my property is worth?",
    answer:
      "We perform detailed market analysis and property evaluations to determine the most accurate market value for your property.",
  },
  {
    id: 3,
    question: "How long does it take to sell a property?",
    answer:
      "The duration varies based on market conditions, location, and pricing, but our strategic marketing typically speeds up the process.",
  },
  {
    id: 4,
    question: "Do you offer property management services?",
    answer:
      "Yes, we offer complete property management including tenant screening, maintenance, and rent collection.",
  },
];

// --- Stats Data ---
const statsData = [
  { value: 67, suffix: "k", label: "Square Meters" },
  { value: 45, suffix: "+", label: "Green Spaces" },
  { value: 12, suffix: "", label: "Years of Experience" },
  { value: 15, suffix: "", label: "Skilled Professionals" },
];

export default function WhyChooseUsSection() {
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="bg-white py-16 md:py-24 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left Side: 3D Floor Plan Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Replace src with your 3D floor plan image path */}
              <Image
                src="/Screenshot 2026-08-06 180038.png" 
                alt="3D Apartment Layout"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Side: Header & FAQ Accordion */}
          <div>
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">
              WHY OUR AGENCY
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic font-medium text-gray-900 mb-8 leading-tight">
              Experience the Best in Real Estate Services
            </h2>

            {/* Accordion */}
            <div className="space-y-4 border-t border-gray-200 pt-4">
              {faqData.map((faq) => (
                <div key={faq.id} className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex justify-between items-center text-left py-2 font-semibold text-gray-800 hover:text-black transition-colors"
                  >
                    <span className="text-base md:text-lg">{faq.question}</span>
                    <span className="text-xl font-light ml-4">
                      {openFaq === faq.id ? "−" : "+"}
                    </span>
                  </button>
                  
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-500 text-sm md:text-base leading-relaxed mt-2"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Counter Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 text-center border-t border-gray-100">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-5xl md:text-6xl font-serif italic text-gray-900 mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm font-medium text-gray-600 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}