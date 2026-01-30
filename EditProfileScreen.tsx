
import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { storageService } from '../services/storageService';

interface EditProfileScreenProps {
  userProfile: UserProfile;
  onBack: () => void;
  onSave: (newProfile: UserProfile) => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ userProfile, onBack, onSave }) => {
  const [fullName, setFullName] = useState(userProfile.full_name);
  const [photo, setPhoto] = useState(userProfile.avatar_url);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    if (!fullName.trim() || isUploading) return;
    
    setIsUploading(true);
    try {
      let finalAvatarUrl = photo;
      
      // Si la photo est une nouvelle image (format base64 long), on la compresse avant de l'enregistrer sur le téléphone
      if (photo && photo.startsWith('data:image')) {
        finalAvatarUrl = await storageService.compressImage(photo);
      }

      onSave({
        ...userProfile,
        full_name: fullName.trim(),
        avatar_url: finalAvatarUrl
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onBack();
      }, 1500);

    } catch (err) {
      alert("Erreur lors de la sauvegarde sur le téléphone.");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérification basique de taille avant traitement (5Mo max en entrée)
      if (file.size > 5 * 1024 * 1024) {
        alert("L'image choisie est trop volumineuse.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuAuJmSerYyCO2xJmMpi3b8xCQNqrk9zntGZh5iSSzCzPyAUyVn-zGiKLaQIGoTpl_b6f093sFcCTwxeoYiU8EHKfUvjzegF3OT4h3WqXQOMU1rNjaGKNn4CIup0-AeNMfvJJoebonxk7JBfOULkUZ8aM1-Y-JHQHjZeG7oHGYfukK1m4xQUJmlWOYW3Z7hZkjM98kkKwe05B2YQ1g5h-E6BqtSDhjzoCAvjpD8gHWzBgh8Dt8t_845sSDx_zmCBpKlhWgydi8wAC7Sm";

  return (
    <div className="min-h-screen flex flex-col font-display bg-[#F4F7F9] text-text-main antialiased h-full relative overflow-hidden">
      {/* Overlay de succès */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] bg-primary/95 flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="size-20 bg-white rounded-full flex items-center justify-center mb-4 animate-bounce">
              <span className="material-symbols-outlined text-primary text-4xl">check</span>
           </div>
           <p className="text-white font-black uppercase tracking-widest">Profil mis à jour !</p>
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-5 py-4 flex items-center justify-between border-b border-slate-100 shrink-0 h-20">
        <button onClick={onBack} className="size-11 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-slate-50">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h1 className="text-lg font-black tracking-tight uppercase">Modifier Profil</h1>
        <button 
          onClick={handleSave} 
          disabled={isUploading || !fullName.trim()}
          className={`h-11 px-6 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-glow transition-all ${(isUploading || !fullName.trim()) ? 'opacity-30' : 'active:scale-95'}`}
        >
          {isUploading ? '...' : 'Enregistrer'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-10 pb-20 w-full max-w-md mx-auto hide-scrollbar scroll-smooth">
        <div className="flex flex-col gap-10">
          {/* Zone Avatar */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <div 
                onClick={handlePhotoClick}
                className="relative size-32 rounded-[2.5rem] bg-white border-4 border-white shadow-strong overflow-hidden cursor-pointer active:scale-95 transition-all group"
              >
                 <img src={photo || defaultAvatar} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="User avatar" />
                 <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                 </div>
                 {isUploading && (
                   <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                   </div>
                 )}
              </div>
              <button 
                onClick={handlePhotoClick}
                className="absolute -bottom-2 -right-2 size-10 bg-primary text-white rounded-2xl border-4 border-[#F4F7F9] shadow-lg flex items-center justify-center active:scale-75 transition-transform"
              >
                <span className="material-symbols-outlined text-lg">edit</span>
              </button>
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Appuie sur la photo pour changer</p>
          </div>

          {/* Formulaire */}
          <div className="space-y-8">
            <div className="flex flex-col gap-3">
              <label className="px-1 text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">person</span>
                Nom Complet de l'élève
              </label>
              <input 
                value={fullName} 
                onChange={e => setFullName(e.target.value)} 
                className="w-full bg-white border-2 border-transparent focus:border-primary/20 px-5 h-16 rounded-2xl shadow-soft font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300" 
                placeholder="Ex: Jean-Baptiste Smith" 
              />
            </div>

            <div className="bg-slate-900/5 p-6 rounded-[2rem] border border-white/50 space-y-4">
               <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Compte vérifié</p>
                    <p className="text-sm font-bold text-slate-700">{userProfile.email}</p>
                  </div>
               </div>
               <div className="h-px bg-slate-200/50 w-full"></div>
               <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400">phone_iphone</span>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Téléphone</p>
                    <p className="text-sm font-bold text-slate-700">{userProfile.phone || 'Non renseigné'}</p>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100/50 flex items-start gap-4">
             <span className="material-symbols-outlined text-primary text-xl">info</span>
             <p className="text-[11px] font-medium text-blue-700 leading-relaxed">
               Ta photo de profil est sauvegardée directement dans la mémoire de ton téléphone pour un accès plus rapide.
             </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfileScreen;
