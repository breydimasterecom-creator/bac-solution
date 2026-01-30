
import React from 'react';

interface TrialEndModalProps {
  onContinueFree: () => void;
  onGoPremium: () => void;
}

const TrialEndModal: React.FC<TrialEndModalProps> = ({ onContinueFree, onGoPremium }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center px-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl text-center">
        <div className="size-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">hourglass_empty</span>
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Fin de l'essai complet</h2>
        <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">
          Tes 24 heures d'accès illimité sont terminées. Tu peux continuer gratuitement ou débloquer le service éducatif complet.
        </p>
        <div className="space-y-3">
          <button 
            onClick={onGoPremium}
            className="w-full h-14 bg-primary text-white font-black rounded-2xl shadow-glow uppercase text-xs tracking-widest active:scale-95 transition-all"
          >
            Accéder au service Premium
          </button>
          <button 
            onClick={onContinueFree}
            className="w-full h-14 bg-slate-50 text-slate-400 font-black rounded-2xl uppercase text-[10px] tracking-widest active:scale-95 transition-all"
          >
            Continuer en version limitée
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialEndModal;
