'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Home,
  UserRound,
  Building2,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  // Only Tenant and Landlord can register publicly
  const [role, setRole] = useState<'TENANT' | 'LANDLORD'>('TENANT');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ========================================
      // 1. Register the user
      // ========================================
      const registerRes = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
          role: role,
        }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok || !registerData.success) {
        throw new Error(registerData.message || 'Registration failed');
      }

      // ========================================
      // 2. Register endpoint doesn't return a token,
      // so immediately log the user in to get a real JWT
      // ========================================
      const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok || !loginData.success) {
        // Registration succeeded but auto-login failed —
        // send them to login page instead of blocking them
        router.push('/auth/login');
        return;
      }

      const token = loginData.data.token;

      if (!token) {
        throw new Error('Login succeeded but no token was returned');
      }

      // ========================================
      // 3. Save real token + decode role from JWT payload
      // ========================================
      localStorage.setItem('token', token);

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: payload.id,
            role: payload.role,
            name: fullName,
            email: email,
          })
        );
      } catch {
        // Fallback if token can't be decoded — still store basic info
        localStorage.setItem(
          'user',
          JSON.stringify({ name: fullName, email, role })
        );
      }

      // ========================================
      // 4. Redirect after successful registration
      // ========================================
      router.push('/properties');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 sm:p-10 shadow-2xl">
        
        {/* Mobile / Center Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white shadow-md">
            <Home size={22} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-950">
            RentNest
          </span>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            Get started today
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Join RentNest and start your rental journey.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-600 border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* ================= ROLE SELECTION ================= */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              I want to join as
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* Tenant */}
              <button
                type="button"
                onClick={() => setRole('TENANT')}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border py-4 text-sm font-semibold transition cursor-pointer ${
                  role === 'TENANT'
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-white'
                }`}
              >
                <UserRound size={22} />
                <span>Tenant</span>
                <span
                  className={`text-xs font-normal ${
                    role === 'TENANT' ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  Find a home
                </span>
              </button>

              {/* Landlord */}
              <button
                type="button"
                onClick={() => setRole('LANDLORD')}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border py-4 text-sm font-semibold transition cursor-pointer ${
                  role === 'LANDLORD'
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-white'
                }`}
              >
                <Building2 size={22} />
                <span>Landlord</span>
                <span
                  className={`text-xs font-normal ${
                    role === 'LANDLORD' ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  List a property
                </span>
              </button>
            </div>
          </div>

          {/* ================= FULL NAME ================= */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Full Name
            </label>
            <div className="relative">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="fullName"
                type="text"
                required
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* ================= EMAIL ================= */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* ================= PASSWORD ================= */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 cursor-pointer"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Password must be at least 6 characters.
            </p>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600"
            />
            <label
              htmlFor="terms"
              className="text-xs leading-5 text-slate-500"
            >
              I agree to the Terms of Service and Privacy Policy.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition duration-300 hover:bg-blue-600 hover:shadow-blue-600/20 active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="font-semibold text-blue-600 transition hover:text-blue-700 cursor-pointer"
          >
            Sign in
          </button>
        </p>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-400">
          © 2026 RentNest. All rights reserved.
        </p>
      </div>
    </div>
  );
}