
import React from 'react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden bg-[#0066FF] font-display">
      {/* Arrière-plan décoratif */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[100%] h-[40%] bg-gradient-to-br from-white/10 to-transparent rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[25%] bg-blue-400/20 rounded-full blur-[60px]"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Section Image Hero - Ajustée pour ne pas dominer tout l'écran */}
        <div className="relative flex-1 w-full flex justify-center items-end overflow-hidden px-10 pt-10">
          <img 
            alt="Étudiante haïtienne" 
            className="h-full w-auto max-w-full object-contain drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI--aehFZRzfwCGmmK2z3RL5raEwTdAdnQBRAE42_TvcYcVrwp7nF-xwX1dyTBxisXq_doxdA5P4prApea178EoXJOoOIS2dQ8DrCvs3aGz2DUe_IZx2F1B-XsTvCCDnd51UOG_jU31tK8nqC898EN87ESdHHMKzedOY7oc5g-rdJhjnn2d9QQ151AFdwijkV2L2W1pJ39y2hVaSCJT-HamR1quxpvCJD-Mdl-oKO1H7VakdXcGCKrJXrUBjyOEcpvx8HRTRG4VtXb" 
            style={{ 
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', 
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' 
            }}
          />
        </div>

        {/* Section Texte et Action - Plus compacte et centrée */}
        <div className="flex flex-col justify-center px-8 pt-6 pb-12 text-white text-center">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_8px_#4ADE80]"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/90">Promotion 2025</span>
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
              Réussis ton Bac avec<br/>
              <span className="text-accent-green">Bac-Solution</span>
            </h1>
            
            <p className="text-blue-50/80 text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
              Prépare-toi efficacement avec ton tuteur IA et les examens officiels du MENFP.
            </p>
          </div>
          
          <div className="w-full max-w-[280px] mx-auto mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-400">
            <button 
              onClick={onContinue}
              className="group relative w-full flex items-center justify-between bg-white text-[#0066FF] hover:bg-blue-50 active:scale-[0.97] transition-all duration-300 h-14 pl-6 pr-2 rounded-2xl shadow-xl"
            >
              <span className="text-lg font-bold">Commencer</span>
              <div className="bg-[#0066FF] text-white w-10 h-10 rounded-xl flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                <span className="material-symbols-outlined text-[20px] font-bold">
                  arrow_forward
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
