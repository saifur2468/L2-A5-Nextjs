'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check Auth
  const checkAuth = () => {
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');

    setToken(savedToken);
    setRole(savedRole);
  };

  useEffect(() => {
    checkAuth();

    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('auth-change', checkAuth);
    };
  }, [pathname]);

  // Close mobile menu after route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Clear cookies
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'role=; path=/; max-age=0';

    setToken(null);
    setRole(null);

    // Auth state sync
    window.dispatchEvent(new Event('auth-change'));

    setMenuOpen(false);

    toast.info('Logged out successfully!');

    router.push('/auth/login');
  };

  // Active Route
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navbar Main */}
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
          >
            Rent<span className="text-blue-600">Nest</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            {/* Home */}
            <Link
              href="/"
              className={`text-xl font-serif transition ${
                isActive('/')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Home
            </Link>

            {/* All Apartments */}
            <Link
              href="/properties"
              className={`text-xl  font-serif transition ${
                isActive('/properties')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              All Apartments
            </Link>
 <Link
              href="/dashborad"
              className={`text-xl  font-serif transition ${
                isActive('/dashborad')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Dashboard
              
            </Link>
            {/* Logged In */}
            {token ? (
              <div className="flex items-center gap-3">

                {/* Role */}
                {/* <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase">
                  {role || 'User'}
                </span> */}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-3">

                {/* Login */}
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-black transition"
                >
                  Login
                </Link>

                {/* Register */}
                <Link
                  href="/auth/register"
                  className="bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition text-sm font-semibold"
                >
                  Register
                </Link>

              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">

            <div className="flex flex-col gap-2">

              {/* Home */}
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold ${
                  isActive('/')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>

              {/* All Apartments */}
              <Link
                href="/properties"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold ${
                  isActive('/properties')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Apartments
              </Link>
<Link
              href="/dashborad"
              className={`text-xl  font-serif transition ${
                isActive('/dashborad')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Dashboard
              
            </Link>
              {/* Auth */}
              {token ? (
                <div className="border-t border-gray-100 pt-4 mt-2">

                  {/* Role */}
                  <div className="px-4 mb-3">
                    <span className="inline-block px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase">
                      {role || 'User'}
                    </span>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl hover:bg-red-100 transition text-sm font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>

                </div>
              ) : (
                <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 mt-2">

                  {/* Login */}
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Link>

                  {/* Register */}
                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-black text-white px-4 py-3 rounded-xl text-center text-sm font-semibold hover:bg-gray-800"
                  >
                    Register
                  </Link>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}