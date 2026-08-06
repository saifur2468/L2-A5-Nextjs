"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";

// ==================== Counter ====================

interface CounterProps {
  value: number;
  suffix?: string;
}

const Counter = ({ value, suffix = "" }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const controls = animate(0, value, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (currentValue) => {
        if (ref.current) {
          ref.current.textContent =
            Math.floor(currentValue) + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

// ==================== FAQ Data ====================

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
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

// ==================== Stats Data ====================

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  {
    value: 67,
    suffix: "k",
    label: "Square Meters",
  },
  {
    value: 45,
    suffix: "+",
    label: "Green Spaces",
  },
  {
    value: 12,
    suffix: "",
    label: "Years of Experience",
  },
  {
    value: 15,
    suffix: "",
    label: "Skilled Professionals",
  },
];

// ==================== Main Component ====================

export default function WhyChooseUsSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaq((current) => (current === id ? null : id));
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">

          {/* Left Side */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src="/Screenshot 2026-08-06 180038.png"
                alt="3D Apartment Layout"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Side */}
          <div>
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">
              WHY OUR AGENCY
            </span>

            <h2 className="text-3xl md:text-5xl font-serif italic font-medium text-gray-900 mb-8 leading-tight">
              Experience the Best in Real Estate Services
            </h2>

            {/* FAQ */}
            <div className="space-y-4 border-t border-gray-200 pt-4">
              {faqData.map((faq) => {
                const isOpen = openFaq === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="border-b border-gray-200 pb-4"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex justify-between items-center text-left py-2 font-semibold text-gray-800 hover:text-black transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base md:text-lg">
                        {faq.question}
                      </span>

                      <span className="text-xl font-light ml-4">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="text-gray-500 text-sm md:text-base leading-relaxed mt-2"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Counter Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 text-center border-t border-gray-100">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center"
            >
              <h3 className="text-5xl md:text-6xl font-serif italic text-gray-900 mb-2">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                />
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