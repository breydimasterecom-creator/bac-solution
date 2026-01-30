
import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile } from '../types';
import { authService } from '../services/authService';

interface AdminScreenProps {
  onBack: () => void;
}

const AdminScreen: React.FC<AdminScreenProps> = ({ onBack }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const profiles = await authService.getAllProfiles();
      setUsers(profiles);
    } catch (err: any) {
      setError("Impossible de charger les données. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  const togglePremium = async (user: UserProfile) => {
    const newStatus = !user.is_premium;
    const confirmMsg = newStatus 
      ? `Activer l'accès Premium pour ${user.full_name} ?` 
      : `Désactiver l'accès Premium pour ${user.full_name} ?`;
    
    if (!window.confirm(confirmMsg)) return;

    try {
      await authService.updatePremiumStatus(user.id, newStatus);
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_premium: newStatus, accessStatus: newStatus ? 'PREMIUM' : 'FREE_LIMITED' } : u));
    } catch (err) {
      alert("Erreur lors de la mise à jour. Réessayez.");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col font-display bg-[#F4F7F9] text-slate-900 antialiased h-full relative overflow-hidden">
      <header className="sticky top-0 z-40 bg-white p-6 pb-4 flex flex-col gap-4 border-b border-gray-100 shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="size-10 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-slate-50">
            <span className="material-symbols-outlined text-slate-600">arrow_back</span>
          </button>
          <h1 className="text-lg font-black tracking-tight uppercase text-center flex-1 pr-10">Administration – Élèves</h1>
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
            <span className="material-symbols-outlined text-lg">search</span>
          </span>
          <input 
            type="text"
            placeholder="Chercher un élève..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold text-sm"
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-32 hide-scrollbar scroll-smooth">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-40">
             <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="font-black uppercase text-[10px] tracking-widest text-slate-500">Chargement des élèves...</p>
          </div>
        ) : error ? (
          <div className="p-10 text-center flex flex-col items-center gap-4">
             <span className="material-symbols-outlined text-5xl text-orange-300">wifi_off</span>
             <p className="text-slate-500 font-bold text-sm">{error}</p>
             <button onClick={fetchUsers} className="bg-primary text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-glow">Réessayer</button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-20 text-center opacity-30">
             <span className="material-symbols-outlined text-6xl">person_off</span>
             <p className="font-black uppercase tracking-widest text-xs mt-4">Aucun élève inscrit pour le moment.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredUsers.map((u) => (
              <div key={u.id} className="bg-white p-5 rounded-[2rem] shadow-soft border border-white flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black shrink-0">
                       {u.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left min-w-0">
                       <h3 className="font-black text-[15px] text-slate-800 leading-tight truncate">{u.full_name}</h3>
                       <p className="text-[11px] text-slate-500 font-medium truncate">{u.email}</p>
                    </div>
                  </div>
                  <div className={`shrink-0 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${u.is_premium ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                    {u.is_premium ? 'Premium' : 'Gratuit'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Filière / Niveau</span>
                    <span className="text-[12px] font-bold text-slate-700">{u.filiere || 'Non défini'}</span>
                  </div>
                  
                  <button 
                    onClick={() => togglePremium(u)}
                    className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 ${
                      u.is_premium 
                        ? 'bg-slate-50 text-slate-400 border border-slate-100' 
                        : 'bg-green-50 text-green-600 border border-green-100 shadow-sm'
                    }`}
                  >
                    {u.is_premium ? 'Désactiver Premium' : 'Activer Premium'}
                  </button>
                </div>

                <div className="flex justify-start px-1">
                   <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                     {/* Correction: Correction de l'accès à la variable locale du map */}
                     Inscrit le {u.updated_at ? new Date(u.updated_at).toLocaleDateString('fr-FR') : 'N/A'}
                   </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="h-10 shrink-0"></div>
      </main>
    </div>
  );
};

export default AdminScreen;
