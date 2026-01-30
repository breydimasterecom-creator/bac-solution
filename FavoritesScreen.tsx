
import React, { useMemo } from 'react';
import { Activity, QuizQuestion, UserProfile } from '../types';

interface FavoritesScreenProps {
  onBack: () => void;
  activities: Activity[];
  userProfile: UserProfile;
  onToggleFavorite: (title: string) => void;
  onShowDetails: (name: string, year: string, subject: string, content?: string, quizData?: { questions: QuizQuestion[], userAnswers: number[] }, imageFileName?: string) => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ onBack, activities, userProfile, onToggleFavorite, onShowDetails }) => {
  const favoriteItems = useMemo(() => {
    const favTitles = userProfile.favorites || [];
    
    return favTitles.map(title => {
      const activity = activities.find(a => a.title === title);
      const yearMatch = title.match(/\d{4}/);
      
      return {
        id: title,
        title: title,
        subject: activity?.subject || 'Baccalauréat',
        year: yearMatch ? yearMatch[0] : "Modèle",
        content: activity?.content,
        imageFileName: activity?.imageFileName,
        quizData: activity?.quizData,
        type: activity?.type || 'exam',
        score: activity?.score
      };
    });
  }, [userProfile.favorites, activities]);

  return (
    <div className="bg-background-light min-h-screen flex flex-col font-display text-text-main antialiased pb-24 h-full relative">
      <header className="sticky top-0 z-40 bg-white p-5 flex items-center justify-between border-b border-slate-100 shadow-sm shrink-0 h-20">
        <button onClick={onBack} className="text-text-main flex size-12 shrink-0 items-center justify-center rounded-full active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[30px] font-bold">chevron_left</span>
        </button>
        <div className="flex flex-col items-center flex-1">
          <h1 className="text-lg font-black tracking-tight uppercase">Mes Favoris</h1>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{favoriteItems.length} Enregistrements</span>
        </div>
        <div className="w-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-6 flex flex-col gap-4 hide-scrollbar scroll-smooth">
        {favoriteItems.length > 0 ? (
          favoriteItems.map((item, i) => (
            <div 
              key={`${item.title}-${i}`}
              onClick={() => onShowDetails(item.title, item.year, item.subject, item.content, item.quizData, item.imageFileName)}
              className="bg-white p-5 rounded-[2rem] shadow-card border border-white flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer group animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 bg-blue-50 text-primary border border-white shadow-sm transition-transform group-hover:rotate-3">
                <span className="material-symbols-outlined text-[30px]">{item.type === 'quiz' ? 'quiz' : 'star'}</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">{item.subject}</span>
                <h3 className="font-extrabold text-[#101518] text-[15px] truncate leading-tight">{item.title}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
                  {item.type === 'quiz' ? `Dernier Score: ${item.score || 'N/A'}` : `${item.year} • Archive`}
                </p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.title); }}
                className="size-11 flex items-center justify-center text-yellow-400 bg-yellow-50/50 rounded-full active:scale-75 transition-all"
              >
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-5">
            <div className="size-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-200">
              <span className="material-symbols-outlined text-5xl">bookmark_border</span>
            </div>
            <div className="space-y-2 px-10">
              <p className="text-lg font-black text-[#101518] uppercase tracking-tight">Aucun examen sauvegardé pour le moment</p>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Clique sur l'étoile dorée lors d'une correction pour la retrouver ici instantanément sur tous tes appareils.
              </p>
            </div>
          </div>
        )}
        <div className="h-20 shrink-0"></div>
      </main>
    </div>
  );
};

export default FavoritesScreen;
