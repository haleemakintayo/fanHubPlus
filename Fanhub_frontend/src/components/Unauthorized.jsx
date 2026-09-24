import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login', { replace: true });
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7] dark:bg-[#0D1117]">
      <div className="max-w-md w-full p-6 bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-100 brutal-shadow">
        <h1 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100">Access Denied</h1>
        <p className="mt-2 text-center text-neutral-600 dark:text-neutral-300">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => navigate('/login', { replace: true })}
          className="mt-4 w-full bg-[#A3E635] text-black font-bold py-2 px-4 rounded-md brutal-shadow brutal-btn hover:bg-[#86efac] transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}