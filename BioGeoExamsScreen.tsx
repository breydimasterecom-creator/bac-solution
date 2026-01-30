
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface BioGeoExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const BioGeoExamsScreen: React.FC<BioGeoExamsScreenProps> = ({ onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite }) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "SVT Officiel", year: "2025", file: "SVT-2025-convert-1(2).jpg" },
    { title: "SVT Session Ordinaire", year: "2024", file: "SVT-2024-convert-1(2).jpg" },
    { title: "SVT Modèle Texte", year: "2024", file: "Texte-Modele-2024-SVT-SVT-convert-1(2).jpg" },
    { title: "Transduction V1 (P1)", year: "2023", file: "Biologie-2023-Transduction- (1)-convert-1.jpg" },
    { title: "Transduction V1 (P2)", year: "2023", file: "Biologie-2023-Transduction- (1)-convert-2.jpg" },
    { title: "Transduction V1 (P3)", year: "2023", file: "Biologie-2023-Transduction- (1)-convert-3.jpg" },
    { title: "Transduction V1 (P4)", year: "2023", file: "Biologie-2023-Transduction- (1)-convert-4.jpg" },
    { title: "Transduction V1 (P5)", year: "2023", file: "Biologie-2023-Transduction- (1)-convert-5.jpg" },
    { title: "Transduction V1 (P6)", year: "2023", file: "Biologie-2023-Transduction- (1)-convert-6.jpg" },
    { title: "Transduction V1 (P7)", year: "2023", file: "Biologie-2023-Transduction- (1)-convert-7.jpg" },
    { title: "Transduction V1 (P8)", year: "2023", file: "Biologie-2023-Transduction- (1)-convert-8.jpg" },
    { title: "Transduction V2 (P1)", year: "2023", file: "Biologie-2023-Transduction--convert-1.jpg" },
    { title: "Transduction V2 (P2)", year: "2023", file: "Biologie-2023-Transduction--convert-2.jpg" },
    { title: "Transduction V2 (P3)", year: "2023", file: "Biologie-2023-Transduction--convert-3.jpg" },
    { title: "Transduction V2 (P4)", year: "2023", file: "Biologie-2023-Transduction--convert-4.jpg" },
    { title: "Transduction V2 (P5)", year: "2023", file: "Biologie-2023-Transduction--convert-5.jpg" },
    { title: "Transduction V2 (P6)", year: "2023", file: "Biologie-2023-Transduction--convert-6.jpg" },
    { title: "Transduction V2 (P7)", year: "2023", file: "Biologie-2023-Transduction--convert-7.jpg" },
    { title: "Transduction V2 (P8)", year: "2023", file: "Biologie-2023-Transduction--convert-8.jpg" },
    { title: "LLA/SES: Anticorps (P1)", year: "2022", file: "SVT_2022_LLA-SES-SMP_Anticorps -convert-1(2).jpg" },
    { title: "LLA/SES: Anticorps (P2)", year: "2022", file: "SVT_2022_LLA-SES-SMP_Anticorps-convert-1(1).jpg" },
    { title: "LLA/SES: Cytologie (P1)", year: "2022", file: "SVT_2022_LLA-SES-SMP_Cytologie-2-convert-1(1).jpg" },
    { title: "LLA/SES: Cytologie (P2)", year: "2022", file: "SVT_2022_LLA-SES-SMP_Cytologie-convert-1(1).jpg" },
    { title: "SES/SMP: Matériaux", year: "2022", file: "SVT_2022_SES-SMP_Materiaux-convert-1(2).jpg" },
    { title: "SES/SMP: Séisme", year: "2022", file: "SVT_2022_SES-SMP_Seisme-convert-1(1).jpg" },
    { title: "SES/SMP: Risques (P1)", year: "2022", file: "SVT_2022_SES_SMP_Risques-convert-1.jpg" },
    { title: "SES/SMP: Risques (P2)", year: "2022", file: "SVT_2022_SES_SMP_Risques-convert-2.jpg" },
    { title: "SVT: Anatomie", year: "2022", file: "SVT_2022_SVT_Anatomie-convert-1(1).jpg" },
    { title: "SVT: Cardiaque", year: "2022", file: "SVT_2022_SVT_Cardiaque-convert-1(1).jpg" },
    { title: "SVT: Conservation", year: "2022", file: "SVT_2022_SVT_Conservation-convert-1(1).jpg" },
    { title: "SVT: Élevage", year: "2022", file: "SVT_2022_SVT_Elevage-convert-1(1).jpg" },
    { title: "SVT: Génétique", year: "2022", file: "SVT_2022_SVT_Genetique-convert-1(1).jpg" },
    { title: "SVT: Glucogène", year: "2022", file: "SVT_2022_SVT_Glucogene-convert-1(1).jpg" },
    { title: "SVT: Histologie", year: "2022", file: "SVT_2022_SVT_Histologie-convert-1(1).jpg" },
    { title: "SVT: Microbiologie", year: "2022", file: "SVT_2022_SVT_Microbiologie-convert-1(1).jpg" },
    { title: "SVT: Morphologie (P1)", year: "2022", file: "SVT_2022_SVT_Morphologie-convert-1.jpg" },
    { title: "SVT: Morphologie (P2)", year: "2022", file: "SVT_2022_SVT_Morphologie_B-convert-1(2).jpg" },
    { title: "SVT: Neurosciences", year: "2022", file: "SVT_2022_SVT_Neurocience-convert-1(2).jpg" },
    { title: "SVT: Neurone", year: "2022", file: "SVT_2022_SVT_Neurone-convert-1(2).jpg" },
    { title: "SVT: Paléontologie", year: "2022", file: "SVT_2022_SVT_Paleontologie-convert-1(2).jpg" },
    { title: "SVT: Physiologie", year: "2022", file: "SVT_2022_SVT_Physiologie-convert-1(2).jpg" },
    { title: "SVT: Vitamines", year: "2022", file: "SVT_2022_SVT_Vitamines-convert-1(2).jpg" },
    { title: "SVT: Zoologie", year: "2022", file: "SVT_2022_SVT_Zoologie-convert-1(2).jpg" },
    { title: "SES/SMP: Claudiquer", year: "2021", file: "SVT_2021_SES-SMP_Claudiquer-1-convert-1.jpg" },
    { title: "SES/SMP: Gamète 2021", year: "2021", file: "SVT_2021_SES-SMP_Gamete-convert-1.jpg" },
    { title: "SVT: Chnodriome", year: "2021", file: "SVT_2021_SVT_Chnodriome-1 (1)-convert-1.jpg" },
    { title: "SVT: Cintrage", year: "2021", file: "SVT_2021_SVT_Cintrage-1-convert-1.jpg" },
    { title: "SVT: Claustration", year: "2021", file: "SVT_2021_SVT_Claustration-convert-1(1).jpg" },
    { title: "SVT: Ocytocine", year: "2021", file: "SVT_2021_SVT_Ocytocine-convert-1(1).jpg" },
    { title: "SVT: Prolactine", year: "2021", file: "SVT_2021_SVT_Prolactine-convert-1(1).jpg" },
    { title: "SVT: Gamète NS", year: "2020", file: "SVT_2020_SVT_Gamete-NS-convert-1.jpg" },
    { title: "SES/SMP: Cytoplasme", year: "2019", file: "SVT_2019_SES-SMP_Cytoplasme-convert-1(1).jpg" },
    { title: "SES/SMP: Vibrion", year: "2019", file: "SVT_2019_SES-SMP_Vibrion-convert-1(1).jpg" },
    { title: "SVT: Gisement", year: "2019", file: "SVT_2019_SVT_Gisement-convert-1(1).jpg" },
    { title: "SVT: Myopathie", year: "2019", file: "SVT_2019_SVT_Myopathie-convert-1.jpg" },
    { title: "SVT: Pancréas", year: "2019", file: "SVT_2019_SVT_Pancreas (1)-convert-1.jpg" },
    { title: "Géologie: Faune", year: "2018", file: "Geologie_2018_SES-SMP_Faune-convert-1(1).jpg" },
    { title: "Géologie: Gisement 2018", year: "2018", file: "Geologie_2018_SES-SMP_Gisement-convert-1(1).jpg" },
    { title: "SVT: Génétique 2018 (P1)", year: "2018", file: "SVT_2018_SVT_Genetique-convert-1.jpg" },
    { title: "SVT: Génétique 2018 (P2)", year: "2018", file: "SVT_2018_SVT_Genetique-convert-2.jpg" },
    { title: "Homozygote (P1)", year: "2016", file: "Bio-Geo_2016_Homozygote-convert-1.jpg" },
    { title: "Polymérase (P1)", year: "2016", file: "Bio-Geo_2016_Polymerase-convert-1.jpg" },
    { title: "Polymérique (P1)", year: "2016", file: "Bio-Geo_2016_Polymerique-convert-1.jpg" },
    { title: "Polynevrite (P1)", year: "2016", file: "Bio-Geo_2016_Polynevrite-convert-1.jpg" },
    { title: "Polype (P1)", year: "2016", file: "Bio-Geo_2016_Polype-convert-1.jpg" },
    { title: "Protomère (P1)", year: "2016", file: "Bio-Geo_2016_Protomere-convert-1.jpg" },
    { title: "Géologie: Polymérique", year: "2016", file: "Geologie_2016_LLA-SES-SMP_Polymerique-convert-1(1).jpg" },
    { title: "Recueil Bacc 2014-2018 (P1)", year: "Archives", file: "Bio-Geo-2014-2018-Bacc-convert-1.jpg" },
    { title: "Recueil Bacc 2014-2018 (P2)", year: "Archives", file: "Bio-Geo-2014-2018-Bacc-convert-2.jpg" },
    { title: "Bac Permanent (P1)", year: "2014", file: "BioGeo-2014-Bac-Permanent--convert-1.jpg" },
    { title: "Histologie Archive", year: "2002", file: "SVT_2002_SVT_Histologie-convert-1(1).jpg" }
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
          <button onClick={onBack} className="text-[#101518] flex size-10 shrink-0 items-center justify-center rounded-full active:scale-90 transition-transform"><span className="material-symbols-outlined text-[24px]">arrow_back</span></button>
          <div className="flex flex-col flex-1 text-center pr-10">
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Bio / Géo (SVT)</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-emerald-500 shadow-sm appearance-none">
            {years.map(year => <option key={year} value={year}>{year === 'Tous' ? 'Toutes les archives' : `Session ${year}`}</option>)}
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
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${locked ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600'}`}><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'biotech'}</span></div>
                  <div className="flex-1 min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                      {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'SVT')} className="h-12 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>{locked ? 'Débloquer' : 'Voir'}</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'SVT', fileName: exam.file })} className={`h-12 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-emerald-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default BioGeoExamsScreen;
