
import React from 'react';
import { QuizQuestion } from '../types';
import { storageService } from '../services/storageService';

interface ResolutionDetailsScreenProps {
  examName: string;
  year: string;
  subject: string;
  customContent?: string;
  imageFileName?: string;
  quizData?: { questions: QuizQuestion[]; userAnswers: number[] };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
  onStartTutor: () => void;
  onGoToHome: () => void;
  onGoToExams: () => void;
  onGoToProfile: () => void;
}

const ResolutionDetailsScreen: React.FC<ResolutionDetailsScreenProps> = ({ 
  examName, 
  year, 
  subject,
  customContent,
  imageFileName,
  quizData,
  isFavorite,
  onToggleFavorite,
  onBack, 
  onStartTutor, 
  onGoToHome, 
  onGoToExams, 
  onGoToProfile 
}) => {
  return (
    <div className="bg-background-light min-h-screen flex flex-col font-display text-slate-900 antialiased pb-24 relative overflow-hidden h-full">
      <header className="sticky top-0 z-50 flex items-center bg-white p-4 pb-2 justify-between border-b border-slate-100 shadow-sm shrink-0 h-20">
        <button 
          onClick={onBack}
          className="text-slate-900 flex size-12 shrink-0 items-center justify-start focus:outline-none active:opacity-70 transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined text-3xl font-bold">chevron_left</span>
        </button>
        <div className="flex flex-col items-center flex-1 truncate px-2">
          <h2 className="text-[#101518] text-xl font-extrabold leading-tight tracking-tight truncate w-full text-center">
            {quizData ? "Détails du Quiz" : customContent ? "Correction IA" : "Résolution Détaillée"}
          </h2>
          <span className="text-[11px] font-black text-primary uppercase tracking-[0.15em] truncate mt-0.5">
            {quizData ? examName.replace('Quiz ', '') : subject} • {year !== 'Spécial' && year !== 'Modèle' ? year : ''}
          </span>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button 
            onClick={onToggleFavorite}
            className={`flex items-center justify-center transition-all duration-200 active:scale-75 ${isFavorite ? 'text-yellow-400 scale-110' : 'text-slate-300 hover:text-slate-400'}`}
          >
            <span className="material-symbols-outlined text-[32px]" style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}>
              star
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col gap-6 p-4 hide-scrollbar scroll-smooth">
        {imageFileName && !quizData && (
          <div className="w-full bg-white rounded-3xl overflow-hidden shadow-card border border-white animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Image de l'examen</span>
              <span className="material-symbols-outlined text-primary text-xl">image</span>
            </div>
            <div className="bg-slate-50 flex justify-center">
               <img 
                 src={storageService.getPublicUrl(subject, imageFileName)} 
                 alt="Sujet d'examen" 
                 className="max-w-full h-auto max-h-[400px] object-contain"
               />
            </div>
          </div>
        )}

        {quizData ? (
          <div className="space-y-6">
            {quizData.questions.map((q, idx) => {
              const userAnswerIndex = quizData.userAnswers[idx];
              const isCorrect = userAnswerIndex === q.correctAnswerIndex;
              return (
                <div key={idx} className="bg-white rounded-3xl border border-white shadow-card overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={`h-1.5 w-full ${isCorrect ? 'bg-accent-green' : 'bg-accent-coral'}`}></div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className={`flex-none w-7 h-7 rounded-xl flex items-center justify-center text-white text-[11px] font-black ${isCorrect ? 'bg-accent-green shadow-glow' : 'bg-accent-coral'}`}>
                        {idx + 1}
                      </span>
                      <h3 className="font-bold text-slate-900 leading-snug">{q.question}</h3>
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isUserChoice = userAnswerIndex === optIdx;
                        const isCorrectChoice = q.correctAnswerIndex === optIdx;
                        
                        let style = "bg-slate-50 border-slate-100 text-slate-600";
                        if (isCorrectChoice) style = "bg-green-50 border-green-200 text-green-700 font-bold border-2";
                        else if (isUserChoice && !isCorrect) style = "bg-red-50 border-red-200 text-red-700 font-bold border-2";

                        return (
                          <div key={optIdx} className={`p-4 rounded-2xl border text-[13px] flex items-center justify-between transition-all ${style}`}>
                            <span>{opt}</span>
                            {isCorrectChoice && <span className="material-symbols-outlined text-[20px] text-accent-green">check_circle</span>}
                            {isUserChoice && !isCorrect && <span className="material-symbols-outlined text-[20px] text-accent-coral">cancel</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">school</span>
                        Leçon & Explication
                      </p>
                      <p className="text-slate-600 text-xs leading-relaxed font-medium italic">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-card border border-white overflow-hidden">
              <div className={`h-2 w-full ${customContent ? 'bg-indigo-500' : 'bg-primary'}`}></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 rounded-xl ${customContent ? 'bg-indigo-50 text-indigo-500' : 'bg-blue-50 text-primary'}`}>
                    <span className="material-symbols-outlined text-2xl">
                      {customContent ? 'auto_fix_high' : 'function'}
                    </span>
                  </div>
                  <h3 className="text-[#101518] text-lg font-extrabold">
                    {customContent ? "Ta résolution personnalisée" : "Énoncé type"}
                  </h3>
                </div>
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 mb-2">
                  {customContent ? (
                    <div className="prose prose-slate text-[15px] leading-relaxed whitespace-pre-wrap font-medium text-slate-700">
                      {customContent}
                    </div>
                  ) : (
                    <>
                      <p className="text-slate-700 text-base font-medium leading-relaxed">
                        Voici l'analyse d'un exercice extrait de la session {year} :
                      </p>
                      <div className="text-slate-900 text-lg italic py-4 text-center border-y border-slate-100 my-4 font-bold">
                        "Sujet de {examName} - Analyse méthodique et résolution pas à pas."
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="bg-primary/5 border-2 border-dashed border-primary/10 rounded-[2rem] p-8 flex flex-col items-center text-center gap-5 mb-10">
          <div className="size-20 rounded-full bg-white shadow-soft flex items-center justify-center text-primary border border-white">
            <span className="material-symbols-outlined text-[44px] animate-bounce">smart_toy</span>
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-xl text-[#101518]">Besoin d'aide ?</h4>
            <p className="text-sm text-slate-500 font-medium">Demande au tuteur IA de t'expliquer une étape précise.</p>
          </div>
          <button 
            onClick={onStartTutor}
            className="w-full h-14 bg-primary text-white rounded-2xl shadow-glow flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest active:scale-95 transition-all"
          >
            <span>Lancer le chat IA</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>

        <div className="h-10 shrink-0"></div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 rounded-t-[2.5rem] shadow-strong z-50 shrink-0">
        <div className="relative flex justify-around items-center h-[76px] px-2 max-w-lg mx-auto">
          <button onClick={onGoToHome} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[28px]">home</span>
            <span className="text-[9px] font-black uppercase">Accueil</span>
          </button>
          <button onClick={onGoToExams} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[28px]">library_books</span>
            <span className="text-[9px] font-black uppercase">Examens</span>
          </button>
          <button className="flex flex-col items-center justify-center w-16 gap-1 text-primary">
            <div className="bg-primary/10 px-4 py-1.5 rounded-2xl">
              <span className="material-symbols-outlined text-[28px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
            </div>
            <span className="text-[9px] font-black uppercase">Détails</span>
          </button>
          <button onClick={onGoToProfile} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[28px]">person</span>
            <span className="text-[9px] font-black uppercase">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ResolutionDetailsScreen;
