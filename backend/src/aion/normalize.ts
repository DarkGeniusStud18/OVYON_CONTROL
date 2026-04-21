import { AionLanguage } from './types';

const NON_ASCII_MARKS = /[\u0300-\u036f]/g;
const SPACE_RUN = /\s+/g;
const NON_WORD = /[^a-z0-9\s]/g;

export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(NON_ASCII_MARKS, '')
    .replace(NON_WORD, ' ')
    .replace(SPACE_RUN, ' ')
    .trim();
}

export function detectLanguage(normalized: string): AionLanguage {
  const fonTokens = ['ina', 'pa', 'tan', 'ku', 'si', 'onu', 'ile'];
  const yorTokens = ['tan', 'pa', 'fitila', 'ile', 'enu', 'mii', 'gbe'];
  const frTokens = ['allume', 'eteins', 'ouvre', 'ferme', 'maison', 'lumiere'];

  const hasFon = fonTokens.some((token) => normalized.includes(token));
  const hasYor = yorTokens.some((token) => normalized.includes(token));
  const hasFr = frTokens.some((token) => normalized.includes(token));

  if ((hasFon && hasFr) || (hasYor && hasFr) || (hasFon && hasYor)) {
    return 'mixed';
  }
  if (hasFon) {
    return 'fon';
  }
  if (hasYor) {
    return 'yor';
  }
  return 'fr';
}
