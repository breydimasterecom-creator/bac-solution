
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface CreoleExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const CreoleExamsScreen: React.FC<CreoleExamsScreenProps> = ({ onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite }) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "Kreyòl Officiel", year: "2025", file: "6-kreyol-2025-convert-1.jpg" },
    { title: "SVT/SES/SMP: Modèle", year: "Modèle", file: "Kreyol-modele-SVT-SES-SMP-convert-1.jpg" },
    { title: "LLA: Konfyans (P1)", year: "2022", file: "Kreyol_2022_LLA_Konfyans-convert-1.jpg" },
    { title: "LLA: Konfyans (P2)", year: "2022", file: "Kreyol_2022_LLA_Konfyans-convert-2.jpg" },
    { title: "LLA: Patizan", year: "2022", file: "Kreyol_2022_LLA_Patizan-convert-1.jpg" },
    { title: "LLA: Pistach (P1)", year: "2022", file: "Kreyol_2022_LLA_Pistach-convert-1.jpg" },
    { title: "LLA: Pistach (P2)", year: "2022", file: "Kreyol_2022_LLA_Pistach-convert-2.jpg" },
    { title: "LLA: Tizon-dife (P1)", year: "2022", file: "Kreyol_2022_LLA_Tizon-dife-convert-1.jpg" },
    { title: "LLA: Tizon-dife (P2)", year: "2022", file: "Kreyol_2022_LLA_Tizon-dife-convert-2.jpg" },
    { title: "SES/SMP: Ayiti (P1)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Ayiti-convert-1.jpg" },
    { title: "SES/SMP: Ayiti (P2)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Ayiti-convert-2.jpg" },
    { title: "SES/SMP: Brase (P1)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Brase-convert-1.jpg" },
    { title: "SES/SMP: Brase (P2)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Brase-convert-2.jpg" },
    { title: "SES/SMP: Lakay (P1)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Lakay-convert-1.jpg" },
    { title: "SES/SMP: Lakay (P2)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Lakay-convert-2.jpg" },
    { title: "SES/SMP: Lakou", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Lakou-convert-1.jpg" },
    { title: "SES/SMP: Lodyanse (P1)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Lodyanse-convert-1.jpg" },
    { title: "SES/SMP: Lodyanse (P2)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Lodyanse-convert-2.jpg" },
    { title: "SES/SMP: Matomann (P1)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Matomann-convert-1.jpg" },
    { title: "SES/SMP: Matomann (P2)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Matomann-convert-2.jpg" },
    { title: "SES/SMP: Rabonnen (P1)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Rabonnen-convert-1.jpg" },
    { title: "SES/SMP: Rabonnen (P2)", year: "2022", file: "Kreyol_2022_SES-SMP-SVT_Rabonnen-convert-2.jpg" },
    { title: "SES/SVT: Matoman (P1)", year: "2022", file: "Kreyol_2022_SES-SVT-SMO_Matoman-1-convert-1.jpg" },
    { title: "SES/SVT: Matoman (P2)", year: "2022", file: "Kreyol_2022_SES-SVT-SMO_Matoman-1-convert-2.jpg" },
    { title: "SES/SVT: Matoman 2 (P1)", year: "2022", file: "Kreyol_2022_SES-SVT-SMO_Matoman-convert-1.jpg" },
    { title: "SES/SVT: Matoman 2 (P2)", year: "2022", file: "Kreyol_2022_SES-SVT-SMO_Matoman-convert-2.jpg" },
    { title: "SES/SVT: Tabatye (P1)", year: "2022", file: "Kreyol_2022_SES-SVT-SMO_Tabatye-convert-1.jpg" },
    { title: "SES/SVT: Tabatye (P2)", year: "2022", file: "Kreyol_2022_SES-SVT-SMO_Tabatye-convert-2.jpg" },
    { title: "SES/SVT: Krich (P1)", year: "2022", file: "Kreyol_2022_SES-SVT-SMPLLA_Krich-convert-1.jpg" },
    { title: "SES/SVT: Krich (P2)", year: "2022", file: "Kreyol_2022_SES-SVT-SMPLLA_Krich-convert-2.jpg" },
    { title: "SVT: Kotof (P1)", year: "2022", file: "Kreyol_2022_SVT_Kotof-convert-1.jpg" },
    { title: "SVT: Kotof (P2)", year: "2022", file: "Kreyol_2022_SVT_Kotof-convert-2.jpg" },
    { title: "SVT: Potorik (P1)", year: "2022", file: "Kreyol_2022_SVT_Potorik-convert-1.jpg" },
    { title: "SVT: Potorik (P2)", year: "2022", file: "Kreyol_2022_SVT_Potorik-convert-2.jpg" },
    { title: "LLA: Vwyaj", year: "2021", file: "Kreyol_2021_LLA_Vwyaj-convert-1.jpg" },
    { title: "SES/SMP/SVT: Pwoteje", year: "2021", file: "Kreyol_2021_SES-SMP-SVT_Pwoteje-convert-1.jpg" },
    { title: "SES/SMP/SVT: Respekte", year: "2021", file: "Kreyol_2021_SES-SMP-SVT_Respekte-convert-1.jpg" },
    { title: "SES/SVT/SMP: Antoloji", year: "2021", file: "Kreyol_2021_SES-SVT-SMP_Antoloji-convert-1.jpg" },
    { title: "SES/SVT/SMP: Travay", year: "2020", file: "Kreyol_2020_SES-SVT-SMP_Travay-convert-1.jpg" },
    { title: "LLA: Koresponn", year: "2019", file: "Kreyol_2019_LLA_Koresponn-convert-1.jpg" },
    { title: "LLA: Reflechi", year: "2019", file: "Kreyol_2019_LLA_Reflechi-convert-1.jpg" },
    { title: "LLA: Tetansanm", year: "2019", file: "Kreyol_2019_LLA_Tetansanm-convert-1.jpg" },
    { title: "SES/SVT/SMP: Lanati", year: "2019", file: "Kreyol_2019_SES-SVT-SMP_Lanati-convert-1.jpg" },
    { title: "LLA: Komanse (V1)", year: "2018", file: "Kreyol_2018_LLA_Komanse-1-convert-1.jpg" },
    { title: "LLA: Komanse (V2)", year: "2018", file: "Kreyol_2018_LLA_Komanse-convert-1.jpg" },
    { title: "SES/SVT/SMP: Pankat", year: "2018", file: "Kreyol_2018_SES-SVT-SMP_Pankat-convert-1.jpg" },
    { title: "Recueil NS4 (P1)", year: "Archives", file: "Kreyol-NS4-20162018-convert-1.jpg" },
    { title: "Recueil NS4 (P2)", year: "Archives", file: "Kreyol-NS4-20162018-convert-2.jpg" },
    { title: "Crêpier", year: "2016", file: "Kreyol_2016_Crepier-convert-1.jpg" },
    { title: "Crevette", year: "2016", file: "Kreyol_2016_Crevette-convert-1.jpg" },
    { title: "Crinoline", year: "2016", file: "Kreyol_2016_Crinoline-convert-1.jpg" },
    { title: "Crique (P1)", year: "2016", file: "Kreyol_2016_Crique-convert-1.jpg" },
    { title: "Crique (P2)", year: "2016", file: "Kreyol_2016_Crique-convert-2.jpg" }
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
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Kreyòl</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-orange-500 shadow-sm appearance-none">
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
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${locked ? 'bg-slate-100 text-slate-400' : 'bg-orange-50 text-orange-600'}`}><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'chat'}</span></div>
                  <div className="flex-1 min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                      {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Créole')} className="h-12 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>{locked ? 'Débloquer' : 'Voir'}</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Créole', fileName: exam.file })} className={`h-12 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-orange-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CreoleExamsScreen;
