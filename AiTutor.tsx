
import React, { useState, useRef, useEffect } from 'react';
import { Message, ContextExam, UserProfile } from '../types';
import { geminiService } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { usageService } from '../services/usageService';

interface AiTutorProps {
  contextExam?: ContextExam;
  userProfile: UserProfile;
  onBack: () => void;
  onGoToExams: () => void;
  onGoToQuiz: () => void;
  onGoToProfile: () => void;
  onSaveActivity?: (title: string, subject: string, content: string, imageFileName?: string) => void;
  onLimitReached?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const AiTutor: React.FC<AiTutorProps> = ({ 
  contextExam, userProfile, onBack, onGoToExams, onGoToQuiz, onGoToProfile, onSaveActivity, onLimitReached, isFavorite, onToggleFavorite 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: contextExam 
      ? `Analyse de ${contextExam.name} en cours... ⚡` 
      : "Salut ! Je suis ton tuteur IA. Pose-moi une question ou envoie la photo d'un exercice. 📚" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ data: string; mimeType: string; preview?: string; name: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Correction : tracker l'examen actuellement analysé pour réinitialiser si on change
  const currentExamId = useRef<string | null>(null);

  useEffect(() => {
    if (contextExam && contextExam.fileName && currentExamId.current !== contextExam.fileName) {
      currentExamId.current = contextExam.fileName;
      handleInitialExamAnalysis();
    }
  }, [contextExam]);

  const handleInitialExamAnalysis = async () => {
    if (!contextExam || !contextExam.fileName) return;
    
    setIsLoading(true);
    try {
      const imageData = await storageService.downloadImageAsBase64(contextExam.subject, contextExam.fileName);
      const prompt = `Voici le sujet de ${contextExam.subject} (${contextExam.year}). Résolvez immédiatement et intégralement chaque exercice présent sur cette image. Utilisez un ton pédagogique.`;
      
      const responseText = await geminiService.getChatResponse([], prompt, imageData);
      
      setMessages(prev => [
        ...prev, 
        { role: 'user', text: `Analyse visuelle : ${contextExam.name}`, imageData: imageData },
        { role: 'model', text: responseText }
      ]);
      
      if (onSaveActivity) {
        onSaveActivity(contextExam.name, contextExam.subject, responseText, contextExam.fileName);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Oups ! Je n'ai pas pu analyser l'image. Vérifie ta connexion ou réessaie dans un instant. 🌐" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if ((!input.trim() && !selectedFile) || isLoading) return;

    if (userProfile.accessStatus === 'FREE_LIMITED') {
       if (!usageService.canUseAi()) {
          if (onLimitReached) onLimitReached();
          return;
       }
       usageService.incrementAi();
    }

    const userMessage: Message = { 
      role: 'user', 
      text: input || (selectedFile ? `Analyse cet exercice : ${selectedFile.name}` : ""),
      imageData: selectedFile ? { data: selectedFile.data, mimeType: selectedFile.mimeType } : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    const promptToSend = input || "Résous l'exercice sur l'image.";
    const currentFile = selectedFile;
    
    setInput('');
    setSelectedFile(null);
    setIsLoading(true);

    try {
      const responseText = await geminiService.getChatResponse(messages.slice(-6), promptToSend, currentFile || undefined);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      
      if (currentFile && onSaveActivity) {
        onSaveActivity(currentFile.name, contextExam?.subject || "Révision IA", responseText);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Désolé, j'ai un petit problème de connexion. Réessaie ton message ! 🔌" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-[#F4F7F9] overflow-hidden font-display text-left">
      <input type="file" ref={fileInputRef} onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Data = (reader.result as string).split(',')[1];
            setSelectedFile({
              data: base64Data, mimeType: file.type,
              preview: file.type.startsWith('image/') ? (reader.result as string) : undefined,
              name: file.name
            });
          };
          reader.readAsDataURL(file);
        }
        e.target.value = '';
      }} accept="image/*" className="hidden" />

      <header className="flex items-center bg-white p-4 justify-between shadow-sm z-10 sticky top-0 shrink-0 border-b border-slate-50 h-18">
        <button onClick={onBack} className="text-slate-900 flex size-10 items-center justify-center rounded-full active:scale-90 transition-transform bg-slate-50">
          <span className="material-symbols-outlined text-2xl font-bold">chevron_left</span>
        </button>
        <div className="flex flex-col items-center max-w-[60%] truncate">
          <h2 className="text-[#101518] text-sm font-black leading-tight truncate uppercase tracking-tight">
            {contextExam ? contextExam.subject : 'Tuteur IA'}
          </h2>
          <span className="text-[9px] text-primary font-black uppercase tracking-widest">
            {contextExam ? `${contextExam.year}` : 'Bac-Solution'}
          </span>
        </div>
        <div className="flex size-10 items-center justify-center">
          {contextExam && onToggleFavorite && (
            <button 
              onClick={onToggleFavorite}
              className={`flex items-center justify-center transition-all duration-200 active:scale-75 ${isFavorite ? 'text-yellow-400 scale-110' : 'text-slate-300'}`}
            >
              <span className="material-symbols-outlined text-[28px]" style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}>
                star
              </span>
            </button>
          )}
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#F4F7F9] hide-scrollbar scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-200`}>
            <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[90%]`}>
              <div className={`p-4 shadow-soft ${msg.role === 'user' ? 'bg-primary text-white rounded-2xl rounded-tr-none' : 'bg-white rounded-2xl rounded-tl-none border border-white'}`}>
                {msg.imageData && (
                  <div className="mb-3">
                    <img src={`data:${msg.imageData.mimeType};base64,${msg.imageData.data}`} alt="Sujet" className="max-w-full rounded-xl border border-slate-50 shadow-sm" />
                  </div>
                )}
                <p className={`text-[14px] leading-relaxed whitespace-pre-wrap font-medium ${msg.role === 'user' ? 'text-white' : 'text-slate-700'}`}>{msg.text}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-4 bg-white rounded-2xl rounded-tl-none border border-white shadow-soft flex flex-col gap-2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Réflexion IA en cours...</p>
            </div>
          </div>
        )}
        <div className="h-10"></div>
      </main>

      <div className="bg-white px-4 py-3 border-t border-slate-50 w-full z-10 shrink-0 safe-area-inset-bottom">
        {selectedFile && (
          <div className="mb-2 flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 animate-in slide-in-from-bottom-2">
            <div className="relative size-10 rounded-lg overflow-hidden border border-slate-200">
              {selectedFile.preview ? <img src={selectedFile.preview} className="w-full h-full object-cover" alt="Preview" /> : <span className="material-symbols-outlined text-primary">image</span>}
              <button onClick={() => setSelectedFile(null)} className="absolute -top-1 -right-1 bg-red-500 text-white size-4 rounded-full flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-[10px]">close</span></button>
            </div>
            <p className="text-[10px] font-black text-primary truncate uppercase">{selectedFile.name}</p>
          </div>
        )}
        <div className="flex items-end gap-2 max-w-lg mx-auto">
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center size-10 text-slate-400 shrink-0 mb-1 active:scale-90 transition-transform"><span className="material-symbols-outlined text-[24px]">add_circle</span></button>
          <div className="relative flex-1 bg-slate-100 rounded-2xl min-h-[44px] flex items-center">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pose ta question..." className="w-full bg-transparent border-none focus:ring-0 text-[#101518] placeholder-slate-400 text-sm py-2.5 px-4 resize-none h-[44px] overflow-hidden" rows={1} onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
            }} />
          </div>
          <button onClick={handleSend} disabled={(!input.trim() && !selectedFile) || isLoading} className={`flex items-center justify-center size-11 rounded-2xl shrink-0 shadow-glow transition-all active:scale-90 ${(!input.trim() && !selectedFile) || isLoading ? 'bg-slate-200 text-slate-400' : 'bg-primary text-white'}`}>
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiTutor;
