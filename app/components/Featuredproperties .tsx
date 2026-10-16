'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Eye, ArrowUpRight, ChevronLeft, ChevronRight, BedDouble, Bath, Square } from 'lucide-react';

// Property Interface
interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  vendor: string;
  builtYear: string;
  category: string;
}

// 8 Dummy Properties for RentNest
const DUMMY_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Kickapoo Turnpike 255 Villa',
    location: '3 Industrial Road, Boston, MA 02108, USA',
    price: 31685,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1250,
    type: 'For Rent',
    vendor: 'Finderland',
    builtYear: '12/02/1992',
    category: 'Luxury Villa',
  },
  {
    id: '2',
    title: '159 Santorina Blue Villa',
    location: '11510 Barman Ave, Los Angeles, CA 90230, USA',
    price: 33005,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1400,
    type: 'For Rent',
    vendor: 'Finderland',
    builtYear: '12/02/1998',
    category: 'Penthouse',
  },
  {
    id: '3',
    title: 'Santorina Blue Homestay Apartment',
    location: '192 King Avenue, Manhattan, NY 10001, USA',
    price: 32213,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 980,
    type: 'For Rent',
    vendor: 'Finderland',
    builtYear: '12/02/1989',
    category: 'Homestay',
  },
  {
    id: '4',
    title: 'Lisa Urban Premium House',
    location: '5300 Lakeside, London, 2240, UK',
    price: 31685,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=80',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1120,
    type: 'For Rent',
    vendor: 'Sea Real',
    builtYear: '12/02/1932',
    category: 'Apartment',
  },
  {
    id: '5',
    title: 'Grand Horizon Heights Suites',
    location: '742 Evergreen Terrace, Springfield, OR 97477, USA',
    price: 42500,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 1850,
    type: 'For Rent',
    vendor: 'RentNest Prime',
    builtYear: '05/10/2021',
    category: 'Duplex',
  },
  {
    id: '6',
    title: 'Skyline Modern Residency',
    location: '88 Ocean Drive, Miami, FL 33139, USA',
    price: 28900,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 890,
    type: 'For Rent',
    vendor: 'UrbanStay',
    builtYear: '11/04/2019',
    category: 'Condo',
  },
  {
    id: '7',
    title: 'Elegance Bay View Studio',
    location: '404 Palm Avenue, San Francisco, CA 94102, USA',
    price: 36400,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1300,
    type: 'For Rent',
    vendor: 'BayEstate',
    builtYear: '01/08/2020',
    category: 'Studio',
  },
  {
    id: '8',
    title: 'Green Valley Minimalist Flat',
    location: '12 Rosewood Lane, Austin, TX 78701, USA',
    price: 24500,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 750,
    type: 'For Rent',
    vendor: 'AustinHomes',
    builtYear: '09/15/2018',
    category: 'Flat',
  },
];

export default function FeaturedProperties() {
  const [properties] = useState<Property[]>(DUMMY_PROPERTIES);
  
  // Carousel Pagination State
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // Display 4 cards per row on desktop

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // 100% Working Prev Button Handler
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? (totalPages - 1) * itemsPerPage : prevIndex - itemsPerPage
    );
  };

  // 100% Working Next Button Handler
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerPage >= properties.length ? 0 : prevIndex + itemsPerPage
    );
  };

  // Get current 4 items for display
  const visibleProperties = properties.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="py-14 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Featured Properties
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/properties" 
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              See All Listing <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Fully Functional Slider Navigation Controls (< & >) */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition shadow-sm"
                aria-label="Previous Properties"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition shadow-md shadow-blue-500/20"
                aria-label="Next Properties"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[500px] shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button 
                    className="p-1.5 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white rounded-lg transition"
                    title="Quick Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                  {property.category}
                </div>
              </div>

              {/* Card Details Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                    <span>{property.location}</span>
                  </div>

                  <div className="mt-3">
                    <span className="text-xl font-extrabold text-lime-600 dark:text-lime-400">
                      Rent:${property.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 font-normal"> / month</span>
                  </div>
                </div>

                {/* Metadata Info & Features */}
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 mt-2 space-y-3">
                  <div className="grid grid-cols-3 gap-1 text-center text-[11px] text-gray-500 dark:text-gray-400">
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase font-medium">Type</span>
                      <strong className="text-gray-800 dark:text-gray-200">{property.type}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase font-medium">Vendor</span>
                      <strong className="text-gray-800 dark:text-gray-200 truncate block">{property.vendor}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase font-medium">Year Built</span>
                      <strong className="text-gray-800 dark:text-gray-200">{property.builtYear}</strong>
                    </div>
                  </div>

                  {/* Bed, Bath & Sqft Chips */}
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 pt-1 border-t border-dashed border-gray-100 dark:border-gray-800">
                    <span className="flex items-center gap-1">
                      <Square className="w-3.5 h-3.5 text-blue-500" /> {property.sqft} Sqft
                    </span>
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-blue-500" /> {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-blue-500" /> {property.bathrooms} Baths
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/properties`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-xs transition-all shadow-sm active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}