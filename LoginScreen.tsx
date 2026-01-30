
import React, { useState } from 'react';
import { authService } from '../services/authService';

interface LoginScreenProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSwitchToSignup, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async () => {
    setErrorMsg('');
    if (!email || !password) {
        setErrorMsg("Veuillez remplir vos identifiants.");
        return;
    }
    setIsSubmitting(true);
    try {
      await onLogin(email, password);
    } catch (err: any) {
      // On affiche directement le message lancé par le service
      setErrorMsg(err.message || "Email ou mot de passe incorrect");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen w-full font-poppins overflow-hidden antialiased flex flex-col">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdg8rRBGNBqOcJ52kzljGMQuINQ04GMpVSFq3yex9grlaWIhYXjFV2mwnMHAolyL21T4aoKNnzkv4Ip5XVk3NTZE2EXXqZQHxdt7Bg5ZmKjzGLgRrmhL5kUVmbgd0UK8zxYd0K72Qs-yaynaWCUQoq-SY_EH1vMA1_j_Ku_SO0pWPVWIBbOdRKnfGY-23Lxu8IXHch4iNZlGHecJ0dq_UZSEZaWH5kcrXeVuK2LMm9JoEgltT-CwVzp98_jXdDhplT6kUvg-uC8G0" 
          alt="Bac-Solution Background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-brand-blue/40 to-brand-blue"></div>
      </div>

      <main className="relative z-10 flex flex-col justify-end h-full px-8 pb-12 w-full max-w-md mx-auto">
        <section className="text-center text-white mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">Se connecter</h1>
          <p className="mt-2 text-sm text-white/80 font-medium">
            Prêt à réussir ton Bac ?
          </p>
        </section>

        {errorMsg && (
          <div className="bg-red-500/90 border border-white/30 backdrop-blur-md text-white text-[12px] font-bold p-3 rounded-2xl mb-6 text-center animate-in zoom-in duration-300 shadow-xl">
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              <span className="leading-tight">{errorMsg}</span>
            </div>
          </div>
        )}

        <section className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-blue">
              <span className="material-symbols-outlined text-brand-blue text-[22px]">mail</span>
            </div>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="block w-full pl-12 pr-4 h-14 bg-white/95 backdrop-blur-md rounded-2xl text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-white focus:ring-0 text-sm font-semibold shadow-xl transition-all" 
              placeholder="Adresse e-mail" 
              type="email"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-blue">
              <span className="material-symbols-outlined text-brand-blue text-[22px]">lock</span>
            </div>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="block w-full pl-12 pr-4 h-14 bg-white/95 backdrop-blur-md rounded-2xl text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-white focus:ring-0 text-sm font-semibold shadow-xl transition-all" 
              placeholder="Mot de passe" 
              type="password"
            />
          </div>

          <div className="flex justify-end px-1">
            <button 
              onClick={(e) => { e.preventDefault(); onForgotPassword(); }}
              disabled={isSubmitting}
              className="text-[12px] text-white/90 font-bold hover:text-white underline underline-offset-4 active:scale-95 transition-all disabled:opacity-50"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full h-[60px] bg-brand-blue border-2 border-white/40 text-white font-black rounded-2xl mt-2 shadow-[0_10px_30px_rgba(0,0,0,0.2)] active:scale-95 transition-all flex items-center justify-center text-lg hover:bg-white hover:text-brand-blue group ${isSubmitting ? 'opacity-70' : ''}`} 
            type="button"
          >
            {isSubmitting ? (
                <span className="size-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <div className="flex items-center gap-2">
                  <span>Connexion</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            )}
          </button>
        </section>

        <footer className="mt-8 animate-in fade-in duration-1000 delay-300">
          <p className="text-[14px] text-white font-medium text-center">
            Pas encore de compte ? <a className="font-extrabold underline decoration-white/40 hover:decoration-white transition-all" href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup(); }}>S'inscrire</a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default LoginScreen;
