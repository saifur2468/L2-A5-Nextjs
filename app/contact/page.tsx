import React from "react";
import { Phone, Mail, MapPin, Clock, Building2 } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-stone-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact Form Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-100">
          
          {/* Subheading Badge */}
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-lime-500" />
            <span className="text-sm font-bold text-stone-800 tracking-wide">
              Connect With Us
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight mb-8">
            Secure Your Future <br />
            Luxury Home Today
          </h1>

          {/* Form */}
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full px-5 py-3.5 bg-stone-100/80 border border-transparent rounded-full text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name here"
                className="w-full px-5 py-3.5 bg-stone-100/80 border border-transparent rounded-full text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="Add email"
                className="w-full px-5 py-3.5 bg-stone-100/80 border border-transparent rounded-full text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all"
              />
              <input
                type="text"
                name="subject"
                placeholder="How can we help you?"
                className="w-full px-5 py-3.5 bg-stone-100/80 border border-transparent rounded-full text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all"
              />
            </div>

            <div>
              <textarea
                name="message"
                rows={5}
                placeholder="Message"
                className="w-full p-5 bg-stone-100/80 border border-transparent rounded-3xl text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#e2f163] hover:bg-[#d8e851] text-stone-900 font-semibold text-base rounded-full shadow-sm transition-all duration-200 mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side: Info Cards & Map */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Top Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e2f163] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-stone-900" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">Phone Number</p>
                <p className="text-sm text-stone-600 mt-0.5">+1 (202) 555-0143</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e2f163] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-stone-900" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">Phone Number</p>
                <p className="text-sm text-stone-600 mt-0.5">info@yourdomain.com</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e2f163] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-stone-900" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">Address</p>
                <p className="text-sm text-stone-600 mt-0.5 leading-snug">
                  25 Main Street, New York, USA
                </p>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e2f163] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-stone-900" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">Working Hours</p>
                <p className="text-sm text-stone-600 mt-0.5 leading-snug">
                  Mon–Sat, 8:00 AM – 6:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Map Section */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 h-[280px] w-full relative">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.540424072382!2d-0.1220892233816654!3d51.50332400933758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-300"
            ></iframe>
          </div>

        </div>

      </div>
    </main>
  );
}