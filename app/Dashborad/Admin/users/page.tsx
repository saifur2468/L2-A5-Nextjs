'use client';
import { useEffect, useState } from 'react';
import { User } from '@/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data.data || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBanStatus = async (id: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      fetchUsers(); 
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">User Management</h1>
      <table className="w-full border-collapse border bg-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3 border">{u.name}</td>
              <td className="p-3 border">{u.email}</td>
              <td className="p-3 border"><span className="font-semibold">{u.role}</span></td>
              <td className="p-3 border">
                {u.isBanned ? (
                  <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-sm">Banned</span>
                ) : (
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-sm">Active</span>
                )}
              </td>
              <td className="p-3 border">
                <button
                  onClick={() => toggleBanStatus(u.id)}
                  className={`px-3 py-1 rounded text-sm text-white ${
                    u.isBanned ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {u.isBanned ? 'Unban' : 'Ban'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}