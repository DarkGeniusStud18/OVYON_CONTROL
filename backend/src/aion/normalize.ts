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
  const fonTokens = ['ku lampu', 'pa gbogbo', 'pa ina', 'si ona', 'onu', 'ile'];
  const yorTokens = ['tan fitila', 'fitila', 'mo n lo', 'ran mi lowo', 'tan ina', 'pa ina'];
  const frTokens = ['allume', 'eteins', 'ouvre', 'ferme', 'maison', 'lumiere'];
  const enTokens = ['turn on', 'turn off', 'switch on', 'switch off', 'open', 'close', 'status', 'help'];

  const hasFon = fonTokens.some((token) => normalized.includes(token));
  const hasYor = yorTokens.some((token) => normalized.includes(token));
  const hasFr = frTokens.some((token) => normalized.includes(token));
  const hasEn = enTokens.some((token) => normalized.includes(token));

  if (
    (hasFon && hasFr) ||
    (hasYor && hasFr) ||
    (hasFon && hasYor) ||
    (hasEn && (hasFon || hasYor || hasFr))
  ) {
    return 'mixed';
  }
  if (hasFon) {
    return 'fon';
  }
  if (hasYor) {
    return 'yor';
  }
  if (hasEn) {
    return 'en';
  }
  return 'fr';
}
