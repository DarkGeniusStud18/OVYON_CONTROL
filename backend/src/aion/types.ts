export type AionLanguage = 'fr' | 'fon' | 'yor' | 'mixed';

export interface AionAction {
  topic: string;
  payload: string;
  qos?: 0 | 1 | 2;
  retain?: boolean;
}

export interface AionSuggestion {
  text: string;
  score: number;
  source: 'catalog' | 'history';
}

export interface AionResult {
  success: boolean;
  level: 1 | 'fallback' | 'none';
  normalizedText: string;
  language: AionLanguage;
  intent?: string;
  response: string;
  actions: AionAction[];
  suggestions: AionSuggestion[];
}

export interface CommandHistoryItem {
  text: string;
  normalizedText: string;
  matchedIntent: string | null;
  success: boolean;
}
