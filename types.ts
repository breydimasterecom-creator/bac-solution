
export type AccessStatus = 'FREE_TRIAL' | 'FREE_LIMITED' | 'PREMIUM';

export interface Message {
  role: 'user' | 'model';
  text: string;
  isPageJump?: boolean;
  imageData?: {
    data: string;
    mimeType: string;
  };
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  filiere: string;
  target_score: number;
  is_premium: boolean;
  role: 'admin' | 'user';
  avatar_url?: string;
  updated_at?: string;
  // Champs pour la logique d'accès locale
  accessStatus: AccessStatus;
  trialStartedAt: string;
  favorites?: string[];
}

export interface Activity {
  id: string;
  type: 'exam' | 'quiz';
  subject: string;
  title: string;
  score?: string;
  timestamp: number;
  content?: string;
  imageFileName?: string;
  quizData?: {
    questions: QuizQuestion[];
    userAnswers: number[]
  };
}

export interface ContextExam {
  name: string;
  year: string;
  subject: string;
  url?: string;
  fileName?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
}

export type AppView = 
  | 'welcome' | 'onboarding' | 'onboarding2' | 'signup' | 'login' | 'forgot_password' | 'reset_password'
  | 'dashboard' | 'tutor' | 'exams' | 'exam_details' | 'math_exams' 
  | 'physics_exams' | 'chemistry_exams' | 'creole_exams' | 'english_exams' 
  | 'history_geo_exams' | 'philo_exams' | 'info_exams' | 'bio_geo_exams' 
  | 'economy_exams' | 'spanish_exams' | 'art_music_exams' | 'quiz' | 'profile' | 'edit_profile'
  | 'resolution_details' | 'resolutions' | 'favorites' | 'payment' | 'activation_waiting'
  | 'goals' | 'stats' | 'security' | 'language' | 'help' | 'privacy' | 'terms' | 'faq'
  | 'subject_exams' | 'admin';

export interface StudyReminder {
  id: string;
  time: string;
  enabled: boolean;
  days: number[];
}
