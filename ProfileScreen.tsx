
import React, { useState } from 'react';
import { AppView, Activity, UserProfile } from '../types';
import { NotificationService } from '../services/notificationService';

interface ProfileScreenProps {
  userProfile: UserProfile;
  activities: Activity[];
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onBack: () => void;
  onLogout: () => void;
  onGoToExams: () => void;
  onGoToQuiz: () => void;
  onGoToTutor: () => void;
  onNavigate: (view: AppView) => void;
  onUpdateProfile: (newProfile: UserProfile) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  userProfile, darkMode, onToggleDarkMode, onBack, onLogout, onGoToExams, onGoToQuiz, onGoToTutor, onNavigate
}) => {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderTime, setReminderTime] = useState("18:00");

  const handleToggleNotifications = async () => {
    const granted = await NotificationService.requestPermission();
    if (granted) {
      NotificationService.saveReminder({
        id: 'daily',
        time: reminderTime,
        enabled: true,
        days: [0,1,2,3,4,5,6]
      });
      alert("Rappel activé pour " + reminderTime);
    } else {
      alert("Veuillez autoriser les notifications dans votre navigateur.");
    }
  };

  const menuButton = (icon: string, label: string, color: string, onClick?: () => void) => (
    <button 
      onClick={onClick}
      className={`w-full p-4 flex items-center justify-between transition-all active:scale-[0.98] ${darkMode ? 'hover:bg-white/5 border-slate-800' : 'hover:bg-slate-50 border-slate-50'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`size-10 rounded-xl ${color} bg-opacity-10 flex items-center justify-center ${color.replace('bg-', 'text-')}`}>
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </div>
        <span className={`font-bold text-[14px] ${darkMode ? 'text-white' : 'text-slate-900'}`}>{label}</span>
      </div>
      <span className="material-symbols-outlined text-slate-300 text-lg">chevron_right</span>
    </button>
  );

  return (
    <div className={`h-full flex flex-col font-display antialiased transition-colors duration-300 ${darkMode ? 'bg-[#0f1b23]' : 'bg-background-light'}`}>
      <header className={`shrink-0 z-40 px-6 py-4 flex items-center justify-between border-b ${darkMode ? 'bg-[#0f1b23]/80 border-slate-800' : 'bg-white/80 border-slate-100'} backdrop-blur-md sticky top-0`}>
        <button onClick={onBack} className="size-10 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className={`text-lg font-black uppercase tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>Mon Profil</h1>
        <button onClick={onToggleDarkMode} className="size-10 rounded-full flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-8 pb-32 hide-scrollbar scroll-smooth">
        <div className="max-w-md mx-auto space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer" onClick={() => onNavigate('edit_profile')}>
              <div className="size-28 rounded-full border-4 border-primary/10 overflow-hidden bg-slate-100 shadow-xl ring-8 ring-primary/5 transition-transform group-active:scale-95">
                <img 
                  src={userProfile.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuAuJmSerYyCO2xJmMpi3b8xCQNqrk9zntGZh5iSSzCzPyAUyVn-zGiKLaQIGoTpl_b6f093sFcCTwxeoYiU8EHKfUvjzegF3OT4h3WqXQOMU1rNjaGKNn4CIup0-AeNMfvJJoebonxk7JBfOULkUZ8aM1-Y-JHQHjZeG7oHGYfukK1m4xQUJmlWOYW3Z7hZkjM98kkKwe05B2YQ1g5h-E6BqtSDhjzoCAvjpD8gHWzBgh8Dt8t_845sSDx_zmCBpKlhWgydi8wAC7Sm"} 
                  className="w-full h-full object-cover" 
                  alt="Avatar" 
                />
              </div>
              <div className="absolute bottom-0 right-0 size-9 bg-primary text-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">edit</span>
              </div>
            </div>
            <h2 className={`text-[22px] font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {userProfile.full_name}
            </h2>
            <div className="flex flex-col items-center gap-1.5 mt-2">
                <p className="text-primary text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2">
                {userProfile.filiere} <span className="text-primary/40">•</span> PROMO 2025
                </p>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${userProfile.is_premium ? 'bg-accent-green/10 text-accent-green border border-accent-green/20' : 'bg-slate-200 text-slate-500'}`}>
                    {userProfile.is_premium ? 'Membre Premium' : 'Version Gratuite'}
                </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mon Compte</h3>
            <div className={`rounded-[2.2rem] overflow-hidden border shadow-card ${darkMode ? 'bg-[#1a2c38] border-slate-700 divide-slate-700' : 'bg-white border-white divide-slate-50'}`}>
              {menuButton("person_edit", "Modifier mes informations", "bg-blue-500", () => onNavigate('edit_profile'))}
            </div>
          </div>

          {userProfile.role === 'admin' && (
            <div className="space-y-3">
              <h3 className="px-2 text-[10px] font-black text-primary uppercase tracking-widest">Administration</h3>
              <div className={`rounded-[2.2rem] overflow-hidden border shadow-card bg-primary/5 border-primary/20`}>
                {menuButton("admin_panel_settings", "Gérer les élèves", "bg-primary", () => onNavigate('admin'))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Outils d'étude</h3>
            <div className={`rounded-[2.2rem] overflow-hidden border divide-y shadow-card ${darkMode ? 'bg-[#1a2c38] border-slate-700 divide-slate-700' : 'bg-white border-white divide-slate-50'}`}>
              {menuButton("insights", "Mes Statistiques", "bg-blue-500", () => onNavigate('stats'))}
              {menuButton("notifications", "Rappels de révision", "bg-orange-500", () => setShowReminderModal(true))}
              {menuButton("bookmark", "Mes Favoris", "bg-yellow-500", () => onNavigate('favorites'))}
              {menuButton("school", "Filière & Objectif", "bg-green-500", () => onNavigate('goals'))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bac-Solution</h3>
            <div className={`rounded-[2.2rem] overflow-hidden border divide-y shadow-card ${darkMode ? 'bg-[#1a2c38] border-slate-700 divide-slate-700' : 'bg-white border-white divide-slate-50'}`}>
              {menuButton("quiz", "FAQ & Aide", "bg-purple-500", () => onNavigate('faq'))}
              {menuButton("verified_user", "Confidentialité", "bg-blue-400", () => onNavigate('privacy'))}
              {menuButton("description", "Conditions d'utilisation", "bg-slate-400", () => onNavigate('terms'))}
            </div>
          </div>

          <button onClick={onLogout} className="w-full py-5 rounded-[2rem] border-2 border-red-500/10 text-red-500 font-black uppercase text-xs tracking-widest active:bg-red-50 transition-all mb-10">
            Se déconnecter
          </button>
        </div>
      </main>

      {showReminderModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowReminderModal(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] w-full max-w-sm p-8 shadow-strong animate-in zoom-in-95 duration-300">
             <h4 className="text-xl font-black text-slate-900 mb-2">Rappels d'étude</h4>
             <p className="text-sm text-slate-500 mb-6 font-medium">Définis une heure pour recevoir un rappel quotidien sur ton téléphone.</p>
             <div className="space-y-4 mb-8">
               <div className="flex flex-col gap-1.5">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Heure de révision</label>
                 <input 
                   type="time" 
                   value={reminderTime}
                   onChange={(e) => setReminderTime(e.target.value)}
                   className="w-full bg-slate-50 border-none p-4 rounded-2xl font-black text-xl focus:ring-2 focus:ring-primary"
                 />
               </div>
             </div>
             <button 
               onClick={() => { handleToggleNotifications(); setShowReminderModal(false); }}
               className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-glow uppercase text-xs tracking-widest active:scale-95 transition-all"
             >
               Activer le rappel
             </button>
          </div>
        </div>
      )}

      <nav className={`fixed bottom-0 left-0 right-0 border-t rounded-t-[2rem] shadow-strong z-50 transition-colors ${darkMode ? 'bg-[#1a2c38] border-slate-700' : 'bg-white/95 border-slate-100'} backdrop-blur-xl shrink-0`}>
        <div className="flex justify-around items-center h-[72px] px-2 max-w-lg mx-auto">
          <button onClick={onBack} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[24px]">home</span>
            <span className="text-[8px] font-black uppercase">Accueil</span>
          </button>
          <button onClick={onGoToExams} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[24px]">library_books</span>
            <span className="text-[8px] font-black uppercase">Examens</span>
          </button>
          <div className="w-11 h-11 relative -top-5">
            <button onClick={onGoToTutor} className="absolute w-12 h-12 rounded-full shadow-glow flex items-center justify-center text-white border-[3px] border-white active:scale-95 transition-transform bg-primary">
              <span className="material-symbols-outlined text-[24px]">smart_toy</span>
            </button>
          </div>
          <button onClick={onGoToQuiz} className="flex flex-col items-center justify-center w-16 gap-1 text-slate-400 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[24px]">quiz</span>
            <span className="text-[8px] font-black uppercase">Quiz</span>
          </button>
          <button className="flex flex-col items-center justify-center w-16 gap-1 text-primary">
            <div className="bg-primary/10 px-4 py-1 rounded-xl">
               <span className="material-symbols-outlined text-[24px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
            <span className="text-[8px] font-black uppercase">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ProfileScreen;
