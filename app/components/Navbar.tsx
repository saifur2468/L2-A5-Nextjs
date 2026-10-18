'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  ChevronDown,
  User,
} from 'lucide-react';
import { ThemeToggle } from './ui/theme-toggle';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Check Auth Status
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

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileDropdown(false);
  }, [pathname]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'role=; path=/; max-age=0';

    setToken(null);
    setRole(null);

    window.dispatchEvent(new Event('auth-change'));

    setMenuOpen(false);
    setProfileDropdown(false);

    toast.info('Logged out successfully!');
    router.push('/auth/login');
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Nav links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/aboutsection' },
    { name: 'Services', href: '/services' },
    { name: 'All Apartments', href: '/properties' },
    
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Rent<span className="text-blue-600 dark:text-blue-400">Nest</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-50/80 dark:bg-gray-800/80 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-xs xl:text-sm font-medium rounded-xl transition-all duration-200 ${
                    active
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Theme Toggle & User Menu */}
          <div className="hidden md:flex items-center gap-3">

            {/* Dark Mode Theme Toggle Component */}
            <ThemeToggle />

            {token ? (
              /* Profile Dropdown Menu */
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 pr-3 rounded-full border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-400 font-medium">Account Role</p>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-100 capitalize">{role || 'User'}</p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-400" />
                      Dashboard
                    </Link>

                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Login
                </Link>

                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold shadow-md shadow-blue-500/20 active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg px-4 py-6 shadow-xl animate-in slide-in-from-top">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Auth Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              {token ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Logged in as</span>
                    <span className="text-xs font-bold uppercase bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full">
                      {role || 'User'}
                    </span>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <LayoutDashboard className="w-4 h-4 text-gray-400" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl transition text-sm font-semibold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-md shadow-blue-500/20"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}