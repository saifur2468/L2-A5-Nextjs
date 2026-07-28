'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I request to rent a property?',
      answer:
        'Simply browse our properties, select your desired apartment, and click on "Request Rental". Choose your check-in dates and submit. The landlord will review and approve your request.',
    },
    {
      question: 'Are there any hidden broker or service charges?',
      answer:
        'No! We promote direct interaction between landlords and tenants. The monthly rent displayed is transparent, with no unexpected hidden agent commissions.',
    },
    {
      question: 'How does the online payment system work?',
      answer:
        'Once a landlord approves your rental request, you can safely pay your initial rent or deposit using credit/debit cards or supported digital payment methods right from your dashboard.',
    },
    {
      question: 'What happens if a landlord rejects my request?',
      answer:
        'If a landlord rejects your request or does not respond, no money will be charged from your account, and you can freely apply for other available properties.',
    },
    {
      question: 'How do landlords list their properties here?',
      answer:
        'Landlords can sign up for a Landlord Account, go to their dashboard, and click "Add Property". Fill in details like title, price, location, photos, and features to make it live instantly.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Got questions? We have got answers for both tenants and landlords.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 bg-white'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-gray-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100/50 mt-1 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}