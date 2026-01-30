
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppView, Activity, UserProfile, ContextExam, QuizQuestion, AccessStatus } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import OnboardingScreen from './components/OnboardingScreen';
import OnboardingScreenTwo from './components/OnboardingScreenTwo';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ResetPasswordScreen from './components/ResetPasswordScreen';
import Dashboard from './components/Dashboard';
import AiTutor from './components/AiTutor';
import ExamsScreen from './components/ExamsScreen';
import MathExamsScreen from './components/MathExamsScreen';
import PhysicsExamsScreen from './components/PhysicsExamsScreen';
import ChemistryExamsScreen from './components/ChemistryExamsScreen';
import CreoleExamsScreen from './components/CreoleExamsScreen';
import EnglishExamsScreen from './components/EnglishExamsScreen';
import HistoryGeoExamsScreen from './components/HistoryGeoExamsScreen';
import PhiloExamsScreen from './components/PhiloExamsScreen';
import InfoExamsScreen from './components/InfoExamsScreen';
import BioGeoExamsScreen from './components/BioGeoExamsScreen';
import EconomyExamsScreen from './components/EconomyExamsScreen';
import SpanishExamsScreen from './components/SpanishExamsScreen';
import ArtMusicExamsScreen from './components/ArtMusicExamsScreen';
import ExamImageViewer from './components/ExamImageViewer';
import QuizScreen from './components/QuizScreen';
import ProfileScreen from './components/ProfileScreen';
import EditProfileScreen from './components/EditProfileScreen';
import ResolutionsScreen from './components/ResolutionsScreen';
import ResolutionDetailsScreen from './components/ResolutionDetailsScreen';
import FavoritesScreen from './components/FavoritesScreen';
import GoalsScreen from './components/GoalsScreen';
import StatsDetailsScreen from './components/StatsDetailsScreen';
import FaqScreen from './components/FaqScreen';
import PrivacyScreen from './components/PrivacyScreen';
import PolicyScreen from './components/PolicyScreen';
import PremiumRequestScreen from './components/PremiumRequestScreen';
import StatusWaitingScreen from './components/StatusWaitingScreen';
import TrialBanner from './components/TrialBanner';
import TrialEndModal from './components/TrialEndModal';
import LimitModal from './components/LimitModal';
import AdminScreen from './components/AdminScreen';
import { authService } from './services/authService';
import { usageService } from './services/usageService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [activeExamView, setActiveExamView] = useState<{file: string, title: string, year: string, subject: string} | null>(null);
  const [selectedExam, setSelectedExam] = useState<ContextExam & { content?: string; imageFileName?: string; quizData?: { questions: QuizQuestion[]; userAnswers: number[] }; } | null>(null);
  const [activeTutorExam, setActiveTutorExam] = useState<ContextExam | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showTrialEndModal, setShowTrialEndModal] = useState(false);
  const [limitReached, setLimitReached] = useState<'exam' | 'quiz' | 'ai' | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const handleLogout = useCallback(async () => {
    setUserProfile(null);
    setActivities([]);
    setView('welcome');
    await authService.logout();
  }, []);

  const handleToggleFavorite = useCallback(async (activityTitle: string) => {
    if (!userProfile) return;
    const currentFavs = userProfile.favorites || [];
    const updatedFavs = currentFavs.includes(activityTitle)
        ? currentFavs.filter(f => f !== activityTitle)
        : [...currentFavs, activityTitle];
    
    setUserProfile({ ...userProfile, favorites: updatedFavs });
    await authService.updateProfile({ favorites: updatedFavs });
  }, [userProfile]);

  const checkTrialStatus = useCallback(async (profile: UserProfile) => {
    if (profile.is_premium) return profile;
    const trialStart = new Date(profile.trialStartedAt).getTime();
    if (Date.now() > (trialStart + 24 * 60 * 60 * 1000) && profile.accessStatus === 'FREE_TRIAL') {
      const updated = { ...profile, accessStatus: 'FREE_LIMITED' as AccessStatus };
      await authService.updateProfile({ accessStatus: 'FREE_LIMITED' });
      setShowTrialEndModal(true);
      return updated;
    }
    return profile;
  }, []);

  const handleViewPdfWithQuota = (file: string, title: string, year: string, subject: string) => {
    if (userProfile?.accessStatus === 'FREE_LIMITED' && !usageService.canViewExam(subject)) {
      setLimitReached('exam');
      return;
    }
    if (userProfile?.accessStatus === 'FREE_LIMITED') usageService.incrementExams(subject);
    setActiveExamView({ file, title, year, subject });
  };

  const handleStartTutorWithQuota = (exam: ContextExam) => {
    if (userProfile?.accessStatus === 'FREE_LIMITED' && !usageService.canUseAi()) {
      setLimitReached('ai');
      return;
    }
    if (userProfile?.accessStatus === 'FREE_LIMITED') usageService.incrementAi();
    setActiveTutorExam(exam);
    setView('tutor');
  };

  const initializeApp = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        const checkedUser = await checkTrialStatus(user);
        setUserProfile(checkedUser);
        setView('dashboard');
      }
    } catch { 
      console.warn("Erreur d'initialisation, retour à l'accueil."); 
    } finally { 
      setIsInitializing(false); 
    }
  };

  useEffect(() => { initializeApp(); }, []);

  useEffect(() => {
    const saved = localStorage.getItem('bac_solution_activities');
    if (saved && userProfile) { 
      try { setActivities(JSON.parse(saved)); } catch (e) {} 
    }
  }, [userProfile?.id]);

  useEffect(() => {
    if (userProfile) localStorage.setItem('bac_solution_activities', JSON.stringify(activities));
  }, [activities, userProfile]);

  const handleSaveActivity = useCallback((title: string, subject: string, content: string, imageFileName?: string) => {
    const newActivity: Activity = { 
      id: Date.now().toString(), 
      type: 'exam', 
      subject, 
      title, 
      content, 
      imageFileName, 
      timestamp: Date.now() 
    };
    setActivities(prev => [newActivity, ...prev.filter(a => a.title !== title)]);
  }, []);

  const handleSaveQuizResult = useCallback((subject: string, title: string, score: string, quizData?: { questions: QuizQuestion[], userAnswers: number[] }) => {
    const newActivity: Activity = { id: Date.now().toString(), type: 'quiz', subject, title, score, quizData, timestamp: Date.now() };
    setActivities(prev => [newActivity, ...prev]);
  }, []);

  if (isInitializing) {
    return (
      <div className="h-full w-full bg-[#0066FF] flex flex-col items-center justify-center text-white font-display">
         <div className="size-14 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6"></div>
         <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Préparation de l'espace élève...</p>
      </div>
    );
  }

  const commonProps = {
    userStatus: userProfile?.accessStatus || 'FREE_LIMITED',
    favorites: userProfile?.favorites || [],
    onToggleFavorite: handleToggleFavorite,
    onGoPremium: () => setView('payment')
  };

  const renderView = () => {
    const publicViews = ['welcome', 'onboarding', 'onboarding2', 'signup', 'login', 'forgot_password'];
    if (!userProfile && !publicViews.includes(view)) {
       return <WelcomeScreen onContinue={() => setView('onboarding')} />;
    }

    switch (view) {
      case 'welcome': return <WelcomeScreen onContinue={() => setView('onboarding')} />;
      case 'onboarding': return <OnboardingScreen onContinue={() => setView('onboarding2')} />;
      case 'onboarding2': return <OnboardingScreenTwo onContinue={() => setView('signup')} />;
      case 'signup': 
        return <SignupScreen 
          onSignup={async (fn, e, p, ps) => { 
            // Transfert explicite du numéro vers le service
            await authService.signup({ full_name: fn, email: e, phone: p }, ps); 
          }} 
          onSwitchToLogin={() => setView('login')} 
        />;
      case 'login': 
        return <LoginScreen 
          onLogin={async (e, p) => { 
            const pr = await authService.login(e, p); 
            if (pr) { 
              const checked = await checkTrialStatus(pr); 
              setUserProfile(checked); 
              setView('dashboard'); 
            } else {
              throw new Error("Impossible de récupérer ton profil.");
            }
          }} 
          onSwitchToSignup={() => setView('signup')} 
          onForgotPassword={() => setView('forgot_password')} 
        />;
      case 'forgot_password': return <ForgotPasswordScreen onBack={() => setView('login')} />;
      case 'dashboard': 
        if (!userProfile) return null;
        return <Dashboard userProfile={userProfile} activities={activities} onStartTutor={() => handleStartTutorWithQuota(null as any)} onLogout={handleLogout} onGoToExams={() => setView('exams')} onGoToQuiz={() => setView('quiz')} onGoToProfile={() => setView('profile')} onGoToResolutions={() => setView('resolutions')} onGoToFavorites={() => setView('favorites')} onSelectActivity={(a) => { if (a.type === 'exam') { setSelectedExam({ name: a.title, year: 'Arch.', subject: a.subject, content: a.content, imageFileName: a.imageFileName }); setView('resolution_details'); } else { setSelectedExam({ name: a.title, year: 'Modèle', subject: a.subject, quizData: a.quizData }); setView('resolution_details'); } }} />;
      case 'tutor': 
        if (!userProfile) return null;
        return <AiTutor contextExam={activeTutorExam || undefined} userProfile={userProfile} onBack={() => setView('dashboard')} onGoToExams={() => setView('exams')} onGoToQuiz={() => setView('quiz')} onGoToProfile={() => setView('profile')} onSaveActivity={handleSaveActivity} onLimitReached={() => setLimitReached('ai')} isFavorite={activeTutorExam ? (userProfile.favorites || []).includes(activeTutorExam.name) : false} onToggleFavorite={() => activeTutorExam && handleToggleFavorite(activeTutorExam.name)} />;
      case 'exams': return <ExamsScreen onBack={() => setView('dashboard')} onGoToHome={() => setView('dashboard')} onGoToQuiz={() => setView('quiz')} onGoToProfile={() => setView('profile')} onSelectSubject={(s) => { const map:any = {'Mathematique':'math_exams', 'Physique':'physics_exams', 'Chimie':'chemistry_exams', 'Creole':'creole_exams', 'Anglais':'english_exams', 'Histoire& Geo':'history_geo_exams', 'Philosophie':'philo_exams', 'Informatique':'info_exams', 'Biologie&Geologie':'bio_geo_exams', 'Economie':'economy_exams', 'Espagnol':'spanish_exams', 'Art&Musique':'art_music_exams'}; setView(map[s] || 'subject_exams'); }} />;
      case 'math_exams': return <MathExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'physics_exams': return <PhysicsExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'chemistry_exams': return <ChemistryExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'creole_exams': return <CreoleExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'english_exams': return <EnglishExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'history_geo_exams': return <HistoryGeoExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'philo_exams': return <PhiloExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'info_exams': return <InfoExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'bio_geo_exams': return <BioGeoExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'economy_exams': return <EconomyExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'spanish_exams': return <SpanishExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'art_music_exams': return <ArtMusicExamsScreen onBack={() => setView('exams')} onStartTutor={handleStartTutorWithQuota} onViewPdf={handleViewPdfWithQuota} {...commonProps} />;
      case 'quiz': return <QuizScreen onBack={() => setView('dashboard')} onExit={() => setView('dashboard')} onSaveResult={handleSaveQuizResult} />;
      case 'profile': 
        if (!userProfile) return null;
        return <ProfileScreen userProfile={userProfile} activities={activities} darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} onBack={() => setView('dashboard')} onLogout={handleLogout} onGoToExams={() => setView('exams')} onGoToQuiz={() => setView('quiz')} onGoToTutor={() => setView('tutor')} onNavigate={(v) => setView(v)} onUpdateProfile={async (up) => { const updated = await authService.updateProfile(up); if (updated) setUserProfile(updated); }} />;
      case 'edit_profile':
        if (!userProfile) return null;
        return <EditProfileScreen userProfile={userProfile} onBack={() => setView('profile')} onSave={async (up) => { const updated = await authService.updateProfile(up); if (updated) setUserProfile(updated); setView('profile'); }} />;
      case 'goals': 
        if (!userProfile) return null;
        return <GoalsScreen userProfile={userProfile} onBack={() => setView('profile')} onSave={async (f, s) => { const updated = await authService.updateProfile({filiere:f, target_score:s}); if (updated) setUserProfile(updated); setView('profile'); }} />;
      case 'admin': return <AdminScreen onBack={() => setView('profile')} />;
      case 'stats': return <StatsDetailsScreen onBack={() => setView('profile')} activities={activities} />;
      case 'faq': return <FaqScreen onBack={() => setView('profile')} />;
      case 'privacy': return <PrivacyScreen onBack={() => setView('profile')} />;
      case 'terms': return <PolicyScreen onBack={() => setView('profile')} />;
      case 'resolutions': return <ResolutionsScreen onBack={() => setView('dashboard')} activities={activities} onSelectResolution={(n, y, c, q, img) => { setSelectedExam({ name: n, year: y, subject: 'Bac', content: c, quizData: q, imageFileName: img }); setView('resolution_details'); }} onGoToHome={() => setView('dashboard')} onGoToExams={() => setView('exams')} onGoToQuiz={() => setView('quiz')} onGoToProfile={() => setView('profile')} onGoToTutor={() => setView('tutor')} />;
      case 'resolution_details': 
        if (!userProfile || !selectedExam) return null;
        return <ResolutionDetailsScreen examName={selectedExam.name} year={selectedExam.year} subject={selectedExam.subject} customContent={selectedExam.content} imageFileName={selectedExam.imageFileName} quizData={selectedExam.quizData} isFavorite={(userProfile.favorites || []).includes(selectedExam.name)} onToggleFavorite={() => handleToggleFavorite(selectedExam.name)} onBack={() => setView('resolutions')} onStartTutor={() => handleStartTutorWithQuota(selectedExam)} onGoToHome={() => setView('dashboard')} onGoToExams={() => setView('exams')} onGoToProfile={() => setView('profile')} />;
      case 'favorites': 
        if (!userProfile) return null;
        return <FavoritesScreen onBack={() => setView('profile')} activities={activities} userProfile={userProfile} onToggleFavorite={handleToggleFavorite} onShowDetails={(n, y, s, c, q, img) => { setSelectedExam({ name: n, year: y, subject: s, content: c, quizData: q, imageFileName: img }); setView('resolution_details'); }} />;
      case 'payment': return <PremiumRequestScreen onConfirm={() => setView('activation_waiting')} onBack={() => setView('dashboard')} />;
      case 'activation_waiting': 
        if (!userProfile) return null;
        return <StatusWaitingScreen onRefresh={async () => { const up = await authService.getProfile(userProfile.id); if (up?.is_premium) { setUserProfile(up); setView('dashboard'); } }} onBack={() => setView('dashboard')} />;
      default: return <WelcomeScreen onContinue={() => setView('onboarding')} />;
    }
  };

  return (
    <div className="h-full w-full bg-[#F4F7F9] overflow-hidden">
      {userProfile?.accessStatus === 'FREE_TRIAL' && <TrialBanner trialStartedAt={userProfile.trialStartedAt} onEnd={() => initializeApp()} />}
      {renderView()}
      {activeExamView && <ExamImageViewer subject={activeExamView.subject} fileName={activeExamView.file} title={activeExamView.title} onBack={() => setActiveExamView(null)} onResolveWithAi={() => { handleStartTutorWithQuota({ name: activeExamView.title, year: activeExamView.year, subject: activeExamView.subject, fileName: activeExamView.file }); setActiveExamView(null); }} />}
      {showTrialEndModal && <TrialEndModal onContinueFree={() => setShowTrialEndModal(false)} onGoPremium={() => { setShowTrialEndModal(false); setView('payment'); }} />}
      {limitReached && <LimitModal type={limitReached} onClose={() => setLimitReached(null)} onGoPremium={() => { setLimitReached(null); setView('payment'); }} />}
    </div>
  );
};

export default App;
