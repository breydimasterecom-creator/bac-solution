
import React from 'react';

interface InfoScreenProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

const InfoScreen: React.FC<InfoScreenProps> = ({ title, onBack, children }) => {
  return (
    <div className="min-h-screen flex flex-col font-display bg-page-gradient text-text-main antialiased h-full relative">
      <header className="sticky top-0 z-40 bg-[#E8EFF5]/90 backdrop-blur-md px-6 py-6 flex items-center gap-4 border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black tracking-tight uppercase">{title}</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-8 pb-12 w-full max-w-md mx-auto hide-scrollbar text-left">
        {children}
      </main>
    </div>
  );
};

export default InfoScreen;
