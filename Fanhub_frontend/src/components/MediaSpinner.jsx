import { useState, useEffect } from 'react';
import './MediaSpinner.css';

export default function MediaSpinner({ size = 40 }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loaded) return null;

  return (
    <div className="relative w-full h-full bg-[#FDFBF7] dark:bg-[#0D1117]">
      <div className="absolute inset-0 bg-[#FDFBF7] dark:bg-[#0D1117]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-${size} h-${size} border-2 border-black dark:border-neutral-200 border-t-transparent rounded-full animate-spin`} />
      </div>
    </div>
  );
}