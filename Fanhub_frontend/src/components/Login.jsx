import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';

export default function Login({ onShowToast, onClose }) {
  const {
    login,
    requestPasswordReset,
    confirmPasswordReset,
    isLoading,
    error,
    clearError,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Password Reset Flow State
  const [resetMode, setResetMode] = useState(false);
  const [resetTokenData, setResetTokenData] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      const data = await login({ email, password });
      const username = data?.user?.username || 'Collector';
      onShowToast?.({
        title: 'Authenticated Successfully',
        message: `Welcome back, ${username}! Your bookmarks and dashboard synced.`,
        type: 'success',
      });
      onClose?.();
    } catch (err) {
      onShowToast?.({
        title: 'Authentication Failed',
        message: err.message || 'Invalid email or password.',
        type: 'error',
      });
    }
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    clearError();
    setResetMessage('');

    try {
      const res = await requestPasswordReset(email);
      setResetMessage(res?.message || 'Password reset token generated.');
      if (res?.reset_data) {
        setResetTokenData(res.reset_data);
      }
      onShowToast?.({
        title: 'Reset Link Dispatched',
        message: res?.message || 'Check your reset token below to set a new password.',
        type: 'info',
      });
    } catch (err) {
      onShowToast?.({
        title: 'Reset Request Failed',
        message: err.message || 'Could not initiate password reset.',
        type: 'error',
      });
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    clearError();

    try {
      const res = await confirmPasswordReset({
        uid: resetTokenData.uid,
        token: resetTokenData.token,
        newPassword,
      });
      onShowToast?.({
        title: 'Password Updated!',
        message: res?.message || 'You can now sign in with your new password.',
        type: 'success',
      });
      setPassword(newPassword);
      setResetMode(false);
      setResetTokenData(null);
      setNewPassword('');
    } catch (err) {
      onShowToast?.({
        title: 'Password Reset Failed',
        message: err.message || 'Invalid or expired reset token.',
        type: 'error',
      });
    }
  };

  const fillDemoCredentials = (demoEmail, demoPass) => {
    clearError();
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  // Password Reset Sub-View
  if (resetMode) {
    return (
      <div className="space-y-4">
        <div className="p-2.5 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 text-xs font-mono">
          <div className="flex items-center gap-1.5 font-black uppercase text-black dark:text-white mb-1">
            <KeyRound className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>Account Recovery</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Enter your registered email to request a password reset token from the Hub identity service.
          </p>
        </div>

        {error && (
          <div className="p-2.5 bg-red-100 dark:bg-red-950/60 border-2 border-black text-red-800 dark:text-red-300 text-xs font-mono font-bold flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {resetMessage && (
          <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 border-2 border-black text-emerald-900 dark:text-emerald-300 text-xs font-mono font-bold flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{resetMessage}</span>
          </div>
        )}

        {!resetTokenData ? (
          <form onSubmit={handleRequestReset} className="space-y-3">
            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                Registered Email Address
              </label>
              <div className="flex items-center border-2 border-black dark:border-white px-2.5 py-2 bg-neutral-50 dark:bg-[#0D1117]">
                <Mail className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="fan@fanhub.com"
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-black dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#FACC15] text-black font-black text-xs uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn disabled:opacity-50"
            >
              {isLoading ? 'Generating Token...' : 'Send Recovery Token'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleConfirmReset} className="space-y-3">
            <div>
              <label className="block text-xs font-mono font-black uppercase text-black dark:text-white mb-1">
                New Password
              </label>
              <div className="flex items-center border-2 border-black dark:border-white px-2.5 py-2 bg-neutral-50 dark:bg-[#0D1117]">
                <Lock className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password"
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-black dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#A3E635] text-black font-black text-xs uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn disabled:opacity-50"
            >
              {isLoading ? 'Updating Password...' : 'Confirm New Password'}
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={() => {
            setResetMode(false);
            setResetTokenData(null);
            clearError();
          }}
          className="w-full py-1.5 text-xs font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400 hover:underline"
        >
          ← Back to Collector Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2.5 bg-red-100 dark:bg-red-950/60 border-2 border-black text-red-800 dark:text-red-300 text-xs font-mono font-bold flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

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
            placeholder="fan@fanhub.com"
            className="w-full bg-transparent text-xs sm:text-sm font-bold text-black dark:text-white focus:outline-none"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-mono font-black uppercase text-black dark:text-white">
            Password
          </label>
          <button
            type="button"
            onClick={() => {
              clearError();
              setResetMode(true);
            }}
            className="text-[10px] font-mono font-bold text-neutral-500 hover:text-black dark:hover:text-white underline"
          >
            Forgot Password?
          </button>
        </div>
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

      {/* Quick Demo Fillers */}
      <div className="p-2.5 bg-neutral-100 dark:bg-[#0D1117] border-2 border-black dark:border-neutral-700 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-black uppercase text-neutral-500">
          Quick Demo Access:
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => fillDemoCredentials('fan@fanhub.com', 'MemberPass123!')}
            className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#FACC15] text-black border border-black hover:bg-yellow-300"
          >
            Member
          </button>
          <button
            type="button"
            onClick={() => fillDemoCredentials('admin@fanhub.com', 'AdminPass123!')}
            className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#F43F5E] text-white border border-black hover:bg-rose-600"
          >
            Admin
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-[#A3E635] text-black font-black text-sm uppercase tracking-tight border-2 border-black brutal-shadow brutal-btn mt-4 hover:bg-[#86efac] disabled:opacity-50"
      >
        {isLoading ? 'Authenticating...' : 'Authenticate & Enter Hub'}
      </button>

      <p className="text-[11px] font-mono text-center text-neutral-500 mt-3">
        Protected by Fan Hub Zero-Spam Policy • SRS TechWiz 7 Compliance
      </p>
    </form>
  );
}