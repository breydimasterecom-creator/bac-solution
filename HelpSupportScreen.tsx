
import React, { useState } from 'react';

interface HelpSupportScreenProps {
  onBack: () => void;
}

const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({ onBack }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Comment utiliser le tuteur IA ?",
      a: "C'est simple ! Tu peux lui poser une question par écrit, ou cliquer sur l'icône photo pour envoyer une image de ton exercice. L'IA analysera l'énoncé et t'expliquera la résolution étape par étape."
    },
    {
      q: "Où trouver les examens officiels ?",
      a: "Rends-toi dans la section 'Examens' depuis le menu principal. Tu y trouveras toutes les matières du Bac haïtien classées par année et par session."
    },
    {
      q: "Mes données sont-elles enregistrées ?",
      a: "Oui, tes scores de quiz et tes activités de révision sont enregistrés sur ton compte Supabase pour que tu puisses suivre ta progression sur n'importe quel appareil."
    },
    {
      q: "Est-ce que l'IA couvre tout le programme NS4 ?",
      a: "Absolument. Notre tuteur IA est entraîné sur le programme officiel du MENFP. Il maîtrise toutes les matières : Mathématiques (Analyse, Algèbre), Physique (Mécanique, Électricité), Philosophie, SVT, Chimie, et même les langues."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-display bg-page-gradient text-text-main antialiased h-full relative">
      <header className="sticky top-0 z-40 bg-[#E8EFF5]/90 backdrop-blur-md px-6 py-6 flex items-center gap-4 border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black tracking-tight uppercase">Aide & Support</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-8 pb-12 w-full max-w-md mx-auto hide-scrollbar text-left">
        <div className="flex flex-col gap-8">
          {/* Section Contact Direct */}
          <section className="space-y-4">
            <h3 className="px-1 text-[11px] font-black uppercase tracking-widest text-text-sub/60">Contacte l'équipe</h3>
            <div className="grid grid-cols-1 gap-3">
              <a href="https://wa.me/50940376105" target="_blank" className="bg-white p-5 rounded-3xl shadow-soft border border-white flex items-center gap-4 active:scale-95 transition-all">
                <div className="size-12 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">chat</span>
                </div>
                <div>
                  <p className="font-bold text-[15px]">WhatsApp Support</p>
                  <p className="text-xs text-text-sub">Réponse sous 24h</p>
                </div>
              </a>
              <a href="mailto:support@bac-solution.ht" className="bg-white p-5 rounded-3xl shadow-soft border border-white flex items-center gap-4 active:scale-95 transition-all">
                <div className="size-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">mail</span>
                </div>
                <div>
                  <p className="font-bold text-[15px]">Support Email</p>
                  <p className="text-xs text-text-sub">support@bac-solution.ht</p>
                </div>
              </a>
            </div>
          </section>

          {/* Section FAQ */}
          <section className="space-y-4">
            <h3 className="px-1 text-[11px] font-black uppercase tracking-widest text-text-sub/60">Questions Fréquentes</h3>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-white shadow-soft overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left"
                  >
                    <span className="font-bold text-[14px] leading-tight pr-4">{faq.q}</span>
                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-48' : 'max-h-0'}`}>
                    <div className="px-5 pb-5 text-sm text-text-sub leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Badge Communauté */}
          <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 text-center">
            <span className="material-symbols-outlined text-primary text-4xl mb-3">groups</span>
            <h4 className="font-black text-primary uppercase text-xs tracking-widest mb-2">Rejoins la communauté</h4>
            <p className="text-sm text-slate-600 font-medium mb-4">Plus de 10 000 élèves révisent ensemble sur notre canal Telegram.</p>
            <button className="bg-primary text-white font-black px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest shadow-glow active:scale-95 transition-all">
              Rejoindre le canal
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpSupportScreen;
