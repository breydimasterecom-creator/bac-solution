
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface ArtMusicExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const ArtMusicExamsScreen: React.FC<ArtMusicExamsScreenProps> = ({ 
  onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite 
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "Art: Le Rara", year: "2022", file: "Arts_2022-Rara-convert-1.jpg" },
    { title: "Art: A Capella", year: "2022", file: "Arts_2022_Acapala-convert-1.jpg" },
    { title: "Art: Carnaval (V1)", year: "2022", file: "Arts_2022_Carnaval-1-convert-1.jpg" },
    { title: "Art: Carnaval (V2)", year: "2022", file: "Arts_2022_Carnaval-convert-1.jpg" },
    { title: "Art: Le Compas (V1)", year: "2022", file: "Arts_2022_Compas-convert-1.jpg" },
    { title: "Art: Le Compas (V2)", year: "2022", file: "Arts_2022_Compas_Compas-convert-1.jpg" },
    { title: "LLA: Souvenance", year: "2022", file: "Arts_2022_LLA_Souvenance-convert-1.jpg" },
    { title: "Art: Saint-Soleil", year: "2022", file: "Arts_2022_Saint-Soleil-convert-1.jpg" },
    { title: "Art: Le Tambour", year: "2022", file: "Arts_2022_Tambour-convert-1.jpg" },
    { title: "Art: Tiga (P1)", year: "2022", file: "Arts_2022_Tiga-convert-1.jpg" },
    { title: "Art: Tiga (P2)", year: "2022", file: "Arts_2022_Tiga-convert-2.jpg" },
    { title: "Art: Yanvalou", year: "2022", file: "Arts_2022_Yanvalou-convert-1.jpg" },
    { title: "LLA: Albert (P1)", year: "2021", file: "Arts_2021_LLA_Albert-convert-1.jpg" },
    { title: "LLA: Albert (P2)", year: "2021", file: "Arts_2021_LLA_Albert-convert-2.jpg" },
    { title: "LLA: Pyramide (P1)", year: "2021", file: "Arts_2021_LLA_Pyramide-convert-1.jpg" },
    { title: "LLA: Pyramide (P2)", year: "2021", file: "Arts_2021_LLA_Pyramide-convert-2.jpg" },
    { title: "LLA: Sébastient (P1)", year: "2021", file: "Arts_2021_LLA_Sebastient-convert-1.jpg" },
    { title: "LLA: Sébastient (P2)", year: "2021", file: "Arts_2021_LLA_Sebastient-convert-2.jpg" },
    { title: "Musique: Frédéric Chopin", year: "2020", file: "Arts_2020_LLA_Chopin-convert-1.jpg" },
    { title: "Musique: Hector Berlioz", year: "2020", file: "Arts_2020_LLA_Hector-convert-1.jpg" },
    { title: "Musique: W.A. Mozart", year: "2020", file: "Arts_2020_LLA_Mozart-convert-1.jpg" },
    { title: "Art: Occide Jeanty", year: "2020", file: "Arts_2020_LLA_Occide-convert-1.jpg" },
    { title: "Art: L'Espace (P1)", year: "2019", file: "Arts_2019_Espace-1-convert-1.jpg" },
    { title: "Art: L'Espace (P2)", year: "2019", file: "Arts_2019_Espace-1-convert-2.jpg" },
    { title: "Art: Mysticisme (P1)", year: "2019", file: "Arts_2019_Mysticisme-1-convert-1.jpg" },
    { title: "Art: Mysticisme (P2)", year: "2019", file: "Arts_2019_Mysticisme-1-convert-2.jpg" },
    { title: "Art: La Peinture (P1)", year: "2019", file: "Arts_2019_Peinture-1-convert-1.jpg" },
    { title: "Art: La Peinture (P2)", year: "2019", file: "Arts_2019_Peinture-1-convert-2.jpg" },
    { title: "Art: Le Folklore (P1)", year: "2018", file: "Arts_2018_Folklore-convert-1.jpg" },
    { title: "Art: Le Folklore (P2)", year: "2018", file: "Arts_2018_Folklore-convert-2.jpg" },
    { title: "Recueil Archives (P1)", year: "Archives", file: "Art-et-Musique-2016-convert-1.jpg" },
    { title: "Recueil Archives (P2)", year: "Archives", file: "Art-et-Musique-2016-convert-2.jpg" },
    { title: "Recueil Archives (P3)", year: "Archives", file: "Art-et-Musique-2016-convert-3.jpg" },
    { title: "Art: Danse Ibo (P1)", year: "2016", file: "Arts_2016_Ibo-convert-1.jpg" },
    { title: "Art: Danse Ibo (P2)", year: "2016", file: "Arts_2016_Ibo-convert-2.jpg" },
    { title: "Art: Yanvalou (P1)", year: "2016", file: "Arts_2016_Yanvalou-convert-1.jpg" },
    { title: "Art: Yanvalou (P2)", year: "2016", file: "Arts_2016_Yanvalou-convert-2.jpg" },
    { title: "Musique: La Mélodie (P1)", year: "2015", file: "Arts_2015_Melodie-convert-1.jpg" },
    { title: "Musique: La Mélodie (P2)", year: "2015", file: "Arts_2015_Melodie-convert-2.jpg" },
    { title: "Art: Tambour 2002", year: "2002", file: "Arts_2002_Tambour-convert-1.jpg" }
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
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Art / Musique</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-pink-500 shadow-sm appearance-none">
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
                  <div className="h-12 w-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 shadow-inner"><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'palette'}</span></div>
                  <div className="flex flex-col min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                       <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                       {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Art & Musique')} className="h-12 rounded-xl bg-pink-50 text-pink-500 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-pink-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>Voir</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Art & Musique', fileName: exam.file })} className={`h-12 rounded-xl bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ArtMusicExamsScreen;
