import cs from '../locales/cs.json'
import en from '../locales/en.json'
import { LANGUAGES } from './constants'

// Slovník všech překladů
const translations = {
  [LANGUAGES.CS]: cs,
  [LANGUAGES.EN]: en,
}

/**
 * Vrátí přeložený text pro daný klíč a jazyk.
 * Podporuje tečkovou notaci: t('hero.claim', 'cs')
 */
export function translate(key, lang) {
  const dict = translations[lang] ?? translations[LANGUAGES.CS]

  // Projde klíče oddělené tečkou (např. 'hero.claim')
  return key.split('.').reduce((obj, k) => obj?.[k], dict) ?? key
}

export { translations }
