"use client";

import React, { useRef } from "react";
import Image from "next/image";
// Swiper React components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// --- 10 Real Estate / Rental Reviews Data ---
const testimonialsData = [
  {
    id: 1,
    title: "Perfect Service!",
    comment:
      "I cannot say enough great things about Rentnest. Their team is professional, knowledgeable, and truly cares about their clients. They helped me find the perfect home for my family.",
    name: "Monica Regan",
    role: "CLIENT OF AGENCY",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Great Agents!",
    comment:
      "Finding a apartment used to be a nightmare until I discovered this platform. The process was completely seamless and transparent from start to finish.",
    name: "James Tores",
    role: "CLIENT OF AGENCY",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Very nice!",
    comment:
      "The virtual tour features and quick agent response saved me so much time. I was able to book my luxury rental within just two days!",
    name: "Katrin Forest",
    role: "CLIENT OF AGENCY",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Hassle-Free Renting!",
    comment:
      "As a landlord, listing my property was super quick and easy. I found verified, reliable tenants within a week. Highly recommended!",
    name: "David Miller",
    role: "PROPERTY OWNER",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Best Property Deals!",
    comment:
      "The filter options made it effortless to find an apartment within my exact budget and preferred location. Outstanding support team!",
    name: "Sophia Alva",
    role: "CLIENT OF AGENCY",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Transparent & Safe",
    comment:
      "No hidden fees or unexpected delays. Everything promised in the listing matched the actual property completely.",
    name: "Liam Chen",
    role: "TENANT",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Outstanding Quality!",
    comment:
      "From studio apartments to penthouse rentals, they have the best collection of verified spaces. The team guided me every step.",
    name: "Emma Watson",
    role: "CLIENT OF AGENCY",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Quick Response!",
    comment:
      "Their customer care is top notch. Whenever I had a question regarding the lease agreement, they answered instantly.",
    name: "Robert Fox",
    role: "CLIENT OF AGENCY",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Highly Recommend!",
    comment:
      "Moving to a new city was scary, but finding a furnished rental through this agency made the transition so smooth and easy.",
    name: "Olivia Brown",
    role: "TENANT",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "5 Star Experience!",
    comment:
      "Great communication, top-tier property options, and absolute professionalism. I wouldn't go anywhere else for property solutions.",
    name: "Daniel Vance",
    role: "CLIENT OF AGENCY",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
];

export default function TestimonialSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="bg-[#EAEAEA] py-20 px-4 md:px-12 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header & Navigation Buttons */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-gray-900 font-normal">
              What Our Clients <br />
              <span className="font-sans not-italic font-bold">Say About Us</span>
            </h2>
          </div>

          {/* Custom Arrow Buttons */}
          <div className="flex gap-3">
            <button
              ref={prevRef}
              aria-label="Previous slide"
              className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
            >
              ←
            </button>
            <button
              ref={nextRef}
              aria-label="Next slide"
              className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
            >
              →
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
          }}
          onInit={(swiper) => {
            // Bind navigation buttons
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="w-full !overflow-visible"
        >
          {testimonialsData.map((item) => (
            <SwiperSlide key={item.id} className="h-full">
              <div className="relative bg-[#EAEAEA] pr-6 flex flex-col justify-between h-full min-h-[300px]">
                
                {/* Background Large Quote Outline Graphic (Optional styling) */}
                <div className="absolute right-0 top-0 text-[180px] leading-none font-serif text-gray-300 opacity-40 pointer-events-none select-none">
                  “
                </div>

                <div>
                  {/* Quote Icon & Title */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold font-serif text-gray-900">“</span>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-8 relative z-10">
                    {item.comment}
                  </p>
                </div>

                {/* Divider & User Info */}
                <div>
                  <hr className="border-gray-300 mb-6" />
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">{item.name}</h4>
                      <p className="text-[10px] tracking-wider text-gray-500 font-semibold uppercase">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}