
import React from 'react';

interface PdfViewerProps {
  url: string;
  title: string;
  onBack: () => void;
  onResolveWithAi: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, title, onBack, onResolveWithAi }) => {
  // Utilisation de Google GView pour afficher le PDF dans un iframe de manière fluide sur mobile
  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col font-display animate-in slide-in-from-bottom duration-300">
      <header className="flex items-center bg-[#E8EFF5] p-4 justify-between border-b border-gray-200 shrink-0">
        <button onClick={onBack} className="text-[#101518] flex size-10 items-center justify-center rounded-full active:scale-90 transition-transform">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex flex-col items-center max-w-[70%]">
          <h2 className="text-[#101518] text-sm font-black truncate w-full text-center uppercase tracking-tight">{title}</h2>
          <span className="text-[9px] text-primary font-black uppercase tracking-widest">Baccalauréat Officiel</span>
        </div>
        <div className="size-10"></div>
      </header>
      
      <div className="flex-1 bg-slate-50 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 opacity-30">
          <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[10px] font-black uppercase tracking-widest">Chargement du document...</p>
        </div>
        <iframe 
          src={viewerUrl} 
          className="w-full h-full border-none shadow-inner"
          title={title}
        />
      </div>

      <div className="p-4 bg-white border-t border-slate-100 safe-area-inset-bottom">
        <button 
          onClick={onResolveWithAi}
          className="w-full bg-primary text-white h-14 rounded-2xl font-black uppercase text-xs tracking-widest shadow-glow flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">smart_toy</span>
          Résoudre avec l'IA
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
