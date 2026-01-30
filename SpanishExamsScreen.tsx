
import React, { useState, useMemo } from 'react';
import { ContextExam, AccessStatus } from '../types';

interface SpanishExamsScreenProps {
  onBack: () => void;
  onStartTutor: (exam: ContextExam) => void;
  onViewPdf: (url: string, title: string, year: string, subject: string) => void;
  userStatus: AccessStatus;
  onGoPremium: () => void;
  favorites: string[];
  onToggleFavorite: (title: string) => void;
}

const SpanishExamsScreen: React.FC<SpanishExamsScreenProps> = ({ onBack, onStartTutor, onViewPdf, userStatus, onGoPremium, favorites, onToggleFavorite }) => {
  const [selectedYear, setSelectedYear] = useState<string>('Tous');

  const exams = useMemo(() => [
    { title: "LLA: Mexico 2022", year: "2022", file: "Espagnol_2022-LLA_Mexico-convert-1.jpg" },
    { title: "LLA: Pacifico", year: "2022", file: "Espagnol_2022_LLAPacifico-convert-1.jpg" },
    { title: "LLA: Belmopan", year: "2022", file: "Espagnol_2022_LLA_Belmopan-convert-1.jpg" },
    { title: "LLA: Inconcible", year: "2022", file: "Espagnol_2022_LLA_Inconcible-convert-1.jpg" },
    { title: "LLA: Managua", year: "2022", file: "Espagnol_2022_LLA_Managua-convert-1.jpg" },
    { title: "LLA: Montevideo", year: "2022", file: "Espagnol_2022_LLA_Montevideo-convert-1.jpg" },
    { title: "LLA: Nicaragua", year: "2022", file: "Espagnol_2022_LLA_Nicaragua-convert-1.jpg" },
    { title: "LLA: Paramaribo", year: "2022", file: "Espagnol_2022_LLA_Paramaribo-convert-1.jpg" },
    { title: "LLA: Reyalado", year: "2022", file: "Espagnol_2022_LLA_Reyalado-convert-1.jpg" },
    { title: "SES/SMP/SVT: Asuncion", year: "2022", file: "Espagnol_2022_SES-SMP-SVT_Asuncion-convert-1.jpg" },
    { title: "SES/SMP/SVT: Brasilia", year: "2022", file: "Espagnol_2022_SES-SMP-SVT_Brasilia-convert-1.jpg" },
    { title: "SES/SMP/SVT: San-Juan", year: "2022", file: "Espagnol_2022_SES-SMP-SVT_San-Juan-convert-1.jpg" },
    { title: "SES/SMP/SVT: San-Salvador", year: "2022", file: "Espagnol_2022_SES-SMP-SVT_San-Salvador-convert-1.jpg" },
    { title: "SVT/SES/SMP: Alegremente", year: "2022", file: "Espagnol_2022_SVT-SES-SMP_Alegremente-convert-1.jpg" },
    { title: "SVT/SES/SMP: Confiado", year: "2022", file: "Espagnol_2022_SVT-SES-SMP_Confiado--convert-1.jpg" },
    { title: "SVT/SES/SMP: Increible", year: "2022", file: "Espagnol_2022_SVT-SES-SMP_Increible-convert-1.jpg" },
    { title: "SVT/SES/SMP: Leal", year: "2022", file: "Espagnol_2022_SVT-SES-SMP_Leal-convert-1.jpg" },
    { title: "SVT/SES/SMP: Optimista", year: "2022", file: "Espagnol_2022_SVT-SES-SMP_Optimista-convert-1.jpg" },
    { title: "SVT/SES/SMP: Tranquilamente", year: "2022", file: "Espagnol_2022_SVT-SES-SMP_Tranquilamente-convert-1.jpg" },
    { title: "LLA: Indicado (P1)", year: "2021", file: "Espagnol_2021_LLA_Indicado-convert-1.jpg" },
    { title: "LLA: Indicado (P2)", year: "2021", file: "Espagnol_2021_LLA_Indicado-convert-2.jpg" },
    { title: "SES/SVT: Derecho", year: "2021", file: "Espagnol_2021_SES-SVT-SMO_Derecho-convert-1.jpg" },
    { title: "SES/SVT: Principios", year: "2021", file: "Espagnol_2021_SES-SVT-SMP_Principios-convert-1.jpg" },
    { title: "SVT/SES: Describa (P1)", year: "2021", file: "Espagnol_2021_SVT-SM-SES_Describa-convert-1.jpg" },
    { title: "SVT/SES: Describa (P2)", year: "2021", file: "Espagnol_2021_SVT-SM-SES_Describa-convert-2.jpg" },
    { title: "SVT/SES: Recogida (P1)", year: "2021", file: "Espagnol_2021_SVT-SM-SES_Recogida-convert-1.jpg" },
    { title: "SVT/SES: Recogida (P2)", year: "2021", file: "Espagnol_2021_SVT-SM-SES_Recogida-convert-2.jpg" },
    { title: "SVT/SES: Vivienda (P1)", year: "2021", file: "Espagnol_2021_SVT-SM-SES_Vivienda-convert-1.jpg" },
    { title: "SVT/SES: Vivienda (P2)", year: "2021", file: "Espagnol_2021_SVT-SM-SES_Vivienda-convert-2.jpg" },
    { title: "SES/SVT: Impacto (V1)", year: "2020", file: "Espagnol_2020_SES-SVT-SMP_Impacto (1)-convert-1.jpg" },
    { title: "SES/SVT: Impacto (V2)", year: "2020", file: "Espagnol_2020_SES-SVT-SMP_Impacto-convert-1.jpg" },
    { title: "SES/SVT: Naturales", year: "2020", file: "Espagnol_2020_SES-SVT-SMP_Naturales-convert-1.jpg" },
    { title: "Impacto MENFP 2019", year: "2019", file: "Espagnol-Bacc-2019-Impacto-MENFP-2-1-convert-1.jpg" },
    { title: "LLA: Entonces (P1)", year: "2019", file: "Espagnol_2019_LLA_Entonces-convert-1.jpg" },
    { title: "LLA: Alors (P2)", year: "2019", file: "Espagnol_2019_LLA_Entonces-convert-2.jpg" },
    { title: "SES/SVT: Intelectual 1 (P1)", year: "2019", file: "Espagnol_2019_SES-SVT-SMP_Intelectual (1)-convert-1.jpg" },
    { title: "SES/SVT: Intelectual 1 (P2)", year: "2019", file: "Espagnol_2019_SES-SVT-SMP_Intelectual (1)-convert-2.jpg" },
    { title: "SES/SVT: Intelectual 2 (P1)", year: "2019", file: "Espagnol_2019_SES-SVT-SMP_Intelectual-convert-1.jpg" },
    { title: "SES/SVT: Intelectual 2 (P2)", year: "2019", file: "Espagnol_2019_SES-SVT-SMP_Intelectual-convert-2.jpg" },
    { title: "SES/SVT: Necesario (P1)", year: "2019", file: "Espagnol_2019_SES-SVT-SMP_Necesario-convert-1.jpg" },
    { title: "SES/SVT: Necesario (P2)", year: "2019", file: "Espagnol_2019_SES-SVT-SMP_Necesario-convert-2.jpg" },
    { title: "SES/SVT: Renunciar (P1)", year: "2019", file: "Espagnol_2019_SES-SVT-SMP_Renunciar-convert-1.jpg" },
    { title: "SES/SVT: Renunciar (P2)", year: "2019", file: "Espagnol_2019_SES-SVT-SMP_Renunciar-convert-2.jpg" },
    { title: "LLA: Escapada (P1)", year: "2018", file: "Espagnol_2018_LLA_Escapada-convert-1.jpg" },
    { title: "LLA: Escapada (P2)", year: "2018", file: "Espagnol_2018_LLA_Escapada-convert-2.jpg" },
    { title: "SES/SVT: Escachar (P1)", year: "2018", file: "Espagnol_2018_SES-SVT-SMP_Escachar-convert-1.jpg" },
    { title: "SES/SVT: Escachar (P2)", year: "2018", file: "Espagnol_2018_SES-SVT-SMP_Escachar-convert-2.jpg" },
    { title: "Recueil NS4 (P1)", year: "Archives", file: "Espagnol-NS4-201420162018-convert-1.jpg" },
    { title: "Recueil NS4 (P2)", year: "Archives", file: "Espagnol-NS4-201420162018-convert-2.jpg" },
    { title: "Recueil NS4 (P3)", year: "Archives", file: "Espagnol-NS4-201420162018-convert-3.jpg" },
    { title: "Escalade (P1)", year: "2016", file: "Espagnol_2016_Escalade-convert-1.jpg" },
    { title: "Escamoter (P1)", year: "2016", file: "Espagnol_2016_Escamoter-convert-1.jpg" },
    { title: "Escarbot (P1)", year: "2016", file: "Espagnol_2016_Escarbot-convert-1.jpg" },
    { title: "Espadon (P1)", year: "2016", file: "Espagnol_2016_Espadon-convert-1.jpg" },
    { title: "Echada", year: "2015", file: "Espagnol_2015_Echada-convert-1.jpg" },
    { title: "LLA: Mexico Archive", year: "2002", file: "Espagnol_2002_LLA_Mexico-convert-1.jpg" }
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
            <h2 className="text-[#101518] text-lg font-extrabold leading-tight uppercase">Espagnol</h2>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest opacity-80">Archives MENFP</p>
          </div>
        </div>
        <div className="px-5 pb-4">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-yellow-600 shadow-sm appearance-none">
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
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner ${locked ? 'bg-slate-100 text-slate-400' : 'bg-yellow-50 text-yellow-600'}`}><span className="material-symbols-outlined text-[26px]">{locked ? 'lock' : 'translate'}</span></div>
                  <div className="flex-1 min-w-0 pr-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-[#101518] tracking-tight">{exam.year === 'Archives' ? 'NS4' : exam.year}</span>
                      {locked && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-widest">Premium</span>}
                    </div>
                    <p className="text-sm text-text-sub font-bold truncate uppercase tracking-tight mt-0.5">{exam.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => locked ? onGoPremium() : onViewPdf(exam.file, exam.title, exam.year, 'Espagnol')} className="h-12 rounded-xl bg-slate-50 text-slate-600 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-100"><span className="material-symbols-outlined text-[20px]">{locked ? 'lock_open' : 'visibility'}</span><span>{locked ? 'Débloquer' : 'Voir'}</span></button>
                  <button onClick={() => locked ? onGoPremium() : onStartTutor({ name: exam.title, year: exam.year, subject: 'Espagnol', fileName: exam.file })} className={`h-12 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${locked ? 'bg-slate-200 text-slate-400' : 'bg-yellow-600 text-white'}`}><span className="material-symbols-outlined text-[20px]">smart_toy</span><span>Correction IA</span></button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default SpanishExamsScreen;
