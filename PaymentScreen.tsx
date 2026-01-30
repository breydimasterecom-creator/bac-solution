
import React, { useState } from 'react';

interface PaymentScreenProps {
  onConfirm: () => void;
  onBack: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onConfirm, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (method: string) => {
    setIsProcessing(true);
    
    let whatsappUrl = "";
    if (method === 'natcash') {
      whatsappUrl = "https://wa.me/50940376105?text=HI%2C%20je%20souhaite%20payer%20l%E2%80%99acc%C3%A8s%20annuel%20%C3%A0%20l%E2%80%99application%20Bac-Solution%20via%20NatCash.";
    } else {
      whatsappUrl = "https://wa.me/50940376105?text=Hi%2C%20je%20souhaite%20payer%20l%E2%80%99acc%C3%A8s%20annuel%20%C3%A0%20l%E2%80%99application%20Bac-Solution%20via%20MonCash.";
    }

    // Ouvrir le lien WhatsApp
    window.open(whatsappUrl, '_blank');

    // Simulation d'une attente pour la confirmation de l'action utilisateur
    setTimeout(() => {
        setIsProcessing(false);
        onConfirm();
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col font-display bg-page-gradient text-text-main antialiased h-full relative overflow-hidden">
      {/* Cercles décoratifs */}
      <div className="absolute top-[-5%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-10%] w-64 h-64 bg-accent-green/5 rounded-full blur-3xl pointer-events-none"></div>

      <header className="sticky top-0 z-40 bg-[#E8EFF5]/90 backdrop-blur-md px-6 py-6 flex items-center justify-between border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="h-8 px-4 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-[10px] font-black uppercase text-primary tracking-widest">Premium</span>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-8 pb-12 w-full max-w-md mx-auto hide-scrollbar text-center relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="size-16 bg-white rounded-[1.5rem] shadow-glow flex items-center justify-center mb-5 border border-white">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
          <h1 className="text-xl font-black tracking-tight leading-tight mb-2">Accès Premium – 1 année scolaire</h1>
          <p className="text-xs text-text-sub font-medium leading-relaxed max-w-[280px]">
            Accède à tous les examens, résolutions IA et quiz pour réussir ton Baccalauréat.
          </p>
        </div>

        {/* Section NatCash Professionnelle */}
        <section className="mb-8">
          <div className="bg-white rounded-[2rem] p-6 shadow-strong border border-white flex flex-col items-center gap-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3">
                <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[8px] font-black uppercase rounded-full">Recommandé</span>
            </div>
            
            <div className="w-24 h-10 flex items-center justify-center opacity-80">
              <div className="flex items-center">
                <span className="text-[#F26522] font-black text-xl lowercase tracking-tighter">nat</span>
                <span className="text-[#0054A6] font-black text-xl lowercase tracking-tighter">cash</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-base font-black text-slate-800 tracking-tight">Paiement via Natcom</p>
            </div>

            <button 
              onClick={() => handlePayment('natcash')}
              disabled={isProcessing}
              className={`w-full h-14 bg-[#F26522] text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-orange-100 active:scale-95 transition-all flex items-center justify-center gap-3 ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isProcessing ? (
                  <span className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                    Payer avec NatCash
                    <span className="material-symbols-outlined text-lg">bolt</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Section MonCash */}
        <section className="space-y-4">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Autres options de paiement</p>
          
          <button 
            onClick={() => handlePayment('moncash')}
            disabled={isProcessing}
            className="w-full bg-white py-4 px-6 rounded-xl shadow-soft border border-white flex items-center justify-between group active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="h-8 w-20 bg-[#D11116] rounded-lg flex items-center justify-center p-1.5">
                  <div className="flex items-center gap-1">
                      <div className="size-3 bg-white rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[2px] border-t-transparent border-l-[4px] border-l-[#D11116] border-b-[2px] border-b-transparent translate-x-[0.5px]"></div>
                      </div>
                      <span className="text-white font-black text-[9px] uppercase tracking-tighter">MonCash</span>
                  </div>
              </div>
              <span className="font-bold text-xs text-slate-700">Payer via Digicel</span>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        </section>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center gap-4 opacity-40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">lock_person</span>
            <span className="text-[9px] font-black uppercase tracking-widest">Transactions sécurisées</span>
          </div>
          <div className="h-px w-12 bg-slate-200"></div>
          <p className="text-[9px] font-medium text-slate-500 leading-relaxed px-12">
            Cliquez sur un bouton pour contacter notre service de validation sur WhatsApp.
          </p>
        </div>
      </main>

      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-[#F4F7F9]/80 backdrop-blur-sm flex flex-col items-center justify-center p-10 animate-in fade-in duration-300 text-center">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
            <p className="text-sm font-black text-primary uppercase tracking-widest">Ouverture de WhatsApp...</p>
            <p className="text-[10px] text-text-sub mt-2">Envoie le message automatique pour valider ton accès.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
