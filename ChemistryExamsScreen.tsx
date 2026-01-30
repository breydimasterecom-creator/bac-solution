
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface ChemistryExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const ChemistryExamsScreen: React.FC<ChemistryExamsScreenProps> = ({ onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite }) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "Chimie Officiel", year: "2025", file: "Chimie-2025-convert-1.jpg" },
    { title: "SES: Chimie 2023 (P1)", year: "2023", file: "Chimie-2023-SES-convert-1.jpg" },
    { title: "SES: Chimie 2023 (P2)", year: "2023", file: "Chimie-2023-SES-convert-2.jpg" },
    { title: "SMP/SVT: Covalente (P1)", year: "2023", file: "Chimie-2023-SMP-SVT-covalente-convert-1.jpg" },
    { title: "SMP/SVT: Covalente (P2)", year: "2023", file: "Chimie-2023-SMP-SVT-covalente-convert-2.jpg" },
    { title: "SMP/SVT: Hydron", year: "2023", file: "Chimie-2023-SMP-SVT-hydron-convert-1.jpg" },
    { title: "LLA: Cobalt SR (P1)", year: "2022", file: "Chimie_2022_LLA_Cobalt-SR-convert-1.jpg" },
    { title: "LLA: Cobalt SR (P2)", year: "2022", file: "Chimie_2022_LLA_Cobalt-SR-convert-2.jpg" },
    { title: "LLA: Covalentes SR", year: "2022", file: "Chimie_2022_LLA_Covalentes-SR-convert-1.jpg" },
    { title: "LLA: Organomécanique (P1)", year: "2022", file: "Chimie_2022_LLA_Organomecanique-convert-1.jpg" },
    { title: "LLA: Organomécanique (P2)", year: "2022", file: "Chimie_2022_LLA_Organomecanique-convert-2.jpg" },
    { title: "SES: Brome (P1)", year: "2022", file: "Chimie_2022_SES_Brome-convert-1.jpg" },
    { title: "SES: Brome (P2)", year: "2022", file: "Chimie_2022_SES_Brome-convert-2.jpg" },
    { title: "SES: Hydrocarbures (P1)", year: "2022", file: "Chimie_2022_SES_Hydrocarbures-convert-1.jpg" },
    { title: "SES: Hydrocarbures (P2)", year: "2022", file: "Chimie_2022_SES_Hydrocarbures-convert-2.jpg" },
    { title: "SES: Inorganique", year: "2022", file: "Chimie_2022_SES_Inorganique-convert-1(1).jpg" },
    { title: "SES: Métabolisme (P1)", year: "2022", file: "Chimie_2022_SES_Metabolisme-convert-1.jpg" },
    { title: "SES: Métabolisme (P2)", year: "2022", file: "Chimie_2022_SES_Metabolisme-convert-2.jpg" },
    { title: "SES: Polypeptidiques", year: "2022", file: "Chimie_2022_SES_Polypeptidiques-convert-1(1).jpg" },
    { title: "SES: Quinine (P1)", year: "2022", file: "Chimie_2022_SES_Quinine-convert-1.jpg" },
    { title: "SES: Quinine (P2)", year: "2022", file: "Chimie_2022_SES_Quinine-convert-2.jpg" },
    { title: "SMP/SVT: Alcool SR (P1)", year: "2022", file: "Chimie_2022_SMP-SVT_Alcool-SR-convert-1.jpg" },
    { title: "SMP/SVT: Alcool SR (P2)", year: "2022", file: "Chimie_2022_SMP-SVT_Alcool-SR-convert-2.jpg" },
    { title: "SMP/SVT: Altman (P1)", year: "2022", file: "Chimie_2022_SMP-SVT_Altman-convert-1.jpg" },
    { title: "SMP/SVT: Altman (P2)", year: "2022", file: "Chimie_2022_SMP-SVT_Altman-convert-2.jpg" },
    { title: "SMP/SVT: Atome SR (P1)", year: "2022", file: "Chimie_2022_SMP-SVT_Atome-SR-convert-1.jpg" },
    { title: "SMP/SVT: Atome SR (P2)", year: "2022", file: "Chimie_2022_SMP-SVT_Atome-SR-convert-2.jpg" },
    { title: "SMP/SVT: Balandine", year: "2022", file: "Chimie_2022_SMP-SVT_Balandine-convert-1.jpg" },
    { title: "SMP/SVT: Ion SR (P1)", year: "2022", file: "Chimie_2022_SMP-SVT_Ion-SR-convert-1.jpg" },
    { title: "SMP/SVT: Ion SR (P2)", year: "2022", file: "Chimie_2022_SMP-SVT_Ion-SR-convert-2.jpg" },
    { title: "SMP/SVT: Liaison SR (P1)", year: "2022", file: "Chimie_2022_SMP-SVT_Liaison-SR-convert-1.jpg" },
    { title: "SMP/SVT: Liaison SR (P2)", year: "2022", file: "Chimie_2022_SMP-SVT_Liaison-SR-convert-2.jpg" },
    { title: "SMP/SVT: Welsbach (P1)", year: "2022", file: "Chimie_2022_SMP-SVT_Welsbach-convert-1.jpg" },
    { title: "SMP/SVT: Welsbach (P2)", year: "2022", file: "Chimie_2022_SMP-SVT_Welsbach-convert-2.jpg" },
    { title: "NS4 2021 (P1)", year: "2021", file: "Chimie NS4 2021-convert-1.jpg" },
    { title: "NS4 2021 (P2)", year: "2021", file: "Chimie NS4 2021-convert-2.jpg" },
    { title: "Méthane 2021", year: "2021", file: "Chimie-2021-METHANE-convert-1.jpg" },
    { title: "SES/LLA: Géotextile", year: "2021", file: "Chimie_2021_SES-LLA_Geotextile-convert-1.jpg" },
    { title: "SVT/SMP: Acétique", year: "2021", file: "Chimie_2021_SVT-SMP_Acetique-convert-1.jpg" },
    { title: "SVT/SMP: Fondation", year: "2021", file: "Chimie_2021_SVT-SMP_Fondation-convert-1.jpg" },
    { title: "LLA: Dioxyde", year: "2020", file: "Chimie_2020_LLA_Dioxyde-convert-1.jpg" },
    { title: "LLA: Isomère", year: "2020", file: "Chimie_2020_LLA_Isomere-convert-1.jpg" },
    { title: "SES: Carbure", year: "2020", file: "Chimie_2020_SES_Carbure-convert-1.jpg" },
    { title: "SES: Molaire 2020", year: "2020", file: "Chimie_2020_SES_Molaire-convert-1.jpg" },
    { title: "SVT/SMP: Sodium", year: "2020", file: "Chimie_2020_SVT-SMP_Sodium-convert-1.jpg" },
    { title: "LLA: Glucose", year: "2019", file: "Chimie_2019_LLA_Glucose-convert-1.jpg" },
    { title: "SES: Alcool", year: "2019", file: "Chimie_2019_SES_Alcool-convert-1.jpg" },
    { title: "SES: Amidon", year: "2019", file: "Chimie_2019_SES_Amidon-convert-1.jpg" },
    { title: "SVT/SMP: Propène", year: "2019", file: "Chimie_2019_SVT-SMP_Propene-convert-1.jpg" },
    { title: "SES: Aldéhyde", year: "2018", file: "Chimie_2018_SES_Aldehyde-convert-1.jpg" },
    { title: "Recueil Bacc 2015-2018 (P1)", year: "Archives", file: "Chimie-Bac-2015-2018-Bacc-convert-1.jpg" },
    { title: "Recueil Bacc 2015-2018 (P2)", year: "Archives", file: "Chimie-Bac-2015-2018-Bacc-convert-2.jpg" },
    { title: "Polyamide", year: "2016", file: "Chimie_2016_Polyamide-convert-1.jpg" },
    { title: "Polymorphe (P1)", year: "2016", file: "Chimie_2016_Polymorphe-convert-1.jpg" },
    { title: "Polymorphe (P2)", year: "2016", file: "Chimie_2016_Polymorphe-convert-2.jpg" },
    { title: "Oxydation (P1)", year: "2015", file: "Chimie_2015_Oxydation-convert-1.jpg" },
    { title: "Oxydation (P2)", year: "2015", file: "Chimie_2015_Oxydation-convert-2.jpg" },
    { title: "SES: Modèle", year: "Modèle", file: "Chimie-modele-SES-convert-1.jpg" },
    { title: "SVT/SMP: Modèle", year: "Modèle", file: "Chimie-modele-SVT-SMP-convert-1.jpg" }
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
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Chimie</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500 shadow-sm appearance-none">
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
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${locked ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600'}`}><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'science'}</span></div>
                  <div className="flex-1 min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                      {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Chimie')} className="h-12 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>{locked ? 'Débloquer' : 'Voir'}</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Chimie', fileName: exam.file })} className={`h-12 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ChemistryExamsScreen;
