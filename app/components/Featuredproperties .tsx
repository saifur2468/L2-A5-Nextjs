import Link from "next/link";

/* ---------- Data ---------- */

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const SPOTLIGHT = {
  id: "gulshan-penthouse",
  title: "Lakeview Penthouse with Private Terrace",
  address: "Road 41, Gulshan 2, Dhaka 1212",
  description:
    "Spacious penthouse with a lake view, a private terrace, a fully equipped kitchen, and 24/7 security. Walking distance to cafes and the Gulshan Circle 2 metro station.",
  beds: 4,
  baths: 3,
  area: 2400,
  price: 18500,
  addedDays: 5,
  available: true,
  badges: ["Spotlight", "Premium"],
  image: img("photo-1502672260266-1c1ef2d93688", 1200),
};

const FEATURED = [
  {
    id: "banani-luxury",
    title: "Downtown Luxury Apartment",
    address: "Banani, Dhaka",
    beds: 2,
    baths: 2,
    area: 1320,
    price: 7500,
    badge: "Trending",
    image: img("photo-1522708323590-d24dbb6b0267"),
  },
  {
    id: "uttara-family",
    title: "Bright Family Apartment",
    address: "Sector 7, Uttara, Dhaka",
    beds: 3,
    baths: 3,
    area: 1680,
    price: 6200,
    badge: "New",
    image: img("photo-1560448204-e02f11c3d0e2"),
  },
  {
    id: "baridhara-suite",
    title: "Panoramic Executive Suite",
    address: "Baridhara, Dhaka",
    beds: 3,
    baths: 3,
    area: 2050,
    price: 14800,
    badge: "Featured",
    image: img("photo-1484154218962-a197022b5858"),
  },
  {
    id: "dhanmondi-home",
    title: "Spacious Dhanmondi Flat",
    address: "Road 27, Dhanmondi, Dhaka",
    beds: 3,
    baths: 2,
    area: 1550,
    price: 5400,
    badge: "Exclusive",
    image: img("photo-1493809842364-78817add7ffb"),
  },
];

const COMPACT = [
  {
    id: "mirpur-studio",
    title: "Renovated Studio near Mirpur 10",
    address: "Mirpur, Dhaka",
    beds: 1,
    baths: 1,
    area: 580,
    price: 2800,
    image: img("photo-1505691938895-1758d7feb511", 400),
  },
  {
    id: "bashundhara-2bhk",
    title: "Modern 2BHK with Open Layout",
    address: "Bashundhara R/A, Dhaka",
    beds: 2,
    baths: 2,
    area: 1100,
    price: 4200,
    image: img("photo-1556909114-f6e7ad7d3136", 400),
  },
  {
    id: "mohammadpur-balcony",
    title: "Cozy Apartment with Balcony",
    address: "Mohammadpur, Dhaka",
    beds: 2,
    baths: 1,
    area: 950,
    price: 3500,
    image: img("photo-1502005229762-cf1b2da7c5d6", 400),
  },
];

/* ---------- Helpers ---------- */

const taka = (n: number) => `৳${n.toLocaleString("en-US")}`;

function Icon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "pin":
      return (
        <svg {...props}>
          <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "bed":
      return (
        <svg {...props}>
          <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
          <circle cx="7" cy="11" r="1.5" />
        </svg>
      );
    case "bath":
      return (
        <svg {...props}>
          <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2ZM6 12V6a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2" />
        </svg>
      );
    case "area":
      return (
        <svg {...props}>
          <path d="M4 4h16v16H4zM4 10h6v10" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}

function Specs({ beds, baths, area, className = "" }: { beds: number; baths: number; area: number; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-600 ${className}`}>
      <li className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5">
        <Icon name="bed" className="h-4 w-4 text-sky-600" />
        <span>{beds} {beds === 1 ? "Bed" : "Beds"}</span>
      </li>
      <li className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5">
        <Icon name="bath" className="h-4 w-4 text-sky-600" />
        <span>{baths} {baths === 1 ? "Bath" : "Baths"}</span>
      </li>
      <li className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5">
        <Icon name="area" className="h-4 w-4 text-sky-600" />
        <span>{area.toLocaleString("en-US")} sq ft</span>
      </li>
    </ul>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm backdrop-blur-md border border-white/40 ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------- Cards ---------- */

function SpotlightCard({ p }: { p: typeof SPOTLIGHT }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Image Container */}
        <div className="relative min-h-[280px] overflow-hidden bg-slate-100 sm:min-h-[340px] lg:col-span-7">
          <img
            src={p.image}
            alt={p.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2 z-10">
            {p.badges.map((b) => (
              <Badge key={b} className="bg-sky-600/90 text-white border-transparent">
                {b}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between text-xs font-medium">
              {p.available && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available Now
                </span>
              )}
              <span className="text-slate-400">Added {p.addedDays} days ago</span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600">
              {p.title}
            </h3>

            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Icon name="pin" className="h-4 w-4 text-sky-600 shrink-0" />
              {p.address}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-3">
              {p.description}
            </p>

            <Specs beds={p.beds} baths={p.baths} area={p.area} className="mt-6" />
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-extrabold text-slate-900">{taka(p.price)}</span>
                <span className="ml-1 text-xs font-medium text-slate-500">/ night</span>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              {/* <Link
                href={`/properties`}
                className="flex-1 inline-flex justify-center items-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Book Now
              </Link> */}
              {/* <Link
                href={`/properties`}
                className="inline-flex justify-center items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Gallery
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MediumCard({ p }: { p: (typeof FEATURED)[0] }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute left-3 top-3">{p.badge}</Badge>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-sky-600 line-clamp-1">
            {p.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">
            <Icon name="pin" className="h-3.5 w-3.5 text-sky-600 shrink-0" />
            {p.address}
          </p>
          <Specs beds={p.beds} baths={p.baths} area={p.area} className="mt-4" />
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="text-lg font-bold text-slate-900">{taka(p.price)}</span>
            <span className="text-xs text-slate-500">/ night</span>
          </div>
          {/* <Link
            href={`/properties`}
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 transition-colors hover:text-sky-800"
          >
            Explore <Icon name="arrow" className="h-3.5 w-3.5" />
          </Link> */}
        </div>
      </div>
    </article>
  );
}

function CompactCard({ p }: { p: (typeof COMPACT)[0] }) {
  return (
    <Link
      href={`/properties`}
      className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600"
    >
      <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl bg-slate-100">
        <img
          src={p.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-sky-600">
          {p.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500 truncate">
          <Icon name="pin" className="h-3 w-3 text-sky-600 shrink-0" />
          {p.address}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-extrabold text-slate-900">{taka(p.price)}</span>
          <span className="text-[11px] font-medium text-slate-400">
            {p.beds}B · {p.baths}B · {p.area} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------- Main Component ---------- */

export default function FeaturedProperties() {
  return (
    <section className="bg-slate-50/60 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-inset ring-sky-600/20">
            FEATURED PROPERTIES
          </span>
          <h2 id="featured-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Explore Our <span className="text-sky-600">Featured Homes</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Discover handpicked luxury apartments and prime properties across Dhaka tailored for your lifestyle.
          </p>
        </div>

        {/* Content Section */}
        <div className="mt-12 space-y-8">
          {/* Main Spotlight Property */}
          <SpotlightCard p={SPOTLIGHT} />

          {/* Featured Properties Grid */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Trending Recommendations</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURED.map((p) => (
                <MediumCard key={p.id} p={p} />
              ))}
            </div>
          </div>

          {/* Compact Quick Pick List */}
          <div className="pt-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Popular Value Stays</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {COMPACT.map((p) => (
                <CompactCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}