'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1
        className="font-bold text-lg cursor-pointer"
        onClick={() => router.push('/issues')}
      >
        Issue Tracker
      </h1>
      <button
        onClick={logout}
        className="text-sm text-red-600 hover:text-red-700"
      >
        Logout
      </button>
    </nav>
  );
}
