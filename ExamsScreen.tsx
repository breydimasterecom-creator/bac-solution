
import React from 'react';

interface ExamsScreenProps {
  onBack: () => void;
  onGoToHome: () => void;
  onGoToQuiz: () => void;
  onGoToProfile: () => void;
  onSelectSubject: (name: string) => void;
}

const ExamsScreen: React.FC<ExamsScreenProps> = ({ onBack, onGoToHome, onGoToQuiz, onGoToProfile, onSelectSubject }) => {
  const subjects = [
    { name: 'Physique', icon: 'electric_bolt', color: 'bg-blue-50 text-blue-600' },
    { name: 'Mathematique', icon: 'calculate', color: 'bg-green-50 text-green-600' },
    { name: 'Chimie', icon: 'science', color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Creole', icon: 'chat', color: 'bg-orange-50 text-orange-600' },
    { name: 'Anglais', icon: 'language', color: 'bg-purple-50 text-purple-600' },
    { name: 'Histoire& Geo', icon: 'public', color: 'bg-cyan-50 text-cyan-600' },
    { name: 'Philosophie', icon: 'psychology', color: 'bg-red-50 text-red-600' },
    { name: 'Informatique', icon: 'computer', color: 'bg-sky-50 text-sky-600' },
    { name: 'Biologie&Geologie', icon: 'biotech', color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Economie', icon: 'trending_up', color: 'bg-slate-50 text-slate-700' },
    { name: 'Espagnol', icon: 'translate', color: 'bg-yellow-50 text-yellow-700' },
    { name: 'Art&Musique', icon: 'palette', color: 'bg-pink-50 text-pink-600' },
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-page-gradient overflow-hidden font-display text-left text-text-main">
      <header className="flex items-center bg-[#E8EFF5]/90 backdrop-blur-md sticky top-0 z-40 p-4 pb-3 justify-between border-b border-gray-100 shrink-0">
        <button 
          onClick={onBack}
          className="text-[#101518] flex size-10 shrink-0 items-center justify-center rounded-full active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-[#101518] text-lg font-black tracking-tight flex-1 text-center pr-10 uppercase">Archives du Bac</h2>
      </header>

      <main className="flex-1 flex flex-col p-5 pb-32 overflow-y-auto hide-scrollbar scroll-smooth">
        <div className="mb-8">
          <h1 className="text-[#101518] text-[28px] font-black leading-tight mb-2 uppercase">Matières</h1>
          <p className="text-text-sub text-sm font-medium opacity-80 leading-relaxed">
            Sélectionne une matière pour accéder aux examens officiels du MENFP.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {subjects.map((subject, index) => (
            <button 
              key={index}
              onClick={() => onSelectSubject(subject.name)}
              className="bg-white p-5 rounded-[2.2rem] shadow-card border border-white flex flex-col items-center justify-center gap-4 aspect-square active:scale-95 transition-all group hover:shadow-lg"
            >
              <div className={`${subject.color} size-14 flex items-center justify-center rounded-2xl shadow-inner transition-transform group-hover:rotate-6`}>
                <span className="material-symbols-outlined text-[32px]">{subject.icon}</span>
              </div>
              <span className="text-[#101518] font-black text-center text-[10px] uppercase tracking-tight leading-tight px-1">
                {subject.name}
              </span>
            </button>
          ))}
        </div>
        
        <div className="h-10 shrink-0"></div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 rounded-t-[2.5rem] shadow-strong z-50">
        <div className="flex justify-around items-center h-[76px] px-2 max-w-lg mx-auto">
          <button onClick={onGoToHome} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">Accueil</span>
          </button>
          <button className="flex flex-col items-center justify-center w-16 gap-1 text-primary">
            <div className="bg-primary/10 px-4 py-1.5 rounded-2xl">
              <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>library_books</span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">Examens</span>
          </button>
          <button onClick={onGoToQuiz} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400">
            <span className="material-symbols-outlined">quiz</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">Quiz</span>
          </button>
          <button onClick={onGoToProfile} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ExamsScreen;
