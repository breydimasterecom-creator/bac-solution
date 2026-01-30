
import React, { useMemo } from 'react';
import { Activity, UserProfile } from '../types';

interface DashboardProps {
  userProfile: UserProfile;
  activities: Activity[];
  onStartTutor: () => void;
  onLogout: () => void;
  onGoToExams: () => void;
  onGoToQuiz: () => void;
  onGoToProfile: () => void;
  onGoToResolutions: () => void;
  onGoToFavorites: () => void;
  onSelectActivity: (activity: Activity) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  userProfile,
  activities, 
  onStartTutor, 
  onGoToExams, 
  onGoToQuiz, 
  onGoToProfile, 
  onGoToResolutions,
  onGoToFavorites,
  onSelectActivity
}) => {
  
  const allSubjects = [
    { name: 'Mathématiques', icon: 'calculate', color: 'bg-accent-green', text: 'text-accent-green', target: 20 },
    { name: 'Physique', icon: 'bolt', color: 'bg-primary', text: 'text-primary', target: 15 },
    { name: 'Chimie', icon: 'science', color: 'bg-accent-coral', text: 'text-accent-coral', target: 15 },
    { name: 'Philosophie', icon: 'psychology', color: 'bg-indigo-500', text: 'text-indigo-500', target: 10 },
    { name: 'Créole', icon: 'chat', color: 'bg-amber-500', text: 'text-amber-500', target: 10 },
    { name: 'Anglais', icon: 'language', color: 'bg-purple-500', text: 'text-purple-500', target: 10 },
    { name: 'Sciences Soc.', icon: 'groups', color: 'bg-cyan-500', text: 'text-cyan-500', target: 12 },
    { name: 'Informatique', icon: 'computer', color: 'bg-sky-500', text: 'text-sky-500', target: 8 },
    { name: 'Bio / Géo', icon: 'eco', color: 'bg-emerald-500', text: 'text-emerald-500', target: 12 },
    { name: 'Économie', icon: 'trending_up', color: 'bg-blue-600', text: 'text-blue-600', target: 10 },
    { name: 'Espagnol', icon: 'translate', color: 'bg-yellow-600', text: 'text-yellow-600', target: 10 },
    { name: 'Art / Musique', icon: 'palette', color: 'bg-pink-500', text: 'text-pink-500', target: 5 },
  ];

  const sortedProgress = useMemo(() => {
    return allSubjects.map(s => {
      const subjectActivities = activities.filter(a => a.subject === s.name);
      const count = subjectActivities.length;
      const percentage = Math.min(Math.round((count / s.target) * 100), 100);
      const latest = subjectActivities.length > 0 ? [...subjectActivities].sort((a, b) => b.timestamp - a.timestamp)[0] : null;
      return { ...s, percentage, count, latest };
    })
    .sort((a, b) => {
      if (a.latest && b.latest) return b.latest.timestamp - a.latest.timestamp;
      if (a.latest) return -1;
      if (b.latest) return 1;
      return 0;
    });
  }, [activities]);

  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuAuJmSerYyCO2xJmMpi3b8xCQNqrk9zntGZh5iSSzCzPyAUyVn-zGiKLaQIGoTpl_b6f093sFcCTwxeoYiU8EHKfUvjzegF3OT4h3WqXQOMU1rNjaGKNn4CIup0-AeNMfvJJoebonxk7JBfOULkUZ8aM1-Y-JHQHjZeG7oHGYfukK1m4xQUJmlWOYW3Z7hZkjM98kkKwe05B2YQ1g5h-E6BqtSDhjzoCAvjpD8gHWzBgh8Dt8t_845sSDx_zmCBpKlhWgydi8wAC7Sm";

  return (
    <div className="bg-[#F0F4F8] h-full flex flex-col font-display text-text-main antialiased overflow-hidden text-left relative">
      <header className="shrink-0 z-40 w-full px-5 py-3 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0">
        <div className="flex flex-col gap-0 text-left">
          <h1 className="text-[17px] font-bold tracking-tight text-text-main leading-tight">Salut, {userProfile.full_name || 'Étudiant'} ! 👋</h1>
          <p className="text-[#5e7b8d] text-[8px] font-black uppercase tracking-widest opacity-60">
            Objectif : {userProfile.target_score}/20 • {userProfile.filiere}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onGoToFavorites} className="h-9 w-9 rounded-full bg-white shadow-soft flex items-center justify-center text-yellow-400 active:scale-90 transition-transform border border-white/50">
            <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </button>
          <div onClick={onGoToProfile} className="h-10 w-10 rounded-full border-2 border-white shadow-soft overflow-hidden bg-white cursor-pointer active:scale-90 transition-transform">
            <img src={userProfile.avatar_url || defaultAvatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-32 flex flex-col gap-6 w-full max-w-md mx-auto hide-scrollbar scroll-smooth">
        {/* Hero AI Section */}
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div 
            onClick={onStartTutor} 
            className="relative w-full rounded-[1.8rem] overflow-hidden group cursor-pointer active:scale-[0.98] transition-all duration-300 bg-card-gradient shadow-glow"
          >
            <div className="relative p-5 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1 rounded-lg backdrop-blur-md">
                    <span className="material-symbols-outlined text-white text-base">smart_toy</span>
                  </div>
                  <h2 className="text-white text-base font-black leading-tight">Tuteur IA</h2>
                </div>
                <p className="text-white/80 text-[9px] font-bold leading-tight">
                  Demande une correction ou pose une question !
                </p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                 <span className="material-symbols-outlined text-white text-2xl animate-pulse">psychology</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats par Matière */}
        <section className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <h3 className="text-[9px] font-black uppercase tracking-widest text-text-sub/50 ml-1">Statistiques par matière</h3>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 px-1 snap-x snap-mandatory">
            {sortedProgress.map((sub, i) => (
              <div key={i} className="snap-center min-w-[130px] bg-white p-4 rounded-[1.5rem] shadow-card border border-white flex flex-col gap-3 group transition-all active:scale-95">
                <div className="flex justify-between items-start">
                  <div className={`${sub.color}/10 p-2 rounded-xl ${sub.text}`}>
                    <span className="material-symbols-outlined text-lg">{sub.icon}</span>
                  </div>
                  <span className="text-[9px] font-black text-text-main">{sub.percentage}%</span>
                </div>
                <div>
                  <p className="text-text-main font-black text-[9px] truncate uppercase tracking-tight">{sub.name}</p>
                  <div className="w-full bg-slate-50 rounded-full h-1 mt-1.5 overflow-hidden border border-slate-100">
                    <div className={`${sub.color} h-full rounded-full`} style={{ width: `${sub.percentage}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Liste Activités */}
        <section className="flex flex-col gap-3 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-600">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[9px] font-black uppercase tracking-widest text-text-sub/50">Activités récentes</h3>
            <button onClick={onGoToResolutions} className="text-[8px] font-black text-primary uppercase">Voir tout</button>
          </div>
          
          <div className="flex flex-col gap-2.5">
            {activities.length > 0 ? (
              activities.slice(0, 5).map((activity) => (
                <div 
                  key={activity.id} 
                  onClick={() => onSelectActivity(activity)}
                  className="bg-white px-4 py-3.5 rounded-[1.5rem] shadow-card border border-white flex items-center gap-3 active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <div className="bg-[#EBF7FF] h-10 w-10 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm">
                    <span className="material-symbols-outlined text-[#009CFF] text-[20px]">
                      {activity.type === 'quiz' ? 'quiz' : 'description'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-text-main truncate text-[13px] leading-tight">
                      {activity.title}
                    </h4>
                    <p className="text-[#98A6AD] text-[9px] font-bold uppercase tracking-widest mt-0.5">
                      {activity.subject} • {activity.type === 'quiz' ? `Score: ${activity.score}` : 'Corrigé'}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 text-base">chevron_right</span>
                </div>
              ))
            ) : (
              <div className="bg-white/40 border-2 border-dashed border-gray-200 rounded-[1.5rem] p-6 flex flex-col items-center justify-center text-center">
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest leading-relaxed">
                  Aucune activité récente.
                </p>
                <button 
                  onClick={onGoToExams}
                  className="mt-3 bg-primary text-white text-[8px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                >
                  Démarrer une révision
                </button>
              </div>
            )}
          </div>
        </section>
        <div className="h-10 shrink-0"></div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 rounded-t-[1.8rem] shadow-strong z-50">
        <div className="flex justify-around items-center h-[68px] px-2 max-w-lg mx-auto">
          <button className="flex flex-col items-center justify-center w-16 gap-1 text-primary">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="text-[7px] font-black uppercase">Accueil</span>
          </button>
          <button onClick={onGoToExams} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400">
            <span className="material-symbols-outlined text-[22px]">library_books</span>
            <span className="text-[7px] font-bold uppercase">Examens</span>
          </button>
          <div className="w-11 h-11 relative -top-4">
            <button onClick={onStartTutor} className="absolute w-11 h-11 rounded-full shadow-glow flex items-center justify-center text-white border-4 border-white active:scale-95 transition-transform bg-primary">
              <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            </button>
          </div>
          <button onClick={onGoToQuiz} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400">
            <span className="material-symbols-outlined text-[22px]">quiz</span>
            <span className="text-[7px] font-bold uppercase">Quiz</span>
          </button>
          <button onClick={onGoToProfile} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400">
            <span className="material-symbols-outlined text-[22px]">person</span>
            <span className="text-[7px] font-bold uppercase">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
