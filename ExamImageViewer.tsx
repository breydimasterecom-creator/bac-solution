
import React, { useState, useEffect, useRef } from 'react';
import { storageService } from '../services/storageService';

interface ExamImageViewerProps {
  subject: string;
  fileName: string;
  title: string;
  onBack: () => void;
  onResolveWithAi: () => void;
}

const ExamImageViewer: React.FC<ExamImageViewerProps> = ({ subject, fileName, title, onBack, onResolveWithAi }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartDist = useRef<number>(0);
  const startScale = useRef<number>(1);

  useEffect(() => {
    setError(false);
    setLoading(true);
    setScale(1); 
    
    // On récupère l'URL stable
    const url = storageService.getPublicUrl(subject, fileName);
    
    // Si c'est un retry, on ajoute un paramètre unique, sinon on garde l'URL pure pour le cache
    const finalUrl = retryCount > 0 ? `${url}?v=${retryCount}` : url;
    setImageUrl(finalUrl);

    // Pré-chargement silencieux
    const preloader = new Image();
    preloader.src = finalUrl;
  }, [subject, fileName, retryCount]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      touchStartDist.current = dist;
      startScale.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const delta = dist / touchStartDist.current;
      const newScale = Math.min(Math.max(startScale.current * delta, 1), 4);
      setScale(newScale);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col font-display animate-in fade-in duration-200">
      <header className="flex items-center bg-white p-3 justify-between border-b border-slate-100 shrink-0 z-50">
        <button 
          onClick={onBack} 
          className="text-slate-800 flex size-10 items-center justify-center rounded-full active:scale-90 transition-transform bg-slate-50"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="flex flex-col items-center flex-1 mx-2 overflow-hidden text-center">
          <h2 className="text-slate-900 text-[11px] font-black truncate w-full uppercase tracking-tight">{title}</h2>
          <span className="text-[8px] text-primary font-black uppercase tracking-widest">{subject}</span>
        </div>
        <button 
          onClick={() => setRetryCount(prev => prev + 1)}
          className={`text-slate-400 flex size-10 items-center justify-center rounded-full transition-all ${loading ? 'animate-spin' : 'active:rotate-180'}`}
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
        </button>
      </header>
      
      <main 
        ref={containerRef}
        className="flex-1 overflow-auto bg-[#F4F7F9] relative w-full touch-pan-x touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {loading && (
          <div className="absolute inset-0 z-10 p-10 flex flex-col items-center justify-center">
             <div className="w-full h-full max-w-sm bg-white rounded-2xl shadow-soft animate-pulse flex flex-col p-6 gap-4">
                <div className="w-2/3 h-4 bg-slate-100 rounded"></div>
                <div className="w-full flex-1 bg-slate-50 rounded-lg"></div>
                <div className="w-1/2 h-4 bg-slate-100 rounded"></div>
             </div>
             <p className="text-primary text-[9px] font-black uppercase tracking-[0.2em] mt-6 animate-bounce">Chargement rapide...</p>
          </div>
        )}

        {error ? (
          <div className="flex-1 h-full flex flex-col items-center justify-center p-10 text-center animate-in fade-in max-w-sm mx-auto">
            <div className="size-20 bg-orange-50 text-orange-400 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl">wifi_off</span>
            </div>
            <h3 className="font-black text-slate-800 text-sm uppercase mb-2">Connexion instable</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">
              Nous n'avons pas pu charger l'image. Essaie d'actualiser ou vérifie ta connexion.
            </p>
            <button 
              onClick={() => setRetryCount(prev => prev + 1)}
              className="w-full bg-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-glow active:scale-95 transition-all"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <div 
            className="min-h-full w-full flex items-start justify-center origin-top transition-transform duration-75 ease-out"
            style={{ 
              transform: `scale(${scale})`,
              paddingBottom: scale > 1 ? '50%' : '0' 
            }}
          >
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={title}
                className={`w-full h-auto block transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setError(true);
                  setLoading(false);
                }}
              />
            )}
          </div>
        )}
      </main>

      <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] safe-area-inset-bottom">
        <button 
          onClick={onResolveWithAi}
          disabled={loading || error}
          className={`w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest shadow-glow flex items-center justify-center gap-3 active:scale-[0.98] transition-all ${loading || error ? 'bg-slate-100 text-slate-300' : 'bg-primary text-white'}`}
        >
          <span className="material-symbols-outlined text-xl">smart_toy</span>
          Corriger avec l'IA
        </button>
      </div>
    </div>
  );
};

export default ExamImageViewer;
