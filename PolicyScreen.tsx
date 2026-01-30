
import React from 'react';

interface PolicyScreenProps {
  onBack: () => void;
}

const PolicyScreen: React.FC<PolicyScreenProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col font-display bg-[#F4F7F9] text-slate-900 antialiased h-full relative">
      <header className="sticky top-0 z-40 bg-white p-6 flex items-center gap-4 border-b border-gray-100 shrink-0 shadow-sm">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-slate-50">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black tracking-tight uppercase">📜 Conditions</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-8 pb-12 w-full max-w-md mx-auto hide-scrollbar text-left">
        <div className="space-y-10">
          <section className="relative pl-8 border-l-2 border-primary/20">
             <div className="absolute -left-1.5 top-0 size-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
             <h3 className="font-black text-base uppercase tracking-tight mb-3 text-slate-800">1. Objet de l’application</h3>
             <p className="text-sm text-slate-500 font-medium leading-relaxed">
               Bac-Solution est une application éducative destinée exclusivement aux élèves de Philo (NS4) en Haïti.
             </p>
          </section>

          <section className="relative pl-8 border-l-2 border-primary/20">
             <div className="absolute -left-1.5 top-0 size-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
             <h3 className="font-black text-base uppercase tracking-tight mb-3 text-slate-800">2. Accès au service</h3>
             <div className="space-y-2">
               {["Un essai gratuit est proposé lors de l'inscription.", "Après l’essai, une version gratuite limitée reste accessible.", "L’accès Premium est requis pour bénéficier pleinement de l’intégralité des contenus."].map((text, i) => (
                 <p key={i} className="text-sm text-slate-500 font-medium leading-relaxed">• {text}</p>
               ))}
             </div>
          </section>

          <section className="relative pl-8 border-l-2 border-primary/20">
             <div className="absolute -left-1.5 top-0 size-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
             <h3 className="font-black text-base uppercase tracking-tight mb-3 text-slate-800">3. Règles d’utilisation</h3>
             <div className="space-y-2">
               <p className="text-sm text-slate-500 font-medium">L’utilisateur s’engage à :</p>
               {["Utiliser l’application à des fins purement éducatives.", "Ne pas partager abusivement son compte avec des tiers.", "Respecter les règles scolaires et légales en vigueur."].map((text, i) => (
                 <p key={i} className="text-sm text-slate-500 font-medium leading-relaxed">• {text}</p>
               ))}
             </div>
          </section>

          <section className="relative pl-8 border-l-2 border-primary/20">
             <div className="absolute -left-1.5 top-0 size-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
             <h3 className="font-black text-base uppercase tracking-tight mb-3 text-slate-800">4. Limitation de responsabilité</h3>
             <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
               Bac-Solution est un outil d’aide à la révision. Les résultats scolaires définitifs dépendent uniquement du travail personnel et de l'effort de l’élève.
             </p>
          </section>

          <section className="relative pl-8 border-l-2 border-primary/20">
             <div className="absolute -left-1.5 top-0 size-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
             <h3 className="font-black text-base uppercase tracking-tight mb-3 text-slate-800">5. Modifications</h3>
             <p className="text-sm text-slate-500 font-medium leading-relaxed">
               Les présentes conditions peuvent évoluer pour améliorer le service et s'adapter aux besoins des élèves.
             </p>
          </section>
          
          <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-xl">
             <h4 className="font-black uppercase text-xs tracking-widest text-primary mb-2">Objectif Bac 2025</h4>
             <p className="text-sm font-medium leading-relaxed opacity-80 italic">"L'utilisation de cette application implique l'acceptation pleine et entière de ces conditions."</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PolicyScreen;
