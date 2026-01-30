
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface EconomyExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const EconomyExamsScreen: React.FC<EconomyExamsScreenProps> = ({ onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite }) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "SES: Aglietta", year: "2022", file: "Economie_2022_SES_Aglietta-convert-1.jpg" },
    { title: "SES: Bastiat", year: "2022", file: "Economie_2022_SES_Bastiat-convert-1.jpg" },
    { title: "SES: Becker (V1)", year: "2022", file: "Economie_2022_SES_Becker-2-convert-1.jpg" },
    { title: "SES: Becker (V2)", year: "2022", file: "Economie_2022_SES_Becker-convert-1.jpg" },
    { title: "SES: Boltanski", year: "2022", file: "Economie_2022_SES_Boltanski-convert-1.jpg" },
    { title: "SES: Braudel", year: "2022", file: "Economie_2022_SES_Braudel-convert-1.jpg" },
    { title: "SES: Budget", year: "2022", file: "Economie_2022_SES_Budget-convert-1.jpg" },
    { title: "SES: Coase", year: "2022", file: "Economie_2022_SES_Coase-convert-1.jpg" },
    { title: "SES: Cohen", year: "2022", file: "Economie_2022_SES_Cohen-convert-1.jpg" },
    { title: "SES: Croissance 2022", year: "2022", file: "Economie_2022_SES_Croissance-convert-1.jpg" },
    { title: "SES: Debreu", year: "2022", file: "Economie_2022_SES_Debreu-convert-1.jpg" },
    { title: "SES: Favereau", year: "2022", file: "Economie_2022_SES_Favereau-convert-1.jpg" },
    { title: "SES: Hotelling", year: "2022", file: "Economie_2022_SES_Hotelling-convert-1.jpg" },
    { title: "SES: Inflation", year: "2022", file: "Economie_2022_SES_Inflation-convert-1.jpg" },
    { title: "SES: Investissement", year: "2022", file: "Economie_2022_SES_Investissement-convert-1.jpg" },
    { title: "SES: Kenen", year: "2022", file: "Economie_2022_SES_Kenen-convert-1.jpg" },
    { title: "SES: Keynes", year: "2022", file: "Economie_2022_SES_Keynes-convert-1.jpg" },
    { title: "SES: Lucas", year: "2022", file: "Economie_2022_SES_Lucas-convert-1.jpg" },
    { title: "SES: Mandeville", year: "2022", file: "Economie_2022_SES_Mandeville-convert-1.jpg" },
    { title: "SES: Ménage 2022", year: "2022", file: "Economie_2022_SES_Menage-convert-1.jpg" },
    { title: "SES: Mercantilisme", year: "2022", file: "Economie_2022_SES_Mercantilisme-convert-1.jpg" },
    { title: "SES: Mitchell", year: "2022", file: "Economie_2022_SES_Mitchell-convert-1.jpg" },
    { title: "SES: Rostov", year: "2022", file: "Economie_2022_SES_Rostov-convert-1.jpg" },
    { title: "SES: Épargne (V1)", year: "2021", file: "Economie_2021_SES_Epargne-convert-1(1).jpg" },
    { title: "SES: Épargne (V2)", year: "2021", file: "Economie_2021_SES_Epargne-convert-1.jpg" },
    { title: "SES: Ménage 2021", year: "2021", file: "Economie_2021_SES_Menage-convert-1.jpg" },
    { title: "SES: Recette", year: "2021", file: "Economie_2021_SES_Recette-convert-1.jpg" },
    { title: "SES: Croissance 2019", year: "2019", file: "Economie_2019_SES_Croissance-convert-1.jpg" },
    { title: "SES: Élasticité", year: "2019", file: "Economie_2019_SES_Elasticite-convert-1.jpg" },
    { title: "SES: Ménage (V1)", year: "2019", file: "Economie_2019_SES_Menage-convert-1(1).jpg" },
    { title: "SES: Ménage (V2)", year: "2019", file: "Economie_2019_SES_Menage-convert-1.jpg" },
    { title: "SES: Monnaie (V1)", year: "2019", file: "Economie_2019_SES_Monnaie-convert-1(1).jpg" },
    { title: "SES: Monnaie (V2)", year: "2019", file: "Economie_2019_SES_Monnaie-convert-1.jpg" },
    { title: "SES: Ménage 2018", year: "2018", file: "Economie_2018_SES_Menage-convert-1.jpg" },
    { title: "SMP: Marginal", year: "2018", file: "Economie_2018_SMP_Marginal-convert-1.jpg" },
    { title: "Écologisme", year: "2016", file: "Economie_2016_Ecologisme-convert-1.jpg" },
    { title: "Économétrie", year: "2016", file: "Economie_2016_Econometrie-convert-1.jpg" },
    { title: "Écorner", year: "2016", file: "Economie_2016_Ecorner-convert-1.jpg" },
    { title: "Écouler", year: "2016", file: "Economie_2016_Ecouler-convert-1.jpg" },
    { title: "Écoutille", year: "2016", file: "Economie_2016_Ecoutille-convert-1.jpg" },
    { title: "Empinar", year: "2015", file: "Economie_2015_Empinar-convert-1.jpg" },
    { title: "Recueil NS4 (P1)", year: "Archives", file: "Economie-NS4-201320162018-convert-1.jpg" },
    { title: "Recueil NS4 (P2)", year: "Archives", file: "Economie-NS4-201320162018-convert-2.jpg" },
    { title: "Complémentaire (P1)", year: "Archives", file: "Economie-1-convert-1.jpg" },
    { title: "Complémentaire (P2)", year: "Archives", file: "Economie-1-convert-2.jpg" }
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
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Économie</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-600 shadow-sm appearance-none">
            {years.map(year => <option key={year} value={year}>{year === 'Tous' ? 'Toutes les archives' : `Session ${year}`}</option>)}
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
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${locked ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600'}`}><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'trending_up'}</span></div>
                  <div className="flex flex-col min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                      {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Économie')} className="h-12 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>{locked ? 'Débloquer' : 'Voir'}</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Économie', fileName: exam.file })} className={`h-12 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-red-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default EconomyExamsScreen;
