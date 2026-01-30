
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface GoalsScreenProps {
  userProfile: UserProfile;
  onBack: () => void;
  onSave: (filiere: string, target_score: number) => void;
}

const GoalsScreen: React.FC<GoalsScreenProps> = ({ userProfile, onBack, onSave }) => {
  const [filiere, setFiliere] = useState(userProfile.filiere);
  const [targetScore, setTargetScore] = useState(userProfile.target_score || 16);
  
  const filieres = ['SVT', 'SMP', 'SES', 'LLA'];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetScore(parseInt(e.target.value, 10));
  };

  return (
    <div className="min-h-screen flex flex-col font-display bg-page-gradient text-text-main antialiased h-full relative">
      <header className="sticky top-0 z-40 bg-[#E8EFF5]/90 backdrop-blur-md px-6 py-6 flex items-center gap-4 border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black tracking-tight uppercase">Ma Filière & Objectifs</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-8 pb-12 w-full max-w-md mx-auto hide-scrollbar text-left">
        <div className="flex flex-col gap-8">
          <section className="space-y-4">
            <h3 className="px-1 text-[11px] font-black uppercase tracking-widest text-text-sub/60">Ta filière actuelle</h3>
            <div className="grid grid-cols-1 gap-3">
              {filieres.map(f => (
                <div 
                  key={f} 
                  onClick={() => setFiliere(f)}
                  className={`p-5 rounded-3xl border-2 transition-all flex items-center justify-between cursor-pointer ${filiere === f ? 'bg-primary/5 border-primary shadow-glow' : 'bg-white border-white shadow-soft'}`}
                >
                  <span className={`font-black ${filiere === f ? 'text-primary' : 'text-text-main'}`}>{f}</span>
                  {filiere === f && <span className="material-symbols-outlined text-primary">check_circle</span>}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="px-1 text-[11px] font-black uppercase tracking-widest text-text-sub/60">Ton objectif de mention</h3>
            <div className="bg-white p-7 rounded-[2.5rem] shadow-soft border border-white space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-black text-text-main">Score visé</span>
                <span className="text-3xl font-black text-primary transition-all tabular-nums">{targetScore}/20</span>
              </div>
              
              <div className="relative pt-2">
                <input 
                  type="range" 
                  min="10" 
                  max="20" 
                  step="1"
                  value={targetScore}
                  onChange={handleSliderChange}
                  className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #009CFF 0%, #009CFF ${(targetScore - 10) * 10}%, #f1f5f9 ${(targetScore - 10) * 10}%, #f1f5f9 100%)`
                  }}
                />
                <div className="flex justify-between mt-3 px-1">
                  <span className="text-[10px] font-black text-slate-300 uppercase">Réussite</span>
                  <span className="text-[10px] font-black text-primary uppercase">Excellence</span>
                </div>
              </div>
            </div>
          </section>

          <button 
            onClick={() => onSave(filiere, targetScore)}
            className="w-full bg-primary text-white font-black py-5 rounded-3xl shadow-glow active:scale-95 transition-transform uppercase tracking-widest text-sm mt-4"
          >
            Confirmer les objectifs
          </button>
        </div>
      </main>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: #009CFF;
          cursor: pointer;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 4px 12px rgba(0, 156, 255, 0.4);
          transition: transform 0.1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default GoalsScreen;
