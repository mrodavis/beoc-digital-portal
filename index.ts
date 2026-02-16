// Type definitions for BEOC Portal

export interface PracticeFile {
  name: string;
  url: string;
}

export interface ModuleContent {
  title: string;
  description: string;
  videoUrl: string;
  practiceFiles: PracticeFile[];
  steps: string[];
  checklist: string[];
}

export interface LearningCardProps {
  title: string;
  description: string;
  href: string;
  status: "available" | "coming-soon";
  icon: string;
}

export interface SectionHeaderProps {
  title: string;
  description?: string;
}

export interface ModuleTemplateProps extends ModuleContent {}

// Future types for database integration

export interface User {
  id: string;
  email: string;
  name: string;
  enrolledCourses: string[];
  completedModules: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Progress {
  userId: string;
  moduleId: string;
  completed: boolean;
  checklistProgress: number[]; // Indices of completed checklist items
  lastAccessed: Date;
  timeSpent: number; // In minutes
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedDate: Date;
  certificateUrl: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  answers: number[];
  completedAt: Date;
}
