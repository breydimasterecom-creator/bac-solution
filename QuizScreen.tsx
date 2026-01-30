
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { geminiService } from '../services/geminiService';

interface QuizScreenProps {
  onBack: () => void;
  onExit: () => void;
  onSaveResult: (subject: string, title: string, score: string, quizData?: { questions: QuizQuestion[], userAnswers: number[] }) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onBack, onExit, onSaveResult }) => {
  const [step, setStep] = useState<'selection' | 'loading' | 'quiz' | 'results' | 'review'>('selection');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const subjects = [
    { name: 'Hist/Géo', icon: 'public', color: '#06B6D4', bg: 'bg-cyan-50' },
    { name: 'Géologie', icon: 'landscape', color: '#4B5563', bg: 'bg-slate-50' },
    { name: 'Biologie', icon: 'biotech', color: '#10B981', bg: 'bg-emerald-50' },
    { name: 'Physique', icon: 'electric_bolt', color: '#009dff', bg: 'bg-blue-50' },
    { name: 'Mathématiques', icon: 'calculate', color: '#4ADE80', bg: 'bg-green-50' },
    { name: 'Chimie', icon: 'science', color: '#6366F1', bg: 'bg-indigo-50' },
    { name: 'Philosophie', icon: 'psychology', color: '#FF6B6B', bg: 'bg-red-50' },
    { name: 'Anglais', icon: 'language', color: '#8B5CF6', bg: 'bg-purple-50' },
    { name: 'Créole', icon: 'chat', color: '#F59E0B', bg: 'bg-amber-50' },
  ];

  const startNewQuiz = async (subject: string) => {
    setSelectedSubject(subject);
    setStep('loading');
    setError(null);
    try {
      const generated = await geminiService.generateQuiz(subject, 5);
      setQuestions(generated);
      setStep('quiz');
      setCurrentIndex(0);
      setScore(0);
      setSelectedOption(null);
      setUserAnswers([]);
      setStartTime(Date.now());
    } catch (err) {
      setError("Désolé, l'IA n'a pas pu générer les questions. Réessaie !");
      setStep('selection');
    }
  };

  const restartSameQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setStartTime(Date.now());
    setStep('quiz');
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);

    let currentScore = score;
    if (selectedOption === questions[currentIndex].correctAnswerIndex) {
      currentScore = score + 1;
      setScore(currentScore);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setEndTime(Date.now());
      setStep('results');
      onSaveResult(
        selectedSubject || 'Inconnu', 
        `Quiz ${selectedSubject}`, 
        `${currentScore}/${questions.length}`,
        { questions, userAnswers: newAnswers }
      );
    }
  };

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  if (step === 'selection') {
    return (
      <div className="h-screen w-full bg-[#F4F7F9] flex flex-col font-display overflow-hidden">
        <header className="flex-none bg-white px-4 py-4 border-b border-gray-100 shadow-sm z-10">
          <div className="flex items-center justify-between max-w-md mx-auto w-full">
            <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 active:scale-90 transition-transform">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold text-text-main">Choisir une matière</h1>
            <div className="w-10"></div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 hide-scrollbar">
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center space-y-2 text-left">
              <h2 className="text-2xl font-black text-[#101518] tracking-tight">Prêt à t'entraîner ?</h2>
              <p className="text-[#5e7b8d] font-medium text-sm">Choisis une matière et l'IA va te poser 5 questions de niveau Bac.</p>
            </div>
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center text-sm font-bold animate-pulse">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 pb-10">
              {subjects.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => startNewQuiz(sub.name)}
                  className="bg-white p-6 rounded-[2rem] shadow-card border border-white flex flex-col items-center gap-4 transition-all active:scale-95 hover:shadow-lg group"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-6`} style={{ backgroundColor: sub.color }}>
                    <span className="material-symbols-outlined text-3xl">{sub.icon}</span>
                  </div>
                  <span className="font-bold text-[#101518] text-xs text-center uppercase tracking-tight">{sub.name}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="h-screen w-full bg-page-gradient flex flex-col items-center justify-center p-8 text-center font-display">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl animate-pulse">smart_toy</span>
          </div>
        </div>
        <h2 className="text-xl font-black text-[#101518]">Génération du quiz...</h2>
        <p className="text-[#5e7b8d] mt-2 font-medium text-sm max-w-xs mx-auto">
          Je prépare 5 questions de {selectedSubject} spécialement pour toi.
        </p>
      </div>
    );
  }

  if (step === 'results') {
    const percentage = Math.round((score / questions.length) * 100);
    const duration = endTime - startTime;
    const dashArray = `${percentage}, 100`;

    return (
      <div className="h-screen w-full bg-[#f5f7f8] font-display text-slate-900 antialiased overflow-hidden flex flex-col max-w-md mx-auto shadow-2xl">
        <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 shadow-sm shrink-0">
          <button onClick={() => setStep('selection')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 text-slate-800 transition-colors">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900">Résultats</h2>
          <div className="size-10"></div>
        </header>

        <main className="flex-1 overflow-y-auto pb-6 hide-scrollbar scroll-smooth">
          <div className="flex flex-col items-center justify-center pt-8 pb-4 px-4 bg-white rounded-b-[2.5rem] shadow-sm mb-4 transition-colors text-center">
            <div className="relative size-40 flex items-center justify-center mb-4">
              <svg className="block m-auto max-w-[80%] max-h-[250px] text-primary" viewBox="0 0 36 36">
                <path className="fill-none stroke-[#e6eef2] stroke-[3.8]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                <path 
                  className="fill-none stroke-current stroke-[2.8] stroke-linecap-round transition-all duration-1000 ease-out" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  strokeDasharray={dashArray}
                ></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-primary text-4xl font-black tracking-tight">{percentage}%</h1>
                <span className="text-slate-400 text-[10px] font-black uppercase mt-1">Score Final</span>
              </div>
            </div>
            <div className="text-center space-y-2 max-w-xs mx-auto">
              <h2 className="text-slate-900 text-xl font-black leading-tight">
                {percentage >= 80 ? "Excellent travail !" : percentage >= 50 ? "Pas mal du tout !" : "Continue tes révisions !"}
              </h2>
              <p className="text-slate-500 text-sm leading-normal">
                Tu as obtenu <span className="text-primary font-bold">{score}</span> réponses correctes sur {questions.length}.
              </p>
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 rounded-2xl p-4 bg-white border border-slate-100 shadow-sm transition-all text-left">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
                  <p className="text-slate-900 text-[9px] font-black uppercase tracking-wide">Temps</p>
                </div>
                <p className="text-slate-900 text-lg font-black leading-tight">{formatDuration(duration)}</p>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl p-4 bg-white border border-slate-100 shadow-sm transition-all text-left">
                <div className="flex items-center gap-2 text-accent-green">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                  <p className="text-slate-900 text-[9px] font-black uppercase tracking-wide">Statut</p>
                </div>
                <p className="text-slate-900 text-lg font-black leading-tight">{percentage >= 50 ? 'Réussi' : 'Échec'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-4 mt-6 mb-10">
            <button 
              onClick={() => setStep('review')}
              className="flex items-center justify-center w-full gap-2 rounded-xl bg-accent-coral text-white font-black h-14 transition-all shadow-lg active:scale-[0.98] uppercase text-xs tracking-widest"
            >
              <span className="material-symbols-outlined">visibility</span>
              Voir mes erreurs
            </button>
            
            <button 
              onClick={restartSameQuiz}
              className="flex items-center justify-center w-full gap-2 rounded-xl bg-primary text-white font-black h-14 transition-all shadow-glow active:scale-[0.98] uppercase text-xs tracking-widest"
            >
              <span className="material-symbols-outlined">replay</span>
              Refaire le quiz
            </button>
            
            <button 
              onClick={() => setStep('selection')}
              className="flex items-center justify-center w-full gap-2 rounded-xl bg-white border border-slate-200 text-slate-500 font-black h-14 transition-all active:scale-[0.98] uppercase text-xs tracking-widest"
            >
              Changer de sujet
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="h-screen w-full bg-[#F4F7F9] font-display text-slate-900 antialiased overflow-hidden flex flex-col max-w-md mx-auto">
        <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 shadow-sm shrink-0">
          <button onClick={() => setStep('results')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 text-slate-800 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold text-slate-900">Correction détaillée</h2>
          <div className="size-10"></div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-6 hide-scrollbar">
          {questions.map((q, idx) => {
            const isCorrect = userAnswers[idx] === q.correctAnswerIndex;
            return (
              <div key={idx} className="bg-white rounded-3xl border border-white shadow-soft overflow-hidden">
                <div className={`h-1.5 w-full ${isCorrect ? 'bg-accent-green' : 'bg-accent-coral'}`}></div>
                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className={`flex-none w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black ${isCorrect ? 'bg-accent-green' : 'bg-accent-coral'}`}>
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-slate-900 leading-snug">{q.question}</h3>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userAnswers[idx] === optIdx;
                      const isCorrectChoice = q.correctAnswerIndex === optIdx;
                      
                      let style = "bg-slate-50 border-slate-100 text-slate-600";
                      if (isCorrectChoice) style = "bg-green-50 border-green-200 text-green-700 ring-1 ring-green-100";
                      else if (isUserChoice && !isCorrect) style = "bg-red-50 border-red-200 text-red-700 ring-1 ring-red-100";

                      return (
                        <div key={optIdx} className={`p-3 rounded-xl border text-[13px] font-medium flex items-center justify-between ${style}`}>
                          <span>{opt}</span>
                          {isCorrectChoice && <span className="material-symbols-outlined text-[18px]">check_circle</span>}
                          {isUserChoice && !isCorrect && <span className="material-symbols-outlined text-[18px]">cancel</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">lightbulb</span>
                      Explication
                    </p>
                    <p className="text-slate-600 text-xs leading-relaxed font-medium italic">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="pt-4 pb-10">
            <button 
              onClick={() => setStep('results')}
              className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-glow uppercase text-xs tracking-widest"
            >
              Retour aux résultats
            </button>
          </div>
        </main>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-[#F4F7F9] font-display text-[#101518] h-screen flex flex-col overflow-hidden relative text-left">
      <header className="flex-none bg-white px-4 py-3 border-b border-gray-100 shadow-sm z-10">
        <div className="flex items-center justify-between max-w-md mx-auto w-full">
          <button onClick={() => setStep('selection')} className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors active:scale-90">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-sm font-black text-text-main leading-tight uppercase tracking-tight">{selectedSubject}</h1>
            <span className="text-[9px] font-black text-primary uppercase tracking-tighter">Bac-Solution AI</span>
          </div>
          <button onClick={onExit} className="text-[#009dff] font-black text-xs uppercase tracking-tighter">
            Quitter
          </button>
        </div>
      </header>

      <div className="flex-none bg-white px-5 py-3 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-[9px] font-black text-[#5e7b8d] uppercase tracking-widest">Question {currentIndex + 1} / {questions.length}</span>
            <span className="text-[10px] font-black text-[#009dff] uppercase tracking-tighter">Progression {Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-5 pb-32 hide-scrollbar scroll-smooth">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white rounded-3xl shadow-card overflow-hidden border border-white">
            <div className="p-6">
              <h2 className="text-lg font-bold leading-snug text-[#101518]">
                {currentQ.question}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-3" role="radiogroup">
            {currentQ.options.map((option, idx) => (
              <label 
                key={idx}
                className={`group relative flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-card active:scale-[0.98] ${
                  selectedOption === idx 
                    ? 'border-primary bg-primary/5' 
                    : 'border-transparent bg-white'
                }`}
              >
                <input className="sr-only" name="quiz_answer" type="radio" onChange={() => setSelectedOption(idx)} checked={selectedOption === idx} />
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg border-2 transition-all mr-3 shrink-0 font-black text-xs ${
                  selectedOption === idx 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-gray-100 bg-gray-50 text-text-sub'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="flex-grow">
                  <span className={`text-[14px] font-bold transition-colors ${selectedOption === idx ? 'text-primary' : 'text-text-main'}`}>
                    {option}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/90 backdrop-blur-md border-t border-gray-100 z-20 rounded-t-[2rem] shadow-strong">
        <div className="max-w-md mx-auto">
          <button 
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`w-full font-black text-sm uppercase tracking-widest py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
              selectedOption !== null
                ? 'bg-primary text-white shadow-glow' 
                : 'bg-gray-100 text-text-sub cursor-not-allowed'
            }`}
          >
            <span>{currentIndex === questions.length - 1 ? "Terminer le quiz" : "Question Suivante"}</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
