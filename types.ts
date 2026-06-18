export interface TheorySection {
  id: number;
  title: string;
  subtitle?: string;
  content: string; // Markdown or rich text
  examples?: Array<{ spanish: string; armenian: string; comment?: string }>;
  tables?: Array<{
    headers: string[];
    rows: string[][];
    caption?: string;
  }>;
}

export interface ConjugationQuestion {
  verb: string;
  meaning: string;
  pronoun: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export interface IndicativoSubjuntivoQuestion {
  sentenceWithBlank: string;
  translation: string;
  options: { text: string; isCorrect: boolean; mood: 'Indicativo' | 'Subjuntivo' }[];
  explanation: string;
  triggerWord: string;
}

export interface WishBuilderQuestion {
  sentenceArmenian: string;
  correctWords: string[];
  scrambledWords: string[];
  explanation: string;
}

export interface TimeTravelQuestion {
  sentenceWithBlank: string;
  translation: string;
  context: 'habit' | 'future';
  options: { text: string; isCorrect: boolean; mood: 'Indicativo' | 'Subjuntivo' }[];
  explanation: string;
}

export interface TriggerCategoryQuestion {
  sentence: string;
  translation: string;
  correctCategory: 'Deseo' | 'Emoción' | 'Duda' | 'Necesidad' | 'Petición' | 'Para que';
  explanation: string;
}

export interface TranslationQuestion {
  armenian: string;
  correctSpanish: string;
  options: string[];
  explanation: string;
}
