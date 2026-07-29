'use client';

import { useState, useEffect } from 'react';
import { Users, Building2, Clock, CheckCircle2, Loader2 } from 'lucide-react';

export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalProperties: 0,
    pendingRequests: 0,
    activeRentals: 0,
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        // 🔗 আপনার ব্যাকএন্ড API এন্ডপয়েন্ট দিন
        const res = await fetch('http://localhost:5000/api/v1/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          // ব্যাকএন্ড থেকে আসা ডাটা অনুযায়ী সেট করা (যেমন: data.data অথবা data)
          setStatsData({
            totalUsers: data?.totalUsers || 0,
            totalProperties: data?.totalProperties || 0,
            pendingRequests: data?.pendingRequests || 0,
            activeRentals: data?.activeRentals || 0,
          });
        }
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  // ব্যাকএন্ডের মান অনুযায়ী স্ট্যাটস অ্যারে তৈরি
  const stats = [
    {
      name: 'Total Users',
      value: statsData.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Properties',
      value: statsData.totalProperties.toLocaleString(),
      icon: Building2,
      color: 'bg-indigo-500',
    },
    {
      name: 'Pending Requests',
      value: statsData.pendingRequests.toLocaleString(),
      icon: Clock,
      color: 'bg-amber-500',
    },
    {
      name: 'Active Rentals',
      value: statsData.activeRentals.toLocaleString(),
      icon: CheckCircle2,
      color: 'bg-emerald-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Admin Overview
        </h1>
        <p className="text-sm text-slate-500">
          Monitor platform stats, users, and overall rental activities.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-100"
            >
              <div>
                <p className="text-xs font-medium text-slate-400">{stat.name}</p>
                {loading ? (
                  <div className="mt-2 h-7 w-16 animate-pulse rounded bg-slate-200" />
                ) : (
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                )}
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${stat.color}`}
              >
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Platform Health Section */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Platform Health</h2>
        <p className="text-sm text-slate-500">
          All systems operational. Database response time is optimal.
        </p>
      </div>
    </div>
  );
}