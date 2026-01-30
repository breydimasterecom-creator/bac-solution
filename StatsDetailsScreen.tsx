
import React, { useMemo } from 'react';
import { Activity } from '../types';

interface StatsDetailsScreenProps {
  onBack: () => void;
  activities: Activity[];
}

const StatsDetailsScreen: React.FC<StatsDetailsScreenProps> = ({ onBack, activities }) => {
  
  // Configuration des objectifs par matière pour le calcul de progression
  const subjectConfig = [
    { name: 'Mathématiques', icon: 'calculate', color: 'bg-green-500', target: 20 },
    { name: 'Physique', icon: 'bolt', color: 'bg-blue-500', target: 15 },
    { name: 'Chimie', icon: 'science', color: 'bg-indigo-500', target: 15 },
    { name: 'Philosophie', icon: 'psychology', color: 'bg-red-500', target: 12 },
    { name: 'SVT', icon: 'biotech', color: 'bg-emerald-500', target: 15 },
    { name: 'Anglais', icon: 'language', color: 'bg-purple-500', target: 10 },
    { name: 'Créole', icon: 'chat', color: 'bg-orange-500', target: 10 },
    { name: 'Histoire & Géo', icon: 'public', color: 'bg-cyan-500', target: 12 },
    { name: 'Informatique', icon: 'computer', color: 'bg-sky-500', target: 8 },
    { name: 'Économie', icon: 'trending_up', color: 'bg-blue-600', target: 10 },
  ];

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const todayActivities = activities.filter(a => new Date(a.timestamp).toDateString() === today);
    
    // Calcul du streak
    const uniqueDays = Array.from(new Set(activities.map(a => new Date(a.timestamp).toDateString())));
    let streak = 0;
    const checkDate = new Date();
    while(uniqueDays.includes(checkDate.toDateString())) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Calcul de la progression par matière
    const subjectProgress = subjectConfig.map(sub => {
      const done = activities.filter(a => a.subject.includes(sub.name) || sub.name.includes(a.subject)).length;
      const percent = Math.min(100, Math.round((done / sub.target) * 100));
      return { ...sub, done, percent };
    }).sort((a, b) => b.percent - a.percent);

    return {
      todayCount: todayActivities.length,
      streak,
      total: activities.length,
      exams: activities.filter(a => a.type === 'exam').length,
      quizzes: activities.filter(a => a.type === 'quiz').length,
      subjectProgress
    };
  }, [activities]);

  const chartData = useMemo(() => {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const now = new Date();
    return days.map((day, i) => {
      const d = new Date();
      // On se cale sur le lundi de la semaine actuelle
      const dayOffset = now.getDay() === 0 ? 6 : now.getDay() - 1;
      d.setDate(now.getDate() - dayOffset + i);
      const count = activities.filter(a => new Date(a.timestamp).toDateString() === d.toDateString()).length;
      return { label: day, count, height: Math.min(100, (count / 5) * 100) };
    });
  }, [activities]);

  return (
    <div className="min-h-screen flex flex-col font-display bg-[#F4F7F9] text-slate-900 antialiased h-full relative">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-6 py-4 flex items-center gap-4 border-b border-gray-100 shrink-0 shadow-sm">
        <button onClick={onBack} className="size-10 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-slate-50">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-black tracking-tight uppercase">Tableau de Bord</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-6 pb-20 w-full max-w-md mx-auto hide-scrollbar text-left">
        {/* Cartes de résumé */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-white p-5 rounded-[2rem] shadow-soft border border-white flex flex-col gap-3">
             <div className="size-10 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
               <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
             </div>
             <div>
               <p className="text-2xl font-black">{stats.streak} j.</p>
               <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Série (Streak)</p>
             </div>
           </div>
           <div className="bg-white p-5 rounded-[2rem] shadow-soft border border-white flex flex-col gap-3">
             <div className="size-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
               <span className="material-symbols-outlined text-[24px]">history_edu</span>
             </div>
             <div>
               <p className="text-2xl font-black">{stats.total}</p>
               <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Activités totales</p>
             </div>
           </div>
        </div>

        {/* Graphique d'activité hebdomadaire */}
        <section className="bg-white p-6 rounded-[2.5rem] shadow-soft border border-white mb-8">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Activité Hebdo</h3>
              <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg">Cette semaine</span>
           </div>
           <div className="flex items-end justify-between h-28 gap-2 px-1">
             {chartData.map((d, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2">
                 <div className="w-full bg-slate-50 rounded-full relative flex items-end overflow-hidden" style={{ height: '80px' }}>
                    <div 
                      className={`w-full ${d.count > 0 ? 'bg-primary' : 'bg-slate-200'} rounded-full transition-all duration-700 ease-out`} 
                      style={{ height: `${Math.max(8, d.height)}%` }}
                    ></div>
                 </div>
                 <span className="text-[8px] font-black text-slate-400 uppercase">{d.label}</span>
               </div>
             ))}
           </div>
        </section>

        {/* Progression par matière détaillée */}
        <section className="space-y-4 mb-8">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progression par matière</h3>
              <span className="text-[9px] font-bold text-slate-400">Objectif NS4</span>
           </div>
           
           <div className="bg-white rounded-[2.5rem] p-6 shadow-soft border border-white space-y-6">
              {stats.subjectProgress.map((sub, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-xl ${sub.color} bg-opacity-10 flex items-center justify-center text-sm font-bold`}>
                        <span className={`material-symbols-outlined text-lg ${sub.color.replace('bg-', 'text-')}`}>{sub.icon}</span>
                      </div>
                      <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{sub.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400">{sub.percent}%</span>
                  </div>
                  <div className="relative h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                    <div 
                      className={`absolute top-0 left-0 h-full ${sub.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${sub.percent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between px-0.5">
                     <p className="text-[8px] font-bold text-slate-300 uppercase">{sub.done} exercices faits</p>
                     <p className="text-[8px] font-bold text-slate-300 uppercase">Cible: {sub.target}</p>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* Répartition des types d'étude */}
        <section className="bg-slate-900 rounded-[2.5rem] p-7 text-white shadow-xl mb-10 overflow-hidden relative">
           <div className="absolute top-[-10%] right-[-10%] size-32 bg-primary/20 rounded-full blur-3xl"></div>
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-primary">Répartition</h3>
           <div className="flex gap-8">
              <div className="flex flex-col gap-1">
                 <span className="text-3xl font-black text-white">{stats.exams}</span>
                 <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">Examens Corrigés</span>
              </div>
              <div className="w-px h-10 bg-white/10 my-auto"></div>
              <div className="flex flex-col gap-1">
                 <span className="text-3xl font-black text-white">{stats.quizzes}</span>
                 <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">Quiz Pratiqués</span>
              </div>
           </div>
           <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-[10px] font-medium text-slate-400 italic leading-relaxed">
                "La répétition est la clé de la réussite au Bac. Chaque statistique est une étape vers ton diplôme."
              </p>
           </div>
        </section>
      </main>
    </div>
  );
};

export default StatsDetailsScreen;
