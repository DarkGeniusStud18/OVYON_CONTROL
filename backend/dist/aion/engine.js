"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOfflineCommand = processOfflineCommand;
const localDict_1 = require("./localDict");
const normalize_1 = require("./normalize");
const similarity_1 = require("./similarity");
function buildSuggestions(normalizedText, history) {
    const catalogSuggestions = localDict_1.offlineCommandCatalog
        .map((entry) => ({ text: entry, score: (0, similarity_1.similarityScore)(normalizedText, entry), source: 'catalog' }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    const historySuggestions = history
        .map((entry) => ({ text: entry.text, score: (0, similarity_1.similarityScore)(normalizedText, entry.normalizedText), source: 'history' }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    const merged = [...catalogSuggestions, ...historySuggestions]
        .sort((a, b) => b.score - a.score)
        .filter((item) => item.score >= 0.45);
    const unique = [];
    const seen = new Set();
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
function tryPatternMatch(normalizedText) {
    for (const pattern of localDict_1.localPatterns) {
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
function processOfflineCommand(options) {
    const normalizedText = (0, normalize_1.normalizeText)(options.text);
    const language = (0, normalize_1.detectLanguage)(normalizedText);
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
        const normalizedSuggestion = (0, normalize_1.normalizeText)(bestSuggestion.text);
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
