
import React from 'react';

interface OnboardingScreenTwoProps {
  onContinue: () => void;
}

const OnboardingScreenTwo: React.FC<OnboardingScreenTwoProps> = ({ onContinue }) => {
  return (
    <div className="relative flex h-screen w-full flex-col hero-gradient overflow-hidden selection:bg-primary selection:text-white font-display">
      {/* Decorative cloud shapes */}
      <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[40%] rounded-full cloud-shape pointer-events-none"></div>
      <div className="absolute top-[10%] right-[-10%] w-[60%] h-[30%] rounded-full cloud-shape pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[10%] w-[90%] h-[40%] rounded-full cloud-shape pointer-events-none opacity-50"></div>

      <div className="relative z-10 flex flex-col h-full w-full px-6 pt-8 pb-6 safe-area-inset-top safe-area-inset-bottom">
        {/* Main Character Illustration Section */}
        <div className="flex-grow flex items-end justify-center pb-4 relative">
          <div className="absolute bottom-10 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
          <div className="w-full max-w-sm relative z-10 flex justify-center">
            <img 
              alt="Confident young Haitian male student in uniform" 
              className="h-[50vh] w-auto object-cover object-top drop-shadow-lg" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3WDPRJOLlOPNPNUKAcKBRrblGvRcUmbOaLbjQ9aFCPNT7PEQZb2LWZ4eduv1Gr_zvHF57IXaHlONARClU8FjiQiRZmJKPnSVC1SNQRi4bSN5CXyarcrYCGmwnbMMxukSIyRkLAouEd_5t5cHPf5iWS_mrGQz80jL_GopgTMLDso-mphALDm3gPWYI_28nwITStvMp1WO_WkLrcJqT-7OyRpMsEYvUfFUVOkTdvD1TAAKwz853RyNj7MXuUGM1L-8tShcVIiQuwp_a" 
              style={{ 
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', 
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                mixBlendMode: 'normal'
              }}
            />
          </div>
        </div>

        {/* Text and Actions Section */}
        <div className="flex flex-col items-center text-center space-y-6 mt-auto">
          <div className="space-y-3 max-w-md mx-auto">
            <h1 className="text-white tracking-tight text-[32px] leading-[1.1] font-bold drop-shadow-sm">
              Ils ont compris.<br/>Ils ont réussi.
            </h1>
            <p className="text-white/90 text-base font-normal leading-relaxed px-2">
              Des élèves comme toi, avec les mêmes difficultés.
            </p>
          </div>

          <div className="w-full max-w-md pt-4 pb-2">
            <button 
              onClick={onContinue}
              className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 px-8 bg-white shadow-lg transition-all active:scale-[0.98] hover:shadow-xl"
            >
              <span className="text-primary text-lg font-bold tracking-wide mr-2">Continuer</span>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform" style={{ fontSize: '24px' }}>
                arrow_forward
              </span>
            </button>
          </div>

          {/* Indicator dots (Second dot active) */}
          <div className="flex gap-2 justify-center py-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreenTwo;
