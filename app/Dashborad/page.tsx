'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRootPage() {
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');

    if (userStr) {
      try {
        const user = JSON.parse(userStr);

        if (user.role === 'ADMIN') {
          router.push('/dashborad/admin');
          return;
        } else if (user.role === 'LANDLORD') {
          router.push('/dashborad/landlord');
          return;
        } else if (user.role === 'TENANT') {
          router.push('/dashborad/tenant');
          return;
        }
      } catch (e) {
        console.error('Error reading user role', e);
      }
    }

    
    router.push('/dashborad/tenant');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center gap-2 font-medium text-gray-500">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
        Loading Dashboard...
      </div>
    </div>
  );
}