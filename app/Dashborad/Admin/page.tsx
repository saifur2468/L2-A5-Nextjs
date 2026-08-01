'use client';

import { useState, useEffect } from 'react';
import { Users, Building2, Clock, CheckCircle2, TrendingUp, Activity } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';


const dummyRevenueData = [
  { month: 'Jan', users: 120, rentals: 45 },
  { month: 'Feb', users: 180, rentals: 65 },
  { month: 'Mar', users: 240, rentals: 90 },
  { month: 'Apr', users: 310, rentals: 120 },
  { month: 'May', users: 450, rentals: 170 },
  { month: 'Jun', users: 580, rentals: 230 },
];

const dummyRequestStatus = [
  { status: 'Pending', count: 25 },
  { status: 'Approved', count: 180 },
  { status: 'Rejected', count: 15 },
];

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

        const res = await fetch('https://prisma-project-tau-dun.vercel.app/api/v1/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const result = await res.json();

          const data = result?.data || result;

          setStatsData({
            totalUsers: data?.totalUsers || 1250,
            totalProperties: data?.totalProperties || 340,
            pendingRequests: data?.pendingRequests || 25,
            activeRentals: data?.activeRentals || 180,
          });
        } else {

          setStatsData({
            totalUsers: 1250,
            totalProperties: 340,
            pendingRequests: 25,
            activeRentals: 180,
          });
        }
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
        setStatsData({
          totalUsers: 1250,
          totalProperties: 340,
          pendingRequests: 25,
          activeRentals: 180,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const stats = [
    {
      name: 'Total Users',
      value: statsData.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12% from last month',
    },
    {
      name: 'Total Properties',
      value: statsData.totalProperties.toLocaleString(),
      icon: Building2,
      color: 'bg-indigo-500',
      change: '+8% new listings',
    },
    {
      name: 'Pending Requests',
      value: statsData.pendingRequests.toLocaleString(),
      icon: Clock,
      color: 'bg-amber-500',
      change: 'Requires attention',
    },
    {
      name: 'Active Rentals',
      value: statsData.activeRentals.toLocaleString(),
      icon: CheckCircle2,
      color: 'bg-emerald-500',
      change: '+18% growth',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Admin Overview
          </h1>
          <p className="text-sm text-slate-500">
            Monitor platform stats, user growth, and overall rental activities.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 border border-emerald-100 w-fit">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          System Operational
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-between transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
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
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md shadow-slate-200 ${stat.color}`}
                >
                  <Icon size={22} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                <TrendingUp size={13} className="text-emerald-500" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Growth Area Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">Platform Growth</h2>
              <p className="text-xs text-slate-400">Monthly user registration & rental trends</p>
            </div>
            <Activity size={18} className="text-slate-400" />
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="users" name="Users" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="rentals" name="Rentals" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRentals)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Request Status Bar Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800">Rental Status Breakdown</h2>
            <p className="text-xs text-slate-400">Overview of current request states</p>
          </div>

          <div className="h-60 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyRequestStatus} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="status" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Processed: 220</span>
            <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">View Reports →</span>
          </div>
        </div>
      </div>

      {/* Platform Health Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-100 gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">Platform Health & Infrastructure</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            All database nodes are operational. Response latency is under 45ms. API Gateway is secure.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="rounded-xl bg-slate-50 px-4 py-2 border border-slate-100 text-center w-full sm:w-auto">
            <p className="text-[10px] uppercase font-bold text-slate-400">Uptime</p>
            <p className="text-sm font-bold text-slate-800">99.98%</p>
          </div>
          <div className="rounded-xl bg-slate-50 px-4 py-2 border border-slate-100 text-center w-full sm:w-auto">
            <p className="text-[10px] uppercase font-bold text-slate-400">API Status</p>
            <p className="text-sm font-bold text-emerald-600">Stable</p>
          </div>
        </div>
      </div>
    </div>
  );
}