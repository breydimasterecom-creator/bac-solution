
import React, { useState, useMemo } from 'react';

interface ExamDetailsScreenProps {
  examName: string;
  year: string;
  onBack: () => void;
  onStartTutor: () => void;
  onLogout: () => void;
}

interface ExerciseDetail {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  keyConcepts: string[];
}

const ExamDetailsScreen: React.FC<ExamDetailsScreenProps> = ({ examName, year, onBack, onStartTutor }) => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDetail | null>(null);

  // Génération dynamique des thèmes selon le nom de l'examen pour plus de réalisme MENFP
  const focusPoints: ExerciseDetail[] = useMemo(() => {
    const isMath = examName.toLowerCase().includes('math');
    const isPhys = examName.toLowerCase().includes('phys');
    const isHist = examName.toLowerCase().includes('hist');

    if (isMath) {
      return [
        { id: '01', title: 'Analyse & Suites', difficulty: '6 pts • Élevé', description: 'Étude de convergence et calcul intégral.', keyConcepts: ['Intégrales', 'Suites', 'Limites'] },
        { id: '02', title: 'Arithmétique', difficulty: '4 pts • Moyen', description: 'Divisibilité et congruences dans Z.', keyConcepts: ['PGCD', 'Bézout', 'Gauss'] },
        { id: '03', title: 'Nombres Complexes', difficulty: '4 pts • Moyen', description: 'Forme exponentielle et géométrie plane.', keyConcepts: ['Module', 'Similitudes', 'C'] }
      ];
    }
    if (isPhys) {
      return [
        { id: '01', title: 'Électromagnétisme', difficulty: '5 pts • Moyen', description: 'Loi de Laplace et induction.', keyConcepts: ['Flux', 'Auto-induction', 'B'] },
        { id: '02', title: 'Physique Moderne', difficulty: '5 pts • Élevé', description: 'Radioactivité et Relativité restreinte.', keyConcepts: ['E=mc2', 'Fission', 'Einstein'] },
        { id: '03', title: 'Mécanique', difficulty: '4 pts • Moyen', description: 'Mouvement des projectiles et lois de Kepler.', keyConcepts: ['Accélération', 'Gravitation', 'Newton'] }
      ];
    }
    if (isHist) {
      return [
        { id: '01', title: 'Histoire d\'Haïti', difficulty: '7 pts • Analyse', description: 'De l\'Occupation américaine (1915) à 1934.', keyConcepts: ['Désoccupation', 'Borno', 'Vincent'] },
        { id: '02', title: 'L\'ère Duvalier', difficulty: '5 pts • Synthèse', description: 'Le régime de François et Jean-Claude Duvalier.', keyConcepts: ['Papadocratie', 'Tontons Macoutes', '1986'] },
        { id: '03', title: 'Monde Contemporain', difficulty: '4 pts • Réflexion', description: 'La Guerre Froide et la création de l\'ONU.', keyConcepts: ['Blocs', 'Yalta', 'Mondialisation'] }
      ];
    }

    return [
      { id: '01', title: 'Compréhension', difficulty: '10 pts', description: 'Analyse de texte et vocabulaire contextuel.', keyConcepts: ['Thématique', 'Analyse'] },
      { id: '02', title: 'Production écrite', difficulty: '10 pts', description: 'Dissertation ou synthèse argumentée selon les normes MENFP.', keyConcepts: ['Plan', 'Arguments'] }
    ];
  }, [examName]);

  return (
    <div className="bg-page-gradient min-h-screen flex flex-col font-display text-text-main antialiased pb-28 relative overflow-hidden h-full">
      <header className="shrink-0 pt-12 pb-4 px-6 flex items-center justify-between sticky top-0 z-50 bg-[#F4F7F9]/90 backdrop-blur-md">
        <button onClick={onBack} className="h-10 w-10 -ml-2 rounded-full flex items-center justify-center text-text-main hover:bg-gray-100 active:scale-90"><span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span></button>
        <span className="font-bold text-lg text-text-main truncate flex-1 text-center px-2">{examName} {year !== 'Modèle' ? year : ''}</span>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar px-6 pt-2 pb-10">
        <div className="flex flex-col gap-6">
          <section className="flex flex-col items-center">
            <div className="relative w-40 aspect-[210/297] bg-white rounded-lg shadow-strong flex flex-col items-center p-5 border border-white mb-6 group cursor-pointer active:scale-95">
              <div className="w-full h-1 bg-gray-100 rounded mb-2"></div>
              <div className="w-3/4 h-1 bg-gray-100 rounded mb-4"></div>
              <div className="w-full flex-1 bg-slate-50 rounded-sm mb-2"></div>
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">MENFP</div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-text-main mb-2 leading-tight">Sujet Officiel NS4</h1>
              <p className="text-text-sub text-sm font-medium">{year === 'Modèle' ? 'Suivi du programme cadre' : `Session ${year}`}</p>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <button 
              className="w-full bg-white text-primary border-2 border-primary/20 font-black py-4 rounded-2xl active:scale-[0.98] flex items-center justify-center gap-3 shadow-soft"
              onClick={() => alert("Chargement du document original...")}
            >
              <span className="material-symbols-outlined font-bold">visibility</span>
              <span className="uppercase text-xs tracking-widest">Voir l'examen</span>
            </button>
            
            <button onClick={onStartTutor} className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-glow active:scale-[0.98] flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">smart_toy</span>
              <span className="uppercase text-xs tracking-widest">Lancer la Correction IA</span>
            </button>
          </section>

          <section>
            <h3 className="font-bold text-text-main text-lg mb-4">Points clés du sujet</h3>
            <div className="flex flex-col gap-3">
              {focusPoints.map((point) => (
                <div key={point.id} onClick={() => setSelectedExercise(point)} className="bg-white p-4 rounded-2xl shadow-card border border-white flex items-center justify-between active:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary font-black text-sm shrink-0">{point.id}</div>
                    <div className="text-left">
                      <p className="font-bold text-sm">{point.title}</p>
                      <p className="text-[10px] text-text-sub font-bold uppercase tracking-tighter">{point.difficulty}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {selectedExercise && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedExercise(null)}></div>
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-strong p-6 animate-in slide-in-from-bottom-10">
            <h4 className="text-xl font-bold mb-2">{selectedExercise.title}</h4>
            <p className="text-sm text-text-sub leading-relaxed mb-6">{selectedExercise.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedExercise.keyConcepts.map(c => <span key={c} className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black rounded-lg uppercase">{c}</span>)}
            </div>
            <button onClick={onStartTutor} className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-glow">Réviser ce point avec l'IA</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamDetailsScreen;
