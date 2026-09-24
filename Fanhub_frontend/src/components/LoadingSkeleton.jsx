import { useState, useEffect } from 'react';

export default function LoadingSkeleton({ className = '', height = '200px' }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, [height]);

  if (loaded) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="bg-[#FDFBF7] dark:bg-[#0D1117] border-2 border-black dark:border-neutral-100 brutal-shadow-sm rounded-md" style={{ height }}>
        <div className="absolute inset-0 bg-[#FACC15] opacity-20" />
        <div className="absolute inset-0 bg-white opacity-0" />
      </div>
    </div>
  );
}