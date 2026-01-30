
import React, { useState } from 'react';

interface SignupScreenProps {
  onSignup: (full_name: string, email: string, phone: string, pass: string) => Promise<void>;
  onSwitchToLogin: () => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ onSignup, onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 8) {
      setPhone(val);
    }
  };

  const handleSubmit = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    
    if (!fullName.trim()) {
      setErrorMsg("Entre ton nom complet.");
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg("L'adresse e-mail est invalide.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Le mot de passe doit faire au moins 6 caractères.");
      return;
    }
    if (phone.length !== 8) {
        setErrorMsg("Le numéro de téléphone doit avoir exactement 8 chiffres.");
        return;
    }
    
    setIsSubmitting(true);
    try {
      const fullPhoneNumber = `+509${phone}`;
      
      await onSignup(fullName.trim(), email.toLowerCase().trim(), fullPhoneNumber, password);
      
      // Message spécifique demandé par l'utilisateur
      setSuccessMsg("Ton e-mail est enregistré, connecte-toi !");
      
      // Envoi automatique vers l'écran de connexion après 2 secondes pour laisser le temps de lire
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);

    } catch (err: any) {
      setErrorMsg(err.message || "Erreur lors de l'inscription");
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-brand-blue/40 to-brand-blue"></div>
      </div>

      <main className="relative z-10 flex flex-col justify-end h-full px-8 pb-10 w-full max-w-md mx-auto">
        <section className="text-center text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">Créer un compte</h1>
          <p className="mt-1 text-sm text-white/90 font-medium">
            L'outil numéro 1 pour ton Baccalauréat.
          </p>
        </section>

        {errorMsg && (
          <div className="bg-red-500 border border-white/20 backdrop-blur-md text-white text-[12px] font-bold p-3 rounded-2xl mb-4 text-center animate-in zoom-in duration-300 shadow-xl">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-500 border border-white/20 backdrop-blur-md text-white text-[13px] font-black p-4 rounded-2xl mb-4 text-center animate-in zoom-in duration-300 shadow-xl flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">check_circle</span>
            {successMsg}
          </div>
        )}

        <section className="w-full space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-blue">
              <span className="material-symbols-outlined text-[22px]">person</span>
            </div>
            <input 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isSubmitting || !!successMsg}
              className="block w-full pl-12 pr-4 h-14 bg-white/95 backdrop-blur-md rounded-2xl text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-white focus:ring-0 text-sm font-semibold shadow-xl transition-all" 
              placeholder="Nom complet" 
              type="text"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-blue">
              <span className="material-symbols-outlined text-[22px]">mail</span>
            </div>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || !!successMsg}
              className="block w-full pl-12 pr-4 h-14 bg-white/95 backdrop-blur-md rounded-2xl text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-white focus:ring-0 text-sm font-semibold shadow-xl transition-all" 
              placeholder="Adresse e-mail" 
              type="email"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-blue">
              <span className="material-symbols-outlined text-[22px]">lock</span>
            </div>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting || !!successMsg}
              className="block w-full pl-12 pr-4 h-14 bg-white/95 backdrop-blur-md rounded-2xl text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-white focus:ring-0 text-sm font-semibold shadow-xl transition-all" 
              placeholder="Mot de passe" 
              type="password"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none font-black text-brand-blue text-sm tracking-tight">
              +509
            </div>
            <input 
              value={phone}
              onChange={handlePhoneChange}
              disabled={isSubmitting || !!successMsg}
              className="block w-full pl-14 pr-4 h-14 bg-white/95 backdrop-blur-md rounded-2xl text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-white focus:ring-0 text-sm font-semibold shadow-xl transition-all" 
              placeholder="Téléphone (8 chiffres)" 
              type="tel"
              inputMode="numeric"
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || !!successMsg}
            className={`w-full h-[60px] bg-brand-blue border-2 border-white/40 text-white font-black rounded-2xl mt-4 shadow-xl active:scale-95 transition-all flex items-center justify-center text-lg group ${(isSubmitting || !!successMsg) ? 'opacity-70' : 'hover:bg-white hover:text-brand-blue'}`} 
            type="button"
          >
            {isSubmitting ? (
                <span className="size-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <div className="flex items-center gap-2">
                  <span>S'inscrire</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            )}
          </button>
        </section>

        <footer className="mt-8 animate-in fade-in duration-1000 delay-300">
          <p className="text-[14px] text-white font-medium text-center">
            Déjà un compte ? <a className="font-extrabold underline decoration-white/40 hover:decoration-white transition-all" href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Se connecter</a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default SignupScreen;
