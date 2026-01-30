
import React from 'react';
import { ContextExam } from '../types';

interface SubjectExamsScreenProps {
  subject: string;
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  // Updated to include subject argument
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
}

const SubjectExamsScreen: React.FC<SubjectExamsScreenProps> = ({ subject, onBack }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light overflow-hidden font-display">
      <header className="flex flex-col bg-[#E8EFF5] sticky top-0 z-40 shadow-sm border-b border-white shrink-0">
        <div className="flex items-center justify-between w-full p-4 pb-1">
          <button onClick={onBack} className="text-text-main flex size-10 shrink-0 items-center justify-center rounded-full active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[28px] font-bold">chevron_left</span>
          </button>
          <div className="flex flex-col flex-1 text-center pr-10 min-w-0">
            <h2 className="text-text-main text-lg font-black uppercase tracking-tight truncate">{subject}</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Matière</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-30">
        <span className="material-symbols-outlined text-8xl font-light mb-4">topic</span>
        <p className="text-text-sub font-black uppercase tracking-widest text-xs">Aucun sujet pour {subject}</p>
      </main>
    </div>
  );
};

export default SubjectExamsScreen;
