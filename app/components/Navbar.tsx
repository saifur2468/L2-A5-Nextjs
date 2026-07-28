'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { LogOut, User, Home, Building } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      const savedRole = localStorage.getItem('role');
      setToken(savedToken);
      setRole(savedRole);
    }
  };

  useEffect(() => {
    checkAuth();

    // Storage change or custom auth-change event listener
    window.addEventListener('auth-change', checkAuth);
    return () => {
      window.removeEventListener('auth-change', checkAuth);
    };
  }, [pathname]);

  const handleLogout = () => {
    // Clear state
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Clear cookies
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'role=; path=/; max-age=0';

    setToken(null);
    setRole(null);

    // Dispatch event to sync state
    window.dispatchEvent(new Event('auth-change'));

    toast.info('Logged out successfully!');
    router.push('/auth/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-1">
          Rent<span className="text-blue-600">Nest</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-semibold text-gray-600">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <Link href="/properties" className="hover:text-black transition">
            Properties
          </Link>

          {/* Dynamic Buttons */}
          {token ? (
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase">
                {role || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-gray-700 hover:text-black transition"
              >
                logIn
              </Link>
              <Link
                href="/auth/register"
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}