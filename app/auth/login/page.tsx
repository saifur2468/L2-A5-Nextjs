'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Home } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://prisma-project-tau-dun.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token || data.data?.token);
      localStorage.setItem('user', JSON.stringify(data.user || data.data?.user));

      const userRole = data.user?.role || data.data?.user?.role;

      if (userRole === 'ADMIN') {
        router.push('/dashboard/admin');
      } else if (userRole === 'LANDLORD') {
        router.push('/dashboard/landlord'); 
      } else {
        router.push('/properties');
      }

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-gray-900 p-8 sm:p-10 shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors">

        {/* Mobile / Center Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md transition-colors">
            <Home size={22} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            RentNest
          </span>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            Welcome back
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
            Enter your credentials to access your RentNest account.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-950/30 p-3 text-center text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300"
            >
              Email address
            </label>
            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
              />
              <input
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 py-3.5 pl-11 pr-4 text-sm text-slate-900 dark:text-gray-100 outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 dark:text-gray-300"
              >
                Password
              </label>
              <button
                type="button"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
              />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 py-3.5 pl-11 pr-12 text-sm text-slate-900 dark:text-gray-100 outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-blue-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 dark:border-gray-700 accent-blue-600 bg-slate-50 dark:bg-gray-800"
            />
            <label htmlFor="remember" className="text-sm text-slate-600 dark:text-gray-400">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 dark:bg-white dark:text-slate-950 py-3.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-600 dark:hover:bg-blue-500 active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200 dark:bg-gray-800" />
          <span className="text-xs font-medium text-slate-400 dark:text-gray-500">OR</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-gray-800" />
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-slate-500 dark:text-gray-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/auth/register')}
            className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
          >
            Create an account
          </button>
        </p>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-400 dark:text-gray-500">
          © 2026 RentNest. All rights reserved.
        </p>
      </div>
    </div>
  );
}