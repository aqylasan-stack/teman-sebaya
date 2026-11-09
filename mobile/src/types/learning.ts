export type LearningCategory =
  | 'Semua'
  | 'Kesehatan Mental'
  | 'Mengenal dan Mengelola Emosi'
  | 'Digital Wellbeing'
  | 'Relasi dan Pertemanan'
  | 'TRIAD KRR'
  | 'Life Skills'
  | 'Perencanaan Kehidupan Berkeluarga'
  | 'Transisi Kehidupan Remaja'
  | 'PIK-R dan GenRe'
  | 'Relasi Sehat'
  | 'Masa Depan'
  | 'Literasi Emosi';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Article {
  id: string;
  title: string;
  category: LearningCategory;
  readingMinutes: number;
  summary: string;
  content: string[];
  publishedDate: string;
  author: string;
  keyTakeaways: string[];
  quiz?: QuizData;
  isSaved?: boolean;
  imageKey?: string;
}

