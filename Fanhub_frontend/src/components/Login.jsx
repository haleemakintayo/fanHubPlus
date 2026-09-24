import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('registered');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role);
    navigate('/', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7] dark:bg-[#0D1117]">
      <div className="max-w-md w-full space-y-6 p-6 bg-white dark:bg-[#161B22] border-2 border-black dark:border-neutral-100 brutal-shadow">
        <h1 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100">Log In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-2 border-black dark:border-neutral-200 bg-white dark:bg-[#161B22] text-black dark:text-white px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-black dark:border-neutral-200 bg-white dark:bg-[#161B22] text-black dark:text-white px-3 py-2"
            >
              <option value="registered">Registered User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#A3E635] text-black font-bold py-2 px-4 rounded-md brutal-shadow brutal-btn hover:bg-[#86efac] transition-colors"
          >
            Log In
          </button>
          <div className="text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              New here? <a href="/register" className="text-[#A3E635] hover:underline">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}