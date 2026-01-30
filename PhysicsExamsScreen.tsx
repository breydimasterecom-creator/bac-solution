
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface PhysicsExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const PhysicsExamsScreen: React.FC<PhysicsExamsScreenProps> = ({ 
  onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite 
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "Physique Officiel", year: "2025", file: "Physique-2025-convert-1.jpg" },
    { title: "NS4: Force 2025 (P1)", year: "2025", file: "Physique-NS4-2025-Force-convert-1.jpg" },
    { title: "NS4: Force 2025 (P2)", year: "2025", file: "Physique-NS4-2025-Force-convert-2.jpg" },
    { title: "NS4: Induction (P1)", year: "2025", file: "Physique-NS4-2025-Induction-convert-1.jpg" },
    { title: "NS4: Induction (P2)", year: "2025", file: "Physique-NS4-2025-Induction-convert-2.jpg" },
    { title: "NS4: SES Gravité (P1)", year: "2025", file: "Physique-NS4-2025-SES-Gravite-convert-1.jpg" },
    { title: "NS4: SES Gravité (P2)", year: "2025", file: "Physique-NS4-2025-SES-Gravite-convert-2.jpg" },
    { title: "Philo A: Quantique", year: "2025", file: "Physique-Philo-A-2025-Quantique-convert-1(1).jpg" },
    { title: "Philo C/D: Chaleur", year: "2025", file: "Physique-PHILO-C-D-2025-Chaleur-convert-1(1).jpg" },
    { title: "Philo C/D: Cinétique (P1)", year: "2025", file: "Physique-Philo-C-D-2025Cinetique-convert-1.jpg" },
    { title: "Philo C/D: Cinétique (P2)", year: "2025", file: "Physique-Philo-C-D-2025Cinetique-convert-2.jpg" },
    { title: "SES: Densité (P1)", year: "2025", file: "Physique-SES-2025-Densite-convert-1.jpg" },
    { title: "SES: Densité (P2)", year: "2025", file: "Physique-SES-2025-Densite-convert-2.jpg" },
    { title: "Modèle SES (P1)", year: "2025", file: "TEXTE-MODELE-PHYSIQUE-2025-SES-convert-1.jpg" },
    { title: "Modèle SES (P2)", year: "2025", file: "TEXTE-MODELE-PHYSIQUE-2025-SES-convert-2.jpg" },
    { title: "Modèle SMP/SVT (P1)", year: "2025", file: "TEXTE-MODELE-PHYSIQUE-2025-SMP-SVT-convert-1.jpg" },
    { title: "Modèle SMP/SVT (P2)", year: "2025", file: "TEXTE-MODELE-PHYSIQUE-2025-SMP-SVT-convert-2.jpg" },
    { title: "Recueil Bacc 2024 (P1)", year: "2024", file: "Physique-2024-Bacc-Copy-convert-1.jpg" },
    { title: "Recueil Bacc 2024 (P2)", year: "2024", file: "Physique-2024-Bacc-Copy-convert-2.jpg" },
    { title: "SES: Continu (P1)", year: "2024", file: "physique-2024-SES-CONTINU-convert-1.jpg" },
    { title: "SES: Continu (P2)", year: "2024", file: "physique-2024-SES-CONTINU-convert-2.jpg" },
    { title: "SES: Big Bang (P1)", year: "2022", file: "Physique_2022_SES_Big-bang-convert-1.jpg" },
    { title: "SES: Big Bang (P2)", year: "2022", file: "Physique_2022_SES_Big-bang-convert-2.jpg" },
    { title: "SES: Cosmique", year: "2022", file: "Physique_2022_SES_Cosmique-convert-1.jpg" },
    { title: "SES: Électromagnétisme (P1)", year: "2022", file: "Physique_2022_SES_Electromagnetisme-convert-1.jpg" },
    { title: "SES: Électromagnétisme (P2)", year: "2022", file: "Physique_2022_SES_Electromagnetisme-convert-2.jpg" },
    { title: "SES: Englert", year: "2022", file: "Physique_2022_SES_Englert-convert-1.jpg" },
    { title: "SES: Étoile (P1)", year: "2022", file: "Physique_2022_SES_Etoile-convert-1.jpg" },
    { title: "SES: Étoile (P2)", year: "2022", file: "Physique_2022_SES_Etoile-convert-2.jpg" },
    { title: "SES: Gravité 2022 (P1)", year: "2022", file: "Physique_2022_SES_Gravite-convert-1.jpg" },
    { title: "SES: Gravité 2022 (P2)", year: "2022", file: "Physique_2022_SES_Gravite-convert-2.jpg" },
    { title: "SES: Kajita", year: "2022", file: "Physique_2022_SES_Kajita-convert-1.jpg" },
    { title: "SES: Marconi", year: "2022", file: "Physique_2022_SES_Marconi-convert-1.jpg" },
    { title: "SES: Oncle (P1)", year: "2022", file: "Physique_2022_SES_Oncle-convert-1.jpg" },
    { title: "SES: Oncle (P2)", year: "2022", file: "Physique_2022_SES_Oncle-convert-2.jpg" },
    { title: "SES: Perl", year: "2022", file: "Physique_2022_SES_Perl-convert-1.jpg" },
    { title: "SES: Picard (V1)", year: "2022", file: "Physique_2022_SES_Picard-1-convert-1.jpg" },
    { title: "SES: Picard (V2)", year: "2022", file: "Physique_2022_SES_Picard-convert-1.jpg" },
    { title: "SMP/SVT: Becquerel", year: "2022", file: "Physique_2022_SMP-SVT_Becquerel-convert-1.jpg" },
    { title: "SMP/SVT: Charpak (P1)", year: "2022", file: "Physique_2022_SMP-SVT_Charpak-1-convert-1.jpg" },
    { title: "SMP/SVT: Charpak (P2)", year: "2022", file: "Physique_2022_SMP-SVT_Charpak-convert-1.jpg" },
    { title: "SMP/SVT: Laroche", year: "2022", file: "Physique_2022_SMP-SVT_Laroche-convert-1.jpg" },
    { title: "SMP/SVT: Wineland (V1)", year: "2022", file: "Physique_2022_SMP-SVT_Wineland-1-convert-1.jpg" },
    { title: "SMP/SVT: Wineland (V2)", year: "2022", file: "Physique_2022_SMP-SVT_Wineland-convert-1.jpg" },
    { title: "SMP/SVT: Wineland B (P1)", year: "2022", file: "Physique_2022_SMP-SVT_Wineland_b-1-convert-1.jpg" },
    { title: "SMP/SVT: Wineland B (P2)", year: "2022", file: "Physique_2022_SMP-SVT_Wineland_b-convert-1.jpg" },
    { title: "Philo C/D Archive", year: "2022", file: "Physique_Philo_2022_Philo-C-D-convert-1(1).jpg" },
    { title: "Bac Permanent 2021", year: "2021", file: "physique-2021-Bac-Permanent--convert-1.jpg" },
    { title: "SVT/SMP: Armaturo", year: "2021", file: "Physique-2021-svt-SMP-Armaturo-convert-1.jpg" },
    { title: "SES: Bobine Bacc", year: "2021", file: "Physique_2021_SES_Bobine-Bacc-Copy-convert-1.jpg" },
    { title: "SES: Bobine", year: "2021", file: "Physique_2021_SES_Bobine-convert-1.jpg" },
    { title: "SES: Courant", year: "2021", file: "Physique_2021_SES_Courant-convert-1.jpg" },
    { title: "SVT/SMP: Armature", year: "2021", file: "Physique_2021_SVT-SMP_Armature-convert-1.jpg" },
    { title: "SVT/SMP: Balistique", year: "2021", file: "Physique_2021_SVT-SMP_Balistique-convert-1.jpg" },
    { title: "SVT/SMP: Barlow (P1)", year: "2021", file: "Physique_2021_SVT-SMP_Barlow-1-convert-1.jpg" },
    { title: "SVT/SMP: Barlow (P2)", year: "2021", file: "Physique_2021_SVT-SMP_Barlow-convert-1.jpg" },
    { title: "SVT/SMP: Énergie", year: "2021", file: "Physique_2021_SVT-SMP_Energie-convert-1.jpg" },
    { title: "SVT/SMP: Fourneau", year: "2021", file: "Physique_2021_SVT-SMP_Fourneau-convert-1.jpg" },
    { title: "SVT/SMP: Régression", year: "2020", file: "Physique_2020_SVT-SMP_Regression-Bacc-Copy-convert-1.jpg" },
    { title: "SVT/SMP: Tangente", year: "2020", file: "Physique_2020_SVT-SMP_Tangente-convert-1.jpg" },
    { title: "SVT/SMP: Aimantation 2019", year: "2019", file: "physique-2019-SVT-SMP-AIMENTATION-convert-1.jpg" },
    { title: "SES: Cinétique (P1)", year: "2019", file: "Physique_2019_SES_Cinetique-convert-1.jpg" },
    { title: "SES: Cinétique (P2)", year: "2019", file: "Physique_2019_SES_Cinetique-convert-2.jpg" },
    { title: "SES: Impédance", year: "2019", file: "Physique_2019_SES_Impedance-convert-1(1).jpg" },
    { title: "SVT/SMP: Aimantation (V1)", year: "2019", file: "Physique_2019_SVT-SMP_Aimantation-convert-1(1).jpg" },
    { title: "SVT/SMP: Condensateur (P1)", year: "2019", file: "Physique_2019_SVT-SMP_Condensateur-1-convert-1(1).jpg" },
    { title: "SVT/SMP: Condensateur (P2)", year: "2019", file: "Physique_2019_SVT-SMP_Condensateur-convert-1(1).jpg" },
    { title: "SVT/SMP: Induction", year: "2019", file: "Physique_2019_SVT-SMP_Induction-convert-1(1).jpg" },
    { title: "SVT/SMP: Transformateur", year: "2019", file: "Physique_2019_SVT-SMP_Transformateur-convert-1.jpg" },
    { title: "SVT/SMP: Phytophage", year: "2016", file: "Physique_2016_SVT-SMP_Phytophage-convert-1(1).jpg" },
    { title: "SVT/SMP: Phytotron", year: "2016", file: "Physique_2016_SVT-SMP_Phytotron-convert-1(1).jpg" },
    { title: "SVT/SMP: Photon", year: "2015", file: "Physique_2015_SVT-SMP_Photon-convert-1(1).jpg" },
    { title: "Modèle Examen (P1)", year: "Modèle", file: "Physique-modele-examen-convert-1.jpg" },
    { title: "Modèle Examen (P2)", year: "Modèle", file: "Physique-modele-examen-convert-2.jpg" },
    { title: "NS4: Force (Arch.)", year: "Archives", file: "Physique-NS4-2025-Force-convert-1.jpg" },
    { title: "SES: Dilatation", year: "Archives", file: "Physique-NS4-SES-Dilatation-convert-1(1).jpg" },
    { title: "SMP/SVT: Entropie (P1)", year: "Archives", file: "Physique-NS4-SMP-SVT-Entropie-convert-1.jpg" },
    { title: "SMP/SVT: Entropie (P2)", year: "Archives", file: "Physique-NS4-SMP-SVT-Entropie-convert-2.jpg" },
    { title: "Philo A: Dynamique", year: "Archives", file: "Physique-Philo-A-Dynamique-convert-1(1).jpg" },
    { title: "SMP/SVT: Vitesse (P1)", year: "Archives", file: "Physique-SMP-SVT-Vitesse-convert-1.jpg" },
    { title: "SMP/SVT: Vitesse (P2)", year: "Archives", file: "Physique-SMP-SVT-Vitesse-convert-2.jpg" }
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
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Physique</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500 shadow-sm appearance-none">
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
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${locked ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600'}`}><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'electric_bolt'}</span></div>
                  <div className="flex-1 min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                      {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Physique')} className="h-12 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>{locked ? 'Débloquer' : 'Voir'}</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Physique', fileName: exam.file })} className={`h-12 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default PhysicsExamsScreen;
