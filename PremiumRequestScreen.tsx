
import React, { useState } from 'react';

interface PremiumRequestScreenProps {
  onConfirm: () => void;
  onBack: () => void;
}

const PremiumRequestScreen: React.FC<PremiumRequestScreenProps> = ({ onConfirm, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContactAdmin = (method: string) => {
    setIsProcessing(true);
    
    const message = encodeURIComponent(`HI!,\nJe souhaite passer au Premium.\nPlan : Annuel\nMoyen de paiement souhaité : ${method}`);
    const whatsappUrl = `https://wa.me/50940376105?text=${message}`;

    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
        setIsProcessing(false);
        onConfirm();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col font-display bg-[#F4F7F9] text-text-main antialiased h-full relative overflow-hidden">
      <header className="sticky top-0 z-40 bg-white p-6 flex items-center justify-between border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-slate-50">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-sm font-black uppercase tracking-[0.2em] text-primary">Service Éducatif</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-8 pb-12 w-full max-w-md mx-auto hide-scrollbar text-center relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="size-20 bg-white rounded-[2rem] shadow-glow flex items-center justify-center mb-6 border border-white">
            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight leading-tight mb-3">Accès Premium Complet</h1>
          <div className="bg-blue-50 px-4 py-2 rounded-xl mb-4">
             <p className="text-primary font-black text-[10px] uppercase tracking-widest">Paiement externe à Google Play</p>
          </div>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            L'activation est manuelle par nos administrateurs éducatifs. Le paiement s'effectue via les services locaux haïtiens.
          </p>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-3xl p-6 shadow-strong border border-white space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Choisir ton mode d'activation</h3>
            
            <button 
              onClick={() => handleContactAdmin('NatCash')}
              className="w-full h-16 bg-[#F26522] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-between px-6"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">bolt</span>
                <span>NatCash</span>
              </div>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>

            <button 
              onClick={() => handleContactAdmin('MonCash')}
              className="w-full h-16 bg-[#D11116] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-between px-6"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">payments</span>
                <span>MonCash</span>
              </div>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </section>

          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left space-y-4">
             <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-xl">security</span>
                <div>
                   <p className="text-[11px] font-black text-slate-800 uppercase mb-1">Confidentialité</p>
                   <p className="text-[10px] text-slate-500 font-medium leading-normal">Aucune donnée bancaire n'est collectée dans l'application. WhatsApp est utilisé uniquement pour la confirmation et le support pédagogique.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-10 opacity-40">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bac-Solution • Service Éducatif Haïtien</p>
        </div>
      </main>

      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center">
            <div className="size-14 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Redirection WhatsApp...</p>
        </div>
      )}
    </div>
  );
};

export default PremiumRequestScreen;
