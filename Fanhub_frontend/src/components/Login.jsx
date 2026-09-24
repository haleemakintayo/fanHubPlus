import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock } from 'lucide-react';

export default function Login({ onShowToast, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('registered');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role);
    onShowToast({
      title: 'Authenticated Successfully',
      message: 'Welcome back, Collector! Your bookmarks and ratings synced.',
      type: 'success'
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
          Email Address
        </label>
        <div className="flex items-center border-2 border-black dark:border-white px-2.5 py-2 bg-neutral-50 dark:bg-[#0D1117]">
          <Mail className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="fandom@hubplus.com"
            className="w-full bg-transparent text-xs sm:text-sm font-bold text-black dark:text-white focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
          Password
        </label>
        <div className="flex items-center border-2 border-black dark:border-white px-2.5 py-2 bg-neutral-50 dark:bg-[#0D1117]">
          <Lock className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-transparent text-xs sm:text-sm font-bold text-black dark:text-white focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs font-mono text-neutral-500 hover:text-neutral-700"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
          Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border-2 border-black dark:border-white p-2 text-xs font-bold bg-neutral-50 dark:bg-[#0D1117] text-black dark:text-white focus:outline-none"
        >
          <option value="registered">Registered User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-[#A3E635] text-black font-black text-sm uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn mt-4 hover:bg-[#86efac]"
      >
        Authenticate & Enter Hub
      </button>

      <p className="text-[11px] font-mono text-center text-neutral-500 mt-3">
        Protected by Fan Hub Zero-Spam Policy • SRS TechWiz 7 Compliance
      </p>
    </form>
  );
}