
import React from 'react';

interface OnboardingScreenProps {
  onContinue: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onContinue }) => {
  return (
    <div className="relative flex h-full w-full flex-col bg-[#0066FF] overflow-hidden font-display">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full w-full px-8 pb-12 pt-10">
        <div className="flex-1 flex items-end justify-center mb-10 overflow-hidden">
          <img 
            alt="Étudiant haïtien" 
            className="h-full w-auto object-contain drop-shadow-2xl animate-in zoom-in-95 duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPc33tCpWOpqQD11wH82cY_sraEkfPv4kfxgVSZrNyKJui_zFMvcdPCdW0cwyf9rzqalcw4c9fOgSc-dpjsb-_HMjCJokJqsfyktvRXEe6au8_uI7gJBjp6I8nKtZhmX9WtV6icxo5UBu6KPHXfBzrB6o3lv8Oe54mgH7Su-aTP5wl1O1OOcbv3uZGCTWmYjxk3vk_YswvlWZhKccDjxuWYmtFjz6eR_72MBSo4i3u6b2TZyaskzTdDjNrH9KlKIUcvNFIQfJGXkQm" 
            style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
          />
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-white text-3xl font-bold leading-tight">
              Révise avec<br/>confiance
            </h1>
            <p className="text-white/90 text-base max-w-[260px] mx-auto font-medium leading-relaxed">
              Prépare-toi efficacement avec les archives officielles et ton tuteur IA.
            </p>
          </div>

          <button 
            onClick={onContinue}
            className="w-full h-14 bg-white text-[#0066FF] font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <span>Continuer</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          <div className="flex gap-2 justify-center">
            <div className="w-6 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
