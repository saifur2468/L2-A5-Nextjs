'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Plus,
  Home,
  Users,
  LayoutDashboard,
  Building2,
  MapPin,
  History,
  Settings,
  LogOut,
  Smartphone,
  ChevronDown,
  Clock,
  CreditCard,
  Star,
  FileText,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<{ name?: string; email?: string; role?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  // ================= ROLE BASED NAVIGATION =================
  const tenantNav = [
    { name: 'My Requests', href: '/dashborad/requests', icon: Clock },
    { name: 'Payment History', href: '/dashborad/payments', icon: CreditCard },
    { name: 'My Reviews', href: '/ddashborad/reviews', icon: Star },
  ];

  const landlordNav = [
    { name: 'My Properties', href: '/dashborad/properties', icon: Home },
    { name: 'Rental Requests', href: '/dashborad/requests', icon: FileText },
  ];

  const adminNav = [
    { name: 'Overview', href: '/dashborad/admin/overview', icon: LayoutDashboard },
    { name: 'User Management', href: '/dashborad/admin/users', icon: Users },
    { name: 'All Listings', href: '/dashborad/admin/listings', icon: Building2 },
  ];

  // Role অনুযায়ী navItems সিলেক্ট করা (Default Tenant)
  const navItems =
    user?.role === 'ADMIN'
      ? adminNav
      : user?.role === 'LANDLORD'
      ? landlordNav
      : tenantNav;

  const userName = user?.name || user?.email?.split('@')[0] || 'Emma Kwan';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen bg-[#F4F6FA] text-slate-700 antialiased font-sans">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-6 shrink-0 hidden md:flex">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              R
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Rent<span className="text-indigo-600">Nest</span>
            </span>
          </div>

          {/* Action Button (Only for Landlords) */}
          {user?.role === 'LANDLORD' && (
            <Link
              href="/dashboard/properties/create"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-2xl flex items-center justify-between shadow-lg shadow-indigo-200 transition duration-200 mb-8 cursor-pointer"
            >
              <span className="text-sm">Add Property</span>
              <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                <Plus size={16} />
              </div>
            </Link>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition duration-200 ${
                    isActive
                      ? 'bg-indigo-50/80 text-indigo-600 font-semibold'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <Icon size={19} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Banner & Logout */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100/50 flex flex-col items-center text-center">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm mb-2">
              <Smartphone size={20} />
            </div>
            <p className="text-xs font-bold text-slate-800">Get mobile app</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Manage rentals on the go</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN WRAPPER ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* ================= TOP HEADER ================= */}
        <header className="h-20 bg-[#F4F6FA] px-8 flex items-center justify-between shrink-0">
          
          {/* Search Bar */}
          <div className="relative w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white text-sm py-2.5 pl-11 pr-4 rounded-2xl border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 text-slate-700"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-5">
            <button className="relative p-2.5 bg-white rounded-xl shadow-sm text-slate-500 hover:text-slate-700 transition cursor-pointer">
              <Bell size={19} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-600"></span>
            </button>

            <div className="flex items-center gap-3 cursor-pointer pl-2">
              <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center text-sm shadow-md shadow-indigo-100">
                {userInitial}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-slate-800 leading-none">{userName}</p>
                <p className="text-[11px] text-slate-400 mt-1 capitalize">{user?.role?.toLowerCase() || 'Tenant'}</p>
              </div>
              <ChevronDown size={15} className="text-slate-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="flex-1 overflow-y-auto px-8 pb-8">
          {children}
        </main>

      </div>
    </div>
  );
}