
import React from 'react';

interface LimitModalProps {
  type: 'exam' | 'quiz' | 'ai';
  onClose: () => void;
  onGoPremium: () => void;
}

const LimitModal: React.FC<LimitModalProps> = ({ type, onClose, onGoPremium }) => {
  const config = {
    exam: {
      title: "Limite d'examens atteinte",
      desc: "Tu as déjà consulté tes 5 examens gratuits pour cette matière aujourd'hui.",
      icon: "menu_book"
    },
    quiz: {
      title: "Limite de quiz atteinte",
      desc: "Tu as déjà effectué tes 2 entraînements gratuits du jour.",
      icon: "quiz"
    },
    ai: {
      title: "Limite du Tuteur IA",
      desc: "Ton quota de questions quotidiennes est épuisé. Reviens demain !",
      icon: "smart_toy"
    }
  }[type];

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center px-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl text-center border border-white">
        <div className="size-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">{config.icon}</span>
        </div>
        
        <h2 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">Limite atteinte</h2>
        <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">
          {config.desc} Tes quotas seront réinitialisés automatiquement demain à minuit.
        </p>

        <div className="space-y-3">
          <button 
            onClick={onGoPremium}
            className="w-full h-14 bg-primary text-white font-black rounded-2xl shadow-glow uppercase text-xs tracking-widest active:scale-95 transition-all"
          >
            Demander l'accès Premium
          </button>
          <button 
            onClick={onClose}
            className="w-full h-14 bg-slate-50 text-slate-400 font-black rounded-2xl uppercase text-[10px] tracking-widest active:scale-95 transition-all"
          >
            Continuer plus tard
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-50">
           <p className="text-[9px] text-slate-400 font-medium leading-relaxed italic">
             Le paiement se fait via MonCash ou NatCash.<br/>
             L'activation est manuelle par nos administrateurs.
           </p>
        </div>
      </div>
    </div>
  );
};

export default LimitModal;
