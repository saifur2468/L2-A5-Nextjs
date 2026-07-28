import { ShieldCheck, Zap, Users, Headphones, BadgePercent, Clock } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-blue-600" />,
      title: '100% Verified Listings',
      description: 'Every single property and landlord is verified to ensure zero fraud and maximum safety for tenants.',
    },
    {
      icon: <BadgePercent className="w-7 h-7 text-blue-600" />,
      title: 'Zero Brokerage Fees',
      description: 'Connect directly with verified landlords. No middleman, no hidden agent commission fees.',
    },
    {
      icon: <Zap className="w-7 h-7 text-blue-600" />,
      title: 'Instant Booking & Payment',
      description: 'Secure your dream home online with instant payment system powered by Stripe/Local Gateways.',
    },
    {
      icon: <Headphones className="w-7 h-7 text-blue-600" />,
      title: '24/7 Dedicated Support',
      description: 'Our customer success team is available round-the-clock to assist with any rental dispute or query.',
    },
    {
      icon: <Clock className="w-7 h-7 text-blue-600" />,
      title: 'Fast Agreement Process',
      description: 'Digital rental agreements completed within minutes without physical paperwork hassles.',
    },
    {
      icon: <Users className="w-7 h-7 text-blue-600" />,
      title: 'Trusted Community',
      description: 'Join thousands of happy tenants and landlords already using our smart rental ecosystem.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full">
            Why Rent With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">
            Designed for Modern & Hassle-free Renting
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            We bridge the gap between landlords and tenants with trust, transparency, and top-tier technology.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}