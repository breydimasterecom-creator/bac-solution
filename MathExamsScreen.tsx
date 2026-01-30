
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface MathExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const MathExamsScreen: React.FC<MathExamsScreenProps> = ({ 
  onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite 
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "Mathématiques Officiel", year: "2025", file: "Math-2025-convert-1.jpg" },
    { title: "LLA: Distance", year: "2025", file: "Math-NS4-2025-LLA-Distance-convert-1.jpg" },
    { title: "SMP: Graphe", year: "2025", file: "Math-NS4-2025-SMP-Graphe-convert-1.jpg" },
    { title: "SVT: Ensemble", year: "2025", file: "Math-NS4-2025-SVT-Ensemble-convert-1.jpg" },
    { title: "Philo A: Boole", year: "2025", file: "Mathematiques-2025-Philo-A-Boole-convert-1.jpg" },
    { title: "NS4: Aire", year: "2025", file: "Mathematiques-NS4-2025-Aire-convert-1.jpg" },
    { title: "SES: Image", year: "2025", file: "Mathematiques-NS4-2025-SES-Image-convert-1.jpg" },
    { title: "SES: Kurt", year: "2025", file: "Mathematiques-NS4-2025-SES-Kurt-convert-1.jpg" },
    { title: "SES: Rayon", year: "2025", file: "Mathematiques-NS4-2025-SES-Rayon-convert-1.jpg" },
    { title: "SMP: Euclide", year: "2025", file: "Mathematiques-NS4-2025-SMP-Euclide-convert-1.jpg" },
    { title: "SVT: Quartile", year: "2025", file: "Mathematiques-NS4-2025-SVT-Quartile-convert-1.jpg" },
    { title: "SVT: Reste", year: "2025", file: "Mathematiques-Ns4-2025-SVT-Reste-convert-1.jpg" },
    { title: "SVT: Variance", year: "2025", file: "Mathematiques-NS4-2025-SVT-Variance-convert-1.jpg" },
    { title: "SMP: Eureka", year: "2025", file: "Mathematiques-NS4-SMP-2025-Eureka-convert-1.jpg" },
    { title: "Philo A: Riemann", year: "2025", file: "Mathematiques-Philo-A-2025-Riemann-convert-1.jpg" },
    { title: "Philo C/D: Turing", year: "2025", file: "Mathematiques-Philo-C-D-2025-Turing-convert-1.jpg" },
    { title: "SES: Courbe", year: "2025", file: "Mathematiques-SES-2025-Courbe-convert-1.jpg" },
    { title: "SMP: Cardinal", year: "2025", file: "Mathemtatiques-NS4-SMP-Cardinal-2025-convert-1.jpg" },
    { title: "LLA: Espace (P1)", year: "2022", file: "Maths_2022_LLA_Espace-convert-1.jpg" },
    { title: "LLA: Espace (P2)", year: "2022", file: "Maths_2022_LLA_Espace-convert-2.jpg" },
    { title: "LLA: Négation (P1)", year: "2022", file: "Maths_2022_LLA_Negation-convert-1.jpg" },
    { title: "LLA: Négation (P2)", year: "2022", file: "Maths_2022_LLA_Negation-convert-2.jpg" },
    { title: "LLA: Numérique", year: "2022", file: "Maths_2022_LLA_Numerique-convert-1.jpg" },
    { title: "LLA: Opérations (P1)", year: "2022", file: "Maths_2022_LLA_Operations-convert-1.jpg" },
    { title: "LLA: Opérations (P2)", year: "2022", file: "Maths_2022_LLA_Operations-convert-2.jpg" },
    { title: "LLA: Résolution", year: "2022", file: "Maths_2022_LLA_Resolution-convert-1.jpg" },
    { title: "SES: Absurde (P1)", year: "2022", file: "Maths_2022_SES_Absurde-convert-1.jpg" },
    { title: "SES: Absurde (P2)", year: "2022", file: "Maths_2022_SES_Absurde-convert-2.jpg" },
    { title: "SES: Axiomatisation", year: "2022", file: "Maths_2022_SES_Axionatisation-convert-1.jpg" },
    { title: "SES: Codage", year: "2022", file: "Maths_2022_SES_Codage-convert-1.jpg" },
    { title: "SES: Exponentiel", year: "2022", file: "Maths_2022_SES_Exponentiel-convert-1.jpg" },
    { title: "SES: Graphique", year: "2022", file: "Maths_2022_SES_Graphique-convert-1.jpg" },
    { title: "SES: Implication", year: "2022", file: "Maths_2022_SES_Implication-convert-1.jpg" },
    { title: "SES: Logique", year: "2022", file: "Maths_2022_SES_Logique-convert-1.jpg" },
    { title: "SES: Mesure", year: "2022", file: "Maths_2022_SES_Mesure-convert-1.jpg" },
    { title: "SES: Numérisation (P1)", year: "2022", file: "Maths_2022_SES_Numerisation-convert-1.jpg" },
    { title: "SES: Numérisation (P2)", year: "2022", file: "Maths_2022_SES_Numerisation-convert-2.jpg" },
    { title: "SES: Structures", year: "2022", file: "Maths_2022_SES_Structures-convert-1.jpg" },
    { title: "SES: Topologie", year: "2022", file: "Maths_2022_SES_Topologie-convert-1.jpg" },
    { title: "SMP/SVT: Hyperbole", year: "2022", file: "Maths_2022_SMP-SVT-Hyperbole-convert-1.jpg" },
    { title: "SMP/SVT: Dérivation", year: "2022", file: "Maths_2022_SMP-SVT_Derivation-convert-1.jpg" },
    { title: "SMP/SVT: Limite", year: "2022", file: "Maths_2022_SMP-SVT_Limite-convert-1.jpg" },
    { title: "SMP/SVT: Parabole", year: "2022", file: "Maths_2022_SMP-SVT_Parabole-convert-1.jpg" },
    { title: "SMP/SVT: Parallèle", year: "2022", file: "Maths_2022_SMP-SVT_Parallele-convert-1.jpg" },
    { title: "SMP/SVT: Possibilité", year: "2022", file: "Maths_2022_SMP-SVT_Possibilite-convert-1.jpg" },
    { title: "SMP/SVT: Sécante", year: "2022", file: "Maths_2022_SMP-SVT_Secante-convert-1.jpg" },
    { title: "SMP/SVT: Tangente", year: "2022", file: "Maths_2022_SMP-SVT_Tangente-convert-1.jpg" },
    { title: "SVT/SMP: Démonstration", year: "2022", file: "Maths_2022_SVT-SMPDemonstration-convert-1.jpg" },
    { title: "SVT/SMP: Angle", year: "2022", file: "Maths_2022_SVT-SMP_Angle-convert-1.jpg" },
    { title: "SVT/SMP: Démarche", year: "2022", file: "Maths_2022_SVT-SMP_Demarche-convert-1.jpg" },
    { title: "SVT/SMP: Discrète", year: "2022", file: "Maths_2022_SVT-SMP_Discrete-convert-1.jpg" },
    { title: "SVT/SMP: Imaginaire", year: "2022", file: "Maths_2022_SVT-SMP_Imaginaire-convert-1.jpg" },
    { title: "SVT/SMP: Limite SVT", year: "2022", file: "Maths_2022_SVT-SMP_Limite-convert-1.jpg" },
    { title: "SVT/SMP: Réel", year: "2022", file: "Maths_2022_SVT-SMP_Reel-convert-1.jpg" },
    { title: "SVT/SMP: Sécante (P1)", year: "2022", file: "Maths_2022_SVT-SMP_Secante-1-convert-1.jpg" },
    { title: "SVT/SMP: Sécante (P2)", year: "2022", file: "Maths_2022_SVT-SMP_Secante-2-convert-1.jpg" },
    { title: "SVT/SMP: Sécante (P3)", year: "2022", file: "Maths_2022_SVT-SMP_Secante-convert-1.jpg" },
    { title: "LLA: Fonction", year: "2021", file: "Maths_2021_LLA_Fonction-convert-1.jpg" },
    { title: "LLA: Numérique 2021", year: "2021", file: "Maths_2021_LLA_Numerique-convert-1.jpg" },
    { title: "LLA: Récurrence", year: "2021", file: "Maths_2021_LLA_Recurrence-convert-1.jpg" },
    { title: "SES: Arithmétique", year: "2021", file: "Maths_2021_SES_Arithmetique-convert-1.jpg" },
    { title: "SES: Expression", year: "2021", file: "Maths_2021_SES_Expression-convert-1.jpg" },
    { title: "SVT/SMP: Barycentre", year: "2021", file: "Maths_2021_SVT-SMP_Barycentre-convert-1.jpg" },
    { title: "SVT/SMP: Géométrique", year: "2021", file: "Maths_2021_SVT-SMP_Geometrique-convert-1.jpg" },
    { title: "SVT/SMP: Triangle", year: "2021", file: "Maths_2021_SVT-SMP_Triangle-convert-1.jpg" },
    { title: "NS4: Asymptote 2020", year: "2020", file: "Mathematiques-NS4-2020-Asymptote-convert-1.jpg" },
    { title: "LLA: Session 03", year: "2020", file: "Maths_2020_LLA_03-convert-1.jpg" },
    { title: "LLA: Collection", year: "2020", file: "Maths_2020_LLA_Collection-NS-convert-1.jpg" },
    { title: "LLA: Marginal (P1)", year: "2020", file: "Maths_2020_LLA_Marginal-NS-convert-1.jpg" },
    { title: "LLA: Marginal (P2)", year: "2020", file: "Maths_2020_LLA_Marginal-NS-convert-2.jpg" },
    { title: "SVT/SMP: Asymptote NS", year: "2020", file: "Maths_2020_SVT-SMP_Asymptote-NS-convert-1.jpg" },
    { title: "SVT/SMP: Graphique NS", year: "2020", file: "Maths_2020_SVT-SMP_Graphique-NS-convert-1.jpg" },
    { title: "Aléatoire", year: "2019", file: "Math-Bacc-2019-Aleatoire-Mathe-convert-1.jpg" },
    { title: "Philo C/D: Aléatoire", year: "2019", file: "Math-Philo-C-D-2019-Aleatoire-convert-1.jpg" },
    { title: "LLA: Aléatoire 2019", year: "2019", file: "Maths_2019_LLA_Aleatroire-convert-1.jpg" },
    { title: "LLA: Orthogonal", year: "2019", file: "Maths_2019_LLA_Orthogonal-convert-1.jpg" },
    { title: "SES: Graphique 2019", year: "2019", file: "Maths_2019_SES_Graphique-convert-1.jpg" },
    { title: "SES: Orthonormé", year: "2019", file: "Maths_2019_SES_Orthonorme-convert-1.jpg" },
    { title: "SVT/SMP: Élasticité", year: "2019", file: "Maths_2019_SVT-SMP_Elasticite-convert-1.jpg" },
    { title: "SVT/SMP: Évolution", year: "2019", file: "Maths_2019_SVT-SMP_Evolution-convert-1.jpg" },
    { title: "SVT/SMP: Polynôme", year: "2019", file: "Maths_2019_SVT-SMP_Polynime-convert-1.jpg" },
    { title: "Recueil NS4 (P1)", year: "Archives", file: "Mathematiques-NS4-2014-2016-2018--convert-1.jpg" },
    { title: "Recueil NS4 (P2)", year: "Archives", file: "Mathematiques-NS4-2014-2016-2018--convert-2.jpg" },
    { title: "Recueil NS4 (P3)", year: "Archives", file: "Mathematiques-NS4-2014-2016-2018--convert-3.jpg" },
    { title: "Recueil NS4 (P4)", year: "Archives", file: "Mathematiques-NS4-2014-2016-2018--convert-4.jpg" },
    { title: "Recueil NS4 (P5)", year: "Archives", file: "Mathematiques-NS4-2014-2016-2018--convert-5.jpg" },
    { title: "LLA: Méthodique (P1)", year: "2018", file: "Maths_2018_LLA-METHODIQUE-convert-1.jpg" },
    { title: "LLA: Méthodique (P2)", year: "2018", file: "Maths_2018_LLA-METHODIQUE-convert-2.jpg" },
    { title: "LLA: Méthodique (P3)", year: "2018", file: "Maths_2018_LLA-METHODIQUE-convert-3.jpg" },
    { title: "LLA: Méthodique (P4)", year: "2018", file: "Maths_2018_LLA-METHODIQUE-convert-4.jpg" },
    { title: "LLA: Méthodique (P5)", year: "2018", file: "Maths_2018_LLA-METHODIQUE-convert-5.jpg" },
    { title: "LLA: Méthodique (P6)", year: "2018", file: "Maths_2018_LLA-METHODIQUE-convert-6.jpg" },
    { title: "LLA: Aléatoire 2018", year: "2018", file: "Maths_2018_LLA_Aleatoire-convert-1.jpg" },
    { title: "LLA: Orthogonal (P1)", year: "2018", file: "Maths_2018_LLA_Orthogonal-1-convert-1.jpg" },
    { title: "LLA: Orthogonal (P2)", year: "2018", file: "Maths_2018_LLA_Orthogonal-convert-1.jpg" },
    { title: "SES: Paramètre", year: "2018", file: "Maths_2018_SES_Parametre-convert-1.jpg" },
    { title: "SVT/SMP: Continue", year: "2018", file: "Maths_2018_SVT-SMP_Continue-convert-1.jpg" },
    { title: "Marégraphe", year: "2016", file: "Maths_2016_Maregraphe-convert-1.jpg" },
    { title: "Marginer (P1)", year: "2016", file: "Maths_2016_Marginer-convert-1.jpg" },
    { title: "Marginer (P2)", year: "2016", file: "Maths_2016_Marginer-convert-2.jpg" },
    { title: "Marnage (P1)", year: "2016", file: "Maths_2016_Marnage-convert-1.jpg" },
    { title: "Marnage (P2)", year: "2016", file: "Maths_2016_Marnage-convert-2.jpg" },
    { title: "Minorant (P1)", year: "2015", file: "Maths_2015_Minorant-convert-1.jpg" },
    { title: "Minorant (P2)", year: "2015", file: "Maths_2015_Minorant-convert-2.jpg" },
    { title: "Philo C/D: Août 2014 (P1)", year: "2014", file: "Maths_Philo_CD_Aout2014-convert-1.jpg" },
    { title: "Philo C/D: Août 2014 (P2)", year: "2014", file: "Maths_Philo_CD_Aout2014-convert-2.jpg" },
    { title: "Philo C/D: Juillet 2013", year: "2013", file: "Maths_Philo_CD_Juillet-2013-convert-1.jpg" },
    { title: "Philo C/D: Août 2012", year: "2012", file: "Maths_Philo_CD_Aout-2012-convert-1.jpg" },
    { title: "Philo C/D: Sept 2010", year: "2010", file: "Maths_Philo_CD_sept-2010-convert-1.jpg" }
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
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Mathématiques</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-green-500 shadow-sm appearance-none">
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
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${locked ? 'bg-slate-100 text-slate-400' : 'bg-green-50 text-green-600'}`}><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'calculate'}</span></div>
                  <div className="flex-1 min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                      {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Mathématiques')} className="h-12 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>{locked ? 'Débloquer' : 'Voir'}</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Mathématiques', fileName: exam.file })} className={`h-12 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-green-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MathExamsScreen;
