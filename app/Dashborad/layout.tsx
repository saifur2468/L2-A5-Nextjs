'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Home,
  FileText,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Building,
  PlusCircle,
  Clock,
} from 'lucide-react';

type UserRole = 'ADMIN' | 'LANDLORD' | 'TENANT';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface NavItem {
  title: string;
  href: string;
  icon: any;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/auth/login');
      return;
    }

    try {
      const parsedUser: UserData = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error('Failed to parse user data', err);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const roleNavigations: Record<UserRole, NavItem[]> = {
    ADMIN: [
      { title: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
      { title: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
      { title: 'All Properties', href: '/dashboard/admin/properties', icon: Home },
      { title: 'All Rentals', href: '/dashboard/admin/rentals', icon: FileText },
      { title: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
    ],
    LANDLORD: [
      { title: 'Dashboard', href: '/dashboard/landlord', icon: LayoutDashboard },
      { title: 'My Properties', href: '/dashboard/landlord/properties', icon: Building },
      { title: 'Rental Requests', href: '/dashboard/landlord/requests', icon: Clock },
      { title: 'Add Property', href: '/dashboard/landlord/add-property', icon: PlusCircle },
      { title: 'Settings', href: '/dashboard/landlord/settings', icon: Settings },
    ],
    TENANT: [
      { title: 'Dashboard', href: '/dashboard/tenant', icon: LayoutDashboard },
      { title: 'My Rentals', href: '/dashboard/tenant/rentals', icon: FileText },
      { title: 'Payment History', href: '/dashboard/tenant/payments', icon: CreditCard },
      { title: 'Browse Properties', href: '/properties', icon: Home },
      { title: 'Profile Settings', href: '/dashboard/tenant/settings', icon: Settings },
    ],
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  const currentNavItems = roleNavigations[user.role] || [];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col bg-slate-900 text-white shadow-xl">
        <div className="flex h-16 items-center justify-center border-b border-slate-800 px-6">
          <span className="text-xl font-bold tracking-wider text-blue-400">
            RENTAL<span className="text-white">HUB</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto p-4">
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {user.role} Menu
          </div>
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
         {/* 140-145 নম্বর লাইনের আগের কোডটির পরিবর্তে এটি বসান */}

<div className="flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
    {/* Safe check: name না থাকলে 'U' (User) দেখাবে */}
    {(user?.name || 'User').charAt(0).toUpperCase()}
  </div>
  <div className="flex-1 overflow-hidden">
    <p className="truncate text-sm font-semibold text-white">
      {user?.name || 'User'}
    </p>
    <p className="truncate text-xs text-slate-400">{user?.email}</p>
  </div>
</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
          <div>
            <h1 className="text-lg font-semibold capitalize text-gray-800">
              {user.role.toLowerCase()} Panel
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
                user.role === 'ADMIN'
                  ? 'bg-purple-100 text-purple-700'
                  : user.role === 'LANDLORD'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {user.role}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">{children}</main>
      </div>
    </div>
  );
}