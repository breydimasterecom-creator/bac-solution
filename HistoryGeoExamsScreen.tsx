
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface HistoryGeoExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const HistoryGeoExamsScreen: React.FC<HistoryGeoExamsScreenProps> = ({ onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite }) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "Hist/Géo Officiel", year: "2025", file: "1-Histoire-Geo-2025-convert-1.jpg" },
    { title: "SMP/SVT: Modèle", year: "Modèle", file: "Histoire-et-Geographie-modele-SMP-SVT-convert-1.jpg" },
    { title: "LLA/SES: Dessalines", year: "2022", file: "Hist-Geo_2022_LLA-SES_Dessalines-convert-1.jpg" },
    { title: "LLA/SES: Ferou", year: "2022", file: "Hist-Geo_2022_LLA-SES_Ferou-convert-1.jpg" },
    { title: "LLA/SES: Geodesie", year: "2022", file: "Hist-Geo_2022_LLA-SES_Geodesie-convert-1.jpg" },
    { title: "LLA/SES: Louis Gabart (P1)", year: "2022", file: "Hist-Geo_2022_LLA-SES_Louis-Gabart-convert-1.jpg" },
    { title: "LLA/SES: Louis Gabart (P2)", year: "2022", file: "Hist-Geo_2022_LLA-SES_Louis-Gabart-convert-2.jpg" },
    { title: "LLA/SES: Magloire Ambroise", year: "2022", file: "Hist-Geo_2022_LLA-SES_Magloire-Ambroise-convert-1.jpg" },
    { title: "LLA/SES: Magny", year: "2022", file: "Hist-Geo_2022_LLA-SES_Magny-convert-1.jpg" },
    { title: "LLA/SES: Marie-Jeanne", year: "2022", file: "Hist-Geo_2022_LLA-SES_Marie-Jeanne-convert-1.jpg" },
    { title: "LLA/SES: Paul Romain", year: "2022", file: "Hist-Geo_2022_LLA-SES_Paul-Romain-convert-1.jpg" },
    { title: "LLA/SES: Pierrot (P1)", year: "2022", file: "Hist-Geo_2022_LLA-SES_Pierrot-convert-1.jpg" },
    { title: "LLA/SES: Pierrot (P2)", year: "2022", file: "Hist-Geo_2022_LLA-SES_Pierrot-convert-2.jpg" },
    { title: "LLA/SES: Sténio Vincent", year: "2022", file: "Hist-Geo_2022_LLA-SES_Stenio-Vincent-convert-1(1).jpg" },
    { title: "LLA/SES: Yayou", year: "2022", file: "Hist-Geo_2022_LLA-SES_Yayou-convert-1(1).jpg" },
    { title: "LLS/SES: Suzanne Louverture", year: "2022", file: "Hist-Geo_2022_LLS-SES_Suzanne-Louverture-convert-1.jpg" },
    { title: "SMP/SVT: Boisrond-Tonnerre", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Boisrond-Tonnerre-convert-1(1).jpg" },
    { title: "SMP/SVT: Boukman", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Boukman-convert-1(1).jpg" },
    { title: "SMP/SVT: Cange (P1)", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Cange-convert-1(1).jpg" },
    { title: "SMP/SVT: Cange (P2)", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Cange_b-convert-1(1).jpg" },
    { title: "SMP/SVT: Charéron", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Chareron-convert-1(1).jpg" },
    { title: "SMP/SVT: Dahomey", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Dahomey-convert-1(1).jpg" },
    { title: "SMP/SVT: Dérenancourt", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Derenancourt-convert-1(1).jpg" },
    { title: "SMP/SVT: Macajoux", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Macajoux-convert-1(1).jpg" },
    { title: "SMP/SVT: Océanographie", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Oceanographie-convert-1.jpg" },
    { title: "SMP/SVT: Révolution", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Revolution-convert-1.jpg" },
    { title: "SMP/SVT: Sanite Bel-Air", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Sanite-Bel-Air-convert-1.jpg" },
    { title: "SMP/SVT: Sans-Soucis", year: "2022", file: "Hist-Geo_2022_SMP-SVT_Sans-Soucis-convert-1.jpg" },
    { title: "SES/LLA: Échographiée (P1)", year: "2021", file: "Hist-Geo_2021_SES-LLA_Echographiee-1-convert-1.jpg" },
    { title: "SES/LLA: Échographiée (P2)", year: "2021", file: "Hist-Geo_2021_SES-LLA_Echographiee-convert-1.jpg" },
    { title: "SES/LLA: Edaphique (P1)", year: "2021", file: "Hist-Geo_2021_SES-LLA_Edaphique-convert-1.jpg" },
    { title: "SES/LLA: Edaphique (P2)", year: "2021", file: "Hist-Geo_2021_SES-LLA_Edaphique-convert-2.jpg" },
    { title: "SVT/SMP: Contagion", year: "2021", file: "Hist-Geo_2021_SVT-SMP_Contagion-convert-1.jpg" },
    { title: "SVT/SMP: Continent 2021", year: "2021", file: "Hist-Geo_2021_SVT-SMP_Continent-convert-1.jpg" },
    { title: "Tous: Développement (V1)", year: "2021", file: "Hist-Geo_2021_Tous_Developpement (1)-convert-1.jpg" },
    { title: "Tous: Développement (V2)", year: "2021", file: "Hist-Geo_2021_tous_Developpement-convert-1.jpg" },
    { title: "Tous: Agraire", year: "2020", file: "Hist-Geo_2020_Tous_Agraire-convert-1.jpg" },
    { title: "LLA/SVT/SMO: Développement", year: "2019", file: "Hist-Geo_2019_LLA-SVT-SMO_Developpement-convert-1.jpg" },
    { title: "LLA/SVT/SMP: Continent", year: "2019", file: "Hist-Geo_2019_LLA-SVT-SMP_Continent-convert-1.jpg" },
    { title: "LLA/SVT/SMP: Croissance", year: "2019", file: "Hist-Geo_2019_LLA-SVT-SMP_Croissance-convert-1.jpg" },
    { title: "SES: Accroissement", year: "2019", file: "Hist-Geo_2019_SES_Accroissement-convert-1.jpg" },
    { title: "SES: Capital", year: "2019", file: "Hist-Geo_2019_SES_Capital-convert-1.jpg" },
    { title: "LLA/SVT/SMP: Population", year: "2018", file: "Hist-Geo_2018_LLA-SVT-SMP_Population-convert-1.jpg" },
    { title: "SES: Économie", year: "2018", file: "Hist-Geo_2018_SES_Economie-convert-1.jpg" },
    { title: "Recueil NS4 2014-2018 (P1)", year: "Archives", file: "Histoire-Geographie-NS4-201420162018-convert-1.jpg" },
    { title: "Recueil NS4 2014-2018 (P2)", year: "Archives", file: "Histoire-Geographie-NS4-201420162018-convert-2.jpg" },
    { title: "Recueil NS4 2014-2018 (P3)", year: "Archives", file: "Histoire-Geographie-NS4-201420162018-convert-3.jpg" },
    { title: "Recueil NS4 2014-2018 (P4)", year: "Archives", file: "Histoire-Geographie-NS4-201420162018-convert-4.jpg" },
    { title: "Recueil Bacc 2014-2018 (P1)", year: "Archives", file: "Histore-Geo-2014-2018-Bacc-convert-1.jpg" },
    { title: "Recueil Bacc 2014-2018 (P2)", year: "Archives", file: "Histore-Geo-2014-2018-Bacc-convert-2.jpg" },
    { title: "Session Août (P1)", year: "2016", file: "Hist-Geo_2016_aout-convert-1.jpg" },
    { title: "Session Août (P2)", year: "2016", file: "Hist-Geo_2016_aout-convert-2.jpg" },
    { title: "Hisser (P1)", year: "2016", file: "Hist-Geo_2016_Hisser-convert-1.jpg" },
    { title: "Histamine (P1)", year: "2016", file: "Hist-Geo_2016_Histamine-convert-1.jpg" },
    { title: "Historier (P1)", year: "2016", file: "Hist-Geo_2016_Historier-convert-1.jpg" },
    { title: "Hystolise (P1)", year: "2016", file: "Hist-Geo_2016_Hystolise-convert-1.jpg" },
    { title: "Hypotesis", year: "2015", file: "Hist-Geo_2015_Hypotesis-convert-1.jpg" }
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
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Histoire & Géo</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-cyan-500 shadow-sm appearance-none">
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
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${locked ? 'bg-slate-100 text-slate-400' : 'bg-cyan-50 text-cyan-600'}`}><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'public'}</span></div>
                  <div className="flex-1 min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                      {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Histoire & Géo')} className="h-12 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>{locked ? 'Débloquer' : 'Voir'}</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Histoire & Géo', fileName: exam.file })} className={`h-12 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-cyan-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HistoryGeoExamsScreen;
