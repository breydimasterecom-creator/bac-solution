
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface InfoExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const InfoExamsScreen: React.FC<InfoExamsScreenProps> = ({ 
  onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite 
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "LLA: Système (P1)", year: "2018", file: "Informatique_2018_LLA_Systeme-convert-1.jpg" },
    { title: "LLA: Système (P2)", year: "2018", file: "Informatique_2018_LLA_Systeme-convert-2.jpg" },
    { title: "SES/SMP: Algorithme (P1)", year: "2018", file: "Informatique_2018_SES-SMP_Algorithme-convert-1.jpg" },
    { title: "SES/SMP: Algorithme (P2)", year: "2018", file: "Informatique_2018_SES-SMP_Algorithme-convert-2.jpg" },
    { title: "Recueil NS4 2015-2018 (P1)", year: "Archives", file: "Informatiques-NS4-20152016-2018-convert-1.jpg" },
    { title: "Recueil NS4 2015-2018 (P2)", year: "Archives", file: "Informatiques-NS4-20152016-2018-convert-2.jpg" },
    { title: "Recueil NS4 2015-2018 (P3)", year: "Archives", file: "Informatiques-NS4-20152016-2018-convert-3.jpg" },
    { title: "Recueil NS4 2015-2018 (P4)", year: "Archives", file: "Informatiques-NS4-20152016-2018-convert-4.jpg" },
    { title: "Recueil NS4 2015-2018 (P5)", year: "Archives", file: "Informatiques-NS4-20152016-2018-convert-5.jpg" },
    { title: "Exode", year: "2016", file: "Informatique_2016_Exode-convert-1.jpg" },
    { title: "Isotron", year: "2016", file: "Informatique_2016_Isotron-convert-1.jpg" },
    { title: "Italique", year: "2016", file: "Informatique_2016_Italique-convert-1.jpg" },
    { title: "Item", year: "2016", file: "Informatique_2016_Item-convert-1.jpg" },
    { title: "Ivoire", year: "2016", file: "Informatique_2016_Ivoire-convert-1.jpg" },
    { title: "Sujet Officiel", year: "2015", file: "Informatique_2015_1-convert-1.jpg" }
  ], []);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(exams.map(e => e.year))).sort((a: string, b: string) => {
      if (a === 'Archives') return 1;
      if (b === 'Archives') return -1;
      return b.localeCompare(a);
    });
    return ['Tous', ...uniqueYears];
  }, [exams]);

  const filteredExams = useMemo(() => {
    if (selectedYear === 'Tous') return exams;
    return exams.filter(e => e.year === selectedYear);
  }, [exams, selectedYear]);

  const isLocked = (index: number) => {
    if (userStatus === 'PREMIUM') return false;
    return index >= 3; 
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-[#F4F7F9] overflow-hidden font-display text-left">
      <header className="flex flex-col bg-[#E8EFF5] sticky top-0 z-40 shadow-sm border-b border-gray-100 shrink-0">
        <div className="flex items-center justify-between w-full p-4 pb-1">
          <button onClick={onBack} className="text-[#101518] flex size-10 shrink-0 items-center justify-center rounded-full active:scale-95 transition-transform"><span className="material-symbols-outlined text-[24px]">arrow_back</span></button>
          <div className="flex flex-col flex-1 text-center pr-10">
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Informatique</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-sky-500 shadow-sm appearance-none">
            {years.map(year => <option key={year} value={year}>{year === 'Tous' ? 'Toutes les sessions' : `Session ${year}`}</option>)}
          </select>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar bg-gradient-to-b from-[#F4F7F9] to-[#E8EFF5] p-4 pb-32">
        <div className="flex flex-col gap-4">
          {filteredExams.map((exam, index) => {
            const locked = isLocked(index);
            const isFav = favorites.includes(exam.title);
            return (
              <div key={`${exam.file}-${index}`} className={`bg-white rounded-[24px] p-5 shadow-soft border border-white flex flex-col gap-5 transition-all relative ${locked ? 'opacity-80' : 'active:scale-[0.99]'}`}>
                <button onClick={() => onToggleFavorite(exam.title)} className={`absolute top-4 right-4 size-10 rounded-full flex items-center justify-center transition-all ${isFav ? 'text-yellow-400 scale-110' : 'text-slate-300'}`}><span className="material-symbols-outlined text-[26px]" style={isFav ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span></button>
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${locked ? 'bg-slate-100 text-slate-400' : 'bg-sky-50 text-sky-600'}`}><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'computer'}</span></div>
                  <div className="flex flex-col min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                       <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                       {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Informatique')} className="h-12 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>{locked ? 'Débloquer' : 'Voir'}</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Informatique', fileName: exam.file })} className={`h-12 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default InfoExamsScreen;
