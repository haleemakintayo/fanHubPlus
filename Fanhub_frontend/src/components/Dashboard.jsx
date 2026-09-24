import { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

  // Simulate fetching user data
  useEffect(() => {
    setUser({ name: 'Fan Hub User', role: 'registered' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#0D1117] text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-40 w-full bg-[#FDFBF7] dark:bg-[#0D1117] border-b-2 border-black dark:border-neutral-100 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#A3E635] text-black font-semibold text-xs sm:text-sm uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn hover:bg-[#86efac]"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <h3 className="text-xl font-semibold mb-4">Welcome to Your Dashboard</h3>
        <p className="mb-4">
          This is a protected area accessible only to registered users.
        </p>
        {/* Add more dashboard content here */}
      </main>

      <footer className="sticky bottom-0 w-full bg-[#FDFBF7] dark:bg-[#0D1117] border-t-2 border-black dark:border-neutral-100 transition-colors duration-200 p-4 text-center text-sm text-neutral-600 dark:text-neutral-300">
        © 2025 Fan Hub Plus. All rights reserved.
      </footer>
    </div>
  );
}