import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';

export default function Register({ onShowToast, onClose }) {
  const { register, isLoading, error, clearError } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [favoriteUniverses, setFavoriteUniverses] = useState(['anime', 'gaming']);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setValidationError('');

    if (password !== passwordConfirm) {
      setValidationError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const data = await register({
        username,
        email,
        password,
        passwordConfirm,
        favoriteCategories: favoriteUniverses,
      });

      const registeredUser = data?.user?.username || username;
      onShowToast?.({
        title: 'Welcome to Fan Hub Plus!',
        message: `Account created for ${registeredUser}. Universe telemetry active.`,
        type: 'success',
      });
      onClose?.();
    } catch (err) {
      onShowToast?.({
        title: 'Registration Failed',
        message: err.message || 'Please check your information and try again.',
        type: 'error',
      });
    }
  };

  const activeError = validationError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {activeError && (
        <div className="p-2.5 bg-red-100 dark:bg-red-950/60 border-2 border-black text-red-800 dark:text-red-300 text-xs font-mono font-bold flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{activeError}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
          Collector Handle / Username
        </label>
        <div className="flex items-center border-2 border-black dark:border-white px-2.5 py-2 bg-neutral-50 dark:bg-[#0D1117]">
          <User className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
          <input
            type="text"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (activeError) clearError();
            }}
            placeholder="e.g. CyberShinobi99"
            className="w-full bg-transparent text-xs sm:text-sm font-bold text-black dark:text-white focus:outline-none"
          />
        </div>
      </div>

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
            onChange={(e) => {
              setEmail(e.target.value);
              if (activeError) clearError();
            }}
            placeholder="fandom@hubplus.com"
            className="w-full bg-transparent text-xs sm:text-sm font-bold text-black dark:text-white focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
            Password
          </label>
          <div className="flex items-center border-2 border-black dark:border-white px-2.5 py-2 bg-neutral-50 dark:bg-[#0D1117]">
            <Lock className="w-4 h-4 text-neutral-500 mr-1.5 shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder="••••••••••••"
              className="w-full bg-transparent text-xs font-bold text-black dark:text-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-mono font-black uppercase text-black dark:text-white">
              Confirm
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[10px] font-mono text-neutral-500 hover:text-neutral-700"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="flex items-center border-2 border-black dark:border-white px-2.5 py-2 bg-neutral-50 dark:bg-[#0D1117]">
            <Lock className="w-4 h-4 text-neutral-500 mr-1.5 shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder="••••••••••••"
              className="w-full bg-transparent text-xs font-bold text-black dark:text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-mono font-black uppercase text-neutral-500 mb-1">
          Primary Sector Affiliations
        </label>
        <div className="flex flex-wrap gap-1.5">
          {['anime', 'gaming', 'movies-tv', 'kpop', 'comics', 'cosplay'].map((u) => {
            const isFav = favoriteUniverses.includes(u);
            return (
              <button
                key={u}
                type="button"
                onClick={() => {
                  setFavoriteUniverses((prev) =>
                    prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]
                  );
                }}
                className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-black ${
                  isFav
                    ? 'bg-[#FACC15] text-black font-black'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {isFav ? '✓ ' : '+ '} {u}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-[#A3E635] text-black font-black text-sm uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn mt-3 hover:bg-[#86efac] disabled:opacity-50"
      >
        {isLoading ? 'Creating Collector Vault...' : 'Create Collector Account'}
      </button>

      <p className="text-[11px] font-mono text-center text-neutral-500 mt-2">
        Protected by Fan Hub Zero-Spam Policy • SRS TechWiz 7 Compliance
      </p>
    </form>
  );
}