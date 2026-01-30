
import React, { useState, useEffect } from 'react';

interface TrialBannerProps {
  trialStartedAt: string;
  onEnd: () => void;
}

const TrialBanner: React.FC<TrialBannerProps> = ({ trialStartedAt, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(trialStartedAt).getTime();
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      const end = start + twentyFourHours;
      const remaining = end - now;

      if (remaining <= 0) {
        clearInterval(timer);
        onEnd();
      } else {
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [trialStartedAt, onEnd]);

  if (!timeLeft) return null;

  return (
    <div className="bg-primary text-white text-[10px] font-black py-1.5 px-4 text-center uppercase tracking-widest z-[1000] flex items-center justify-center gap-2 shadow-lg">
      <span className="material-symbols-outlined text-[14px]">timer</span>
      ⏳ Essai gratuit : {timeLeft} restantes
    </div>
  );
};

export default TrialBanner;
