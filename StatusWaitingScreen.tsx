
import React from 'react';

interface StatusWaitingScreenProps {
  onRefresh: () => void;
  onBack: () => void;
}

const StatusWaitingScreen: React.FC<StatusWaitingScreenProps> = ({ onRefresh, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col font-display bg-white text-text-main antialiased h-full relative">
      <header className="p-6 flex items-center shrink-0">
        <button onClick={onBack} className="size-10 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-slate-50">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="size-24 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-8 relative">
           <span className="material-symbols-outlined text-5xl animate-pulse">sync</span>
           <div className="absolute -top-1 -right-1 size-6 bg-accent-green rounded-full border-4 border-white"></div>
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Activation en cours</h2>
        <p className="text-sm text-slate-500 mb-10 font-medium leading-relaxed max-w-xs">
          Ta demande est en cours de vérification par notre équipe pédagogique. L'activation se fait quelques minutes après ton paiement.
        </p>

        <button 
          onClick={onRefresh}
          className="w-full h-14 bg-primary text-white font-black rounded-2xl shadow-glow uppercase text-xs tracking-widest active:scale-95 transition-all mb-4"
        >
          Actualiser mon statut
        </button>

        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
          Délai estimé : 5 - 15 minutes
        </p>
      </main>
    </div>
  );
};

export default StatusWaitingScreen;
