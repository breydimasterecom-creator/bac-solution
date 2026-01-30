
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface EnglishExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const EnglishExamsScreen: React.FC<EnglishExamsScreenProps> = ({ 
  onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite 
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "Anglais Officiel (P1)", year: "2025", file: "Anglais-2025-convert-1.jpg" },
    { title: "Anglais Officiel (P2)", year: "2025", file: "Anglais-2025-convert-2.jpg" },
    { title: "State (SVT/SES/SMP)", year: "2024", file: "Anglais-2024-SVT-SES-SMP-State-convert-1.jpg" },
    { title: "Modèle SES/SVT/SMP (P1)", year: "Modèle", file: "Anglais-modele-SES_SVT_SMP--convert-1.jpg" },
    { title: "Modèle SES/SVT/SMP (P2)", year: "Modèle", file: "Anglais-modele-SES_SVT_SMP--convert-2.jpg" },
    { title: "LLA: Catfish (P1)", year: "2019", file: "Anglais_2019_LLA_Catfish-convert-1.jpg" },
    { title: "LLA: Catfish (P2)", year: "2019", file: "Anglais_2019_LLA_Catfish-convert-2.jpg" },
    { title: "LLA: Declaim (P1)", year: "2019", file: "Anglais_2019_LLA_Declaim-convert-1.jpg" },
    { title: "LLA: Declaim (P2)", year: "2019", file: "Anglais_2019_LLA_Declaim-convert-2.jpg" },
    { title: "SES/SVT: Emulation (P1)", year: "2019", file: "Anglais_2019_SES-SVT-SMO_Emulation-convert-1.jpg" },
    { title: "SES/SVT: Emulation (P2)", year: "2019", file: "Anglais_2019_SES-SVT-SMO_Emulation-convert-2.jpg" },
    { title: "SES/SVT: Country (P1)", year: "2019", file: "Anglais_2019_SES-SVT-SMP_Country-convert-1.jpg" },
    { title: "SES/SVT: Country (P2)", year: "2019", file: "Anglais_2019_SES-SVT-SMP_Country-convert-2.jpg" },
    { title: "SES/SVT: Doleful (P1)", year: "2019", file: "Anglais_2019_SES-SVT-SMP_Doleful-convert-1.jpg" },
    { title: "SES/SVT: Doleful (P2)", year: "2019", file: "Anglais_2019_SES-SVT-SMP_Doleful-convert-2.jpg" },
    { title: "LLA: Business (P1)", year: "2020", file: "Anglais_2020_LLA_Business-convert-1.jpg" },
    { title: "LLA: Business (P2)", year: "2020", file: "Anglais_2020_LLA_Business-convert-2.jpg" },
    { title: "LLA: Currently (P1)", year: "2020", file: "Anglais_2020_LLA_Currently-convert-1.jpg" },
    { title: "LLA: Currently (P2)", year: "2020", file: "Anglais_2020_LLA_Currently-convert-2.jpg" },
    { title: "LLA: Financial (P1)", year: "2020", file: "Anglais_2020_LLA_Finalcial-convert-1.jpg" },
    { title: "LLA: Financial (P2)", year: "2020", file: "Anglais_2020_LLA_Finalcial-convert-2.jpg" },
    { title: "SES/SVT: Investment (P1)", year: "2020", file: "Anglais_2020_SES-SVT-SMP_Investement-convert-1.jpg" },
    { title: "SES/SVT: Investment (P2)", year: "2020", file: "Anglais_2020_SES-SVT-SMP_Investement-convert-2.jpg" },
    { title: "LLA: Atlanta (P1)", year: "2022", file: "Anglais_2022_LLA_Atlanta-convert-1.jpg" },
    { title: "LLA: Atlanta (P2)", year: "2022", file: "Anglais_2022_LLA_Atlanta-convert-2.jpg" },
    { title: "LLA: Dallas (P1)", year: "2022", file: "Anglais_2022_LLA_Dallas-convert-1.jpg" },
    { title: "LLA: Dallas (P2)", year: "2022", file: "Anglais_2022_LLA_Dallas-convert-2.jpg" },
    { title: "LLA: Detroit (P1)", year: "2022", file: "Anglais_2022_LLA_Detroit-convert-1.jpg" },
    { title: "LLA: Detroit (P2)", year: "2022", file: "Anglais_2022_LLA_Detroit-convert-2.jpg" },
    { title: "LLA: Honolulu (P1)", year: "2022", file: "Anglais_2022_LLA_Honolulu-convert-1.jpg" },
    { title: "LLA: Honolulu (P2)", year: "2022", file: "Anglais_2022_LLA_Honolulu-convert-2.jpg" },
    { title: "LLA: Portland (P1)", year: "2022", file: "Anglais_2022_LLA_Portland-convert-1.jpg" },
    { title: "LLA: Portland (P2)", year: "2022", file: "Anglais_2022_LLA_Portland-convert-2.jpg" },
    { title: "SES/SMP: Cleveland (P1)", year: "2022", file: "Anglais_2022_SES-SMP-SVT_Cleveland-convert-1.jpg" },
    { title: "SES/SMP: Cleveland (P2)", year: "2022", file: "Anglais_2022_SES-SMP-SVT_Cleveland-convert-2.jpg" },
    { title: "SES/SMP: Indianapolis (P1)", year: "2022", file: "Anglais_2022_SES-SMP-SVT_Indianapolis-convert-1.jpg" },
    { title: "SES/SMP: Indianapolis (P2)", year: "2022", file: "Anglais_2022_SES-SMP-SVT_Indianapolis-convert-2.jpg" },
    { title: "SES/SMP: Jacksonville (P1)", year: "2022", file: "Anglais_2022_SES-SMP-SVT_Jacksonville-convert-1.jpg" },
    { title: "SES/SMP: Jacksonville (P2)", year: "2022", file: "Anglais_2022_SES-SMP-SVT_Jacksonville-convert-2.jpg" },
    { title: "SES/SMP: Kansas-city (P1)", year: "2022", file: "Anglais_2022_SES-SMP-SVT_Kansas-city-convert-1.jpg" },
    { title: "SES/SMP: Kansas-city (P2)", year: "2022", file: "Anglais_2022_SES-SMP-SVT_Kansas-city-convert-2.jpg" },
    { title: "SES/SMP: Tucson (P1)", year: "2022", file: "Anglais_2022_SES-SMP-SVT_Tucson-convert-1.jpg" },
    { title: "SES/SMP: Tucson (P2)", year: "2022", file: "Anglais_2022_SES-SMP-SVT_Tucson-convert-2.jpg" },
    { title: "Recueil Philo 2007-2012 (P1)", year: "Archives", file: "Anglais_Philo_2007-2009-2011-2012-convert-1.jpg" },
    { title: "Recueil Philo 2007-2012 (P2)", year: "Archives", file: "Anglais_Philo_2007-2009-2011-2012-convert-2.jpg" },
    { title: "Recueil Philo 2007-2012 (P3)", year: "Archives", file: "Anglais_Philo_2007-2009-2011-2012-convert-3.jpg" },
    { title: "Recueil NS4 2015-2018 (P1)", year: "Archives", file: "Anglais-NS4-201520162018-convert-1.jpg" },
    { title: "Recueil NS4 2015-2018 (P2)", year: "Archives", file: "Anglais-NS4-201520162018-convert-2.jpg" },
    { title: "Recueil NS4 2015-2018 (P3)", year: "Archives", file: "Anglais-NS4-201520162018-convert-3.jpg" }
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
    return index >= 5;
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-[#F4F7F9] overflow-hidden font-display text-left">
      <header className="flex flex-col bg-[#E8EFF5] sticky top-0 z-40 shadow-sm border-b border-gray-100 shrink-0">
        <div className="flex items-center justify-between w-full p-4 pb-1">
          <button onClick={onBack} className="text-[#101518] flex size-10 shrink-0 items-center justify-center rounded-full active:scale-95 transition-transform"><span className="material-symbols-outlined text-[24px]">arrow_back</span></button>
          <div className="flex flex-col flex-1 text-center pr-10">
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Anglais</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-purple-500 shadow-sm appearance-none">
            {years.map(year => <option key={year} value={year}>{year === 'Tous' ? 'Toutes les sessions' : `Session ${year}`}</option>)}
          </select>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto hide-scrollbar bg-gradient-to-b from-[#F4F7F9] to-[#E8EFF5] pb-32">
        <div className="flex flex-col gap-4">
          {filteredExams.map((exam, index) => {
            const locked = isLocked(index);
            const isFav = favorites.includes(exam.title);
            return (
              <div key={`${exam.file}-${index}`} className={`bg-white rounded-[24px] p-5 shadow-soft border border-white flex flex-col gap-5 transition-all relative ${locked ? 'opacity-80' : 'active:scale-[0.99]'}`}>
                <button onClick={() => onToggleFavorite(exam.title)} className={`absolute top-4 right-4 size-10 rounded-full flex items-center justify-center transition-all ${isFav ? 'text-yellow-400 scale-110' : 'text-slate-300'}`}><span className="material-symbols-outlined text-[26px]" style={isFav ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span></button>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-inner"><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'language'}</span></div>
                  <div className="flex flex-col min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                       <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                       {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Anglais')} className="h-12 rounded-xl bg-purple-50 text-purple-700 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-purple-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>Voir</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Anglais', fileName: exam.file })} className={`h-12 rounded-xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default EnglishExamsScreen;
