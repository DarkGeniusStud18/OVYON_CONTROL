import { localPatterns, offlineCommandCatalog } from './localDict';
import { detectLanguage, normalizeText } from './normalize';
import { similarityScore } from './similarity';
import { AionResult, AionSuggestion, CommandHistoryItem } from './types';

export interface ProcessCommandOptions {
  text: string;
  history: CommandHistoryItem[];
}

function buildSuggestions(normalizedText: string, history: CommandHistoryItem[]): AionSuggestion[] {
  const catalogSuggestions = offlineCommandCatalog
    .map((entry) => ({ text: entry, score: similarityScore(normalizedText, entry), source: 'catalog' as const }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const historySuggestions = history
    .map((entry) => ({ text: entry.text, score: similarityScore(normalizedText, entry.normalizedText), source: 'history' as const }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const merged = [...catalogSuggestions, ...historySuggestions]
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score >= 0.45);

  const unique: AionSuggestion[] = [];
  const seen = new Set<string>();

  for (const suggestion of merged) {
    const key = suggestion.text.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(suggestion);
    if (unique.length >= 5) {
      break;
    }
  }

  return unique;
}

function tryPatternMatch(normalizedText: string) {
  for (const pattern of localPatterns) {
    const match = normalizedText.match(pattern.pattern);
    if (!match) {
      continue;
    }

    return {
      intent: pattern.intent,
      response: pattern.response,
      actions: pattern.toActions(normalizedText, match)
    };
  }

  return null;
}

export function processOfflineCommand(options: ProcessCommandOptions): AionResult {
  const normalizedText = normalizeText(options.text);
  const language = detectLanguage(normalizedText);

  const directMatch = tryPatternMatch(normalizedText);
  if (directMatch) {
    return {
      success: true,
      level: 1,
      normalizedText,
      language,
      intent: directMatch.intent,
      response: directMatch.response,
      actions: directMatch.actions,
      suggestions: []
    };
  }

  const suggestions = buildSuggestions(normalizedText, options.history);
  const bestSuggestion = suggestions[0];

  if (bestSuggestion && bestSuggestion.score >= 0.67) {
    const normalizedSuggestion = normalizeText(bestSuggestion.text);
    const fallbackMatch = tryPatternMatch(normalizedSuggestion);

    if (fallbackMatch) {
      return {
        success: true,
        level: 'fallback',
        normalizedText,
        language,
        intent: fallbackMatch.intent,
        response: `${fallbackMatch.response} (interprete en mode offline)`,
        actions: fallbackMatch.actions,
        suggestions
      };
    }
  }

  return {
    success: false,
    level: 'none',
    normalizedText,
    language,
    response: 'Commande non reconnue hors ligne. Essaie une formulation plus directe.',
    actions: [],
    suggestions
  };
}
