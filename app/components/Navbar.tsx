'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlusCircle, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); // রাউট পরিবর্তন ডিক্টেক্ট করার জন্য

  // ইউজার লগইন অবস্থায় আছে কি না তা চেক করার ফাংশন
  const checkAuth = () => {
    const storedRole = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');

    if (storedToken && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const handleLogout = () => {

    localStorage.clear();


    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    setIsLoggedIn(false);
    setRole(null);

    router.push('/auth/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Rent<span className="text-blue-600">Nest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition">
              Home
            </Link>
            <Link
              href="/properties"
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
            >
              All properties
            </Link>

            {isLoggedIn && role === 'TENANT' && (
              <Link
                href="/dashboard/tenant/requests"
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
              >
                My Requests
              </Link>
            )}

            {isLoggedIn && role === 'LANDLORD' && (
              <>
                <Link
                  href="/dashboard/landlord"
                  className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/landlord/properties/new"
                  className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Property
                </Link>
              </>
            )}

            {isLoggedIn && role === 'ADMIN' && (
              <Link
                href="/dashboard/admin"
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
              >
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Desktop Right / Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {role}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold text-gray-700 hover:text-black px-3 py-2 transition"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-black text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-gray-800 transition shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <Link
            href="/properties"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-semibold text-gray-700 py-2 border-b border-gray-50"
          >
            Browse
          </Link>

          {isLoggedIn && role === 'TENANT' && (
            <Link
              href="/dashboard/tenant/requests"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-semibold text-gray-700 py-2 border-b border-gray-50"
            >
              My Requests
            </Link>
          )}

          {isLoggedIn && role === 'LANDLORD' && (
            <>
              <Link
                href="/dashboard/landlord"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-semibold text-gray-700 py-2 border-b border-gray-50"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/landlord/properties/new"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-semibold text-blue-600 py-2 border-b border-gray-50"
              >
                + Add Property
              </Link>
            </>
          )}

          {isLoggedIn && role === 'ADMIN' && (
            <Link
              href="/dashboard/admin"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-semibold text-gray-700 py-2 border-b border-gray-50"
            >
              Admin Panel
            </Link>
          )}

          <div className="pt-2">
            {isLoggedIn ? (
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="w-full text-left text-sm font-semibold text-red-600 py-2 cursor-pointer"
              >
                Logout ({role})
              </button>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-sm font-semibold text-gray-700 border py-2 rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-sm font-semibold bg-black text-white py-2 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}