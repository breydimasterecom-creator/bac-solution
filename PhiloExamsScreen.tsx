
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface PhiloExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const PhiloExamsScreen: React.FC<PhiloExamsScreenProps> = ({ 
  onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite 
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "SMP/SVT: Modèle Texte (P1)", year: "2025", file: "Texte-Modele-Philosophie-SMP-SVT-2025-convert-1.jpg" },
    { title: "SMP/SVT: Modèle Texte (P2)", year: "2025", file: "Texte-Modele-Philosophie-SMP-SVT-2025-convert-2.jpg" },
    { title: "SMP/SVT: Session Ordinaire (P1)", year: "2024", file: "PHILOSOPHIE-2024-SMP-SVT-convert-1.jpg" },
    { title: "SMP/SVT: Session Ordinaire (P2)", year: "2024", file: "PHILOSOPHIE-2024-SMP-SVT-convert-2.jpg" },
    { title: "LLA/SES: Session Août", year: "2024", file: "Philosophie-Aout-2024-LLASES-convert-1.jpg" },
    { title: "LLA/SES: Hannah Arendt", year: "2022", file: "Philo_2022_LLA-SES_Arendt-convert-1.jpg" },
    { title: "LLA/SES: D'Alembert", year: "2022", file: "Philo_2022_LLA-SES_Dalembert-convert-1.jpg" },
    { title: "LLA/SES: Hobbes", year: "2022", file: "Philo_2022_LLA-SES_Hobbes-convert-1.jpg" },
    { title: "LLA/SES: Platon", year: "2022", file: "Philo_2022_LLA-SES_Platon-convert-1.jpg" },
    { title: "LLA/SES: Socrate", year: "2022", file: "Philo_2022_LLA-SES_Socrate-1-convert-1.jpg" },
    { title: "LLA/SES: Spinoza (P1)", year: "2022", file: "Philo_2022_LLA-SES_Spinoza-1-convert-1.jpg" },
    { title: "LLA/SES: Spinoza (P2)", year: "2022", file: "Philo_2022_LLA-SES_Spinoza-convert-1.jpg" },
    { title: "LLA: Anthropologie (P1)", year: "2022", file: "Philo_2022_LLA_Anthropogie-convert-1.jpg" },
    { title: "LLA: Anthropologie (P2)", year: "2022", file: "Philo_2022_LLA_Anthropogie-convert-2.jpg" },
    { title: "LLA: Apologie (P1)", year: "2022", file: "Philo_2022_LLA_Apologie-convert-1.jpg" },
    { title: "LLA: Apologie (P2)", year: "2022", file: "Philo_2022_LLA_Apologie-convert-2.jpg" },
    { title: "LLA: Esthétique (P1)", year: "2022", file: "Philo_2022_LLA_Esthetique-convert-1.jpg" },
    { title: "LLA: Esthétique (P2)", year: "2022", file: "Philo_2022_LLA_Esthetique-convert-2.jpg" },
    { title: "LLA: Intangible (P1)", year: "2022", file: "Philo_2022_LLA_Intangible-convert-1.jpg" },
    { title: "LLA: Intangible (P2)", year: "2022", file: "Philo_2022_LLA_Intangible-convert-2.jpg" },
    { title: "SES/SVT: Culture (P1)", year: "2022", file: "Philo_2022_SES-SVT-SMP_Culture-1-convert-1.jpg" },
    { title: "SES/SVT: Culture (P2)", year: "2022", file: "Philo_2022_SES-SVT-SMP_Culture-1-convert-2.jpg" },
    { title: "SES/SVT: Epistémologie (P1)", year: "2022", file: "Philo_2022_SES-SVT-SMP_Epistemologie-2-convert-1.jpg" },
    { title: "SES/SVT: Epistémologie (P2)", year: "2022", file: "Philo_2022_SES-SVT-SMP_Epistemologie-2-convert-2.jpg" },
    { title: "SES/SVT: Ethique (P1)", year: "2022", file: "Philo_2022_SES-SVT-SMP_Ethique-1-convert-1.jpg" },
    { title: "SES/SVT: Ethique (P2)", year: "2022", file: "Philo_2022_SES-SVT-SMP_Ethique-1-convert-2.jpg" },
    { title: "SES/SVT: Logique (P1)", year: "2022", file: "Philo_2022_SES-SVT-SMP_Logique-1-convert-1.jpg" },
    { title: "SES/SVT: Logique (P2)", year: "2022", file: "Philo_2022_SES-SVT-SMP_Logique-1-convert-2.jpg" },
    { title: "SES/SVT: Nature (P1)", year: "2022", file: "Philo_2022_SES_SVT-SMP_Nature-1-convert-1.jpg" },
    { title: "SES/SVT: Nature (P2)", year: "2022", file: "Philo_2022_SES_SVT-SMP_Nature-1-convert-2.jpg" },
    { title: "SMP/SVT: Descartes", year: "2022", file: "Philo_2022_SMP-SVT_Descartes-1-convert-1.jpg" },
    { title: "SMP/SVT: Kant", year: "2022", file: "Philo_2022_SMP-SVT_Kant-1-convert-1.jpg" },
    { title: "SMP/SVT: Marx", year: "2022", file: "Philo_2022_SMP-SVT_Marx-1-convert-1.jpg" },
    { title: "SMP/SVT: Montesquieu", year: "2022", file: "Philo_2022_SMP-SVT_Montesquieu-1-convert-1.jpg" },
    { title: "SMP/SVT: Rousseau (P1)", year: "2022", file: "Philo_2022_SMP-SVT_Rousseau-2-convert-1.jpg" },
    { title: "SMP/SVT: Rousseau (P2)", year: "2022", file: "Philo_2022_SMP-SVT_Rousseau-convert-1.jpg" },
    { title: "SMP/SVT: Voltaire (V1)", year: "2022", file: "Philo_2022_SMP-SVT_Voltaire-1-convert-1.jpg" },
    { title: "SMP/SVT: Voltaire (V2)", year: "2022", file: "Philo_2022_SMP-SVT_Voltaire_B-1-convert-1.jpg" },
    { title: "LLA: Arcade", year: "2021", file: "Philo_2021_LLA_Arcade-convert-1.jpg" },
    { title: "LLA: Canadair", year: "2021", file: "Philo_2021_LLA_Canadair-convert-1.jpg" },
    { title: "SVT/SMP/SES: Arbrisseau", year: "2021", file: "Philo_2021_SVT-SMP-SES_Arbrisseau-convert-1.jpg" },
    { title: "SVT/SMP/SES: Carlingue (P1)", year: "2021", file: "Philo_2021_SVT-SMP-SES_Carlingue-convert-1.jpg" },
    { title: "SVT/SMP/SES: Carlingue (P2)", year: "2021", file: "Philo_2021_SVT-SMP-SES_Carlingue-convert-2.jpg" },
    { title: "SES/SVT: Métaphysique", year: "2020", file: "Philo_2020_SES-SVT-SMP_Metaphysique-convert-1.jpg" },
    { title: "LLA: Articulation", year: "2019", file: "Philo_2019_LLA_Articulation-convert-1.jpg" },
    { title: "LLA: Connaissance", year: "2019", file: "Philo_2019_LLA_Connaissance-convert-1.jpg" },
    { title: "LLA: Objectif", year: "2019", file: "Philo_2019_LLA_Objectif-convert-1.jpg" },
    { title: "SES/SVT: Humanité", year: "2019", file: "Philo_2019_SES-SVT-SMP_Humanite-convert-1.jpg" },
    { title: "SES/SVT: Progressif", year: "2019", file: "Philo_2019_SES-SVT-SMP_Progressif-convert-1.jpg" },
    { title: "LLA: Religion", year: "2018", file: "Philo_2018_LLA_Religion-convert-1.jpg" },
    { title: "SES/SVT: Anthithèse", year: "2018", file: "Philo_2018_SES-SVT-SMP_Anthithese-convert-1.jpg" },
    { title: "Philanthrope (P1)", year: "2016", file: "Philo_2016_Philanthrope-convert-1.jpg" },
    { title: "Philanthrope (P2)", year: "2016", file: "Philo_2016_Philanthrope-convert-2.jpg" },
    { title: "Philatéliste (P1)", year: "2016", file: "Philo_2016_Philateliste-convert-1.jpg" },
    { title: "Philatéliste (P2)", year: "2016", file: "Philo_2016_Philateliste-convert-2.jpg" },
    { title: "Philein", year: "2016", file: "Philo_2016_Philein-convert-1.jpg" },
    { title: "Philologue (P1)", year: "2016", file: "Philo_2016_Philologue-convert-1.jpg" },
    { title: "Philologue (P2)", year: "2016", file: "Philo_2016_Philologue-convert-2.jpg" },
    { title: "Pascal (P1)", year: "2015", file: "Philo_2015_Pascal-convert-1.jpg" },
    { title: "Pascal (P2)", year: "2015", file: "Philo_2015_Pascal-convert-2.jpg" },
    { title: "LLA/SES: Modèle", year: "Modèle", file: "Philosophie-modele-LLA-SES-convert-1.jpg" }
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
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Philosophie</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-red-500 shadow-sm appearance-none">
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
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${locked ? 'bg-slate-100 text-slate-400' : 'bg-red-50 text-red-600'}`}><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'psychology'}</span></div>
                  <div className="flex flex-col min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                      {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Philosophie')} className="h-12 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>{locked ? 'Débloquer' : 'Voir'}</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Philosophie', fileName: exam.file })} className={`h-12 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-red-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default PhiloExamsScreen;
