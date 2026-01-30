
import React from 'react';

interface PrivacyScreenProps {
  onBack: () => void;
}

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onBack }) => {
  const date = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen flex flex-col font-display bg-[#F4F7F9] text-slate-900 antialiased h-full relative">
      <header className="sticky top-0 z-40 bg-white p-6 flex items-center gap-4 border-b border-gray-100 shrink-0 shadow-sm">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-slate-50">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black tracking-tight uppercase">🔐 Confidentialité</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-8 pb-12 w-full max-w-md mx-auto hide-scrollbar text-left">
        <div className="mb-8 px-1">
            <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Protection des données</p>
            <p className="text-xs font-bold text-slate-400 italic">Dernière mise à jour : {date}</p>
        </div>

        <div className="space-y-8">
            <section>
              <h3 className="text-base font-black uppercase tracking-tight text-slate-800 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">database</span>
                1. Données collectées
              </h3>
              <div className="bg-white p-5 rounded-3xl border border-white shadow-soft space-y-3">
                <p className="text-sm text-slate-600 font-medium">Bac-Solution collecte uniquement :</p>
                <ul className="space-y-2">
                  {["Le nom de l’utilisateur", "L’adresse e-mail", "Le numéro de téléphone (optionnel)", "L’image de profil (si ajoutée volontairement)"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl">
                      <span className="size-1.5 rounded-full bg-primary"></span> {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 font-medium mt-4 pt-4 border-t border-slate-50">
                  Ces données servent uniquement à créer ton compte, activer l’accès Premium et assurer ton suivi éducatif.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-base font-black uppercase tracking-tight text-slate-800 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">payments</span>
                2. Données de paiement
              </h3>
              <div className="bg-white p-5 rounded-3xl border border-white shadow-soft">
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  <span className="text-primary font-black">Aucun paiement n’est effectué dans l’application.</span> Les paiements se font en dehors de Google Play via MonCash ou NatCash. Aucune donnée bancaire n’est collectée ou stockée.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-base font-black uppercase tracking-tight text-slate-800 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">chat</span>
                3. Utilisation de WhatsApp
              </h3>
              <div className="bg-white p-5 rounded-3xl border border-white shadow-soft">
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  WhatsApp est utilisé exclusivement pour demander une activation Premium ou obtenir un support éducatif personnalisé.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-base font-black uppercase tracking-tight text-slate-800 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                4. Stockage et sécurité
              </h3>
              <div className="bg-white p-5 rounded-3xl border border-white shadow-soft">
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Tes données sont stockées de manière sécurisée via <span className="font-bold">Supabase</span>. Chaque élève a accès uniquement à son propre compte et à ses progrès personnels.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-base font-black uppercase tracking-tight text-slate-800 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">person_edit</span>
                5. Droits de l’utilisateur
              </h3>
              <div className="bg-white p-5 rounded-3xl border border-white shadow-soft">
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Tu peux à tout moment demander la <span className="text-red-500 font-bold">suppression de ton compte</span> ou contacter le support technique pour toute question sur tes données.
                </p>
              </div>
            </section>
        </div>

        <div className="mt-10 p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-xl text-center">
            <p className="text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-2">Engagement Bac-Solution</p>
            <p className="text-sm font-medium opacity-80 leading-relaxed italic">"Ta vie privée est notre priorité pour une révision sereine."</p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyScreen;
