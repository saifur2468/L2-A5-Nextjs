"use client"
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalRentals: 0,
    pendingRentals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const token = localStorage.getItem('token');

        const [usersRes, propertiesRes, rentalsRes] = await Promise.all([
          fetch('https://prisma-project-tau-dun.vercel.app/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('https://prisma-project-tau-dun.vercel.app/admin/properties', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('https://prisma-project-tau-dun.vercel.app/admin/rentals', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const usersData = await usersRes.json();
        const propertiesData = await propertiesRes.json();
        const rentalsData = await rentalsRes.json();

        const users = usersData?.data || [];
        const properties = propertiesData?.data || [];
        const rentals = rentalsData?.data || [];

        const pendingCount = rentals.filter((r: any) => r.status === 'PENDING').length;

        setStats({
          totalUsers: users.length,
          totalProperties: properties.length,
          totalRentals: rentals.length,
          pendingRentals: pendingCount,
        });
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 shadow rounded-lg border">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg border">
          <h3 className="text-gray-500 text-sm">Total Properties</h3>
          <p className="text-3xl font-bold">{stats.totalProperties}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg border">
          <h3 className="text-gray-500 text-sm">Pending Requests</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.pendingRentals}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg border">
          <h3 className="text-gray-500 text-sm">Total Rentals</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalRentals}</p>
        </div>
      </div>
    </div>
  );
}