
import React, { useState, useMemo } from 'react';
import { Activity, QuizQuestion } from '../types';

interface ResolutionsScreenProps {
  onBack: () => void;
  activities: Activity[];
  onSelectResolution: (name: string, year: string, content?: string, quizData?: { questions: QuizQuestion[], userAnswers: number[] }, imageFileName?: string) => void;
  onGoToHome: () => void;
  onGoToExams: () => void;
  onGoToQuiz: () => void;
  onGoToProfile: () => void;
  onGoToTutor: () => void;
}

const ResolutionsScreen: React.FC<ResolutionsScreenProps> = ({ 
  onBack, 
  activities,
  onSelectResolution, 
  onGoToHome, 
  onGoToExams, 
  onGoToQuiz, 
  onGoToProfile,
  onGoToTutor
}) => {
  const [activeTab, setActiveTab] = useState<'exams' | 'quiz'>('exams');

  const workedExams = useMemo(() => activities.filter(a => a.type === 'exam'), [activities]);
  const doneQuizzes = useMemo(() => activities.filter(a => a.type === 'quiz'), [activities]);

  const getRelativeTime = (timestamp: number) => {
    const d = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Hier";
    if (days < 7) return `Il y a ${days} j.`;
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const EmptyState = ({ message, icon }: { message: string, icon: string }) => (
    <div className="flex flex-col items-center justify-center py-20 px-10 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5 text-slate-300">
        <span className="material-symbols-outlined text-4xl">{icon}</span>
      </div>
      <p className="text-slate-400 font-bold text-sm uppercase tracking-widest leading-relaxed">
        {message}
      </p>
      <button 
        onClick={activeTab === 'exams' ? onGoToExams : onGoToQuiz}
        className="mt-6 text-primary font-black text-xs border-b-2 border-primary/20 pb-1 uppercase"
      >
        Commencer maintenant
      </button>
    </div>
  );

  return (
    <div className="bg-background-light h-full flex flex-col font-display text-slate-800 antialiased overflow-hidden relative text-left">
      {/* Header */}
      <header className="shrink-0 z-50 bg-[#E8EFF5]/90 backdrop-blur-md px-5 py-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={onBack} className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase">Mes Résolutions</h1>
        <div className="w-10"></div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col gap-5 px-4 pt-5 pb-28 hide-scrollbar scroll-smooth">
        {/* Intro Context */}
        <div className="bg-white border border-white rounded-[2rem] p-5 shadow-card">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <span className="material-symbols-outlined">history_edu</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Historique</p>
              <p className="text-slate-500 text-[13px] font-medium leading-relaxed">
                Retrouve ici tes examens analysés par l'IA et tes scores de quiz.
              </p>
            </div>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl shrink-0">
          <button 
            onClick={() => setActiveTab('exams')}
            className={`flex-1 py-3 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all ${activeTab === 'exams' ? 'bg-white text-primary shadow-soft' : 'text-slate-500'}`}
          >
            Examens Corrigés
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-3 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all ${activeTab === 'quiz' ? 'bg-white text-primary shadow-soft' : 'text-slate-500'}`}
          >
            Quiz Effectués
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="flex flex-col gap-3">
          {activeTab === 'exams' ? (
            workedExams.length > 0 ? (
              workedExams.map((exam) => (
                <div 
                  key={exam.id} 
                  onClick={() => {
                    const yearMatch = exam.title.match(/\d{4}/);
                    onSelectResolution(exam.title, yearMatch ? yearMatch[0] : "Spécial", exam.content, undefined, exam.imageFileName);
                  }}
                  className="bg-white rounded-[1.5rem] p-4 shadow-card border border-white flex flex-col gap-4 active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${exam.content ? 'bg-indigo-50 text-indigo-500' : 'bg-blue-50 text-primary'} group-hover:scale-110 transition-transform`}>
                        <span className="material-symbols-outlined text-[22px]">{exam.content ? 'auto_fix_high' : 'description'}</span>
                      </div>
                      <div className="text-left min-w-0">
                        <h3 className="font-bold text-slate-900 text-[14px] truncate">{exam.title}</h3>
                        <p className="text-[10px] text-text-sub font-black uppercase tracking-widest mt-0.5">{exam.subject}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-slate-300 uppercase shrink-0">{getRelativeTime(exam.timestamp)}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white font-black py-3 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-glow active:brightness-90">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      Revoir
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onGoToTutor(); }}
                      className="flex-1 bg-slate-50 border border-slate-100 text-slate-500 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:bg-slate-100"
                    >
                      <span className="material-symbols-outlined text-[18px]">psychology</span>
                      Tuteur IA
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState message="Aucun examen corrigé pour le moment" icon="description" />
            )
          ) : (
            doneQuizzes.length > 0 ? (
              doneQuizzes.map((quiz) => (
                <div 
                  key={quiz.id} 
                  onClick={() => onSelectResolution(quiz.title, "Modèle", undefined, quiz.quizData)}
                  className="bg-white rounded-[1.5rem] p-4 shadow-card border border-white flex items-center justify-between active:bg-slate-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center text-accent-green group-hover:rotate-6 transition-transform">
                      <span className="material-symbols-outlined text-[24px]">quiz</span>
                    </div>
                    <div className="text-left min-w-0">
                      <h3 className="font-bold text-slate-900 text-[14px] truncate">{quiz.title}</h3>
                      <p className="text-[10px] text-text-sub font-black uppercase tracking-widest mt-0.5">{getRelativeTime(quiz.timestamp)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0 pl-2">
                    <span className={`text-base font-black ${quiz.score && parseInt(quiz.score) >= 7 ? 'text-accent-green' : 'text-orange-400'}`}>
                      {quiz.score || "N/A"}
                    </span>
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">Score</span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState message="Tu n'as pas encore effectué de quiz" icon="quiz" />
            )
          )}
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#E8EFF5]/95 backdrop-blur-md border-t border-slate-200 rounded-t-[2rem] shadow-strong z-50 shrink-0">
        <div className="relative flex justify-around items-center h-[72px] px-2 max-w-lg mx-auto">
          <button onClick={onGoToHome} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400 hover:text-primary transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[24px]">home</span>
            <span className="text-[9px] font-medium uppercase">Accueil</span>
          </button>
          <button onClick={onGoToExams} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400 hover:text-primary transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[24px]">library_books</span>
            <span className="text-[9px] font-medium uppercase">Examens</span>
          </button>
          
          <div className="w-14 h-14 relative -top-6">
            <button onClick={onGoToTutor} className="absolute w-12 h-12 left-1 top-1 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-glow flex items-center justify-center text-white active:scale-95 transition-transform border-[3px] border-white">
              <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            </button>
            <span className="absolute -bottom-1 w-full text-center text-[8px] font-black text-primary uppercase tracking-tighter">Tuteur IA</span>
          </div>

          <button onClick={onGoToQuiz} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400 hover:text-primary transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[24px]">quiz</span>
            <span className="text-[9px] font-medium uppercase">Quiz</span>
          </button>
          
          <button onClick={onGoToProfile} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400 hover:text-primary transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[24px]">person</span>
            <span className="text-[9px] font-medium uppercase">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ResolutionsScreen;
