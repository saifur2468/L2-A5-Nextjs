
'use client';
import { FaLinkedin } from "react-icons/fa";
import React, { useState } from 'react';
import {
  CheckCircle,
  Play,
  ArrowRight,
  Home,
  Waves,
  Car,
  Dumbbell,
  Trees,
  UtensilsCrossed,
  Sparkles,
  Mail,
  
  X,
  Star,
} from 'lucide-react';

type TeamMember = {
  name: string;
  role: string;
  experience: string;
  bio: string;
  image: string;
  socials: {
    linkedin: string;
    twitter?: string;
    instagram?: string;
    email: string;
  };
  specialty: string;
};

export default function ApartmentWelcomeSection() {
  const [isPlayingReel, setIsPlayingReel] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      name: 'Eleanor Vance',
      role: 'General & Property Director',
      experience: '12+ Yrs Experience',
      bio: 'Oversees luxury residential operations, ensuring maximum property value and elite hospitality standards across all portfolio locations.',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'eleanor@rentnest.com',
      },
      specialty: 'Asset Management & Guest Relations',
    },
    {
      name: 'Marcus Sterling',
      role: 'Head of Leasing & Portfolio',
      experience: '9+ Yrs Experience',
      bio: 'Specializes in high-end long-term stays, corporate relocations, and personalized client onboarding experiences.',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'marcus@rentnest.com',
      },
      specialty: 'Client Acquisition & VIP Relations',
    },
    {
      name: 'Sophia Chen',
      role: 'Chief Hospitality & Concierge',
      experience: '8+ Yrs Experience',
      bio: 'Dedicated to curating bespoke 5-star living experiences, private dining requests, and around-the-clock resident assistance.',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      socials: {
        linkedin: '#',
        instagram: '#',
        email: 'sophia@rentnest.com',
      },
      specialty: 'Concierge & Lifestyle Services',
    },
    {
      name: 'David Ross',
      role: 'Operations & Facilities Lead',
      experience: '10+ Yrs Experience',
      bio: 'Ensures all properties meet strict structural, environmental, and automated smart-building safety protocols.',
      image:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'david@rentnest.com',
      },
      specialty: 'Facility Tech & Maintenance',
    },
  ];

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      'https://placehold.co/800x600/2C2A29/FFFFFF?text=RentNest';
  };

  const facilities = [
    {
      title: 'Facilities & Dining',
      description:
        'Enjoy private chef catering, resident lounges, and bespoke culinary spaces designed for memorable personal and corporate events.',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      icon: UtensilsCrossed,
      alt: 'Private Dining & Facilities',
    },
    {
      title: 'Spa & Beauty Wellness',
      description:
        'Rejuvenate your body and mind in our private sauna facilities, hydrotherapy suites, and dedicated therapeutic massage rooms.',
      image:
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      icon: Sparkles,
      alt: 'Spa & Beauty Wellness',
    },
    {
      title: 'Fairway & Flora',
      description:
        'Lush landscaped zen gardens, outdoor putting greens, and tranquil walking trails directly integrated into the complex.',
      image:
        'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=600&q=80',
      icon: Trees,
      alt: 'Fairway & Flora Landscaping',
    },
    {
      title: 'Fitness & Gym Studio',
      description:
        'Equipped with modern cardio technology, weight suites, and private studio areas for personal training and pilates sessions.',
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
      icon: Dumbbell,
      alt: 'Fitness & Gym Center',
    },
    {
      title: 'Reflecting Pool & Deck',
      description:
        'Temperature-controlled infinity edge swimming pool accompanied by poolside sun loungers and full towel service.',
      image:
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80',
      icon: Waves,
      alt: 'Reflecting Pool & Infinity Spa',
    },
    {
      title: 'Guest & Resident Parking',
      description:
        '24/7 guarded underground parking, valet assistance, license plate recognition, and high-speed electric vehicle charging hubs.',
      image:
        'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80',
      icon: Car,
      alt: 'Guest & Resident Parking',
    },
  ];

  const fallbackTeamImage =
    'https://placehold.co/400x500/EFECE6/2C2A29?text=Team+Member';

  return (
    <div className="bg-[#FAF7F2] font-sans antialiased text-[#2C2A29] selection:bg-[#D4AF37]/30">
      {/* SECTION 1: WELCOME & ABOUT US */}
      <section className="mx-auto max-w-7xl border-b border-stone-200/60 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Featured Image */}
          <div className="relative lg:col-span-5">
            <div className="group relative overflow-hidden rounded-2xl border border-stone-200/50 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Apartment Reception & Interior"
                className="h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[530px]"
                onError={handleImageError}
              />

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/35 to-transparent p-8 text-center text-white">
                <div className="rounded-xl border border-white/20 bg-black/30 p-6 shadow-lg backdrop-blur-md">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center text-[#D4AF37]">
                    <Home className="h-8 w-8 stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold tracking-[0.2em] text-amber-50">
                    RENTNEST
                  </h3>

                  <div className="mx-auto my-3 h-px w-16 bg-[#D4AF37]" />

                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                    ESTABLISHED • 2026
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-[#D4AF37]/30 bg-[#D4AF37]/5" />
          </div>

          {/* Welcome Content */}
          <div className="space-y-8 lg:col-span-7">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-[#A37E2C]">
                THE HEART OF HOSPITALITY
              </span>

              <h1 className="font-serif text-3xl font-normal leading-tight text-[#1A1817] sm:text-4xl lg:text-5xl">
                Welcome To a World of Warmth & Elegance Apartments
              </h1>

              <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
                Welcome to RentNest, your trusted platform for
                discovering and booking the finest luxury apartments
                around the world. Since our journey began, we&apos;ve
                been committed to making long-term and boutique rental
                living easier, more comfortable, and undeniably
                sophisticated.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 border-t border-stone-200 pt-2 sm:grid-cols-2">
              {[
                'Easy and secure online booking',
                '24/7 customer & concierge support',
                'Exclusive discounts and offers',
                'Flexible cancellation policies',
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center space-x-3 text-stone-800"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A37E2C]/15 text-[#A37E2C]">
                    <CheckCircle className="h-4 w-4" />
                  </div>

                  <span className="text-sm font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Video Reel Banner */}
            <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 p-6 text-white shadow-xl sm:flex-row">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                  alt="Apartment view"
                  className="h-full w-full object-cover opacity-25"
                  onError={handleImageError}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-stone-900/60" />
              </div>

              <div className="relative z-10 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById('about-rentnest')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-[#A37E2C] px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:bg-[#8E6C23] hover:shadow-lg sm:w-auto"
                >
                  <span>KNOW MORE ABOUT US</span>
                </button>
              </div>

              <div className="relative z-10 flex w-full items-center justify-end space-x-4 sm:w-auto">
                <span className="text-xs font-medium uppercase tracking-widest text-stone-300">
                  VIEW REELS
                </span>

                <button
                  type="button"
                  onClick={() => setIsPlayingReel(true)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-900 shadow-lg ring-4 ring-white/20 transition-transform duration-300 hover:scale-110 focus:outline-none"
                  aria-label="View property tour reels"
                >
                  <Play className="ml-0.5 h-5 w-5 fill-current text-[#A37E2C]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: AMENITIES GRID */}
      <section className="mx-auto max-w-7xl border-b border-stone-200/60 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#A37E2C]">
            WORLD-CLASS FACILITIES
          </span>

          <h2 className="font-serif text-3xl text-[#1A1817] sm:text-4xl">
            Designed For Your Ultimate Comfort
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
            Explore our curated selection of high-end amenities
            crafted to provide an effortless, luxurious living
            environment throughout your stay.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => {
            const FacilityIcon = facility.icon;

            return (
              <div
                key={facility.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/70 bg-white/80 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={handleImageError}
                  />

                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-amber-100 bg-white/90 text-[#A37E2C] shadow-md backdrop-blur-md">
                    <FacilityIcon className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="mb-2 font-serif text-xl font-medium text-stone-900 transition-colors group-hover:text-[#A37E2C]">
                      {facility.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-stone-600">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: MEET OUR TEAM */}
      <section
        id="about-rentnest"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#A37E2C]">
            EXCELLENCE IN SERVICE
          </span>

          <h2 className="font-serif text-3xl text-[#1A1817] sm:text-4xl">
            Meet Our Agency Experts
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
            Our dedicated team of property managers and lifestyle
            concierges are committed to delivering exceptional comfort
            and 5-star management services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-500 hover:shadow-xl"
            >
              {/* Team Image */}
              <div className="relative h-72 overflow-hidden bg-stone-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackTeamImage;
                  }}
                />

                <div className="absolute inset-0 bg-stone-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Experience Badge */}
                <div className="absolute left-3 top-3 flex items-center space-x-1 rounded-full border border-amber-500/30 bg-stone-900/80 px-2.5 py-1 text-[10px] font-medium tracking-wider text-amber-200 backdrop-blur-md">
                  <Star className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
                  <span>{member.experience}</span>
                </div>

                {/* Social Links */}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-2 items-center space-x-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <a
                    href={member.socials.linkedin}
                    aria-label={`${member.name} LinkedIn`}
                    onClick={(e) => {
                      if (member.socials.linkedin === '#') {
                        e.preventDefault();
                      }
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md backdrop-blur-md transition-colors hover:bg-[#A37E2C] hover:text-white"
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </a>

                  <a
                    href={`mailto:${member.socials.email}`}
                    aria-label={`Email ${member.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md backdrop-blur-md transition-colors hover:bg-[#A37E2C] hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Team Information */}
              <div className="flex flex-1 flex-col justify-between space-y-3 p-6 text-center">
                <div>
                  <h3 className="font-serif text-xl font-medium text-stone-900 transition-colors group-hover:text-[#A37E2C]">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#A37E2C]">
                    {member.role}
                  </p>

                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-stone-600">
                    {member.bio}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-stone-500">
                  <span className="truncate italic">
                    {member.specialty}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className="flex shrink-0 items-center space-x-1 font-medium text-[#A37E2C] hover:text-[#8E6C23]"
                  >
                    <span>Contact</span>
                    <ArrowRight className="ml-0.5 h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL 1: VIDEO TOUR REEL */}
      {isPlayingReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setIsPlayingReel(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-title"
            className="relative w-full max-w-2xl rounded-2xl border border-stone-800 bg-stone-900 p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPlayingReel(false)}
              aria-label="Close property tour"
              className="absolute right-4 top-4 rounded-full bg-stone-800 p-2 text-stone-400 transition-colors hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <h3
              id="tour-title"
              className="mb-4 pr-10 font-serif text-xl text-[#D4AF37]"
            >
              RentNest Virtual Property Tour
            </h3>

            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-stone-800 bg-black">
              <div className="absolute inset-0 flex items-center justify-center bg-stone-950/40">
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-[#A37E2C] text-white shadow-lg">
                    <Play className="ml-1 h-8 w-8 fill-current" />
                  </div>

                  <p className="text-sm font-medium tracking-wide text-stone-300">
                    Add your property tour video here.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPlayingReel(false)}
                className="rounded-lg bg-stone-800 px-5 py-2 text-xs font-medium uppercase tracking-wider text-stone-200 transition-colors hover:bg-stone-700"
              >
                Close Tour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DIRECT TEAM MEMBER CONTACT */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="relative w-full max-w-md rounded-2xl border border-stone-100 bg-white p-6 text-stone-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              aria-label="Close contact form"
              className="absolute right-4 top-4 rounded-full bg-stone-100 p-1.5 text-stone-400 transition-colors hover:text-stone-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4 flex items-center space-x-4">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackTeamImage;
                }}
                className="h-16 w-16 rounded-full border-2 border-[#D4AF37] object-cover"
              />

              <div className="pr-6">
                <h3
                  id="contact-title"
                  className="font-serif text-lg font-semibold"
                >
                  {selectedMember.name}
                </h3>

                <p className="text-xs font-semibold uppercase text-[#A37E2C]">
                  {selectedMember.role}
                </p>
              </div>
            </div>

            <p className="mb-6 rounded-lg border border-stone-100 bg-stone-50 p-3 text-xs leading-relaxed text-stone-600">
              Send a direct message regarding long-term availability,
              custom concierge requests, or rental bookings.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                // This form currently does not send data to a backend.
                alert(
                  `The contact form UI is working, but message delivery to ${selectedMember.name} requires a backend API.`,
                );
              }}
              className="space-y-3"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1 block text-xs font-semibold text-stone-700"
                >
                  Your Full Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  required
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#A37E2C]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1 block text-xs font-semibold text-stone-700"
                >
                  Your Email Address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#A37E2C]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1 block text-xs font-semibold text-stone-700"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={3}
                  placeholder="Inquiring about apartment leasing options..."
                  className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#A37E2C]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-[#A37E2C] py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-[#8E6C23]"
              >
                Send Direct Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
