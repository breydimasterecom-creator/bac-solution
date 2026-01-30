
import React, { useState } from 'react';
import { authService } from '../services/authService';

interface ResetPasswordScreenProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = async () => {
    setErrorMsg('');
    if (!password || password.length < 6) {
      setErrorMsg("Le mot de passe doit faire au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.updatePassword(password);
      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || "Une erreur est survenue.");
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
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">Nouveau mot de passe</h1>
          <p className="mt-2 text-sm text-white/80 font-medium">
            Saisis ton nouveau code secret.
          </p>
        </section>

        {errorMsg && (
          <div className="bg-red-500/30 border border-red-500/50 backdrop-blur-md text-white text-[11px] font-bold p-3 rounded-2xl mb-4 text-center animate-in zoom-in duration-300">
            {errorMsg}
          </div>
        )}

        <section className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-blue">
              <span className="material-symbols-outlined text-[22px]">lock</span>
            </div>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="block w-full pl-12 pr-4 h-14 bg-white/95 backdrop-blur-md rounded-2xl text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-white focus:ring-0 text-sm font-semibold shadow-xl transition-all" 
              placeholder="Nouveau mot de passe" 
              type="password"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-blue">
              <span className="material-symbols-outlined text-[22px]">lock_reset</span>
            </div>
            <input 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
              className="block w-full pl-12 pr-4 h-14 bg-white/95 backdrop-blur-md rounded-2xl text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-white focus:ring-0 text-sm font-semibold shadow-xl transition-all" 
              placeholder="Confirmer le mot de passe" 
              type="password"
            />
          </div>

          <button 
            onClick={handleReset}
            disabled={isSubmitting}
            className={`w-full h-[60px] bg-brand-blue border-2 border-white/40 text-white font-black rounded-2xl mt-4 shadow-xl active:scale-95 transition-all flex items-center justify-center text-lg hover:bg-white hover:text-brand-blue group ${isSubmitting ? 'opacity-70' : ''}`} 
            type="button"
          >
            {isSubmitting ? (
                <span className="size-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>Changer le mot de passe</span>
            )}
          </button>

          <button 
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full text-white/70 text-sm font-bold mt-2 py-2 hover:text-white transition-colors"
          >
            Annuler
          </button>
        </section>
      </main>
    </div>
  );
};

export default ResetPasswordScreen;
