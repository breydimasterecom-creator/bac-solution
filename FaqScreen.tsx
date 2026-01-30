
import React, { useState } from 'react';

interface FaqScreenProps {
  onBack: () => void;
}

const FaqScreen: React.FC<FaqScreenProps> = ({ onBack }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "À quoi sert l’application Bac-Solution ?",
      a: "Bac-Solution aide les élèves de Philo (NS4) à réviser les examens officiels du MENFP des années précédentes, avec des explications claires et un tuteur IA pédagogique."
    },
    {
      q: "Comment fonctionne l’accès Premium ?",
      a: "L’accès Premium donne droit à plus de contenus éducatifs. Le paiement se fait en dehors de Google Play, via MonCash ou NatCash, et l’activation est manuelle après confirmation par nos administrateurs."
    },
    {
      q: "Mes données sont-elles en sécurité ?",
      a: "Oui. Nous collectons uniquement les informations nécessaires au fonctionnement éducatif de l’application. Aucune donnée bancaire n’est demandée ni stockée dans l’application."
    },
    {
      q: "Puis-je utiliser l’app sans connexion Internet ?",
      a: "Oui, partiellement. Cependant, certaines fonctionnalités nécessitent une connexion obligatoire, notamment l’IA (pour générer les réponses) et la synchronisation de ton compte."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-display bg-[#F4F7F9] text-slate-900 antialiased h-full relative">
      <header className="sticky top-0 z-40 bg-white p-6 flex items-center gap-4 border-b border-gray-100 shrink-0 shadow-sm">
        <button onClick={onBack} className="size-10 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-slate-50">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black tracking-tight uppercase">❓ FAQ & Aide</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-8 pb-12 w-full max-w-md mx-auto hide-scrollbar text-left">
        <div className="mb-6 px-1">
          <h2 className="text-lg font-black text-slate-800">Questions fréquentes</h2>
          <p className="text-xs text-slate-500 font-medium">Tout ce que tu dois savoir sur Bac-Solution.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-white shadow-soft overflow-hidden">
              <button 
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left group"
              >
                <span className="font-bold text-[14px] leading-tight pr-4 group-active:text-primary transition-colors">{faq.q}</span>
                <span className={`material-symbols-outlined transition-transform duration-300 text-slate-300 ${activeIdx === idx ? 'rotate-180 text-primary' : ''}`}>expand_more</span>
              </button>
              {activeIdx === idx && (
                <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 text-center">
            <span className="material-symbols-outlined text-primary text-4xl mb-3">support_agent</span>
            <h4 className="font-black text-primary uppercase text-xs tracking-widest mb-2">Besoin d'aide supplémentaire ?</h4>
            <p className="text-sm text-slate-600 font-medium mb-6 leading-relaxed">Notre équipe est disponible sur WhatsApp pour t'aider à activer ton compte.</p>
            <a 
                href="https://wa.me/50940376105" 
                target="_blank"
                className="inline-flex items-center gap-2 bg-primary text-white font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-glow active:scale-95 transition-all"
            >
              Support WhatsApp
              <span className="material-symbols-outlined text-base">chat</span>
            </a>
          </div>
      </main>
    </div>
  );
};

export default FaqScreen;
